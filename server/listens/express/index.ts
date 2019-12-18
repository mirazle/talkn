import http from "http";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import define from "common/define";
import Session from "server/listens/express/session/";
import Mail from "server/logics/Mail";
import Geolite from "server/logics/Geolite";
import conf from "server/conf";

class Express {
  httpApp: any;
  httpsApp: any;
  session: any;
  constructor() {
    this.httpApp = express();
    this.httpsApp = express();
    this.httpsApp.set("view engine", "ejs");
    this.httpsApp.set("views", conf.serverPath);
    this.httpsApp.set("trust proxy", true);
    this.httpsApp.use(bodyParser.urlencoded({ extended: true }));
    this.httpsApp.use(compression());

    this.session = new Session(this.httpsApp);

    this.listenedHttp = this.listenedHttp.bind(this);
    this.listenedHttps = this.listenedHttps.bind(this);
    this.routingHttps = this.routingHttps.bind(this);
  }

  /***************************/
  /* HTTP(Redirect to HTTPS) */
  /***************************/

  createHttpServer() {
    http
      .createServer(this.httpApp.all("*", this.routingHttp))
      .listen(define.PORTS.HTTP, this.listenedHttp);
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
      case conf.extURL:
        if (req.originalUrl === "/") {
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
          res.sendFile(conf.serverExtPath + "ext.js");
        } else {
          res.sendFile(conf.serverExtPath + req.originalUrl.replace("/", ""));
        }
        break;
      case conf.wwwURL:
        language =
          req.query && req.query.lang
            ? req.query.lang
            : Geolite.getLanguage(req);
        if (req.method === "GET") {
          if (
            req.url === "/" ||
            (req.url && req.url.indexOf("/?lang=") === 0)
          ) {
            console.log(conf.domain);
            console.log(conf.wwwURL);
            console.log(conf.extURL);
            console.log(conf.assetsURL);
            console.log(conf.clientURL);
            res.render("www/", {
              language,
              domain: conf.domain,
              wwwURL: conf.wwwURL,
              extURL: conf.extURL,
              assetsURL: conf.assetsURL,
              clientURL: conf.clientURL
            });
          } else {
            res.sendFile(`${conf.serverWwwPath}${req.url.replace("/", "")}`);
          }
        } else if (req.method === "POST") {
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
        let connection = "/";
        let hasSlash = false;
        language =
          req.query && req.query.lang
            ? req.query.lang
            : Geolite.getLanguage(req);

        if (
          req.originalUrl === "/robots.txt" ||
          req.originalUrl === "/manifest.json" ||
          req.originalUrl === "/portal_sw.js"
        ) {
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
          res.sendFile(
            conf.serverPortalPath + req.originalUrl.replace("/", "")
          );
          return true;
        }

        // No Assests Url
        if (`/${req.originalUrl}/` !== conf.assetsPath) {
          portalUrlSearch =
            req.originalUrl.indexOf(`https://${conf.domain}`) !== false;

          /*
          MultiConnectionBootはreq.originalUrlのpathnameで配列形式でリクエストを受け付ける
        */

          // ポータル以外からアクセス
          if (req.headers.referer) {
            const referer = req.headers.referer
              .replace("https:/", "")
              .replace("http:/", "");

            // www.talkn.ioからアクセス
            if (referer.indexOf("/" + conf.wwwURL) === 0) {
              // www.talkn.ioでの<script呼び出しの場合
              if (req.originalUrl.indexOf(referer) === 0) {
                includeIframeTag = true;
              }

              connection = req.originalUrl;
              connection =
                connection.indexOf("//") === 0
                  ? connection.replace(/^\/\//, "/")
                  : connection;
            } else {
              includeIframeTag = true;

              // Auto Connection
              if (req.originalUrl === "/") {
                connection = referer;

                // Extension
              } else if (req.originalUrl !== "/") {
                connection = referer;

                // User Input Connection
              } else {
                connection = referer;
              }
            }

            // ポータルにアクセス
          } else {
            connection = req.originalUrl.replace(`/${conf.domain}`, "");
            includeIframeTag = false;
          }

          hasSlash = connection.lastIndexOf("/") === connection.length - 1;

          res.render("portal/", {
            includeIframeTag,
            connection,
            hasSlash,
            language,
            domain: conf.domain,
            clientURL: conf.clientURL,
            assetsURL: conf.assetsURL
          });
        }
        break;
      case conf.transactionURL:
        console.log("TRANSACTION");
        break;
      case conf.clientURL:
        // CORSを許可する
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.sendFile(conf.serverClientPath);
        break;
      case conf.assetsURL:
        if (req.originalUrl === "/manifest.json") {
          // CORSを許可する
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
        }

        res.sendFile(conf.serverAssetsPath + req.originalUrl.replace("/", ""));
        break;
      case conf.sessionURL:
        const proccess = req._parsedUrl.pathname.split("/");

        if (proccess.length > 0 && proccess[1] !== "favicon.ico") {
          const socialName = proccess[1];
          const methodType =
            proccess[2].charAt(0).toUpperCase() + proccess[2].slice(1);
          const uid = req.query.u;
          const refererConnection = req.query.c;

          if (socialName && methodType) {
            this.session[socialName + methodType](
              req,
              res,
              next,
              uid,
              refererConnection
            );
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
