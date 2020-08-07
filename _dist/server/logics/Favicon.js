"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const logics_1 = __importDefault(require("server/logics"));
const util_1 = __importDefault(require("common/util"));
const conf_1 = __importDefault(require("common/conf"));
class Favicon {
    static get defaultFaviconFileName() {
        return `favicon`;
    }
    static get extension() {
        return ".ico";
    }
    static get defaultFaviconName() {
        return `${Favicon.defaultFaviconFileName}${Favicon.extension}`;
    }
    static get defaultFaviconPath() {
        return `${Sequence_1.default.HTTPS_PROTOCOL}//${conf_1.default.assetsURL}/${Favicon.defaultFaviconFileName}${Favicon.extension}`;
    }
    static get defaultFaviconData() {
        return {
            faviconName: Favicon.defaultFaviconPath,
            faviconType: "[TALKN]",
            faviconBinary: null,
            isExist: false,
            isDefault: true,
            isForceGet: false,
        };
    }
    async fetch(thread, iconHrefs) {
        const log = false;
        return new Promise((resolve, reject) => {
            const faviconDatas = this.getFaviconDatas(thread, iconHrefs);
            let promises = [];
            faviconDatas.forEach((faviconData) => {
                if (log)
                    console.log(faviconData);
                if (!faviconData.isDefault && faviconData.isExist) {
                    if (log)
                        console.log("A");
                    resolve(faviconData);
                    return false;
                }
                if (!faviconData.isDefault && !faviconData.isExist) {
                    if (log)
                        console.log("B");
                    promises.push(logics_1.default.favicon.request(faviconData));
                    return false;
                }
                if (!faviconData.isExist) {
                    if (log)
                        console.log("C");
                    promises.push(logics_1.default.favicon.request(faviconData));
                }
            });
            Promise.all(promises).then((responses) => {
                const results = responses.filter((response) => response !== false);
                const resultLength = results.length;
                let resolveResult = Favicon.defaultFaviconData;
                if (resultLength > 0) {
                    results.forEach((result, index) => {
                        resolveResult = result;
                        if (!resolveResult.isDefault) {
                            return false;
                        }
                    });
                }
                if (resolveResult.faviconBinary) {
                    const saveFaviconName = util_1.default.getSaveFaviconName(resolveResult.faviconName);
                    logics_1.default.fs.writeFavicon(saveFaviconName, resolveResult.faviconBinary);
                }
                else {
                }
                resolve(resolveResult);
            });
        });
    }
    request(faviconData) {
        const log = false;
        return new Promise((resolve, reject) => {
            const { faviconName } = faviconData;
            request_1.default({ method: "GET", url: faviconName, encoding: null }, (error, response, faviconBinary) => {
                if (!error && response && response.statusCode === 200) {
                    if (log)
                        console.log("A ");
                    if (log)
                        console.log(response.headers);
                    if (response.headers["content-type"].indexOf("image") === 0) {
                        if (log)
                            console.log("B " + response.headers["content-length"]);
                        if (response.headers["content-length"] !== "0") {
                            if (log)
                                console.log("C");
                            resolve({ ...faviconData, faviconBinary });
                            return true;
                        }
                    }
                }
                resolve(false);
                return false;
            });
        });
    }
    getFaviconDatas(thread, iconHrefs) {
        const log = false;
        const { protocol, host, ch } = thread;
        let faviconDatas = [Favicon.defaultFaviconData];
        faviconDatas[0]["isExist"] = logics_1.default.fs.isExistFavicon(util_1.default.getSaveFaviconName(faviconDatas[0]["faviconName"]));
        const faviconName = `${protocol}//${host}/${Favicon.defaultFaviconName}`;
        const iconHrefsLength = iconHrefs.length;
        faviconDatas.push({
            faviconName: faviconName,
            faviconType: `NO_WRITE_ON_HOST`,
            isExist: logics_1.default.fs.isExistFavicon(util_1.default.getSaveFaviconName(faviconName)),
            isDefault: false,
        });
        if (log)
            console.log("@ " + iconHrefsLength);
        if (iconHrefsLength > 0) {
            for (let i = 0; i < iconHrefsLength; i++) {
                const href = iconHrefs[i];
                const faviconHostType = href.indexOf(host) >= 0 ? "[SAME_HOST]" : "[DIF_HOST]";
                let faviconName = "";
                let faviconType = "";
                let isDefault = Favicon.defaultFaviconData.isDefault;
                let isExist = Favicon.defaultFaviconData.isExist;
                if (log)
                    console.log("@A");
                if (href.indexOf(Sequence_1.default.HTTP_PROTOCOL) === 0 || href.indexOf(Sequence_1.default.HTTPS_PROTOCOL) === 0) {
                    if (log)
                        console.log("@B");
                    faviconName = href;
                    faviconType = `[PROTOCOL]//${faviconHostType}/[ICON]`;
                }
                else if (href.indexOf("//") === 0) {
                    console.log("@C");
                    faviconName = `${protocol}${href}`;
                    faviconType = `${faviconHostType}/[ICON]`;
                }
                else if (href.indexOf(`/${Favicon.defaultFaviconFileName}`) === 0) {
                    if (log)
                        console.log("@D");
                    faviconName = `${protocol}//${host}${href}`;
                    faviconType = "/[ICON]";
                }
                else if (href.indexOf(`${Favicon.defaultFaviconFileName}`) === 0) {
                    if (log)
                        console.log("@E");
                    faviconName = `${protocol}//${host}/${href}`;
                    faviconType = "[ICON]";
                }
                else if (href.indexOf(`${Favicon.defaultFaviconFileName}`) > 0) {
                    if (href.indexOf("/") === 0) {
                        if (log)
                            console.log("@F");
                        faviconName = `${protocol}//${host}${href}`;
                        faviconType = "/[PATH][ICON]";
                    }
                    else if (href.indexOf("../") === 0) {
                        const splitedHref = href.split("../");
                        const updateHref = href.replace(/\.\.\//g, "");
                        const backPathCnt = splitedHref.length - 1;
                        const splitedCh = ch.split("/");
                        const splitedChLength = splitedCh.length;
                        const removePathCnt = backPathCnt + 3;
                        let updateHost = "";
                        for (let i = 0; i < splitedChLength; i++) {
                            if (i > splitedChLength - removePathCnt) {
                                console.log("BREAK!");
                                break;
                            }
                            updateHost = updateHost + splitedCh[i] + "/";
                            console.log(i + " " + updateHost);
                        }
                        faviconName = `${protocol}/${updateHost}${updateHref}`;
                        faviconType = "[PATH]../[ICON]";
                        if (log)
                            console.log("@G " + ch);
                        if (log)
                            console.log("@G " + updateHost);
                        if (log)
                            console.log("@G " + updateHref);
                        if (log)
                            console.log("@G " + faviconName);
                        if (log)
                            console.log("@G " + removePathCnt);
                    }
                    else {
                        if (log)
                            console.log("@H " + href);
                        faviconName = `${protocol}/${host}/${href}`;
                        faviconType = "[PATH][ICON]";
                    }
                }
                else {
                    if (log)
                        console.log("@I");
                    faviconName = `${protocol}//${host}${href}`;
                    faviconType = "[ELSE]";
                }
                faviconName = faviconName.replace(/[?].*$/, "");
                isDefault = Favicon.defaultFaviconData.faviconName === faviconName;
                isExist = logics_1.default.fs.isExistFavicon(util_1.default.getSaveFaviconName(faviconName));
                faviconDatas.push({ faviconName, faviconType, isExist, isDefault });
            }
        }
        else {
            faviconDatas[0]["faviconType"] = "[NO_LINK_TAG]";
        }
        return faviconDatas;
    }
    getSuperDomain(host) {
        const hostParts = host.split(".");
        const hostPartLength = hostParts.length;
        if (hostPartLength === 1) {
            return host;
        }
        else if (hostPartLength === 2) {
            return `${hostParts[0]}.${hostParts[1]}`;
        }
        else {
            return host;
        }
    }
}
exports.default = Favicon;
//# sourceMappingURL=Favicon.js.map