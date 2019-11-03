import Sequence from "common/Sequence";

export default class Io {
  io: any;
  constructor(socketIo) {
    this.io = socketIo;
    return this;
  }

  async get() {
    return this.io.get();
  }

  async connectioned(ioUser) {
    return this.io.emit(ioUser, Sequence.CATCH_ME_KEY, {
      type: "connectioned"
    });
  }

  async initClientState(ioUser, requestState, setting) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      user: { uid: ioUser.conn.id },
      setting
    });
    return this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
  }

  async find(ioUser, { requestState, thread, posts, app }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      thread,
      posts,
      app
    });
    const responseBroadcastState = Sequence.getResponseState(
      "Broadcast",
      requestState,
      { thread }
    );
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    this.io.broadcast(
      responseBroadcastState.thread.connection,
      responseBroadcastState
    );
    return true;
  }

  async getMore(ioUser, { requestState, thread, posts, app }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      thread,
      posts,
      app
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    return true;
  }

  async findMenuIndex(ioUser, { requestState, menuIndex }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      menuIndex
    });
    console.log(responseEmitState);
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    return true;
  }

  async changeThreadDetail(ioUser, { requestState, thread }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      thread
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    return true;
  }

  async updateThread(ioUser, { requestState, thread }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      thread
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    return true;
  }

  async changeThread(ioUser, { requestState, thread, app }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      app
    });
    const responseBroadcastState = Sequence.getResponseState(
      "Broadcast",
      requestState,
      { thread }
    );
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    this.io.broadcast(
      responseBroadcastState.thread.connection,
      responseBroadcastState
    );
    return true;
  }

  async post(ioUser, { requestState, posts, thread }) {
    const responseBroadcastState = Sequence.getResponseState(
      "Broadcast",
      requestState,
      { posts, thread, menuIndex: posts }
    );
    const connections = posts[0].connections;
    connections.forEach(connection => {
      responseBroadcastState.thread.connection = connection;
      this.io.broadcast(connection, responseBroadcastState);
    });

    return true;
  }

  async updateThreadServerMetas(ioUser, { requestState, thread }) {
    const responseEmitState = Sequence.getResponseState("Emit", requestState, {
      thread
    });
    this.io.emit(ioUser, Sequence.CATCH_ME_KEY, responseEmitState);
    return true;
  }

  async saveOnWatchCnt(ioUser, { requestState, thread }) {
    const responseBroadcastState = Sequence.getResponseState(
      "Broadcast",
      requestState,
      { thread }
    );
    return this.io.broadcast(
      responseBroadcastState.thread.connection,
      responseBroadcastState
    );
  }
}
