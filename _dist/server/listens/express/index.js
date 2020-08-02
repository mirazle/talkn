"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const define_1 = __importDefault(require("common/define"));
const Mail_1 = __importDefault(require("server/logics/Mail"));
const Geolite_1 = __importDefault(require("server/logics/Geolite"));
const conf_1 = __importDefault(require("server/conf"));
const sessionSetting = express_session_1.default({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: "lax",
    },
});
class Express {
    constructor() {
        this.httpApp = express_1.default();
        this.httpApp.use(sessionSetting);
        this.httpsApp = express_1.default();
        this.httpsApp.set("view engine", "ejs");
        this.httpsApp.set("views", conf_1.default.serverPath);
        this.httpsApp.set("trust proxy", true);
        this.httpsApp.use(body_parser_1.default.urlencoded({ extended: true }));
        this.httpsApp.use(compression_1.default());
        this.httpsApp.use(sessionSetting);
        this.listenedHttp = this.listenedHttp.bind(this);
        this.listenedHttps = this.listenedHttps.bind(this);
        this.routingHttps = this.routingHttps.bind(this);
    }
    createHttpServer() {
        http_1.default.createServer(this.httpApp.all("*", this.routingHttp)).listen(define_1.default.PORTS.HTTP, this.listenedHttp);
    }
    routingHttp(req, res) {
        res.redirect(`https://${req.hostname}${req.url}`);
    }
    listenedHttp() { }
    createHttpsServer() {
        https_1.default
            .createServer(conf_1.default.sslOptions, this.httpsApp.all("*", this.routingHttps))
            .listen(define_1.default.PORTS.HTTPS, this.listenedHttps);
    }
    routingHttps(req, res, next) {
        let language = "en";
        switch (req.headers.host) {
            case conf_1.default.apiURL:
                if (req.url === `/v${conf_1.default.apiVer}`) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.sendFile(conf_1.default.serverApiPath);
                }
                else {
                    language = req.query && req.query.lang ? req.query.lang : Geolite_1.default.getLanguage(req);
                    res.render("api/", {
                        language,
                        domain: conf_1.default.domain,
                        apiURL: conf_1.default.apiURL,
                        wwwURL: conf_1.default.wwwURL,
                        extURL: conf_1.default.extURL,
                        assetsURL: conf_1.default.assetsURL,
                        clientURL: conf_1.default.clientURL,
                        apiAccessURL: conf_1.default.apiAccessURL,
                    });
                }
                break;
            case conf_1.default.extURL:
                if (req.originalUrl === "/") {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.sendFile(conf_1.default.serverExtPath + "ext.js");
                }
                else {
                    res.sendFile(conf_1.default.serverExtPath + req.originalUrl.replace("/", ""));
                }
                break;
            case conf_1.default.wwwURL:
                language = req.query && req.query.lang ? req.query.lang : Geolite_1.default.getLanguage(req);
                if (req.method === "GET") {
                    if (req.url === "/" || (req.url && req.url.indexOf("/?lang=") === 0)) {
                        res.render("www/", {
                            language,
                            domain: conf_1.default.domain,
                            apiURL: conf_1.default.apiURL,
                            wwwURL: conf_1.default.wwwURL,
                            extURL: conf_1.default.extURL,
                            assetsURL: conf_1.default.assetsURL,
                            clientURL: conf_1.default.clientURL,
                            apiAccessURL: conf_1.default.apiAccessURL,
                        });
                    }
                    else {
                        res.sendFile(`${conf_1.default.serverWwwPath}${req.url.replace("/", "")}`);
                    }
                }
                else if (req.method === "POST") {
                    console.log(req.body.inquiry);
                    Mail_1.default.send(req.body.inquiry);
                    res.redirect(`https://${conf_1.default.wwwURL}`);
                }
                break;
            case conf_1.default.descURL:
                res.render("desc/index", {});
                break;
            case conf_1.default.domain:
                let includeIframeTag = false;
                let portalUrlSearch = false;
                let ch = "/";
                let hasSlash = false;
                language = req.query && req.query.lang ? req.query.lang : Geolite_1.default.getLanguage(req);
                if (req.originalUrl === "/robots.txt" ||
                    req.originalUrl === "/manifest.json" ||
                    req.originalUrl === "/service.worker.js" ||
                    req.originalUrl === "/worker.js") {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.sendFile(conf_1.default.serverPortalPath + req.originalUrl.replace("/", ""));
                    return true;
                }
                if (`/${req.originalUrl}/` !== conf_1.default.assetsPath) {
                    portalUrlSearch = req.originalUrl.indexOf(`https://${conf_1.default.domain}`) !== false;
                    if (req.headers.referer) {
                        const referer = req.headers.referer.replace("https:/", "").replace("http:/", "");
                        if (referer.indexOf("/" + conf_1.default.wwwURL) === 0) {
                            if (req.originalUrl.indexOf(referer) === 0) {
                                includeIframeTag = true;
                            }
                            ch = req.originalUrl;
                            ch = ch.indexOf("//") === 0 ? ch.replace(/^\/\//, "/") : ch;
                        }
                        else {
                            includeIframeTag = true;
                            if (req.originalUrl === "/") {
                                ch = referer;
                            }
                            else if (req.originalUrl !== "/") {
                                ch = referer;
                            }
                            else {
                                ch = referer;
                            }
                        }
                    }
                    else {
                        ch = req.originalUrl.replace(`/${conf_1.default.domain}`, "");
                        includeIframeTag = false;
                    }
                    hasSlash = ch.lastIndexOf("/") === ch.length - 1;
                    res.render("portal/", {
                        includeIframeTag,
                        ch,
                        hasSlash,
                        language,
                        domain: conf_1.default.domain,
                        clientURL: conf_1.default.clientURL,
                        assetsURL: conf_1.default.assetsURL,
                        apiURL: conf_1.default.apiURL,
                        apiAccessURL: conf_1.default.apiAccessURL,
                    });
                }
                break;
            case conf_1.default.transactionURL:
                console.log("TRANSACTION");
                break;
            case conf_1.default.clientURL:
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.sendFile(conf_1.default.serverClientPath);
                break;
            case conf_1.default.assetsURL:
                if (req.originalUrl === "/manifest.json") {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                }
                res.sendFile(conf_1.default.serverAssetsPath + req.originalUrl.replace("/", ""));
                break;
            case conf_1.default.sessionURL:
                const proccess = req._parsedUrl.pathname.split("/");
                if (proccess.length > 0 && proccess[1] !== "favicon.ico") {
                    const socialName = proccess[1];
                    const methodType = proccess[2].charAt(0).toUpperCase() + proccess[2].slice(1);
                    const uid = req.query.u;
                    const refererCh = req.query.c;
                    if (socialName && methodType) {
                        this.session[socialName + methodType](req, res, next, uid, refererCh);
                    }
                    else {
                        res.redirect(`https://${conf_1.default.domain}`);
                    }
                }
                else {
                    res.redirect(`https://${conf_1.default.domain}`);
                }
                break;
            default:
                res.redirect(`https://${conf_1.default.domain}`);
                break;
        }
    }
    listenedHttps() {
        console.log(`@@@ LISTEN HTTPS ${define_1.default.PORTS.HTTPS}`);
    }
    listenGet() { }
    listenPost() { }
}
exports.default = Express;
//# sourceMappingURL=index.js.map