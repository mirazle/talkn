export default {
	getSaveFaviconName: ( fileName ) => {
		const _fileName = fileName.replace(/\u002f/g, "\uff0f");
		return _fileName.indexOf( '.png' ) > 0 ? _fileName : _fileName + ".png";
	},
	trimPx: ( value ) => {
    return value.replace( 'px', '' );
  }
}
