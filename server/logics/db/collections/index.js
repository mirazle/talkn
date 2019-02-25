import App from '~/common/schemas/state/App';
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

  static getNewApp(type, app, thread, posts){
    const connectioned = thread.connection;
    let dispThreadType = "";

    if(type === "getMore"){
      dispThreadType = app.dispThreadType;
    }else{
      const { stepTo } = App.getStepToDispThreadType( {app}, thread.connection );
      switch(stepTo){
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeMulti}`:
        dispThreadType = App.dispThreadTypeMulti;
        break;
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
        dispThreadType = App.dispThreadTypeChild;
        break;
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
        dispThreadType = App.dispThreadTypeChild;
        break;
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
        dispThreadType = App.dispThreadTypeMulti;
        break;
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
        dispThreadType = App.dispThreadTypeSingle;
        break;
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
        dispThreadType = App.dispThreadTypeChild;
        break;
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeSingle}`:
        dispThreadType = App.dispThreadTypeSingle;
        break;
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeMulti}`:
        dispThreadType = App.dispThreadTypeMulti;
        break;
      }
    }

    const offsetFindId = App.getOffsetFindId( {posts} );
    const multistreamed = dispThreadType === App.dispThreadTypeMulti;
    return {...app,
      connectioned,
      offsetFindId,
      dispThreadType,
      multistreamed
    };
  }
}
