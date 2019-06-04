import define from '~/common/define';
import App from '~/common/schemas/state/App';
import User from '~/common/schemas/state/User'
import MenuIndex from '~/common/schemas/state/MenuIndex';
import MenuLogs from '~/common/schemas/state/MenuLogs';
import Posts from '~/common/schemas/state/Posts';
import Analyze from '~/common/schemas/state/Analyze';
import BootOption from '~/common/schemas/state/BootOption';
import Thread from '~/common/schemas/state/Thread';
import Setting from '~/common/schemas/state/Setting';
import Style from '~/common/schemas/state/Style';

export default class State{

  constructor( talknIndex, window, bootOption = {}, caches = {} ){
		this.menuIndex = new MenuIndex();
		this.menuLogs = new MenuLogs( caches.menuLogs );
    this.posts = new Posts();
    this.analyze = new Analyze();
    this.bootOption = new BootOption( bootOption );
    this.thread = new Thread( window, this.bootOption, caches.thread );
    this.setting = new Setting( caches.setting );
    this.app = new App( State.getAppParams( talknIndex, this.thread, this.bootOption, caches ) );
    this.user = new User(State.getUserParams(this, caches));
    this.style = new Style( this );
  }

  static getAppParams( talknIndex, thread, bootOption, caches){
    return {
      isTransition: true,
      talknIndex,
      ...bootOption,
      ...thread
    };
  }

  static getUserParams(self, caches){
    if(caches && caches.user && caches.user.uid){
      return {...caches.user};
    }else{
      const dispThreadType = self.thread.connection === self.app.rootConnection ?
        User.dispThreadTypeMulti : User.dispThreadTypeSingle;
      return {dispThreadType}
    }
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
