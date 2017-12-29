import App from './App';
import User from './User';
import UserAgent from './UserAgent';
import Index from './Index/';
import Posts from './Posts';
import Analyze from './Analyze';
import BootOption from './BootOption';
import Thread from './Thread';
import Setting from './Setting';
import Style from './Style/';

export default class State{

  constructor( appType, talknIndex, window, attributes = {} ){
    this.app = new App( {type: appType, talknIndex} );
    this.user = new User();
    this.userAgent = new UserAgent( window );
		this.index = new Index();
		this.posts = new Posts();
		this.analyze = new Analyze();
    this.bootOption = new BootOption( attributes );
    this.thread = new Thread( window );
    this.setting = new Setting();
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
