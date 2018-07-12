export default {
	getSaveFaviconName: ( fileName ) => {
		const _fileName = fileName.replace(/\u002f/g, "_");
		return _fileName.indexOf( '.png' ) > 0 ? _fileName : _fileName + ".png";
	},
	trimPx: ( value ) => {
    return value.toString().replace( 'px', '' );
  }
}
