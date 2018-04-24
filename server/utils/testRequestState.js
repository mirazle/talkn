
export default {
  find: ()=>{
    const ioUser = {

    }

    const state =
      { type: 'find',
        thread: {
          protocol: 'talkn:',
          host: '',
          href: '',
          connection: '/www.livedoor.com/'
        },
        user:{
          uid: '',
          utype: '',
          href: 'http://localhost:8080/?http://www.livedoor.com/',
          connectioned: '',
          offsetFindId: 'ffffffffffffffffffffffff',
          friends: []
        }
      }
    const connections = [
      '/blog.livedoor.jp/goldennews/archives/52035268.html',
      '/tabelog.com',
      '/qiita.com/shoma2da/items/aaaae9eb9e803cce9eb1',
      '/news.livedoor.com/topics/detail/14607796',
      '/www.npmjs.com/package/iconv',
      '/news.yahoo.co.jp',
      '/www.mrchildren.jp',
      '/',
      '/www.livedoor.com',
      '/spitz-web.com',
      '/www.youtube.com/?gl=JP&hl=ja',
      '/radiko.jp',
      '/radiko.jp/#!/live/FMT',
      '/tver.jp',
      '/www.facebook.com',
      '/www.apple.com',
      '/www.google.co.jp',
      '/franzferdinand.com',
      '/www.mandodiao.com',
      '/www.youtube.com/user/MandoDiao',
      '/www.amazon.co.jp',
      '/www.rakuten.co.jp',
      '/news.livedoor.com/article/detail/14614513/',
      '/blogos.com/article/292372',
    ];
    const setting = {
      "server" : { "findOneThreadActiveHour" : 24, "findOnePostCnt" : 20 },
      "client" : { "test" : 1 },
      "common" : { "test" : 1 }
    }

    return {ioUser, state, connections, setting};
  }
}
