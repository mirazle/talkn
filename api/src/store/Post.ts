import Schema from 'common/Schema';
import conf from 'common/conf';

export default class Post extends Schema {
  static get defaultFindId() {
    return '000000000000000000000000';
  }
  static get defaultValues() {
    return {
      _id: '',
      ch: '/',
      chs: ['/'],
      favicon: conf.defaultFavicon,
      findType: 'Html',
      layer: 1,
      post: '',
      protocol: 'https:',
      stampId: 0,
      title: 'talkn',
      liveCnt: 0,
      uid: '',
      utype: '',
      dispFlg: true,
      data: null,
      createTime: new Date(),
      currentTime: new Date(),
      updateTime: new Date(),
    };
  }
  _id: string = Post.defaultValues._id;
  ch: string = Post.defaultValues.ch;
  chs: string[] = Post.defaultValues.chs;
  favicon: string = Post.defaultValues.favicon;
  findType: string = Post.defaultValues.findType;
  layer: number = Post.defaultValues.layer;
  post: string = Post.defaultValues.post;
  protocol: string = Post.defaultValues.protocol;
  stampId: number = Post.defaultValues.stampId;
  title: string = Post.defaultValues.title;
  liveCnt: number = Post.defaultValues.liveCnt;
  uid: string = Post.defaultValues.uid;
  utype: string = Post.defaultValues.utype;
  dispFlg: boolean = Post.defaultValues.dispFlg;
  data: any = Post.defaultValues.data;
  createTime: Date = Post.defaultValues.createTime;
  currentTime: Date = Post.defaultValues.currentTime;
  updateTime: Date = Post.defaultValues.updateTime;
  constructor(params?: Post) {
    super();
    const values = params ? { ...Post.defaultValues, ...params } : Post.defaultValues;
    return this.create(values);
  }
}
