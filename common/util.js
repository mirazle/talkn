export default {
	isUrl: ( str ) => {
		const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*|\\/)?$' 				// fragment locator
			,'i'); // fragment locator

		return !pattern.test(str) ? false : true;
	},
	getSaveFaviconName: ( fileName ) => {
		const _fileName = fileName.replace(/\u002f/g, "_");
		return _fileName.indexOf( '.png' ) > 0 ? _fileName : _fileName + ".png";
	},
	trimPx: ( value ) => {
    return value.toString().replace( 'px', '' );
  }
}
