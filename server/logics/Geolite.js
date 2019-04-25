export default class Geolite {
  static getLanguage(req){
    if( req.headers['accept-language'].indexOf("ja") === 0 ){
      return "ja";      
    }else if( req.headers['accept-language'].indexOf("zh") === 0 ){
      return "zh";
    }else if( req.headers['accept-language'].indexOf("de") === 0 ){
      return "de";
    }else if( req.headers['accept-language'].indexOf("fr") === 0 ){
      return "fr";
    }else{
      return "en";
    }
  }
}
