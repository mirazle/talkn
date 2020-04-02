"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thread_1 = __importDefault(require("api/store/Thread"));
const conf_1 = __importDefault(require("client/conf"));
class TalknMedia {
    constructor() {
        this.intervalId = null;
        this.currentTime = 0;
        this.started = false;
        this.tasking = false;
        this.timeline = [];
        this.timelineBase = [];
        this.setTimeline = this.setTimeline.bind(this);
        this.startMedia = this.startMedia.bind(this);
        this.proccess = this.proccess.bind(this);
        this.endedFunc = this.endedFunc.bind(this);
    }
    static getMedia(thread) {
        const src = Thread_1.default.getMediaSrc(thread);
        const tagType = Thread_1.default.getMediaTagType(thread);
        return document.querySelector(`${tagType}[src='${src}']`);
    }
    static init(called) {
        if (!window.talknMedia) {
            window.talknMedia = this;
        }
        window.talknMedia.timeline = [];
        window.talknMedia.timelineBase = [];
        window.talknMedia.intervalId = null;
    }
    setTimeline(timeline = []) {
        this.timeline = timeline;
        this.timelineBase = [...timeline];
    }
    startMedia(media) {
        media.addEventListener("ended", this.endedFunc);
        this.intervalId = setInterval(() => {
            if (media && !media.paused) {
                this.proccess(media.currentTime);
            }
        }, conf_1.default.mediaSecondInterval);
    }
    getCurrentTime(currentTime, base = 10) {
        return Math.floor(currentTime * base) / base;
    }
    endedFunc() {
        const currentTime = Number.MAX_SAFE_INTEGER;
        const timeline = this.timeline;
        const length = this.timeline.length;
        console.log("END FUNC");
        for (let i = 0; i < length; i++) {
            if (timeline[i] && timeline[i].currentTime <= currentTime) {
                window.talknWindow.parentCoreApi("nextPostsTimeline", [timeline[i]]);
            }
            else {
                break;
            }
        }
    }
    proccess(_currentTime = 0) {
        const log = false;
        const currentTime = this.getCurrentTime(_currentTime);
        if (this.tasking) {
            if (log)
                console.log("Tasking: " + currentTime);
            return false;
        }
        const timelineLength = this.timeline.length;
        this.started = true;
        this.tasking = true;
        if (log)
            console.log("@@@@ PROCCESS " + this.currentTime + " <= " + currentTime);
        if (this.currentTime <= currentTime) {
            this.currentTime = currentTime;
            if (log)
                console.log("@START WHILE " + this.currentTime);
            if (log && this.timeline && this.timeline[0] && timelineLength > 0)
                console.log("@ " + this.timeline[0].currentTime);
            while (this.tasking) {
                if (timelineLength === 0) {
                    this.tasking = false;
                }
                else if (this.timeline[0] && this.timeline[0].currentTime <= currentTime) {
                    const addPost = this.timeline.shift();
                    this.currentTime = addPost.currentTime;
                    window.talknWindow.parentCoreApi("nextPostsTimeline", [addPost]);
                }
                else {
                    this.tasking = false;
                    break;
                }
            }
        }
        else {
            if (log)
                console.log("@BACK " + currentTime);
            if (this.tasking) {
                const { postsTimeline } = window.talknWindow.apiState.getState();
                if (log)
                    console.log("@ BACK PROCCESS " + currentTime);
                if (log)
                    alert("BACK PROCCESS " + currentTime);
                this.currentTime = currentTime;
                window.talknWindow.parentCoreApi("clearPostsTimeline", currentTime);
                this.timeline = postsTimeline.concat(this.timelineBase).filter((pt, index, self) => {
                    if (self.indexOf(pt) === index) {
                        if (pt.currentTime > currentTime) {
                            return true;
                        }
                    }
                    return false;
                });
                if (log)
                    console.log(this.timeline);
                this.tasking = false;
            }
        }
    }
}
exports.default = TalknMedia;
//# sourceMappingURL=TalknMedia.js.map