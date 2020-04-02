"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const conf_1 = __importDefault(require("server/conf"));
class Passport {
    static get TWITTER_CONSUMER_KEY() {
        return "gPahl00kmAjRVndFFAZY4lC9K";
    }
    static get TWITTER_CONSUMER_SECRET() {
        return "slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75";
    }
    constructor(app) {
    }
    twitterAuth(req, res, next, uid, ch) {
        console.log("START TWITTER AUTH!!!");
        passport_1.default.authenticate("twitter")(req, res, next);
    }
    twitterFetchToken(token, tokenSecret, profile, done) {
        console.log(profile);
        console.log("twitterFetchToken");
    }
    twitterCallback(req, res, next, uid, ch) {
        passport_1.default.authenticate("twitter", { failureRedirect: "/" })(req, res, next);
        res.redirect(`https://${conf_1.default.domain}`);
    }
}
exports.default = Passport;
//# sourceMappingURL=index.js.map