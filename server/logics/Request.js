import request from 'request';
import cheerio from 'cheerio';
import iconv from 'iconv';

export default class Request {

  constructor(){
    this.option = {
      method: 'GET',
      url: '',
      encoding: 'binary'
    };
  }

  get( state ){
    const { protocol, connection } = state;
    const url = `${state.protocol}/${state.connection}`;
    const option = {method: 'GET', encoding: 'binary', url };
    request( option, ( error, response, body ) => {
      if( !error && response && response.statusCode === 200 ){

      }else{
        console.warn(error);
      }
    });
    return true;
  }

  getMeta( url ){
  }
}
