import https from 'https';
import socketIo from "socket.io";
import redis from	'socket.io-redis';
import MongoDB from '~/db/MongoDB';
import fs from "fs";
import Schemas from '~/schemas';
import conf from '~/conf';

export default class Db {

  constructor( mongoDB ){
    this.db = mongoDB;
    return this;
  }

  async findOneSetting(){
    return await this.db.Setting.findOne();
  }

  async resetWatchCnt(){
    const condition = { watchCnt:{ $exists: true, $ne: 0 } };
    const set =  { $set:{ watchCnt: 0 } };
    const option = { upsert:false, multi: true };
    return await this.db.Index.update( condition, set, option );
  }

  async updateIndex( connection, cnt ){
    const condition = {connection};
    const set = { $inc: { watchCnt: cnt } };
    const option = {upsert:true};
    return await this.db.Index.update( condition, set, option );
  }

  async findOneIndex( connection ){
    const condition = {connection};
    const selector = { connection: true, watchCnt: true };
    return await this.db.Index.findOne( condition, selector );
  }
}
