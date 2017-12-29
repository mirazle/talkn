import Parser from 'ua-parser-js';
import Schema from '../Schema';

export default class UserAgent extends Schema{
  constructor( window = {} ){
    super();

    const navigator = window.navigator ? window.navigator : {} ;
    const userAgent = navigator ? navigator.userAgent : {} ;
    const parsered = UserAgent.get( userAgent );
    const browser = parsered.browser ? parsered.browser : {};
    const cpu = parsered.cpu ? parsered.cpu : {};
    const device = parsered.device ? parsered.device : {};
    const engine = parsered.engine ? parsered.engine : {};
    const os = parsered.os ? parsered.os : {};
    const ua = parsered.ua ? parsered.ua : '';

    return this.create({
      browser,
      cpu,
      device,
      engine,
      os,
      ua,
    });
  }
  static get( userAgent ){
    return userAgent ? Parser( userAgent ) : {} ;
  }
}
