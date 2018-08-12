import conf from '~/server/conf';
import Threads from '~/server/logics/db/collections/Threads';
import Posts from '~/server/logics/db/collections/Posts';
import Setting from '~/server/logics/db/collections/Setting';
import Users from '~/server/logics/db/collections/Users';

export default class Collections {
  constructor( mongoDB ){
    this.threads = new Threads( mongoDB.Threads );
    this.posts = new Posts( mongoDB.Posts );
    this.setting = new Setting( mongoDB.Setting );
    this.users = new Users( mongoDB.Users );
    return this;
  }
}
