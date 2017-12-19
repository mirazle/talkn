import Parser from 'ua-parser-js';

export default class UserAgent{
  constructor( window ){
    return UserAgent.get( window.navigator.userAgent )
  }
  static get( userAgent ){
    return {...Parser( userAgent )};
  }
}
