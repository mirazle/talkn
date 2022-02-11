import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import http from 'http';
import https from 'https';
import { decode } from 'punycode';

/*
import passport from 'passport';
import googleStrategy from 'passport-google-oauth20';
import passportLocal from 'passport-local';
*/
import define from 'common/define';

import conf from 'server/conf';
import * as CoverLogics from 'server/listens/express/cover/logics';
import Geolite from 'server/logics/Geolite';
import Mail from 'server/logics/Mail';

const CLIENT_ID = '429873683760-v2hk18nua5vgf37ae0ovuhfbdrmah42d.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

async function verify(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });
  return ticket.getPayload();
}

/*
const GoogleStrategy = googleStrategy.Strategy;
const LocalStrategy = passportLocal.Strategy;
*/
const defaultCoverMethod = 'business';
const coverParams = {
  methodIndex: 2,
  creatorsIndex: 3,
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
    this.httpApp = express();
    this.httpApp.use(sessionSetting);
    this.httpsApp = express();
    this.httpsApp.set('view engine', 'ejs');
    this.httpsApp.set('views', conf.serverPath);
    this.httpsApp.set('trust proxy', true);
    this.httpsApp.use(bodyParser.urlencoded({ extended: true }));
    this.httpsApp.use(compression());
    this.httpsApp.use(sessionSetting);

    /*
    this.httpsApp.use(passport.initialize());
    this.httpsApp.use(passport.session());
*/
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
    let ch = '/';
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
      case conf.tuneURL:
        if (req.originalUrl === '/') {
          // CORSを許可する
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.sendFile(conf.serverTunePath + conf.files.tune);
        } else {
          res.send('404');
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
      case conf.componentsURL:
        // CORSを許可する
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        if (req.originalUrl.indexOf('.png') >= 0) {
          res.sendFile(conf.serverComponentsPath + '.' + req.originalUrl);
        } else {
          res.sendFile(conf.serverComponentsPath);
        }

        break;
      case conf.coverURL:
        const splitedUrl = req.originalUrl.split('/');
        let creatorsIndex = null;
        let domainProfile;
        let method = defaultCoverMethod;
        if (splitedUrl.length === 2) {
          method = splitedUrl[1] === '' ? defaultCoverMethod : splitedUrl[1];
        } else {
          ch = splitedUrl[1] ? `/${splitedUrl[1]}/` : '/';
          method = splitedUrl[coverParams.methodIndex] ? splitedUrl[coverParams.methodIndex] : defaultCoverMethod;
          creatorsIndex = splitedUrl[coverParams.creatorsIndex] ? splitedUrl[coverParams.creatorsIndex] : null;
        }

        if (req.method === 'POST') {
          if (req.body.credential) {
            verify(req.body.credential)
              .then(async (payload) => {
                console.log('@^@^', payload);
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                domainProfile = await CoverLogics.getDomainProfile(req, res, req.protocol, ch, language, undefined, method === 'tag');
                res.render('cover/', { ...domainProfile, payload });
              })
              .catch(console.error);
          } else {
            delete req.body.ch;
            const json = JSON.stringify(req.body, null, 2);
            res.setHeader('Content-disposition', 'attachment; filename=talkn.config.json');
            res.setHeader('Content-type', 'application/json');
            res.send(json);
          }
        } else if (req.method === 'GET') {
          if (
            req.originalUrl.indexOf('.svg') >= 0 ||
            req.originalUrl.indexOf('.png') >= 0 ||
            req.originalUrl.indexOf('.js') >= 0 ||
            req.originalUrl.indexOf('favicon.ico') >= 0 ||
            req.originalUrl.indexOf('.txt') >= 0
          ) {
            CoverLogics.assets(req, res);
          } else if (req.originalUrl.indexOf('/undefined') >= 0) {
            res.send('404');
          } else if (req.headers.accept.indexOf('text/html,application/') === 0 || req.headers.accept.indexOf('*/*') === 0) {
            console.log('@@@@', method);
            const resolveCover = async () => {
              switch (method) {
                case 'business':
                case 'tag':
                  res.header('Access-Control-Allow-Origin', '*');
                  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                  domainProfile = await CoverLogics.getDomainProfile(req, res, req.protocol, ch, language, undefined, method === 'tag');
                  res.render('cover/', domainProfile);
                  break;
                case 'tagJson':
                case 'businessJson':
                  res.header('Access-Control-Allow-Origin', '*');
                  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                  domainProfile = await CoverLogics.getDomainProfile(req, res, req.protocol, ch, language, undefined, method === 'tagJson');
                  res.json(domainProfile);
                  break;
                case 'story':
                  res.header('Access-Control-Allow-Origin', '*');
                  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                  domainProfile = await CoverLogics.getDomainProfile(req, res, req.protocol, ch, language, creatorsIndex);
                  res.render('cover/', domainProfile);
                  break;
                case 'storyJson':
                  res.header('Access-Control-Allow-Origin', '*');
                  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                  domainProfile = await CoverLogics.getDomainProfile(req, res, req.protocol, ch, language, creatorsIndex);
                  res.json(domainProfile);
                  break;
                case 'build':
                  await CoverLogics.build(req, res, ch);
                  res.redirect(`//${conf.coverURL}${ch}`);
                  break;
                case 'updateConfig':
                  await CoverLogics.fetchConfig(req, res, req.protocol, ch);
                  res.redirect(`//${conf.coverURL}${ch}`);
                  break;
                default:
                  res.end();
              }
            };

            resolveCover();
          } else {
            res.end();
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
