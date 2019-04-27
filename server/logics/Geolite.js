export default class Geolite {
  static getLanguage(req){

    //const splitedAccesptLanguage = req.headers['accept-language'].split(",");
    //return splitedAccesptLanguage[ 0 ];
    console.log(req.headers['accept-language']); 
    if( req.headers['accept-language'].indexOf("ja") === 0 ){
      return "ja";      
    }else if( req.headers['accept-language'].indexOf("zh-TW") === 0 ){
      return "zh-TW";
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
    }else if( req.headers['accept-language'].indexOf("it") === 0 ){
      return "it";
    }else if( req.headers['accept-language'].indexOf("ru") === 0 ){
      return "ru";
    }else if( req.headers['accept-language'].indexOf("ko") === 0 ){
      return "ko";
    }else if( req.headers['accept-language'].indexOf("es") === 0 ){
      return "es";
    }else if( req.headers['accept-language'].indexOf("id") === 0 ){
      return "id";
    }else if( req.headers['accept-language'].indexOf("tr") === 0 ){
      return "tr";
    }else if( req.headers['accept-language'].indexOf("nl") === 0 ){
      return "nl";
    }else if( req.headers['accept-language'].indexOf("ar") === 0 ){
      return "ar";
    }else if( req.headers['accept-language'].indexOf("pl") === 0 ){
      return "pl";
    }else if( req.headers['accept-language'].indexOf("sv") === 0 ){
      return "sv";
    }else if( req.headers['accept-language'].indexOf("th") === 0 ){
      return "th";
    }else if( req.headers['accept-language'].indexOf("fa") === 0 ){
      return "fa";
    }else if( req.headers['accept-language'].indexOf("nn") === 0 ){
      return "nn";
    }else if( req.headers['accept-language'].indexOf("ga") === 0 ){
      return "ga";
    }else if( req.headers['accept-language'].indexOf("he") === 0 ){
      return "he";
    }else if( req.headers['accept-language'].indexOf("mr") === 0 ){
      return "mr";
    }else{
      return "en";
    }
  }
}
