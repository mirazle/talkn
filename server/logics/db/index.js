import Threads from './Threads';
import Posts from './Posts';
import Setting from './Setting';

export default class Db {
  constructor( mongoDB ){
    this.threads = new Threads( mongoDB.Threads );
    this.posts = new Posts( mongoDB.Posts );
    this.setting = new Setting( mongoDB.Setting );
    return this;
  }
}
