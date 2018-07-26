import conf from '~/server/conf';
import Threads from '~/server/logics/db/Threads';
import Posts from '~/server/logics/db/Posts';
import Setting from '~/server/logics/db/Setting';
import Users from '~/server/logics/db/Users';

export default class Db {
  constructor( mongoDB ){
    this.threads = new Threads( mongoDB.Threads );
    this.posts = new Posts( mongoDB.Posts );
    this.setting = new Setting( mongoDB.Setting );
    this.users = new Users( mongoDB.Users );
    return this;
  }
}
