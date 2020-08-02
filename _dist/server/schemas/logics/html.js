"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Thread_1 = __importDefault(require("api/store/Thread"));
class Html {
    constructor(params) {
        const findType = params && params.findType ? params.findType : Thread_1.default.findTypeHtml;
        const ogpImage = conf_1.default.ogpImages[findType] ? conf_1.default.ogpImages[findType] : conf_1.default.ogpImages[Thread_1.default.findTypeHtml];
        return {
            protocol: { type: String, default: Sequence_1.default.TALKN_PROTOCOL },
            contentType: { type: String, default: "talkn/ch" },
            serverMetas: {
                title: { type: String, default: "talkn" },
                keywords: { type: String, default: "talkn, blockchain, art, internet" },
                description: { type: String, default: conf_1.default.description },
                "og:type": { type: String, default: "" },
                "og:title": { type: String, default: "talkn" },
                "og:image": { type: String, default: ogpImage },
                "og:description": { type: String, default: conf_1.default.description },
                "og:locale": { type: String, default: "" },
                "fb:app_id": { type: String, default: "" },
                "fb:page_id": { type: String, default: "" },
                "twitter:app:country": { type: String, default: "" },
                "twitter:card": { type: String, default: "" },
                "twitter:title": { type: String, default: "" },
                "twitter:description": { type: String, default: "" },
                "twitter:site": { type: String, default: "" },
                "twitter:image": { type: String, default: "" },
                "twitter:app:name:iphone": { type: String, default: "" },
                "twitter:app:id:iphone": { type: String, default: "" },
                "twitter:app:url:iphone": { type: String, default: "" },
                "twitter:app:name:googleplay": { type: String, default: "" },
                "twitter:app:id:googleplay": { type: String, default: "" },
                "twitter:app:url:googleplay": { type: String, default: "" },
                "al:ios:app_name": { type: String, default: "" },
                "al:ios:app_store_id": { type: String, default: "" },
                "al:ios:url": { type: String, default: "" },
                "al:android:app_name": { type: String, default: "" },
                "al:android:app_store_id": { type: String, default: "" },
                "al:android:package": { type: String, default: "" },
                "al:android:url": { type: String, default: "" }
            },
            links: { type: [], default: [] },
            h1s: { type: [], default: [] },
            iframes: { type: [], default: [] },
            audios: { type: [], default: [] },
            videos: { type: [], default: [] }
        };
    }
}
exports.default = Html;
//# sourceMappingURL=html.js.map