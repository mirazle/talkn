/* 
    const ws = new Ws();
    GlobalWindow.TalknMedia = new Media(ws);
    GlobalWindow.TalknMediaServer.searching();
*/
class MediaServer {
  static get mediaSecondInterval() {
    return 200;
  }
  get currentTime() {
    return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
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
  constructor(_window) {
    this.window = _window;
    this.ch;
    this.status = 'stanby'; // "stanby" | "searching" | "play";

    // postMessage to iframe ids.
    this.iFrameIds = [];
    this.iFrames = {};
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
    this.postMessage = this.postMessage.bind(this);

    // controls.
    this.file = null;
    this.searchingId = null;
    this.maxSearchingCnt = 10;
    this.playIntervalId = null;
    this.searchingCnt = 0;
    this.playingCnt = 0;
    this.pointerTime = 0;
    this.started = false;
    this.isPosting = false;
    this.isLog = true;

    clearInterval(this.searchingId);
    clearInterval(this.playIntervalId);

    // methods.
    this.searching = this.searching.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.ended = this.ended.bind(this);
    this.log = this.log.bind(this);

    this.listenMessage();
  }

  setStatus(status) {
    this.status = status;
    this.log('SET STATUS');
  }

  listenMessage() {
    window.onmessage = this.onMessage;
    window.onerror = this.onError;
  }

  onMessage(e) {
    const { type, id: iFrameId } = e.data;
    switch (type) {
      case 'EXT_TO_MEDIA_TYPE':
        if (!this.iFrameIds.includes(iFrameId)) {
          const iframe = document.querySelector(`iframe#${iFrameId}`);
          if (iframe) {
            this.iFrames[iFrameId] = iframe;
            this.iFrameIds.push(iFrameId);
            console.log('SET');
          }
        }
        break;
    }
  }

  onError(e) {
    console.warn(e);
  }

  postMessage(method) {
    Object.keys(this.iFrames).forEach((iFrameId) => {
      console.log(this.iFrames[iFrameId].contentWindow);
      const params = {
        type: 'MEDIA_TO_CLIENT_TYPE',
        ch: this.ch,
        status: this.status,
        time: this.currentTime,
      };
      this.iFrames[iFrameId].contentWindow.postMessage(method, params, iFrameId);
    });
  }

  searching() {
    this.setStatus('searching');
    this.searchingCnt = 0;
    this.searchingId = null;
    this.playIntervalId = null;
    this.searchingId = setInterval(() => {
      if (this.searchingCnt < this.maxSearchingCnt) {
        const videos = window.top.document.querySelectorAll('video');
        const audios = window.top.document.querySelectorAll('audio');

        if (videos.length > 0 || audios.length > 0) {
          videos.forEach(this.handleEvents);
          audios.forEach(this.handleEvents);

          this.setStatus('stanby');

          clearInterval(this.searchingId);
          clearInterval(this.playIntervalId);
        } else {
          this.searchingCnt++;
        }
      }
    }, MediaServer.mediaSecondInterval);
  }

  handleEvents(media) {
    media.addEventListener('play', this.play);
    media.addEventListener('pause', this.pause);
    media.addEventListener('ended', this.ended);
  }

  play(e) {
    this.setStatus('play');
    this.file = e.srcElement;
    this.ch = this.file.currentSrc.replace('https:/', '').replace('https:', '') + '/';

    clearInterval(this.playIntervalId);

    // postMessage
    this.playIntervalId = setInterval(() => {
      this.postMessage('play');
    }, MediaServer.mediaSecondInterval);
  }

  pause(e) {
    this.setStatus('stanby');
    this.postMessage('stanby');
  }

  ended(e) {
    this.setStatus('stanby');
    this.postMessage('stanby');
    clearInterval(this.playIntervalId);
    const currentTime = Number.MAX_SAFE_INTEGER;
  }

  log(label, isForce = false) {
    if (this.isLog || isForce) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} ch: ${this.ch} time: ${this.pointerTime} @@@`);
    }
  }
}

const mediaServer = new MediaServer(window);
mediaServer.searching();
