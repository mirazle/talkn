import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import http from 'http';
import https from 'https';
import multer from 'multer';

import define from 'common/define';
import commonUtil from 'common/util';

import conf from 'server/conf';
import * as CoverLogics from 'server/listens/express/cover/logics';
import Logics from 'server/logics';
import Geolite from 'server/logics/Geolite';
import Mail from 'server/logics/Mail';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = file.originalname;
    const path = Logics.fs.mkdirAssetsCover(userId);
    cb(null, path);
  },

  filename: (req, file, cb) => {
    //    const extArray = file.mimetype.split('/');
    //    const extension = extArray[extArray.length - 1];
    //    cb(null, `${file.fieldname}.${extension}`);
    cb(null, file.fieldname);
  },
});

const uploadImage = multer({ storage }).fields([{ name: 'icon' }, { name: 'bg' }, { name: 'userId' }]);

const defaultCoverMethod = 'business';
const coverParams = {
  methodIndex: 2,
  storyIndex: 3,
};

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
    try {
      this.httpApp = express();
      this.httpApp.use(sessionSetting);
      this.httpsApp = express();
      this.httpsApp.set('view engine', 'ejs');
      this.httpsApp.set('views', conf.serverPath);

      this.httpsApp.set('trust proxy', true);
      this.httpsApp.use(bodyParser.urlencoded({ extended: false }));
      this.httpsApp.use(
        compression({
          filter: (req, res) => {
            if (req.headers['content-type']) {
              return req.headers['content-type'].includes('javascript') || req.headers['content-type'].includes('image');
            }
            return false;
          },
        })
      );
      this.httpsApp.use(sessionSetting);

      this.listenedHttp = this.listenedHttp.bind(this);
      this.listenedHttps = this.listenedHttps.bind(this);
      this.routingHttps = this.routingHttps.bind(this);
    } catch (e) {
      console.warn(e);
    }
  }

  /***************************/
  /* HTTP(Redirect to HTTPS) */
  /***************************/

  createHttpServer() {
    http.createServer(this.httpApp.all('*', this.routingHttp)).listen(define.PORTS.HTTP, this.listenedHttp);
  }

  routingHttp(req, res) {
    console.log('routingHttp', req.header.host);
    res.redirect(`https://${req.hostname}${req.url}`);
  }

  listenedHttp() {
    console.log(`@@@ LISTEN HTTP ${define.PORTS.HTTP}`);
  }

  /************************ **/
  /* HTTPS                   */
  /***************************/

  createHttpsServer() {
    https.createServer(conf.sslOptions, this.httpsApp.all('*', this.routingHttps)).listen(define.PORTS.HTTPS, this.listenedHttps);
  }

  routingHttps(req, res, next) {
    try {
      const splitedUrl = req.originalUrl.split('/');
      let language = 'en';
      let ch = '/';
      console.log('routingHttps', req.headers.host);
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
        case conf.authURL:
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.sendFile(conf.serverApiPath + define.talknApiJs);
          break;
        case conf.bannerURL:
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.sendFile(conf.serverApiPath + define.talknApiJs);
          break;
        case conf.apiURL:
          if (req.url === `/v${conf.apiVer}`) {
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
        case conf.tuneURL:
          if (req.originalUrl === '/') {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.sendFile(conf.serverTunePath + conf.files.tune);
          } else {
            res.send('404');
          }
          break;
        case conf.extURL:
          if (req.originalUrl === '/') {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.sendFile(conf.serverExtPath + conf.files.ext);
          } else {
            res.sendFile(conf.serverExtPath + req.originalUrl.replace('/', ''));
          }
          break;
        case conf.componentsURL:
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

          if (req.originalUrl.indexOf('.png') >= 0 || req.originalUrl.indexOf('.svg') >= 0) {
            res.sendFile(conf.serverComponentsPath + '.' + req.originalUrl);
          } else {
            res.sendFile(conf.serverComponentsPath + 'talkn.components.js');
          }
          break;
        case conf.coverURL:
          let method = defaultCoverMethod;

          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          if (req.method === 'POST') {
            method = splitedUrl[2] ? splitedUrl[2] : splitedUrl[1];

            if (req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
              uploadImage(req, res, async (err) => {
                if (err) throw err;
                const key = Object.keys(req.files)[0];
                await CoverLogics[method](req.body.userId, req.files[key][0].path, req, res);
              });
            }

            if (Object.keys(req.body)[0]) {
              const requestJson = JSON.parse(Object.keys(req.body)[0]);
              if (CoverLogics[method]) {
                CoverLogics[method](requestJson, req, res);
              }
            }
          } else if (req.method === 'GET') {
            if (
              req.originalUrl === '/robots.txt' ||
              req.originalUrl === '/manifest.json' ||
              req.originalUrl === '/service.worker.js' ||
              req.originalUrl === '/ws.client.worker.js' ||
              req.originalUrl === '/web.config' ||
              req.originalUrl === '/talkn.cover.js' ||
              req.originalUrl === '/ws.api.worker.js' ||
              req.originalUrl === '/favicon.ico'
            ) {
              res.sendFile(conf.serverCoverPath + req.originalUrl.replace(/^\//, ''));
            } else {
              const splitedPath = req._parsedUrl.pathname.split('/');
              const getJson = req._parsedUrl.query;
              const method = splitedPath[1] !== '' ? splitedPath[1] : 'top';
              const params = splitedPath.filter((value) => value !== '' && value !== method);

              if (CoverLogics[method]) {
                CoverLogics[method](params, getJson, req, res);
              }
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
                componentsURL: conf.componentsURL,
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
            if (req.originalUrl.indexOf('/https:/') >= 0 || req.originalUrl.indexOf('/http:/') >= 0) {
              const redirectUrl = req.originalUrl.replace('/https:/', '').replace('/http:/', '');
              res.redirect(redirectUrl);
              return true;
            }

            portalUrlSearch = req.originalUrl.indexOf(`https://${conf.domain}`) !== false;

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
              componentsURL: conf.componentsURL,
              assetsURL: conf.assetsURL,
              apiURL: conf.apiURL,
              apiAccessURL: conf.apiAccessURL,
            });
          }
          break;
        case conf.transactionURL:
          break;
        case conf.clientURL:
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

          if (req.originalUrl.indexOf('.png') >= 0) {
            res.sendFile(conf.serverClientPath + '.' + req.originalUrl);
          } else {
            res.sendFile(conf.serverClientJsPath);
          }

          break;
        case conf.assetsURL:
          console.log('ASSETS', req.originalUrl);
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
    } catch (e) {
      console.warn(e);
    }
  }

  listenedHttps() {
    console.log(`@@@ LISTEN HTTPS ${define.PORTS.HTTPS}`);
  }
}

export default Express;
