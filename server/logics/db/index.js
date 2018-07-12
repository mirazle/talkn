import conf from '~/conf';
import Threads from './Threads';
import Posts from './Posts';
import Setting from './Setting';
import Users from './Users';

export default class Db {
  constructor( mongoDB ){
    this.threads = new Threads( mongoDB.Threads );
    this.posts = new Posts( mongoDB.Posts );
    this.setting = new Setting( mongoDB.Setting );
    this.users = new Users( mongoDB.Users );
    return this;
  }

  async killPort(){
    console.log( "@@@@@ START KILL PORT MONGO" );
  }
}
