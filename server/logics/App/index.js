import Twitter from './Twitter';
import Facebook from './Facebook';

export default class App {
  constructor( express ){
    this.twitter = new Twitter( express);
    this.facebook = new Facebook( express );
    return this;
  }
}
