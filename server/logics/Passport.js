import passport from 'passport';

export default class Passport {

  static serializeUser(user, callback){
    console.log( "3 Serialize(Save Session & Read Session)" );
    callback(null, user);
  }

  static deserializeUser(obj, callback){
    console.log( "5 Deserialize" );
    callback(null, obj);
  };
}
