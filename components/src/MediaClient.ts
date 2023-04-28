import PostMessage from 'common/PostMessage';

import Window from './Window';

export default class MediaClient {
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
  static get STATUS_BACK() {
    return 'BACK';
  }
  ch: string;
  status:
    | typeof MediaClient.STATUS_SEARCH
    | typeof MediaClient.STATUS_STANBY
    | typeof MediaClient.STATUS_PLAY
    | typeof MediaClient.STATUS_ENDED;
  pointerTime: number = 0.0;
  isPosting: boolean = false;
  isChangeThread: boolean = false;
  isExeOnMessae = true;
  window: Window;
  postsTimeline: any[];
  postsTimelineStock: any[];
  constructor(_window: Window) {
    this.window = _window;
    this.ch = _window.ch;
    this.status = MediaClient.STATUS_ENDED;

    this.requestServer = this.requestServer.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.wsClientBeforeFilter = this.wsClientBeforeFilter.bind(this);
    this.wsClientAfterFilter = this.wsClientAfterFilter.bind(this);
    this.setPostsTimelines = this.setPostsTimelines.bind(this);
    this.refrectSelfPost = this.refrectSelfPost.bind(this);
    this.play = this.play.bind(this);
    this.stanby = this.stanby.bind(this);
    this.ended = this.ended.bind(this);

    // timeline datas.
    this.postsTimeline = [];
    this.postsTimelineStock = [];
  }

  private requestServer(method, params = {}) {
    this.window.toMediaServer(method, params);
  }

  // Window.tsのonMessageでstateを受け取る
  public onMessage(e: MessageEvent, state) {
    const { id, type, params } = e.data;
    const { currentTime, status, ch } = params;

    if (type === PostMessage.MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE) {
      if (this.window.id === id) {
        if (this.isExeOnMessae) {
          const nextStatus = status.toUpperCase();
          switch (nextStatus) {
            case MediaClient.STATUS_PLAY:
              if (state.thread.ch === ch /*&& !this.isChangeThread*/) {
                if (this.postsTimeline.length > 0 || this.postsTimelineStock.length > 0) {
                  this.status = nextStatus;
                  this.play(currentTime);
                }
              } else {
                if (this.status !== MediaClient.STATUS_BACK) {
                  state.thread.ch = ch;
                  this.isChangeThread = true;
                  // window.talknWindow.dom.onClickCh(state.thread.ch, state.ui, state.thread.hasSlash, 'ToMedia');
                }
              }
              break;
          }
        }
      }
    }
  }

  public wsClientBeforeFilter({ method, params }) {
    if (method === 'post') {
      const state = this.window.store.getState();
      if (state.app.isMediaCh) {
        // 投稿時に自分のpostsのみMediaに反映する
        // 投稿時にメディアの再生秒数を反映する
        params.app.inputCurrentTime = this.pointerTime > 0 ? this.pointerTime : 0;
      }
    }
    return params;
  }

  public wsClientAfterFilter({ method, params, state }) {
    switch (method) {
      case 'SERVER_TO_API[EMIT]:tune':
        this.isPosting = false;
        this.pointerTime = 0;
        window.talknMediaClients[this.window.id] = new MediaClient(this.window);
        this.requestServer('searching', {
          // TODO: EXTで複数起動の場合に正しく動作するのか検証
          id: this.window.id,
          ch: state.thread.ch,
          href: location.href,
          audios: state.thread.audios,
          videos: state.thread.videos,
        });
        break;
      case 'API_TO_SERVER[REQUEST]:changeThread':
        this.isExeOnMessae = false;
        this.status = MediaClient.STATUS_ENDED;
        break;
      case 'SERVER_TO_API[EMIT]:changeThread':
        this.pointerTime = 0;
        this.status = MediaClient.STATUS_STANBY;
        if (state.app.isMediaCh) {
          this.isExeOnMessae = true;
          window.talknMediaClients[this.window.id] = new MediaClient(this.window);
          this.requestServer('ended');
          this.requestServer('searching', {
            // TODO: EXTで複数起動の場合に正しく動作するのか検証
            id: this.window.id,
            ch: state.thread.ch,
            href: location.href,
            audios: state.thread.audios,
            videos: state.thread.videos,
          });
        }

        this.isChangeThread = false;
        break;
      case 'SERVER_TO_API[EMIT]:fetchPosts':
        this.setPostsTimelines(state);
        break;
      case 'SERVER_TO_API[BROADCAST]:post':
        if (state.app.isMediaCh) {
          const post = state.posts[0];
          if (post.ch === state.thread.ch) {
            // 自分の投稿したpostの場合
            if (post.uid === state.user.uid) {
              this.refrectSelfPost(post);
            }
          }
        }
        break;
    }
  }

  public setPostsTimelines({ postsTimeline, postsTimelineStock }) {
    // 現在、表示されている投稿
    this.postsTimeline = [...postsTimeline];

    // 現在、表示されていない投稿
    this.postsTimelineStock = [...postsTimelineStock];
    // console.log('SET', this.postsTimeline.length, this.postsTimelineStock.length);
  }

  public refrectSelfPost(post) {
    const length = this.postsTimeline.length;
    let pushFlg = false;
    for (let i = 0; i < length; i++) {
      if (post.currentTime < this.postsTimeline[i].currentTime) {
        pushFlg = true;
        this.postsTimeline.splice(i, 0, post);
      }
    }

    if (!pushFlg) {
      // 最末尾にpushする
      this.postsTimeline.push(post);
    }
  }

  public setServerParams(params) {
    this.ch = params.ch;
    this.status = params.status;
    this.pointerTime = params.currentTime;
  }

  public searching() {}

  public stanby() {}

  public ended() {
    const currentTime = Number.MAX_SAFE_INTEGER;
    const length = this.postsTimelineStock.length;
    for (let i = 0; i < length; i++) {
      if (this.postsTimelineStock[i] && this.postsTimelineStock[i].currentTime <= currentTime) {
        this.window.clientAction('NEXT_POSTS_TIMELINE', { postsTimeline: [this.postsTimelineStock[i]] });
      } else {
        break;
      }
    }
  }

  public play(pointerTime = 0) {
    if (this.isPosting) return;

    const timelineLength = this.postsTimelineStock.length;
    this.isPosting = true;
    // Timeline is next.
    if (this.pointerTime <= pointerTime) {
      this.pointerTime = pointerTime;
      while (this.isPosting) {
        if (timelineLength === 0) {
          this.isPosting = false;
        } else if (this.postsTimelineStock[0] && this.postsTimelineStock[0].currentTime <= pointerTime) {
          const addPost = this.postsTimelineStock.shift();
          this.postsTimeline.push(addPost);

          this.window.clientAction('NEXT_POSTS_TIMELINE', { postsTimeline: [addPost] });
        } else {
          this.isPosting = false;
          break;
        }
      }

      // Timeline is prev.
    } else {
      // 処理が終わるまで強制停止
      this.requestServer('pause');
      const postsTimelineAll = this.postsTimeline.concat(this.postsTimelineStock);
      const length = postsTimelineAll.length;
      this.pointerTime = pointerTime;
      this.postsTimeline = [];
      this.postsTimelineStock = [];

      for (let i = 0; i < length; i++) {
        const post = postsTimelineAll[i];
        if (post.currentTime <= this.pointerTime) {
          this.postsTimeline.push(post);
        } else {
          this.postsTimelineStock.push(post);
        }
      }

      // 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
      this.window.clientAction('CLEAR_POSTS_TIMELINE', {
        postsTimeline: this.postsTimeline,
        postsTimelineStock: this.postsTimelineStock,
      });

      // 処理が終わったので再生開始
      this.requestServer('play');
    }
    this.isPosting = false;
  }
}
