/* 
    const ws = new Ws();
    GlobalWindow.TalknMedia = new Media(ws);
    GlobalWindow.TalknMedia.searching();
*/
export default class Media {
  static get mediaSecondInterval() {
    return 200;
  }
  static getMedia(thread) {
    const src = Thread.getMediaSrc(thread);
    const tagType = Thread.getMediaTagType(thread);
    return window.top.document.querySelector(`${tagType}[src='${src}']`);
  }
  static getClientToRequestObj(method, params = {}) {
    return {
      type: PostMessage.MEDIA_TO_CLIENT_TYPE,
      method: method,
      params: params,
    };
  }
  constructor(ws) {
    if (ws) {
      this.ws = ws;
      this.ch = ws.store.getState().thread.ch;

      // controls.
      this.searchingCnt = 0;
      this.playingCnt = 0;
      this.pointerTime = 0;
      this.started = false;
      this.isPosting = false;

      clearInterval(this.searchingId);
      clearInterval(this.playIntervalId);

      // timeline datas.
      this.postsTimeline = [];
      this.postsTimelineStock = [];

      // methods.
      this.setPostsTimelines = this.setPostsTimelines.bind(this);
      this.refrectSelfPost = this.refrectSelfPost.bind(this);
      this.searching = this.searching.bind(this);
      this.handleEvents = this.handleEvents.bind(this);
      this.posting = this.posting.bind(this);
      this.apiTo = this.apiTo.bind(this);
      this.log = this.log.bind(this);
    }
  }

  setStatus(status) {
    this.status = status;
    this.log("SET STATUS");
  }

  setPostsTimelines({ postsTimeline, postsTimelineStock }) {
    // 現在表示されているタイムライン状態
    this.postsTimeline = [...postsTimeline];

    // 0秒投稿のタイムライン状態
    this.postsTimelineStock = [...postsTimelineStock];

    this.log("INIT TIMELINES");
  }

  refrectSelfPost(post) {
    const length = this.postsTimeline.length;
    let pushFlg = false;
    for (let i = 0; i < length; i++) {
      if (post.currentTime < this.postsTimeline[i].currentTime) {
        pushFlg = true;
        this.postsTimeline.splice(i, 0, post);
      }
    }

    if (!pushFlg) {
      this.postsTimeline.push(post);
    }
  }

  get currentTime() {
    return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
  }

  searching(second = Media.mediaSecondInterval) {
    this.setStatus("searching");
    this.searchingCnt = 0;
    this.searchingId = null;
    this.waitingId = null;
    this.playIntervalId = null;
    this.searchingId = setInterval(() => {
      if (this.searchingCnt < this.maxSearchingCnt) {
        const videos = window.top.document.querySelectorAll("video");
        const audios = window.top.document.querySelectorAll("audio");
        videos.forEach(this.handleEvents);
        audios.forEach(this.handleEvents);
        if (videos.length > 0 || audios.length > 0) {
          this.setStatus("waiting");
          clearInterval(this.searchingId);
          clearInterval(this.playIntervalId);
        } else {
          this.searchingCnt++;
        }
      } else {
        clearInterval(this.searchingId);
        clearInterval(this.playIntervalId);
        this.searching(Media.mediaSecondInterval * 10);
      }
    }, second);
  }

  handleEvents(media) {
    media.addEventListener("play", (e) => {
      this.file = e.srcElement;
      const mediaCh = ClientUtil.deleteProtcol(this.file.currentSrc) + "/";

      // 見ているchがmediaChの場合
      if (this.ch === mediaCh) {
        if (this.playingCnt === 0) {
          this.setPostsTimelines(this.ws.store.getState());
        }
        this.playing();

        // 見ているchがmediaChでなく、mediaの再生を始めた場合
      } else {
        this.setStatus("finding");
        this.ch = mediaCh;
        this.ws.onResponseChAPI(this.ch);
        this.ws.exe("changeThread", { thread: { ch: this.ch } });
      }
    });

    media.addEventListener("seeked", (e) => {
      this.setStatus("seeking");
    });

    media.addEventListener("pause", (e) => {
      this.setStatus("waiting");
    });

    media.addEventListener("ended", (e) => {
      this.setStatus("waiting");
      clearInterval(this.playIntervalId);
      const currentTime = Number.MAX_SAFE_INTEGER;
      const length = this.postsTimelineStock.length;
      for (let i = 0; i < length; i++) {
        if (this.postsTimelineStock[i] && this.postsTimelineStock[i].currentTime <= currentTime) {
          this.apiTo("NEXT_POSTS_TIMELINE", { postsTimeline: [this.postsTimelineStock[i]] });
        } else {
          break;
        }
      }
      this.setStatus("waiting");
    });
  }

  playing() {
    this.setStatus("playing");
    clearInterval(this.playIntervalId);
    this.playIntervalId = setInterval(() => {
      this.posting(this.currentTime);
    }, conf.mediaSecondInterval);
  }

  /**
   * メディアファイルの投稿を管理するメソッド
   * パラメータを与えて直接実行も可能(拡張機能から間接的に実行する)
   */
  posting(pointerTime = 0) {
    if (this.isPosting) return;
    const timelineLength = this.postsTimelineStock.length;
    this.playingCnt++;
    this.isPosting = true;

    // Timeline is next.
    if (this.pointerTime <= pointerTime) {
      this.pointerTime = pointerTime;
      while (this.isPosting) {
        if (timelineLength === 0) {
          this.isPosting = false;
        } else if (this.postsTimelineStock[0] && this.postsTimelineStock[0].currentTime <= pointerTime) {
          const addPost = this.postsTimelineStock.shift();
          this.apiTo("NEXT_POSTS_TIMELINE", { postsTimeline: [addPost] });
          this.log("POSTING");
        } else {
          this.isPosting = false;
          break;
        }
      }
      // Timeline is prev.
    } else {
      // prev.
      this.file.pause();

      const postsTimelineAll = this.ws.store.getState().postsTimeline.concat(this.postsTimelineStock);
      const length = postsTimelineAll.length;
      this.pointerTime = this.currentTime;
      this.postsTimeline = new PostsTimeline();
      this.postsTimelineStock = new PostsTimelineStock();

      for (let i = 0; i < length; i++) {
        const post = postsTimelineAll[i];
        if (post.currentTime <= this.pointerTime) {
          this.postsTimeline.push(post);
        } else {
          this.postsTimelineStock.push(post);
        }
      }

      // 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
      this.apiTo("CLEAR_POSTS_TIMELINE", {
        postsTimeline: this.postsTimeline,
        postsTimelineStock: this.postsTimelineStock,
      });

      this.isPosting = false;
      this.file.play();
    }
  }

  apiTo(method, params = {}) {
    this.ws.store.dispatch({ type: method, ...params });
  }

  log(label, isForce = false) {
    if (this.isLog || isForce) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} CH ${this.ch} ${this.pointerTime} @@@`);
      console.log(`postsTimeline: ${this.postsTimeline.length} postsTimelineStock: ${this.postsTimelineStock.length}`);
      console.log(this.postsTimeline);
      console.log(this.postsTimelineStock);
    }
  }
}
