import $ from 'jquery'
import define from './define'
import func from './func'
//import Schemas from './../../common/schemas';

export default {
	log:( val, called )=>{

		if( val.length === undefined ){
			let obj = {}
			$.extend( true, obj, val );
			if( called ) console.log( called );
			console.log( obj );
		}else{
			let arr = [];
			arr = $.merge( arr, val );
			if( called ) console.log( called );
			console.log( arr );
		}
	},
	escape:( connection )=>{
		return connection.replace( /\n|\t|,| /g, '' );
	},
	getProtcol:()=>{
		return ( location.protocol === "https:" )? "https:" : "http:" ;
	},
	getUrlConnection:()=>{

		let returnUrlConnection = "";

		if( location.href ){
			let url = "/" + location.href.split( "//" )[ 1 ] ;
			let urlLen = url.length - 1
			let urlLastStr = url[ urlLen ];
			returnUrlConnection = ( urlLastStr === "/" )? url.substr( 0, urlLen ) : url;
		}
		return returnUrlConnection;
	},
	isFocusThreadEqSite:( talknIndex, optionConnection = null )=>{

		let urlConnection = func.getUrlConnection();

		if( optionConnection ){

			return ( urlConnection === optionConnection )? true : false ;

		}else if( typeof talknAPI !== "undefined" && typeof talknAPI.store.getState().styles[ talknIndex ] !== "undefined" ){

			let root = talknAPI.store.getState().styles[ talknIndex ].root;
			return ( urlConnection === root.focusMeta.connection )? true : false ;

		}else{

			return false;
		}
	},
	setCache:( talknIndex, key, data )=>{

		if( talknIndex === 0 ){
			//console.log( key + talknIndex );
			//console.log( JSON.stringify( data ) );
			chrome.runtime.sendMessage( { method: 'setItem', key: key + talknIndex , value: JSON.stringify( data ) });
		}else{
			localStorage.setItem( key + talknIndex, JSON.stringify( data ) );
		}
	},
	getSplitRgba:( rgba )=>{
		let obj = { R: 0, G: 0, B: 0, A: 1 };
		let rgbaArr = rgba.replace( "rgba(", "" ).replace( ")", "" ).replace( / /g, "" ).split( "," );
		obj.R = parseInt( rgbaArr[ 0 ] );
		obj.G = parseInt( rgbaArr[ 1 ] );
		obj.B = parseInt( rgbaArr[ 2 ] );
		obj.A = parseFloat( rgbaArr[ 3 ] );
		return obj;
	},
	getPathArr:( paths, requireRootFlg = true )=>{

		let newPathArr = [];
		let newPath = "";

		if( paths && paths.length > 0 ){
			let pathArr = paths.split( "/" );
			let pathLength = pathArr.length;

			for( let i = 0; i < pathLength; i++ ){
				if( pathArr[ i ] === "" ) continue;
				newPath = newPath + ( '/' + pathArr[ i ] );
				newPathArr.unshift( newPath );
			}

			if( requireRootFlg ){
				newPathArr.push( "/" );
			}
		}
		return newPathArr;
	},
	findMap:( talknIndex, connectionList, focusMeta )=>{

		// If No TalknIndex Cache .
		if( connectionList === null ){

			talknAPI.find( {
					talknIndex: talknIndex,
					connection: focusMeta.connection,
					exeApiFlg: true,
					dispThreadFlg: true,
					title: focusMeta.title,
					desc: focusMeta.desc,
					keywords: focusMeta.keywords,
					ogName: focusMeta.ogName,
					ogType: focusMeta.ogType,
					ogTwId: focusMeta.ogTwId,
					ogFbId: focusMeta.ogFbId,
					thum: focusMeta.thum
			} );

		// If TalknIndex Cache .
		}else{

			let setConnectionList =  [];
			let connectionListLength = connectionList.length;

			for( let index = connectionListLength - 1; 0 <= index; index-- ){

				let connection = connectionList[ index ].connection;
				let thum = connectionList[ index ][ 'thum' ];
				let title = connectionList[ index ]['title' ];
				let desc = connectionList[ index ][ 'desc' ];
				let keywords = connectionList[ index ][ 'keywords' ];
				let ogName = connectionList[ index ][ 'ogName' ];
				let ogType = connectionList[ index ][ 'ogType' ];
				let ogTwId = connectionList[ index ][ 'ogTwId' ];
				let ogFbId = connectionList[ index ][ 'ogFbId' ];

				if( focusMeta.connection !== connection ){

					if( $.inArray( connection, setConnectionList ) === -1 ){

						setConnectionList.unshift( connection );

						talknAPI.find( {
							talknIndex: talknIndex,
							connection: connection,
							exeApiFlg: false,
							dispThreadFlg: false,
							title: title,
							desc: desc,
							keywords: keywords,
							ogName: ogName,
							ogType: ogType,
							ogTwId: ogTwId,
							ogFbId: ogFbId,
							thum: thum
							} );
					}
				}
			}

			talknAPI.find( {
					talknIndex: talknIndex,
					connection: focusMeta.connection,
					exeApiFlg: true,
					dispThreadFlg: true,
					title: focusMeta.title,
					desc: focusMeta.desc,
					keywords: focusMeta.keywords,
					ogName: focusMeta.ogName,
					ogType: focusMeta.ogType,
					ogTwId: focusMeta.ogTwId,
					ogFbId: focusMeta.ogFbId,
					thum: focusMeta.thum
			} );
		}
	},
	addBackgroundListener:( option, focusMeta, self )=>{

		let talknIndex = option.talknIndex;
		let promiseCondition = () => {}

		if( talknIndex === 0 ){

			promiseCondition = ( resolve, reject ) => {
        chrome.runtime.onMessage.addListener( ( result, sender, sendResponse ) => {

					if( result.requestKey === define.cacheKey.setting + talknIndex ){
            resolve( { setting: result.response, self: self } );
					}

					if( result.requestKey === define.cacheKey.index + talknIndex ){
						let connectionList = result.response;
						func.findMap( talknIndex, connectionList, focusMeta );
					}
        });

        chrome.runtime.sendMessage( { method: "getItem", key: define.cacheKey.setting + talknIndex, function(){} } );
    	}
    }else{
			promiseCondition = ( resolve, reject ) => {
				resolve( { setting: JSON.parse( localStorage.getItem( define.cacheKey.setting + talknIndex ) ), self: self } );
			}
    }
    return new Promise( promiseCondition );
	},
	getFocusIndex:( talknIndex, state = undefined )=>{

		state = ( state )? state : talknAPI.store.getState();

		let focusIndex = {};
		let root = state.styles[ talknIndex ].root;
		let setting = root.setting;
		let index = state.ws.index[ talknIndex ];
		let indexLength = index ? index.length : 0;
		let multiStreamKey = ( setting.multiStream )? "1": "0" ;

		if( indexLength > 0 ){
			for( let i = 0; i < indexLength; i++ ){

				if( index[ i ].connection === root.focusMeta.connection ){
					focusIndex = index[ i ][ "multiStream" + multiStreamKey ];
					focusIndex.title = ( focusIndex.title && focusIndex.title !== "" )? focusIndex.title : focusIndex.connection ;
					break;
				}
			}
		}else{

			focusIndex.title = root.focusMeta.title;
			focusIndex.thum = root.focusMeta.thum;
		}
		focusIndex.connection = root.focusMeta.connection;
		return focusIndex;

	},
	getThum:( root, props )=>{
		let thum = "";
		if( typeof props.thum !== "undefined" && props.thum !== "" ) thum = props.thum;
		if( thum === "" && root.focusMeta.thum !== "" ) thum = root.focusMeta.thum;
		if( thum === "" && root.option.thum !== "" ) thum = root.option.thum;

		if( thum && thum.indexOf( "http" ) !== 0 ){
			let protcol = func.getProtcol();
			thum = ( protcol + thum );
		}
		return thum;
	},
	getWsParams:( type, talknIndex, connection )=>{

		if( typeof __talknAPI__ !== "undefined" ){

			let indexCnt = __talknAPI__[ talknIndex ].store.getState().ws[ type ][ talknIndex ].length;

			for( let i = 0 ; i < indexCnt ; i++ ){

				let loopConnection = __talknAPI__[ talknIndex ].store.getState().ws[ type ][ talknIndex ][ i ][ "connection" ];

				if( connection === loopConnection ){
					return __talknAPI__[ talknIndex ].store.getState().ws[ type ][ talknIndex ][ i ];
					break;
				}
			}
		}
		return {};
	},
	getShortConnection:( connection )=>{
		if( connection === "/" ){
			return "/";
		}else{
			let connectionArray = connection.split( "/" );
			let connectionLength = connectionArray.length - 1;
			return connectionArray[ connectionLength ];
		}
	},
	getIndexValues:( obj )=>{

		let returnObj = [];

		if( typeof Object.values === "function" ){
			returnObj = Object.values( obj );
		}else{
			let objKeys = [];

			if( obj.length === undefined ){
				objKeys = Object.keys( obj );
			}else{
				objKeys =  obj;
			}

			let objLength = obj.length;
			for( let i = 0; i < objLength; i++ ){
				returnObj.push( objKeys[ i ] );
				//returnObj.push( Object.keys( objKeys[ i ] )[ 0 ] );
			}
		}
		return returnObj;
	},
	getAppType: ()=>{
		if( typeof chrome === 'object' ){
			if( typeof chrome.runtime === 'object' ){
				if( typeof chrome.runtime.getManifest === 'function' ){
					return "plugin";
				}
			}
		}
		return "script";
	},
	getStrCnt( str, seq ){
		return str.split( seq ).length - 1;
	},
	getTitle(){
		return ( document.getElementsByTagName( "title" ).length > 0 )? document.getElementsByTagName("title")[ 0 ].text : "" ;
	},
	getDesc(){
		let returnDesc = "";
		if( document.getElementsByName('description').item( 0 ) !== null ){
			returnDesc = document.getElementsByName('description').item( 0 ).content;
		}
		if( document.getElementsByName('Description').item( 0 ) !== null ){
			returnDesc = document.getElementsByName('Description').item( 0 ).content;
		}
		return returnDesc;
	},
	getKeywords(){
		let returnKeywords = "";
		if( document.getElementsByName('keywords').item( 0 ) !== null ){
			returnKeywords = document.getElementsByName('keywords').item( 0 ).content.split( "," );
		}
		if( document.getElementsByName('Keywords').item( 0 ) !== null ){
			returnKeywords = document.getElementsByName('Keywords').item( 0 ).content.split( "," );
		}

		returnKeywords.map
		return returnKeywords;
	},
	getMetaProps( talknIndex, connection ){

		let metaProps = {
					connection: connection,
					type: ( ( func.isFocusThreadEqSite( talknIndex, connection ) )? "www": "userHand" ),
					title: func.getTitle(),
					thum: "",
					desc: func.getDesc(),
					keywords: func.getKeywords(),
					appId: "",
					androidUrl: "",
					ogFbId: "",
					ogTwId: "",
					ogName: "",
					ogType: ""
		};


		/****************/
		/* thum		*/
		/****************/

		metaProps.thum = func.getDefaultFavicon();
/*
		let wsParams = {};
console.log( "################");
		if( func.isFocusThreadEqSite( talknIndex ) ){
console.log( "A ################");

			metaProps.thum = func.getDefaultFavicon();

		}else{
console.log( "B ################");

			wsParams = func.getWsParams( "index", talknIndex, connection );

			if( wsParams && wsParams.thum )
console.log( wsParams );
			metaProps.thum = wsParams.thum;
		}
*/
		if( metaProps.thum.indexOf(  "//assets.talkn.io/icon/" ) === 0 ){
			metaProps.thum = ( location.protocol === "https:" )? "https:" + metaProps.thum : "http:" + metaProps.thum ;
		}

		let metaLength = document.getElementsByTagName( "meta" ).length - 1;

		for( let i = 0; i < metaLength; i++ ){
			let item = document.getElementsByTagName( "meta" ).item( i );
			let propName = item.getAttribute( "property" );
			let name = item.getAttribute( "name" );

			if( name && name.indexOf( "twitter:site" ) === 0 ){

				metaProps[ "ogTwId" ] = item.getAttribute( "content" );

			}else if( propName && propName.indexOf( "al" ) === 0 ){

				switch( propName ){
				case "al:ios:app_store_id" :
					metaProps[ "appId" ] = item.getAttribute( "content" );
					break;
				case "al:android:url" :
					metaProps[ "androidUrl" ] = item.getAttribute( "content" );
					break;
				}

			}else if( propName && propName.indexOf( "fb" ) === 0 ){

				switch( propName ){
				case "fb:admins":
				case "fb:page_id":
					metaProps[ "ogFbId" ] = item.getAttribute( "content" );
					break;
				}
			}else if( propName && propName.indexOf( "og" ) === 0 ){

				switch( propName ){
				case "og:site_name" :
					metaProps[ "ogName" ] = item.getAttribute( "content" );
					break;
				case "og:type":
					metaProps[ "ogType" ] = item.getAttribute( "content" );
					break;
				}
			}
		}

		return metaProps;
	},
	getDefaultFavicon(){
		let u = document.evaluate("//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href",document,null,2,null).stringValue;
		let h = "http://";
		let hs = "https://";
		let l = location.host;
		if( u.indexOf( h ) || u.indexOf( hs ) ){
			let url = h+l+( u || "/favicon.ico" );
			if( func.getStrCnt( url, "//" ) === 1 ){
				return url;
			}else{
				return u;
			}
		}else{
			return u ;
		}
	},
	getMergeState( state, _state, action ){
		$.extend( true, state[ action.talknIndex ], _state );
		return Object.assign( {}, state );
	},
	isSetCatchResponse( ws, connection ){
		return ( ws.connectionMap[ connection ] )? true : false;
		//return ( typeof( ws._callbacks[ "$" + connection ] ) === "object" )? true : false;
	},
	getThreadScrollData: ( action )=>{
		let returnVal = {};
		returnVal.talknIndex = action.talknIndex;
		returnVal.called = action.called;
		returnVal.connection = action.connection;
		returnVal.threadPostCnt = parseInt( $( "#talkn" + action.talknIndex + " .postBlocks li" ).length );
		returnVal.threadHeight = parseInt( $( "#talkn" + action.talknIndex + " .threadPostBlocks ol" ).height() ),
		returnVal.threadScrollTop =  parseInt( $( "#talkn" + action.talknIndex + " .threadPostBlocks" ).scrollTop() ),
		returnVal.threadScrollHeight = parseInt( $( "#talkn" + action.talknIndex + " .threadPostBlocks" ).height() ),
		returnVal.viewScreenBottom = returnVal.threadScrollTop + returnVal.threadScrollHeight;
		returnVal.isBottom = ( ( returnVal.threadHeight - define.style.isBottomConditionRange ) <= returnVal.viewScreenBottom )? true : false ;
		returnVal.threadHiddenHeight =   parseInt( $( "#talkn" + action.talknIndex + " .threadHidden" ).height() );

		return returnVal;
	},
	getSelector: ( talknIndex )=>{
		return {
			"$root": $( "#talkn" + talknIndex + " root" ),
			"$container": $( "#talkn" + talknIndex + " container" ),
			"$knob": $( "#talkn" + talknIndex + " knob" ),
			"$resizeKnob": $( "#talkn" + talknIndex + " resizeKnob" ),
			"$main": $( "#talkn" + talknIndex + " main" )
		}
	},
	isOpen( $container ){
		return ( parseInt( $container.height() ) <= parseInt( define.style.displayAreaHeight ) )? false : true ;
	},
	getMatrixX( transform ){
		let Xper = transform.replace('matrix(', '').replace(')','').split(',')[ 12 ] ;
		if( Xper !== undefined ) return parseInt( Xper );
		let Xpx = transform.replace('matrix(', '').replace(')','').split(',')[ 4 ] ;
		if( Xpx !== undefined ) return parseInt( Xpx );
		return 0;
	},
	getMatrixY( transform ){
		let Yper = transform.replace('matrix(', '').replace(')','').split(',')[ 13 ] ;
		if( Yper !== undefined ) return parseInt( Yper );
		let Ypx = transform.replace('matrix(', '').replace(')','').split(',')[ 5 ] ;
		if( Ypx !== undefined ) return parseInt( Ypx );
		return 0;
	},
	getMatrixZ( transform ){
		return parseInt( transform.replace('matrix(', '').replace(')','').split(',')[ 14 ] );
	},
	getWidthPerToPx( per, intFlg = true ){
		per = ( typeof per === "number" )? per + "" : per ;
		if( per.indexOf( "%" ) !== -1 ){
			per = Math.ceil( ( parseInt( window.innerWidth ) ) * ( parseInt( per ) / 100 ) );
		}
		return ( intFlg )? parseInt( per ) : per + "px";
	},
	getHeightPerToPx( per, intFlg = true ){
		per = ( typeof per === "number" )? per + "" : per ;
		if( per.indexOf( "%" ) !== -1 ){
			per = Math.ceil( ( parseInt( window.innerHeight ) ) * ( parseInt( per ) / 100 ) );
		}
		return ( intFlg )? parseInt( per ) : per + "px";
	},
	getWidthPxToPer( px, intFlg = true ){
		px = ( typeof px === "number" )? px + "" : px ;
		if( px.indexOf( "px" ) !== -1 ){
			px = Math.ceil( ( parseInt( px ) / parseInt( window.innerWidth ) ) * 100  );
		}
		return ( intFlg )? parseInt( px ) : px + "%";
	},
	getHeightPxToPer( px, intFlg = true ){
		px = ( typeof px === "number" )? px + "" : px ;
		if( px.indexOf( "px" ) !== -1 ){
			px = Math.ceil( ( parseInt( px ) / parseInt( window.innerHeight ) ) * 100  );
		}
		return ( intFlg )? parseInt( px ) : px + "%";
	},
	getMode( baseWidth = window.innerWidth ){

		let bootMood = "screen3";

		baseWidth = func.getWidthPerToPx( baseWidth );

		if( baseWidth <= define.modeModel.screen1.maxWidth ){

			bootMood = "screen1";
		}

		if( baseWidth >= define.modeModel.screen2.minWidth ){
			if( baseWidth <= define.modeModel.screen2.maxWidth ){
				bootMood = "screen2";
			}
		}

		return bootMood;
	},
	getTalknThreadType( connection ){
		return ( connection.indexOf( location.hostname ) !== false )? "www" : "makeUser" ;
	},
	toUpperFirstStr( str ) {
		return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
	},
	setObjFlgs( obj, trueKey = null ){
		let objLength = Object.keys( obj ).length - 1;
		for( let i = 0; i < objLength; i++ ){
			let key = Object.keys( obj )[ i ];
			obj[ key ] = ( trueKey !== null && trueKey === key )? true : false ;
		}
		return obj;
	},
	getPlainIconFind( connection, root ){

		connection = func.escape( connection );
		let events = ( define.isTouch )?
					"ontouchstart=talknAPI.find({connection:'" + connection + "'}) ":
					"onClick=talknAPI.find({connection:'" + connection + "'}) " ;

		return $(
			"<div " + events +
				"style='" +
				"display: table;" +
				"margin: 10px 0px 10px 0px;" +
				"padding: 1px 15px 0px;" +
				"border-radius: 50px;" +
				"line-height: 23px;" +
				"background: " + root.customColor.drawBgColor1 + ";" +
				"cursor: pointer;" +
				"color: rgb(238, 238, 238);'>" +

				"<div style='display: table-cell;vertical-align: middle'>" +
					"<i style='" +
						"box-sizing: initial;" +
						"position: relative;" +
						"display: table-cell;" +
						"padding: 0px;" +
						"margin: 0px;" +
						"background: rgba(255, 255, 255, 0.8);" +
						"border: 1px solid " + root.customColor.drawBgColor1 + ";" +
						"border-radius: 14px;" +
						"width: 14px;" +
						"min-width: 14px;" +
						"height: 14px;" +
						"min-height: 14px;" +
						"transform: scale(1.4);" +
						"transition: 500ms;" +
						"cursor: pointer;" +
						"top: 0px;" +
						"left: -10px;'>" +

							"<div style='" +
								"display: block;" +
								"background: " + root.customColor.drawBgColor1 + ";" +
								"border-radius: 14px;" +
								"width: 9px;" +
								"height: 2px;" +
								"transform: translate3d(2.5px, 6px, 1px);'>" +
							"</div>" +
							"<div style='" +
								"display: block;" +
								"background: " + root.customColor.drawBgColor1 + ";" +
								"border-radius: 14px;" +
								"width: 2px;" +
								"height: 9px;" +
								"transform: translate3d(6px, 1px, 1px);'>" +
							"</div>" +
					"</i>" +
				"</div>" +
				"<div style='display: table-cell'>" +
					connection +
				"</div>" +
			"</div>" ).prop( "outerHTML" )

	}
}
