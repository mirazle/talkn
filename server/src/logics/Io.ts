import { response } from 'express';

import Sequence from 'common/Sequence';

export default class Io {
  io: any;
  constructor(socketIo) {
    this.io = socketIo;
    return this;
  }

  async get() {
    return this.io.get();
  }

  async connectionServer(ioUser) {
    return this.io.emit(ioUser, Sequence.CATCH_ME_KEY, { type: Sequence.CONNECTION_SERVER_KEY });
  }

  async tune(ioUser, requestState, setting) {
    const { thread } = requestState;
    const responseEmitState = Sequence.getResponseState('Emit', requestState, {
      thread,
      user: { uid: ioUser.conn.id },
      setting,
    });
    const responseBroadcastState = Sequence.getResponseState('Broadcast', requestState, { thread });

    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
  }

  async fetchPosts(ioUser, { requestState, thread, posts, app }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, {
      thread,
      posts,
      app,
    });

    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async getMore(ioUser, { requestState, thread, posts, app }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, {
      thread,
      posts,
      app,
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async rank(ioUser, { requestState, rank }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, { rank });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async changeThreadDetail(ioUser, { requestState, thread }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, { thread });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async updateThread(ioUser, { requestState, thread }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, {
      thread,
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async changeThread(ioUser, { requestState, oldThread, newThread }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, { thread: newThread });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    const responseBroadcastState1 = Sequence.getResponseState('Broadcast', requestState, { thread: oldThread });
    this.io.broadcast(responseBroadcastState1.thread.ch, responseBroadcastState1);
    const responseBroadcastState2 = Sequence.getResponseState('Broadcast', requestState, { thread: newThread });
    this.io.broadcast(responseBroadcastState2.thread.ch, responseBroadcastState2);
  }

  async post(ioUser, { requestState, posts, thread }) {
    const responseBroadcastState = Sequence.getResponseState('Broadcast', requestState, {
      posts,
      thread,
      user: requestState.user,
      rank: posts,
    });
    const chs = posts[0].chs;

    chs.forEach((ch) => {
      // responseBroadcastState.thread.ch = ch;
      responseBroadcastState.posts[0].ch = ch;
      this.io.broadcast(ch, responseBroadcastState);
    });
  }

  async updateThreadServerMetas(ioUser, { requestState, thread }) {
    const responseEmitState = Sequence.getResponseState('Emit', requestState, {
      thread,
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async disconnect(ioUser, { requestState, thread }) {
    const responseBroadcastState = Sequence.getResponseState('Broadcast', requestState, { thread });
    return this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
  }
}
