import Schema from 'common/Schema';

import Post from 'api/store/Post';

export default class User extends Schema {
  static get defaultOffsetFindId() {
    return Post.defaultFindId;
  }

  constructor(params: any = {}) {
    super();
    const uid = params && params.uid ? params.uid : '';
    const utype = params && params.utype ? params.utype : '';

    // 削除予定
    const tunedCh = params && params.tunedCh ? params.tunedCh : '';
    const multistreamed = params && params.multistreamed ? params.multistreamed : false;
    const actioned = params && params.actioned ? params.actioned : '';
    const offsetFindId = params && params.offsetFindId ? params.offsetFindId : User.defaultOffsetFindId;
    const offsetSingleFindId = params && params.offsetSingleFindId ? params.offsetSingleFindId : User.defaultOffsetFindId;
    const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : User.defaultOffsetFindId;
    const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : User.defaultOffsetFindId;
    const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : User.defaultOffsetFindId;

    const requestLoginType = params.requestLoginType ? params.requestLoginType : '';
    const friends = [];
    return this.create({
      uid,
      utype,
      tunedCh,
      multistreamed,
      actioned,
      offsetFindId,
      offsetSingleFindId,
      offsetMultiFindId,
      offsetChildFindId,
      offsetLogsFindId,
      friends,
    });
  }

  static getOffsetFindId({ posts }) {
    if (posts && posts[0] && posts[0]._id) {
      return posts[0]._id;
    }
    return Post.defaultFindId;
  }

  static getHref(params: any = {}) {
    if (typeof window !== 'undefined' && window.location && window.location.href) {
      // return window.location.href;
    }

    if (params && params.href) {
      return params.href;
    }
    return '/';
  }
}
