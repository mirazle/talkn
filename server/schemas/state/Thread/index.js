import Schema from '~/schemas/Schema';
import Post from '~/schemas/state/Post';
import Meta from '~/schemas/state/Thread/Meta';
import Analyze from '~/schemas/state/Thread/Analyze';
import MediaIndex from '~/schemas/state/Thread/MediaIndex';

export default class Thread extends Schema{
  constructor( headers ){
    super();

    const title = '';
    const desc = '';
    const language = Thread.getLanguage(headers);
    const posts = [];
    const meta = new Meta;
    const analyze = new Analyze();
    const mediaIndex = [];

    // Initialize.
    return this.init({
      title,
      desc,
      language,
      posts,
      meta,
      analyze,
      mediaIndex,
    });
  }

  static getLanguage(headers){
    return headers['accept-language'];
  }
}
