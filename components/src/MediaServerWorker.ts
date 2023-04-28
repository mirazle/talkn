import PostMessage, { MessageClientAndWsApiType, MessageParams } from 'common/PostMessage';

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

export default class MediaServerWorker {
  public name = 'talknMediaServer';
  public initId = '';
  public ch = null;
  public status = '';
  public components = {};
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
  public worker: Worker;
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
  constructor(worker: Worker) {
    this.init = this.init.bind(this);
    this.onError = this.onError.bind(this);

    this.onMessage = this.onMessage.bind(this);
    this.onMessageError = this.onMessageError.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.worker = worker;
    this.worker.onerror = this.onMessageError;
    this.worker.onmessage = this.onMessage;
    console.log('constructor', this.worker);
  }

  private listenMessage() {
    /*
    window.addEventListener('message', this.onMessage);
    window.addEventListener('messageerror', this.onError);
*/
  }

  private setStatus(status, called = '') {
    this.status = status;
    this.log('SET STATUS ' + called);
  }

  private init() {
    this.ch = null;
    this.setStatus(MediaServerWorker.STATUS_STANBY);
    this.reset();

    window.removeEventListener('message', this.onMessage);
    window.removeEventListener('messageerror', this.onError);
  }

  private reset() {
    Object.keys(this.searchingIds).forEach((id) => {
      window.clearInterval(this.searchingIds[id]);
    });
    window.clearInterval(this.playIntervalId);

    this.components = {};
    this.audios = [];
    this.videos = [];
    this.handleEventSrc = [];
    this.file = null;
    this.searchingIds = {};
    this.playIntervalId = null;
    this.searchingCnt = 0;
  }

  private setRelationElms(id?: string) {
    this.components[id] = {
      dom: window,
      params: { ...paramsInit },
    };

    if (this.videos.length === 0) {
      this.videos = Array.from(window.document.querySelectorAll('video'));
    }
    if (this.audios.length === 0) {
      this.audios = Array.from(window.document.querySelectorAll('audio'));
    }
  }

  private setClientParams(params) {
    if (params && params.id) {
      this.components[params.id].params = params;
    }
  }
  private postMessage() {
    Object.keys(this.components).forEach((id) => {
      const iframe = this.components[id].dom;
      const href = this.components[id].params.href;
      const type = 'MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE';
      const params = {
        ch: this.ch,
        status: this.status.toLowerCase(),
        currentTime: this.currentTime,
      };
      try {
        // window.postMessage({ type, params }, window.location.origin);
        console.log('SERVER POST');
        window.postMessage({ type, params });
      } catch (e) {
        console.warn(e);
      }
    });
  }
  private onMessage(event: MessageEvent) {
    const data = event.data;

    // ここで何らかの処理を行います
    const result = data.toUpperCase();

    // 処理結果をメインスレッドに送り返します
    self.postMessage(result);
  }

  onError(e) {
    console.warn(e);
  }

  private onMessageError(e: ErrorEvent): void {
    console.warn(e);
  }

  searching(id) {
    if (!id) {
      console.warn('Please Set id TalknMediaServer ');
      return false;
    }

    if (this.searchingIds[id] && this.searchingIds[id] > 0) {
      window.clearInterval(this.searchingIds[id]);
    }

    // this.reset();
    this.setStatus(MediaServerWorker.STATUS_SEARCH, `start searching ${id}`);
    this.searchingCnt = 0;
    this.playIntervalId = null;
    this.audios = [];
    this.videos = [];
    this.handleEventSrc = [];
    const handleEventsWrap = (mediaType) => {
      let isHandle = false;

      this[mediaType].forEach((media) => {
        if (isHandle) return;
        this[mediaType].forEach((iframeMedia) => {
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

    this.searchingIds[id] = window.setInterval(() => {
      this.setRelationElms(id);
      /*
      const iframeHasAudio = Boolean(this.components[id].params.audios.length);
      const iframeHasVideo = Boolean(this.components[id].params.videos.length);
      */
      const iframeHasAudio = Boolean(this.audios.length);
      const iframeHasVideo = Boolean(this.videos.length);

      let isHandleEvents = false;
      if (this.searchingCnt < this.maxSearchingCnt) {
        if (this.videos.length > 0 && iframeHasVideo) {
          isHandleEvents = handleEventsWrap('videos');
          if (isHandleEvents) {
            window.clearInterval(this.searchingIds[id]);
            this.setStatus(MediaServerWorker.STATUS_STANBY, `searched video ${id}`);
          }
        }

        if (this.audios.length > 0 && iframeHasAudio) {
          isHandleEvents = handleEventsWrap('audios');
          if (isHandleEvents) {
            window.clearInterval(this.searchingIds[id]);
            this.setStatus(MediaServerWorker.STATUS_STANBY, `searched audio ${id}`);
          }
        }
      } else {
        window.clearInterval(this.searchingIds[id]);
        this.setStatus(MediaServerWorker.STATUS_ENDED, `search to ended ${id}`);
      }
      this.searchingCnt++;
    }, MediaServerWorker.SECOND_INTERVAL);
  }

  handleEvents(media) {
    console.log('handleEvents', media);
    media.addEventListener('play', this.play);
    media.addEventListener('pause', this.pause);
    media.addEventListener('ended', this.ended);
  }

  play(e) {
    this.file = e.srcElement;
    this.ch = this.file.currentSrc.replace('http:/', '').replace('https:/', '') + '/';
    this.setStatus(MediaServerWorker.STATUS_PLAY, 'play');
    this.postMessage();

    this.playIntervalId = setInterval(() => {
      this.postMessage();
    }, MediaServerWorker.SECOND_INTERVAL);
  }

  pause(e) {
    if (this.status !== MediaServerWorker.STATUS_STANBY) {
      this.setStatus(MediaServerWorker.STATUS_STANBY, 'pause');
      window.clearInterval(this.playIntervalId);
      this.postMessage();
    }
  }

  ended(e) {
    this.setStatus(MediaServerWorker.STATUS_ENDED, 'ended');
    window.clearInterval(this.playIntervalId);
    this.postMessage();
    Object.keys(this.searchingIds).forEach((id) => {
      window.clearInterval(this.searchingIds[id]);
    });
  }

  log(label, called?: string) {
    if (this.isLog) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} [${called}] ch: ${this.ch} time: ${this.pointerTime} @@@`);
    }
  }
}

new MediaServerWorker(self as any);
