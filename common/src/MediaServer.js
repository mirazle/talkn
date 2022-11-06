export default class MediaServer {
  get mediaSecondInterval() {
    return 200;
  }
  get currentTime() {
    return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
  }
  static get STATUS_SEARCH() {
    return 'SEARCH';
  }
  static get STATUS_STANBY() {
    return 'STANBY';
  }
  static get STATUS_PLAY() {
    return 'PLAY';
  }
  static get STATUS_ENDED() {
    return 'ENDED';
  }
  static get STATUS_STOP() {
    return 'STOP';
  }
  static get P_ORTAL_KEY() {
    return 'PORTAL';
  }
  static get CLIENT_KEY() {
    return 'CLIENT';
  }
  constructor() {
    console.log('BOOT MEDIA SERVER');
    // postMessage to iframe ids.
    this.init = this.init.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);

    // methods.
    this.setClientParams = this.setClientParams.bind(this);
    this.setRelationElms = this.setRelationElms.bind(this);
    this.searching = this.searching.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.ended = this.ended.bind(this);
    this.log = this.log.bind(this);

    this.init();
    this.setRelationElms();
    this.listenMessage();
  }

  listenMessage() {
    window.addEventListener('message', this.onMessage);
    window.addEventListener('messageerror', this.onError);
  }

  setStatus(status, called) {
    this.status = status;
    this.log('SET STATUS ' + called);
  }

  init() {
    this.ch = null;
    this.setStatus(MediaServer.STATUS_STANBY);
    // controls.
    this.iframes = {};
    this.audios = [];
    this.videos = [];
    this.handleEventSrc = [];
    this.file = null;
    this.searchingIds = {};
    this.maxSearchingCnt = 30;
    this.playIntervalId = null;
    this.searchingCnt = 0;
    this.isLog = false;

    window.removeEventListener('message', this.onMessage);
    window.removeEventListener('messageerror', this.onError);

    Object.keys(this.searchingIds).forEach((iFrameId) => {
      clearInterval(this.searchingIds[iFrameId]);
    });
    clearInterval(this.playIntervalId);
  }

  setRelationElms(id) {
    if (Object.keys(this.iframes).length === 0) {
      if (id === MediaServer.CLIENT_KEY) {
        this.iframes[id] = {
          dom: window,
          params: {
            id: '',
            ch: '',
            href: '',
            audios: [],
            videos: [],
          },
        };
      } else {
        const iframes = window.document.querySelectorAll(`.talknIframes`);
        iframes.forEach((iframe) => {
          if (iframe.id) {
            this.iframes[iframe.id] = {
              dom: iframe,
              params: {
                id: '',
                ch: '',
                href: '',
                audios: [],
                videos: [],
              },
            };
          } else {
            throw `Error: Please set iframe id.`;
          }
        });
      }
    }

    if (this.videos.length === 0) {
      this.videos = window.document.querySelectorAll('video');
    }
    if (this.audios.length === 0) {
      this.audios = window.document.querySelectorAll('audio');
    }
  }

  setClientParams(params) {
    if (params && params.id) {
      console.log(params.id, this.iframes[params.id]);
      this.iframes[params.id].params = params;
    }
  }

  onMessage(e) {
    if (e.data && e.data.type) {
      if (e.data.type === 'MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE') {
        const { method, params } = e.data;
        if (this.file && this.file[method] && typeof this.file[method] === 'function') {
          this.file[method]();
        } else {
          if (this[method] && typeof this[method] === 'function') {
            this.setRelationElms(params.id);
            this.setClientParams(params);
            this[method](params.id);
          }
        }
      }
    }
  }

  onError(e) {
    console.warn(e);
  }

  postMessage() {
    Object.keys(this.iframes).forEach((iFrameId) => {
      const iframe = this.iframes[iFrameId].dom;
      const href = this.iframes[iFrameId].params.href;
      const type = 'MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE';
      const params = {
        ch: this.ch,
        status: this.status.toLowerCase(),
        currentTime: this.currentTime,
      };
      const content = iFrameId === MediaServer.CLIENT_KEY ? window : iframe.contentWindow;
      content.postMessage({ type, params }, href);
    });
  }

  searching(iFrameId) {
    if (!iFrameId) {
      console.warn('Please Set iFrameId TalknMediaServer ');
      return false;
    }
    this.setStatus(MediaServer.STATUS_SEARCH, `start searching ${iFrameId}`);
    this.searchingCnt = 0;
    this.searchingId = null;
    this.playIntervalId = null;
    const handleEventsWrap = (mediaType) => {
      let isHandle = false;
      this[mediaType].forEach((media) => {
        if (isHandle) return;
        this.iframes[iFrameId].params[mediaType].forEach((iframeMedia) => {
          if (isHandle) return;
          if (media.src.indexOf(iframeMedia.src) >= 0) {
            if (!this.handleEventSrc.includes(media.src)) {
              this.handleEventSrc.push(media.src);
              this.handleEvents(media);
              isHandle = true;
            }
          }
        });
      });
      return isHandle;
    };

    this.searchingIds[iFrameId] = setInterval(() => {
      this.setRelationElms(iFrameId);
      const iframeHasAudio = Boolean(this.iframes[iFrameId].params.audios.length);
      const iframeHasVideo = Boolean(this.iframes[iFrameId].params.videos.length);
      let isHandleEvents = false;

      if (this.searchingCnt < this.maxSearchingCnt) {
        if (this.videos.length > 0 && iframeHasVideo) {
          isHandleEvents = handleEventsWrap('videos');
          if (isHandleEvents) {
            this.setStatus(MediaServer.STATUS_STANBY, `searched video ${iFrameId}`);
          }
        }
        if (this.audios.length > 0 && iframeHasAudio) {
          isHandleEvents = handleEventsWrap('audios');
          if (isHandleEvents) {
            this.setStatus(MediaServer.STATUS_STANBY, `searched audio ${iFrameId}`);
          }
        }
      } else {
        clearInterval(this.searchingIds[iFrameId]);
        this.setStatus(MediaServer.STATUS_ENDED, `search to ended ${iFrameId}`);
      }
      this.searchingCnt++;
    }, MediaServer.mediaSecondInterval);
  }

  handleEvents(media) {
    media.addEventListener('play', this.play);
    media.addEventListener('pause', this.pause);
    media.addEventListener('ended', this.ended);
  }

  play(e) {
    this.file = e.srcElement;
    this.ch = this.file.currentSrc.replace('http:/', '').replace('https:/', '') + '/';
    this.setStatus(MediaServer.STATUS_PLAY, 'play');
    this.playIntervalId = setInterval(() => {
      this.postMessage();
    }, this.mediaSecondInterval);
  }

  pause(e) {
    if (this.status !== MediaServer.STATUS_STANBY) {
      this.setStatus(MediaServer.STATUS_STANBY, 'pause');
      clearInterval(this.playIntervalId);
      this.postMessage();
    }
  }

  ended(e) {
    this.setStatus(MediaServer.STATUS_ENDED, 'ended');
    clearInterval(this.playIntervalId);
    this.postMessage();
    Object.keys(this.searchingIds).forEach((iFrameId) => {
      clearInterval(this.searchingIds[iFrameId]);
    });
  }

  log(label, called) {
    if (this.isLog) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} [${called}] ch: ${this.ch} time: ${this.pointerTime} @@@`);
    }
  }
}
