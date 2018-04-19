
export default {
	session:{ 'thread':{}, 'MyIndex': {}, 'thread_height_map': {},'talkn_mode': {}, "talkn_mode_index": {}, "user": {} },
	local:{ 'user': {}, 'favorite': {}, 'MyIndex': [] },
	init: function(){
		let sessionCnt	= Object.keys( talkn.cache.session ).length;
			for( let i = 0; i < sessionCnt; i++ ){
				let key		= Object.keys( talkn.cache.session )[ i ];
				let storage	= sessionStorage.getItem( key );
				if( storage === null ){
					let type	= ( talkn.cache.session[ key ] instanceof Array )? '[]' : '{}' ;
					sessionStorage.setItem( key, type );
				}
			}

			let localCnt	= Object.keys( talkn.cache.local ).length;
				    
			for( let i = 0; i < localCnt; i++ ){
				let key			= Object.keys( talkn.cache.local )[ i ];
				let storage		= localStorage.getItem( key );
				if( storage === null ){
					let type		= ( talkn.cache.local[ key ] instanceof Array )? '[]' : '{}' ;
					localStorage.setItem( key, type );
				}
			}
			talkn.cache.select( [ 'thread', 'MyIndex', 'thread_height_map' ] );
	},
			    
	select: function( select ){
		select = ( select instanceof Array )? select : [ select ] ;
		for( let i = 0, max = select.length; i < max; i++ ){
					    
			if( typeof( talkn.cache.session[ select[ i ] ] ) !== 'undefined' ){
				talkn.cache.session[ select[ i ] ] = JSON.parse( sessionStorage.getItem( select[ i ] ) );
			}
					    
			if( typeof( talkn.cache.local[ select[ i ] ] ) !== 'undefined' ){
				talkn.cache.local[ select[ i ] ] = JSON.parse( localStorage.getItem( select[ i ] ) );
			}
		}
	},
	set_default: function( selected, key, default_value ){
				    
		if( typeof( talkn.cache.session[ selected ] ) !== 'undefined' ){
			if( typeof( talkn.cache.session[ selected ][ key ] ) === 'undefined' ){
				talkn.cache.session[ selected ][ key ] = default_value;
			}
		}
				    
		if( typeof( talkn.cache.local[ selected ] ) !== 'undefined' ){
			if( typeof( talkn.cache.local[ selected ][ key ] ) === 'undefined' ){
				talkn.cache.local[ selected ][ key ]  = default_value;
			}
		}
	},
	save: function( selected ){
		selected = ( selected instanceof Array )? selected : [ selected ] ;
		for( let i = 0, max = selected.length; i < max; i++ ){

			if( typeof( talkn.cache.session[ selected[ i ] ] ) !== 'undefined' ){
				sessionStorage.setItem( selected[ i ], JSON.stringify( 	talkn.cache.session[ selected[ i ] ] ) );
			}

			if( typeof( talkn.cache.local[ selected[ i ] ] ) !== 'undefined' ){
				localStorage.setItem( selected[ i ], JSON.stringify( talkn.cache.local[ selected[ i ] ] ) );
			}
		}
		talkn.cache.select( selected );
	},
	clear: function(){

		if( window.ontouchstart === undefined  ){
			//console.log( 'clear!!' );
		}else{
			//console.log( 'clear!!' );
		}

		let sessionCnt			    	= Object.keys( talkn.cache.session ).length;
		for( let i = 0; i < sessionCnt; i++ ){
			let key				= Object.keys( talkn.cache.session )[ i ];
			let type	    		= ( talkn.cache.session[ key ].length === undefined )? {} : [] ;
			talkn.cache.session[ key ]	= type;
		}
		let localCnt				= Object.keys( talkn.cache.local ).length;

		for( let i = 0; i < localCnt; i++ ){
			let key				= Object.keys( talkn.cache.local )[ i ];
			let type			= ( talkn.cache.local[ key ].length === undefined )? {} : [] ;
			talkn.cache.local[ key ]	= type;
		}
		sessionStorage.clear();
		localStorage.clear();
		return true;
	}
}

