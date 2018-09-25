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

  constructor( appType, talknIndex, window, attributes = {}, caches = {} ){
    this.user = new User(caches.setting);
    this.userAgent = new UserAgent( window );
		this.menuIndex = new MenuIndex();
		this.menuLogs = new MenuLogs( caches.menuLogs );
    this.posts = new Posts();
    this.postSingle = new PostSingle();
    this.postMulti = new PostMulti();
    this.analyze = new Analyze();
    this.bootOption = new BootOption( attributes );
    this.thread = new Thread( window, this.bootOption );
    this.setting = new Setting( caches.setting );
    this.app = new App( {type: appType, talknIndex, ...this.thread, menuComponent: caches.selectMenu} );
    this.style = new Style( this );
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
