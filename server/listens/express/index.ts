import http from "http";
import https from "https";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import compression from "compression";
import define from "common/define";
import Session from "server/listens/express/session/";
import Mail from "server/logics/Mail";
import Geolite from "server/logics/Geolite";
import conf from "server/conf";

const sessionSetting = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: "lax",
  },
});

class Express {
  httpApp: any;
  httpsApp: any;
  session: any;
  constructor() {
    this.httpApp = express();
    this.httpApp.use(sessionSetting);
    this.httpsApp = express();
    this.httpsApp.set("view engine", "ejs");
    this.httpsApp.set("views", conf.serverPath);
    this.httpsApp.set("trust proxy", true);
    this.httpsApp.use(bodyParser.urlencoded({ extended: true }));
    this.httpsApp.use(compression());
    this.httpsApp.use(sessionSetting);

    // this.session = new Session(this.httpsApp);

    this.listenedHttp = this.listenedHttp.bind(this);
    this.listenedHttps = this.listenedHttps.bind(this);
    this.routingHttps = this.routingHttps.bind(this);
  }

  /***************************/
  /* HTTP(Redirect to HTTPS) */
  /***************************/

  createHttpServer() {
    http.createServer(this.httpApp.all("*", this.routingHttp)).listen(define.PORTS.HTTP, this.listenedHttp);
  }

  routingHttp(req, res) {
    res.redirect(`https://${req.hostname}${req.url}`);
  }

  listenedHttp(): void {}

  /***************************/
  /* HTTPS                   */
  /***************************/

  createHttpsServer() {
    https
      .createServer(conf.sslOptions, this.httpsApp.all("*", this.routingHttps))
      .listen(define.PORTS.HTTPS, this.listenedHttps);
  }

  routingHttps(req, res, next) {
    let language = "en";
    switch (req.headers.host) {
      case conf.apiURL:
        console.log(req.url);
        if (req.url === `/v${conf.apiVer}`) {
          console.log("A");
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.sendFile(conf.serverApiPath);
        } else {
          console.log("B");
          if (req.url === "/") {
            console.log("C");
            language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);
            res.render("api/", {
              language,
              domain: conf.domain,
              apiURL: conf.apiURL,
              wwwURL: conf.wwwURL,
              extURL: conf.extURL,
              assetsURL: conf.assetsURL,
              clientURL: conf.clientURL,
              apiAccessURL: conf.apiAccessURL,
            });
          } else {
            console.log("D " + conf.serverApiPath);
            console.log("D " + conf.serverApiPath + req.originalUrl.replace("/", ""));
            res.sendFile(conf.serverApiPath + req.originalUrl.replace("/", ""));
          }
        }
        break;
      case conf.extURL:
        if (req.originalUrl === "/") {
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.sendFile(conf.serverExtPath + conf.files.ext);
        } else {
          res.sendFile(conf.serverExtPath + req.originalUrl.replace("/", ""));
        }
        break;
      case conf.wwwURL:
        language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);
        if (req.method === "GET") {
          if (req.url === "/" || (req.url && req.url.indexOf("/?lang=") === 0)) {
            res.render("www/", {
              language,
              domain: conf.domain,
              apiURL: conf.apiURL,
              wwwURL: conf.wwwURL,
              extURL: conf.extURL,
              assetsURL: conf.assetsURL,
              clientURL: conf.clientURL,
              apiAccessURL: conf.apiAccessURL,
            });
          } else {
            res.sendFile(`${conf.serverWwwPath}${req.url.replace("/", "")}`);
          }
        } else if (req.method === "POST") {
          console.log(req.body.inquiry);
          Mail.send(req.body.inquiry);
          res.redirect(`https://${conf.wwwURL}`);
        }
        break;
      case conf.descURL:
        res.render("desc/index", {});
        break;
      case conf.domain:
        let includeIframeTag = false;
        let portalUrlSearch = false;
        let ch = "/";
        let hasSlash = false;
        language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);

        if (
          req.originalUrl === "/robots.txt" ||
          req.originalUrl === "/manifest.json" ||
          req.originalUrl === "/service.worker.js" ||
          req.originalUrl === "/worker.js"
        ) {
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.sendFile(conf.serverPortalPath + req.originalUrl.replace("/", ""));
          return true;
        }

        // No Assests Url
        if (`/${req.originalUrl}/` !== conf.assetsPath) {
          portalUrlSearch = req.originalUrl.indexOf(`https://${conf.domain}`) !== false;

          /*
          MultiChBootはreq.originalUrlのpathnameで配列形式でリクエストを受け付ける
        */

          // ポータル以外からアクセス
          if (req.headers.referer) {
            const referer = req.headers.referer.replace("https:/", "").replace("http:/", "");

            // www.talkn.ioからアクセス
            if (referer.indexOf("/" + conf.wwwURL) === 0) {
              // www.talkn.ioでの<script呼び出しの場合
              if (req.originalUrl.indexOf(referer) === 0) {
                includeIframeTag = true;
              }

              ch = req.originalUrl;
              ch = ch.indexOf("//") === 0 ? ch.replace(/^\/\//, "/") : ch;
            } else {
              includeIframeTag = true;

              // Auto Ch
              if (req.originalUrl === "/") {
                ch = referer;

                // Extension
              } else if (req.originalUrl !== "/") {
                ch = referer;

                // User Input Ch
              } else {
                ch = referer;
              }
            }

            // ポータルにアクセス
          } else {
            ch = req.originalUrl.replace(`/${conf.domain}`, "");
            includeIframeTag = false;
          }

          hasSlash = ch.lastIndexOf("/") === ch.length - 1;

          res.render("portal/", {
            includeIframeTag,
            ch,
            hasSlash,
            language,
            domain: conf.domain,
            clientURL: conf.clientURL,
            assetsURL: conf.assetsURL,
            apiURL: conf.apiURL,
            apiAccessURL: conf.apiAccessURL,
          });
        }
        break;
      case conf.transactionURL:
        console.log("TRANSACTION");
        break;
      case conf.clientURL:
        // CORSを許可する
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendFile(conf.serverClientPath);
        break;
      case conf.assetsURL:
        if (req.originalUrl === "/manifest.json") {
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }

        res.sendFile(conf.serverAssetsPath + req.originalUrl.replace("/", ""));
        break;
      case conf.sessionURL:
        const proccess = req._parsedUrl.pathname.split("/");

        if (proccess.length > 0 && proccess[1] !== "favicon.ico") {
          const socialName = proccess[1];
          const methodType = proccess[2].charAt(0).toUpperCase() + proccess[2].slice(1);
          const uid = req.query.u;
          const refererCh = req.query.c;

          if (socialName && methodType) {
            this.session[socialName + methodType](req, res, next, uid, refererCh);
          } else {
            res.redirect(`https://${conf.domain}`);
          }
        } else {
          res.redirect(`https://${conf.domain}`);
        }
        break;
      default:
        res.redirect(`https://${conf.domain}`);
        break;
    }
  }

  listenedHttps() {
    console.log(`@@@ LISTEN HTTPS ${define.PORTS.HTTPS}`);
  }

  listenGet() {}

  listenPost() {}
}

export default Express;
