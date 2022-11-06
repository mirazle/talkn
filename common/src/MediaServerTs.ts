type ParamsType = {
  id: string;
  ch: string;
  href: string;
  audios: HTMLAudioElement[];
  videos: HTMLVideoElement[];
};

const paramsInit = {
  id: '',
  ch: '',
  href: '',
  audios: [],
  videos: [],
};

export default class MediaServer {
  public initId = '';
  public ch = null;
  public status = '';
  public iframes = {};
  public audios: HTMLAudioElement[];
  public videos: HTMLVideoElement[];
  public handleEventSrc = [];
  public file = null;
  public searchingId = null;
  public searchingIds = {};
  public maxSearchingCnt = 30;
  public playIntervalId = null;
  public searchingCnt = 0;
  public pointerTime = 0;
  public isLog = false;
  get currentTime() {
    return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
  }
  static get SECOND_INTERVAL() {
    return 200;
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
  static get COMPONENTS_KEY() {
    return 'COMPONENTS';
  }
  constructor(initId) {
    this.initId = initId;

    // postMessage to iframe ids.
    this.init = this.init.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);

    // methods.
    this.setStatus = this.setStatus.bind(this);
    this.setClientParams = this.setClientParams.bind(this);
    this.setRelationElms = this.setRelationElms.bind(this);
    this.searching = this.searching.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.ended = this.ended.bind(this);
    this.log = this.log.bind(this);

    this.init();

    this.listenMessage();
  }

  listenMessage() {
    window.addEventListener('message', this.onMessage);
    window.addEventListener('messageerror', this.onError);
  }

  setStatus(status, called = '') {
    this.status = status;
    this.log('SET STATUS ' + called);
  }

  init() {
    this.ch = null;
    this.setStatus(MediaServer.STATUS_STANBY);
    this.reset();

    window.removeEventListener('message', this.onMessage);
    window.removeEventListener('messageerror', this.onError);
  }

  reset() {
    Object.keys(this.searchingIds).forEach((iFrameId) => {
      window.clearInterval(this.searchingIds[iFrameId]);
    });
    window.clearInterval(this.playIntervalId);

    this.iframes = {};
    this.audios = [];
    this.videos = [];
    this.handleEventSrc = [];
    this.file = null;
    this.searchingIds = {};
    this.playIntervalId = null;
    this.searchingCnt = 0;
  }

  setRelationElms(id?: string) {
    if (Object.keys(this.iframes).length === 0) {
      if (id === MediaServer.CLIENT_KEY || id === MediaServer.COMPONENTS_KEY) {
        this.iframes[id] = {
          dom: window,
          params: { ...paramsInit },
        };
      } else {
        const iframes = window.document.querySelectorAll(`.talknIframes`);
        iframes.forEach((iframe) => {
          if (iframe.id) {
            this.iframes[iframe.id] = {
              dom: iframe,
              params: { ...paramsInit },
            };
          } else {
            throw `Error: Please set iframe id.`;
          }
        });
      }
    }

    if (this.videos.length === 0) {
      this.videos = Array.from(window.document.querySelectorAll('video'));
    }
    if (this.audios.length === 0) {
      this.audios = Array.from(window.document.querySelectorAll('audio'));
    }
  }

  setClientParams(params) {
    if (params && params.id) {
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
      const content = iFrameId === MediaServer.CLIENT_KEY || iFrameId === MediaServer.COMPONENTS_KEY ? window : iframe.contentWindow;
      content.postMessage({ type, params }, href);
    });
  }

  searching(iFrameId) {
    if (!iFrameId) {
      console.warn('Please Set iFrameId TalknMediaServer ');
      return false;
    }

    if (this.searchingIds[iFrameId] && this.searchingIds[iFrameId] > 0) {
      window.clearInterval(this.searchingIds[iFrameId]);
    }

    // this.reset();
    this.setStatus(MediaServer.STATUS_SEARCH, `start searching ${iFrameId}`);
    this.searchingCnt = 0;
    this.playIntervalId = null;
    this.audios = [];
    this.videos = [];
    this.handleEventSrc = [];
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

    this.searchingIds[iFrameId] = window.setInterval(() => {
      this.setRelationElms(iFrameId);
      const iframeHasAudio = Boolean(this.iframes[iFrameId].params.audios.length);
      const iframeHasVideo = Boolean(this.iframes[iFrameId].params.videos.length);
      let isHandleEvents = false;
      if (this.searchingCnt < this.maxSearchingCnt) {
        if (this.videos.length > 0 && iframeHasVideo) {
          isHandleEvents = handleEventsWrap('videos');
          if (isHandleEvents) {
            window.clearInterval(this.searchingIds[iFrameId]);
            this.setStatus(MediaServer.STATUS_STANBY, `searched video ${iFrameId}`);
          }
        }
        if (this.audios.length > 0 && iframeHasAudio) {
          isHandleEvents = handleEventsWrap('audios');
          if (isHandleEvents) {
            window.clearInterval(this.searchingIds[iFrameId]);
            this.setStatus(MediaServer.STATUS_STANBY, `searched audio ${iFrameId}`);
          }
        }
      } else {
        window.clearInterval(this.searchingIds[iFrameId]);
        this.setStatus(MediaServer.STATUS_ENDED, `search to ended ${iFrameId}`);
      }
      this.searchingCnt++;
    }, MediaServer.SECOND_INTERVAL);
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
    this.postMessage();
    this.playIntervalId = setInterval(() => {
      this.postMessage();
    }, MediaServer.SECOND_INTERVAL);
  }

  pause(e) {
    if (this.status !== MediaServer.STATUS_STANBY) {
      this.setStatus(MediaServer.STATUS_STANBY, 'pause');
      window.clearInterval(this.playIntervalId);
      this.postMessage();
    }
  }

  ended(e) {
    this.setStatus(MediaServer.STATUS_ENDED, 'ended');
    window.clearInterval(this.playIntervalId);
    this.postMessage();
    Object.keys(this.searchingIds).forEach((iFrameId) => {
      window.clearInterval(this.searchingIds[iFrameId]);
    });
  }

  log(label, called?: string) {
    if (this.isLog) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} [${called}] ch: ${this.ch} time: ${this.pointerTime} @@@`);
    }
  }
}
