"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("client/conf/"));
const Schema_1 = __importDefault(require("api/store/Schema"));
class Post extends Schema_1.default {
    constructor(params) {
        super();
        this.ch = Post.defaultValues.ch;
        this.chs = Post.defaultValues.chs;
        this.favicon = Post.defaultValues.favicon;
        this.findType = Post.defaultValues.findType;
        this.layer = Post.defaultValues.layer;
        this.post = Post.defaultValues.post;
        this.protocol = Post.defaultValues.protocol;
        this.stampId = Post.defaultValues.stampId;
        this.title = Post.defaultValues.title;
        this.liveCnt = Post.defaultValues.liveCnt;
        this.uid = Post.defaultValues.uid;
        this.utype = Post.defaultValues.utype;
        this.dispFlg = Post.defaultValues.dispFlg;
        this.data = Post.defaultValues.data;
        this.createTime = Post.defaultValues.createTime;
        this.currentTime = Post.defaultValues.currentTime;
        this.updateTime = Post.defaultValues.updateTime;
        const values = params ? { ...Post.defaultValues, ...params } : Post.defaultValues;
        return this.create(values);
    }
    static get defaultFindId() {
        return "000000000000000000000000";
    }
    static get defaultValues() {
        return {
            ch: "/",
            chs: ["/"],
            favicon: conf_1.default.defaultFavicon,
            findType: "Html",
            layer: 1,
            post: "",
            protocol: "https:",
            stampId: 0,
            title: "talkn",
            liveCnt: 0,
            uid: "",
            utype: "",
            dispFlg: true,
            data: null,
            createTime: new Date(),
            currentTime: new Date(),
            updateTime: new Date(),
        };
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map