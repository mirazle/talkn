import Twitter from './Twitter';
import Facebook from './Facebook';

export default class App {
  constructor( express ){
    express.twitter = new Twitter();
    express.facebook = new Facebook();
    return express;
  }
  
}
