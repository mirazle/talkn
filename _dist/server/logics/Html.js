"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const cheerio_1 = __importDefault(require("cheerio"));
const iconv_1 = require("iconv");
const buffer_1 = require("buffer");
const Sequence_1 = __importDefault(require("common/Sequence"));
const App_1 = __importDefault(require("api/store/App"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
const logics_1 = __importDefault(require("server/logics"));
const html_1 = __importDefault(require("server/schemas/logics/html"));
class Html {
    static get checkSpace() {
        return /^\s*$/;
    }
    fetch(thread, requestState) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hasSlash } = requestState.thread;
            const { protocol, ch } = thread;
            const layer = Thread_1.default.getLayer(ch);
            let requestCh = ch;
            if (layer === 2) {
                requestCh = ch.replace(/\/$/, "");
            }
            else {
                requestCh = JSON.parse(hasSlash) ? ch : ch.replace(/\/$/, "");
            }
            let result = { response: null, iconHrefs: [] };
            switch (protocol) {
                case Sequence_1.default.HTTPS_PROTOCOL:
                    result = yield logics_1.default.html.exeFetch(Sequence_1.default.HTTPS_PROTOCOL, requestCh);
                    if (!result.response) {
                        result = yield logics_1.default.html.exeFetch(Sequence_1.default.HTTP_PROTOCOL, requestCh);
                    }
                    break;
                case Sequence_1.default.HTTP_PROTOCOL:
                    result = yield logics_1.default.html.exeFetch(Sequence_1.default.HTTP_PROTOCOL, requestCh);
                    if (!result.response) {
                        result = yield logics_1.default.html.exeFetch(Sequence_1.default.HTTPS_PROTOCOL, requestCh);
                    }
                    break;
                case Sequence_1.default.TALKN_PROTOCOL:
                case Sequence_1.default.UNKNOWN_PROTOCOL:
                default:
                    result = yield logics_1.default.html.exeFetch(Sequence_1.default.HTTPS_PROTOCOL, requestCh);
                    if (!result.response) {
                        result = yield logics_1.default.html.exeFetch(Sequence_1.default.HTTP_PROTOCOL, requestCh);
                    }
                    break;
            }
            if (result.response) {
                return result;
            }
            else {
                result.response = MongoDB_1.default.getDefineSchemaObj(new html_1.default({}));
                return result;
            }
        });
    }
    exeFetch(protocol, ch) {
        return new Promise((resolve, reject) => {
            const url = `${protocol}/${ch}`;
            const option = { method: "GET", encoding: "binary", url };
            request_1.default(option, (error, response, body) => {
                let responseSchema = MongoDB_1.default.getDefineSchemaObj(new html_1.default({}));
                if (error) {
                }
                if (!error && response && response.statusCode === 200) {
                    const contentType = response.headers["content-type"];
                    let iconHrefs = [];
                    responseSchema.contentType = contentType;
                    responseSchema.protocol = protocol;
                    if (App_1.default.isMediaContentType(contentType)) {
                        responseSchema.title = this.getTitle(null, ch, contentType);
                        responseSchema.serverMetas.title = responseSchema.title;
                    }
                    else {
                        const utf8Body = this.toUtf8Str(body, contentType);
                        const $ = cheerio_1.default.load(utf8Body);
                        iconHrefs = this.getIconHrefs($);
                        responseSchema.links = this.getLinks($);
                        responseSchema.h1s = this.getH1s($);
                        responseSchema.videos = this.getVideos($);
                        responseSchema.audios = this.getAudios($);
                        responseSchema.serverMetas = this.getMetas($, ch, responseSchema, response.request.uri.href);
                    }
                    resolve({ response: responseSchema, iconHrefs });
                }
                else {
                    resolve({ response: null, iconHrefs: [] });
                }
            });
        });
    }
    getTitle($, ch, contentType) {
        let title = "";
        if (App_1.default.isMediaContentType(contentType)) {
            const splitedCh = ch.split("/");
            const _title1 = splitedCh[splitedCh.length - 1];
            if (_title1 !== "")
                return _title1;
            const _title2 = splitedCh[splitedCh.length - 2];
            if (_title2 !== "")
                return _title2;
            const _title3 = splitedCh[splitedCh.length - 3];
            if (_title3 !== "")
                return _title3;
        }
        else {
            title = $("head title").text();
        }
        return title;
    }
    getH1s($) {
        const h1Length = $("h1").length;
        let h1s = [];
        for (let i = 0; i < h1Length; i++) {
            const h1 = $("h1").get(i);
            h1s.push($(h1).text());
        }
        return h1s;
    }
    getVideos($) {
        const videoLength = $("video").length;
        let videos = [];
        for (let i = 0; i < videoLength; i++) {
            const video = $("video").get(i);
            const sources = $(video).find("source");
            const sourceLength = sources.length;
            if (video.attribs.src) {
                videos.push(Object.assign({}, video.attribs));
            }
            for (var j = 0; j < sourceLength; j++) {
                videos.push(Object.assign(Object.assign({}, videos.attribs), { src: sources[j].attribs.src }));
            }
        }
        return videos;
    }
    getAudios($) {
        const audioLength = $("body audio").length;
        let audios = [];
        for (let i = 0; i < audioLength; i++) {
            const audio = $("audio").get(i);
            const sources = $(audio).find("source");
            const sourceLength = sources.length;
            if (audio.attribs.src) {
                audios.push(Object.assign({}, audio.attribs));
            }
            for (var j = 0; j < sourceLength; j++) {
                audios.push(Object.assign(Object.assign({}, audio.attribs), { src: sources[j].attribs.src }));
            }
        }
        return audios;
    }
    getIconHrefs($) {
        let iconHrefs = [];
        const icon = $('head link[rel="icon"]');
        const Icon = $('head link[rel="Icon"]');
        const shortcutIcon = $('head link[rel="shortcut icon"]');
        const iconLength = icon.length;
        const IconLength = Icon.length;
        const shortcutIconLength = shortcutIcon.length;
        if (iconLength > 0) {
            for (let i = 0; i < iconLength; i++) {
                if (icon[i].attribs.href !== "") {
                    iconHrefs.push(icon[i].attribs.href);
                }
            }
        }
        if (IconLength > 0) {
            for (let i = 0; i < IconLength; i++) {
                if (Icon[i].attribs.href !== "") {
                    iconHrefs.push(Icon[i].attribs.href);
                }
            }
        }
        if (shortcutIconLength > 0) {
            for (let i = 0; i < shortcutIconLength; i++) {
                if (shortcutIcon[i].attribs.href !== "") {
                    iconHrefs.push(shortcutIcon[i].attribs.href);
                }
            }
        }
        return iconHrefs;
    }
    getLinks($) {
        const linkLength = $("body a").length;
        const getHref = item => {
            if (item && item.attribs && item.attribs.href && item.attribs.href !== "") {
                return item.attribs.href;
            }
            return "";
        };
        const getText = item => {
            const itemLength = item.children.length;
            let text = "";
            for (let i = 0; i < itemLength; i++) {
                const child = item.children[i];
                if (child.type === "text" && child.data !== "" && !Html.checkSpace.test(child.data)) {
                    text = child.data;
                    break;
                }
                if (child.name === "img" &&
                    child.attribs &&
                    child.attribs.alt &&
                    child.attribs.alt !== "" &&
                    !Html.checkSpace.test(child.attribs.alt)) {
                    text = child.attribs.alt;
                    break;
                }
                if (child.children && child.children.length > 0) {
                    text = getText(child);
                    break;
                }
                break;
            }
            return text;
        };
        let links = [];
        for (var i = 0; i < linkLength; i++) {
            const item = $("body a").get(i);
            const href = getHref(item);
            const text = getText(item);
            if (href && href !== "" && text && text !== "") {
                links.push({ href, text });
            }
        }
        return links;
    }
    getMetas($, ch, parentSchema, href) {
        let responseSchema = MongoDB_1.default.getDefineSchemaObj(new html_1.default({}));
        let serverMetas = responseSchema.serverMetas;
        const metaLength = $("meta").length;
        serverMetas.title = this.getTitle($, ch, parentSchema.contentType);
        for (var i = 0; i < metaLength; i++) {
            const item = $("meta").get(i);
            let key = i;
            let content = "";
            if (item.attribs.name) {
                key = item.attribs.name;
                content = item.attribs.content;
            }
            else if (item.attribs.property) {
                key = item.attribs.property;
                content = item.attribs.content;
            }
            else if (item.attribs.charset) {
                key = "charset";
                content = item.attribs.charset;
            }
            else if (item.attribs["http-equiv"]) {
                key = item.attribs["http-equiv"];
                content = item.attribs.content;
            }
            if (key === "og:image") {
                if (content.indexOf(Sequence_1.default.HTTP_PROTOCOL) !== 0 && content.indexOf(Sequence_1.default.HTTPS_PROTOCOL) !== 0) {
                    content = `${href}${content}`;
                }
            }
            key = key.toString().replace(".", "_");
            serverMetas[key] = content;
        }
        return serverMetas;
    }
    toUtf8Str(body, contentType) {
        const encoding = this.getCharset(body);
        const buf = buffer_1.Buffer.from(body, "binary");
        try {
            const iconv = new iconv_1.Iconv(encoding, "UTF-8//TRANSLIT//IGNORE");
            return iconv.convert(buf).toString();
        }
        catch (e) {
            console.warn(e);
            return body;
        }
    }
    getCharset(body) {
        const bin = body.toString("binary");
        const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
        return re ? re[1] : "utf-8";
    }
}
exports.default = Html;
//# sourceMappingURL=Html.js.map