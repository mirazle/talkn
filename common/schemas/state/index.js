import define from '~/common/define';
import App from '~/common/schemas/state/App';
import User from '~/common/schemas/state/User'
import UserAgent from '~/common/schemas/state/UserAgent';
import MenuIndex from '~/common/schemas/state/MenuIndex';
import MenuLogs from '~/common/schemas/state/MenuLogs';
import Posts from '~/common/schemas/state/Posts';
import PostSingle from '~/common/schemas/state/PostSingle';
import PostMulti from '~/common/schemas/state/PostMulti';
import Analyze from '~/common/schemas/state/Analyze';
import BootOption from '~/common/schemas/state/BootOption';
import Thread from '~/common/schemas/state/Thread';
import Setting from '~/common/schemas/state/Setting';
import Style from '~/common/schemas/state/Style';

export default class State{

  constructor( appType, talknIndex, window, bootOption = {}, caches = {} ){
    this.userAgent = new UserAgent( window );
		this.menuIndex = new MenuIndex();
		this.menuLogs = new MenuLogs( caches.menuLogs );
    this.posts = new Posts();
    this.postSingle = new PostSingle();
    this.postMulti = new PostMulti();
    this.analyze = new Analyze();
    this.bootOption = new BootOption( bootOption );
    this.thread = new Thread( window, this.bootOption );
    this.setting = new Setting( caches.setting );
    this.app = new App( State.getAppParams(appType, talknIndex, this.thread, caches ) );
    this.user = new User(State.getUserParams(this, caches));
    this.style = new Style( this );
  }

  static getAppParams(appType, talknIndex, thread, caches){

    switch(appType){
    case define.APP_TYPES.PORTAL :
      if(caches && caches.app && caches.app.type){
        return {...caches.app,};
      }else{
        return {type: appType, isTransition: true, talknIndex, ...thread};
      }      
      break;
    case define.APP_TYPES.EXTENSION :
      if(caches && caches.app && caches.app.type){
        return {...caches.app};
      }else{
        return {type: appType, talknIndex, ...thread};
      }
      break;
    }
  }

  static getUserParams(self, caches){
    if(caches && caches.user && caches.user.uid){
      return {...caches.user};
    }else{
      return {
        isRootConnection: self.thread.connection === self.app.rootConnection
      }
    }
  }

  get appType(){
    return this.app.type;
  }

  get appName(){
    return this.app.name;
  }

  get talknIndex(){
    return this.app.talknIndex;
  }

  get connection(){
    return this.thread.connection;
  }
}
