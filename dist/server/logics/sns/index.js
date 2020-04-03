"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Twitter_1 = __importDefault(require("server/logics/sns/Twitter"));
const Facebook_1 = __importDefault(require("server/logics/sns/Facebook"));
class Sns {
    constructor() {
        this.twitter = new Twitter_1.default();
        this.facebook = new Facebook_1.default();
    }
    getSessionSetting(params = {}) {
        return Object.assign({
            secret: "reply-analyzer",
            resave: false,
            saveUninitialized: false
        }, params);
    }
    getAuthStart(loginType, passport) {
        return (req, res, next) => {
            if (req.query.url) {
                passport.st = passport[`${loginType}Strategy`];
                passport.referer = req.query.url;
                passport.authenticate(loginType, {
                    callbackURL: `/auth/${loginType}/callback`
                })(req, res, next);
                return true;
            }
            else {
                res.send("Bad Request.");
                return false;
            }
        };
    }
    getAuthCallback(loginType, passport) {
        return (passport.authenticate(loginType, { failureRedirect: "/login" }),
            (req, res) => {
                passport.loginType = loginType;
                const st = passport[`${loginType}Strategy`];
                const oauth = st._oauth2 ? st._oauth2 : st._oauth;
                oauth.getProtectedResource;
                res.redirect(passport.referer);
                return passport;
            });
    }
}
exports.default = Sns;
//# sourceMappingURL=index.js.map