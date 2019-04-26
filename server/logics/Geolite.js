export default class Geolite {
  static getLanguage(req){

    const splitedAccesptLanguage = req.headers['accept-language'].split(",");
    return splitedAccesptLanguage[ 0 ];
/*
    console.log(req.headers['accept-language']); 
    if( req.headers['accept-language'].indexOf("ja") === 0 ){
      return "ja";      
    }else if( req.headers['accept-language'].indexOf("zh") === 0 ){
      return "zh";
    }else if( req.headers['accept-language'].indexOf("de") === 0 ){
      return "de";
    }else if( req.headers['accept-language'].indexOf("fr") === 0 ){
      return "fr";
    }else if( req.headers['accept-language'].indexOf("hi") === 0 ){
      return "hi";
    }else if( req.headers['accept-language'].indexOf("pt") === 0 ){
      return "pt";
    }else{
      return "en";
    }
*/
  }
}
