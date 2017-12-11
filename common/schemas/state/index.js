import App from './App';
import User from './User';
import Location from './Location';
import Index from './Index/';
import Thread from './Thread';
import Analyze from './Analyze';
import BootOption from './BootOption';
import MediaIndex from './MediaIndex';
import Meta from './Meta';
import Setting from './Setting';
import Style from './Style/';

export default class State{

  constructor( appType, talknIndex, window, attributes = {} ){
    this.app = new App( appType, talknIndex );
    this.location = new Location( window.location );
    this.user = new User( window );
		this.index = new Index();
		this.thread = new Thread( window );
		this.analyze = new Analyze();
    this.bootOption = new BootOption( attributes );
    this.mediaIndex = new MediaIndex();
    this.meta = new Meta();
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
    return this.user.connection;
  }
}
