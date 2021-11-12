import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import http from 'http';
import https from 'https';

import define from 'common/define';

import conf from 'server/conf';
import Session from 'server/listens/express/session/';
import Logics from 'server/logics';
import Geolite from 'server/logics/Geolite';
import Mail from 'server/logics/Mail';

const sessionSetting = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'lax',
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
    this.httpsApp.set('view engine', 'ejs');
    this.httpsApp.set('views', conf.serverPath);
    this.httpsApp.set('trust proxy', true);
    this.httpsApp.use(bodyParser.urlencoded({ extended: true }));
    this.httpsApp.use(compression());
    this.httpsApp.use(sessionSetting);

    // this.httpsApp.use(authFunc);
    // this.session = new Session(this.httpsApp);

    this.listenedHttp = this.listenedHttp.bind(this);
    this.listenedHttps = this.listenedHttps.bind(this);
    this.routingHttps = this.routingHttps.bind(this);
  }

  /***************************/
  /* HTTP(Redirect to HTTPS) */
  /***************************/

  createHttpServer() {
    http.createServer(this.httpApp.all('*', this.routingHttp)).listen(define.PORTS.HTTP, this.listenedHttp);
  }

  routingHttp(req, res) {
    res.redirect(`https://${req.hostname}${req.url}`);
  }

  listenedHttp(): void {}

  /***************************/
  /* HTTPS                   */
  /***************************/

  createHttpsServer() {
    https.createServer(conf.sslOptions, this.httpsApp.all('*', this.routingHttps)).listen(define.PORTS.HTTPS, this.listenedHttps);
  }

  routingHttps(req, res, next) {
    let language = 'en';
    switch (req.headers.host) {
      case conf.ownURL:
        if (req.method === 'GET') {
          if (req.url === '/' || (req.url && req.url.indexOf('/?lang=') === 0)) {
            language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);
            const favicon =
              req.query && req.query.lang ? `https://${conf.assetsURL}/country/${language}.png` : `https://${conf.assetsURL}/favicon.ico`;

            res.render('own/', {
              lpLanguages: conf.lpLanguages,
              language,
              favicon,
              domain: conf.domain,
              apiURL: conf.apiURL,
              ownURL: conf.ownURL,
              wwwURL: conf.wwwURL,
              extURL: conf.extURL,
              newsURL: conf.newsURL,
              bannerURL: conf.bannerURL,
              assetsURL: conf.assetsURL,
              clientURL: conf.clientURL,
              apiAccessURL: conf.apiAccessURL,
            });
          } else {
            res.sendFile(conf.serverOwnPath + req.originalUrl.replace('/', ''));
          }
        } else if (req.method === 'POST') {
          Mail.send(req.body.inquiry);
          res.redirect(`https://${conf.ownURL}`);
        }
        break;
      case conf.bannerURL:
        // CORSを許可する
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.sendFile(conf.serverApiPath + define.talknApiJs);
        break;
      case conf.apiURL:
        if (req.url === `/v${conf.apiVer}`) {
          // CORSを許可する
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.sendFile(conf.serverApiPath + define.talknApiJs);
        } else {
          if (req.url === '/') {
            language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);
            res.render('api/', {
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
            res.sendFile(conf.serverApiPath + req.originalUrl.replace('/', ''));
          }
        }
        break;
      case conf.extURL:
        if (req.originalUrl === '/') {
          // CORSを許可する
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.sendFile(conf.serverExtPath + conf.files.ext);
        } else {
          res.sendFile(conf.serverExtPath + req.originalUrl.replace('/', ''));
        }
        break;
      case conf.coverURL:
        if (req.method === 'GET') {
          let ch = '/';
          let interviewIndex = undefined;
          const splitedUrl = req.originalUrl.split('/');
          const splitedUrlLength = splitedUrl.length;
          const isUpdate = splitedUrl[splitedUrlLength - 1] === 'update';

          if (splitedUrl[splitedUrlLength - 1] === '') {
            ch = req.originalUrl;
          } else {
            const lastSlash = req.originalUrl.lastIndexOf('/');
            ch = req.originalUrl.substr(0, lastSlash + 1);
            interviewIndex = req.originalUrl.substr(lastSlash + 1, lastSlash);
          }

          if (
            req.originalUrl.indexOf('.svg') >= 0 ||
            req.originalUrl === '/talkn.cover.js' ||
            req.originalUrl === '/robots.txt' ||
            req.originalUrl === '/manifest.json' ||
            req.originalUrl === '/service.worker.js' ||
            req.originalUrl === '/ws.client.worker.js' ||
            req.originalUrl === '/ws.api.worker.js'
          ) {
            // CORSを許可する
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.sendFile(conf.serverCoverPath + req.originalUrl.replace('/', ''));
            return true;
          } else if (isUpdate) {
            Logics.html.fetchCover(ch);
            console.log('UPDATE');
            /*
              ドメイン配下のtalkn/interview.index.jsonを取得
            		ドメイン配下のtalkn/interview.01.jsonを取得
		            	存在しない場合、assets.talkn.io/cover/{ch}の配下を探す

              		db.talkn.domainProfile取得してjson化、更新された判定(JSON化して付き合わせる)
              			更新されていた場合
                      db.talkn.domainProfileNextIndexを取得して、一番最後にdomainProfileの記事データを追加して保存
              					この時に重複するdomainProfileの記事があれば削除
						              db.talkn.domainProfileNextIndexを保存
            */
          } else {
            Logics.db.threads.findOne(ch, { buildinSchema: true }).then((result) => {
              const { index, interview, urls, css } = Logics.fs.getInterview(ch, interviewIndex);
              res.render('cover/', {
                language,
                index,
                interview,
                urls,
                css,
                thread: result.response,
                domain: conf.domain,
                apiURL: conf.apiURL,
                wwwURL: conf.wwwURL,
                coverURL: conf.coverURL,
                extURL: conf.extURL,
                assetsURL: conf.assetsURL,
                clientURL: conf.clientURL,
                apiAccessURL: conf.apiAccessURL,
              });
            });
          }
        }
        break;
      case conf.wwwURL:
        language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);
        if (req.method === 'GET') {
          if (req.url === '/' || (req.url && req.url.indexOf('/?lang=') === 0)) {
            res.render('www/', {
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
            res.sendFile(`${conf.serverWwwPath}${req.url.replace('/', '')}`);
          }
        } else if (req.method === 'POST') {
          Mail.send(req.body.inquiry);
          res.redirect(req.headers.referer + '#response');
        }
        break;
      case conf.descURL:
        res.render('desc/index', {});
        break;
      case conf.domain:
        let includeIframeTag = false;
        let portalUrlSearch = false;
        let ch = '/';
        let hasSlash = false;
        language = req.query && req.query.lang ? req.query.lang : Geolite.getLanguage(req);
        if (
          req.originalUrl === '/robots.txt' ||
          req.originalUrl === '/manifest.json' ||
          req.originalUrl === '/service.worker.js' ||
          req.originalUrl === '/ws.client.worker.js' ||
          req.originalUrl === '/web.config' ||
          req.originalUrl === '/ws.api.worker.js'
        ) {
          // CORSを許可する
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.sendFile(conf.serverPortalPath + req.originalUrl.replace('/', ''));
          return true;
        }

        // No Assests Url
        if (`/${req.originalUrl}/` !== conf.assetsPath) {
          /*
          if (req.originalUrl === '/' && !req.headers.referer) {
            res.redirect(`//${conf.wwwURL}`);
            return true;
          }
*/
          if (req.originalUrl.indexOf('/https:/') >= 0 || req.originalUrl.indexOf('/http:/') >= 0) {
            const redirectUrl = req.originalUrl.replace('/https:/', '').replace('/http:/', '');
            res.redirect(redirectUrl);
            return true;
          }

          portalUrlSearch = req.originalUrl.indexOf(`https://${conf.domain}`) !== false;

          /*
          MultiChBootはreq.originalUrlのpathnameで配列形式でリクエストを受け付ける
        */

          // ポータル以外からアクセス
          if (req.headers.referer) {
            const referer = req.headers.referer.replace('https:/', '').replace('http:/', '');

            // www.talkn.ioからアクセス
            if (referer.indexOf('/' + conf.wwwURL) === 0) {
              // www.talkn.ioでの<script呼び出しの場合
              if (req.originalUrl.indexOf(referer) === 0) {
                includeIframeTag = true;
              }

              ch = req.originalUrl;
              ch = ch.indexOf('//') === 0 ? ch.replace(/^\/\//, '/') : ch;
            } else {
              includeIframeTag = true;

              // Auto Ch
              if (req.originalUrl === '/') {
                ch = referer;
                // Extension
              } else if (req.originalUrl !== '/') {
                ch = referer;
                // User Input Ch
              } else {
                ch = referer;
              }
            }

            // ポータルにアクセス
          } else {
            ch = req.originalUrl.replace(`/${conf.domain}`, '');
            includeIframeTag = false;
          }
          hasSlash = ch.lastIndexOf('/') === ch.length - 1;

          res.render('portal/', {
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
        break;
      case conf.clientURL:
        // CORSを許可する
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        if (req.originalUrl.indexOf('.png') >= 0) {
          res.sendFile(conf.serverClientPath + '.' + req.originalUrl);
        } else {
          res.sendFile(conf.serverClientJsPath);
        }

        break;
      case conf.assetsURL:
        // CORSを許可する
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.sendFile(conf.serverAssetsPath + req.originalUrl.replace('/', ''));
        break;
      case conf.sessionURL:
        const proccess = req._parsedUrl.pathname.split('/');

        if (proccess.length > 0 && proccess[1] !== 'favicon.ico') {
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
}

export default Express;
