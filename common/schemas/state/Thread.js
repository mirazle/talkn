export default class Thread{
  constructor( window ){
    const title = '';
    const metas = [];
    const links = [];
    const h1s = [];
    const favicon = Thread.getFaviconFromWindow( window );
    return {
      title,
      metas,
      links,
      h1s,
      favicon,
    };
  }

  static getFaviconFromWindow( window ){
    const u = window.document.evaluate(
      "//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href",
      window.document,
      null,
      2,
      null).stringValue;
    const h = "http://";
    const hs = "https://";
    const l = location.host;
    if( u.indexOf( h ) || u.indexOf( hs ) ){
      const url = h+l+( u || "/favicon.ico" );
      const strCnt = url.split( '//' ).length - 1
      if( strCnt === 1 ){
        return url;
      }else{
        return u;
      }
    }else{
      return u ;
    }
  }
}
