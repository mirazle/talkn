"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_twitter_1 = __importDefault(require("passport-twitter"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
class Passport {
    static get FB_CLIENT_ID() {
        return "1655931587827697";
    }
    static get FB_CLIENT_SECRET() {
        return "64c9192a5ea216be390f990eb2365fa6";
    }
    static get FB_CALLBACK_URL() {
        return "https://talkn.io:8443/auth/facebook/callback";
    }
    static get TW_CONSUMER_KEY() {
        return "gPahl00kmAjRVndFFAZY4lC9K";
    }
    static get TW_CONSUMER_SECRET() {
        return "slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75";
    }
    static get TW_CALLBACK_URL() {
        return "https://talkn.io:8443/auth/twitter/callback";
    }
    serializeUser(user, callback) {
        callback(null, user);
    }
    deserializeUser(obj, callback) {
        callback(null, obj);
    }
    getFacebookStrategy() {
        return new passport_facebook_1.default({
            clientID: Passport.FB_CLIENT_ID,
            clientSecret: Passport.FB_CLIENT_SECRET,
            callbackURL: Passport.FB_CALLBACK_URL,
            enableProof: true
        }, (accessToken, refreshToken, profile, callback) => {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            process.nextTick(() => {
                return callback(null, profile);
            });
        });
    }
    getTwitterStrategy() {
        return new passport_twitter_1.default({
            consumerKey: Passport.TW_CONSUMER_KEY,
            consumerSecret: Passport.TW_CONSUMER_SECRET,
            callbackURL: Passport.TW_CALLBACK_URL
        }, (accessToken, refreshToken, profile, callback) => {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            process.nextTick(() => {
                return callback(null, profile);
            });
        });
    }
}
exports.default = Passport;
//# sourceMappingURL=Passport.js.map