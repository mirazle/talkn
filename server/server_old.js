
/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

talknServer	= {
	path: '/usr/share/app/talkn/node_modules/',
	db: null,
	io: null,
	$: null,
	setting: {},
	plugin:{
		cheerio:{},
		iconv: {},
		buffer:{},
		request: {},
		fs:{},
		twit: {},
		fb: {}
	},
	// ISO 639-1
	localMap:{ jp: 'ja', cn: 'zh', de: 'de', fr: 'fr', gb: 'gb', br: 'br', us: 'en'},
	setting: {
		'sync_time' :			500,
		'stream_sync_term':		12,
		'stream_sync_term_cnt':		12,
		'ssl':				{ key: '/etc/letsencrypt/live/discovery-plus.com/cert.pem', cert: '/etc/letsencrypt/live/discovery-plus.com/privkey.pem' },
		'socket_io':			{ host: 'localhost', http_port: 10001, https_port: 10443 },
		'redis':			{ host: 'localhost', port: 6379 },
		'mongo':			{ host: 'localhost', port: 27017, dbName: 'talkn', option: { server: { auto_reconnect: true } } },
		'tw':				{
							consumer_key: 'weOPdMaNu1aIr95WotqOA',
							consumer_secret: 'nl8OqDEnYqlEhPqgrIJ3GRGy5FcIWsx0lk0Ie81V8',
							access_token: '2240641298-52mCPHiTBTVNsNRVcNC9RNCkope0NJpNTXpuprv',
							access_token_secret: 'cz8u3UlUeWudYXVRxGFOUpxaBq4T3neHITBESLWidxAjw'
		},
		'fb':				{
							client_id: '582222711884785',
							client_secret: 'd3cb97cb6fb63c458b09ca02f0c8f0e5',
							grant_type: 'client_credentials'
		},
		'fbAccessToken':		{}
	},
	ins:{
		'tw': {},
		'fb': {}
	},
	schema:{
		post:{
			uid: { type: String, default: '' },
			connections: { type: [String], default: [] },
			connection: { type: String, default: '' },
			title: { type: String, default: '' },
			thum: { type: String, default: '' },
			talk: { type: String, default: '' },
			postTime: { type: Date, default: Date },
			data: { type: Object, default:{} },
			dispFlg:{ type: Boolean, default: true }
		},
		index: {
			connection: { type: String, default: ""  },
		 	type: { type: String, default: "userHand" },
			title: { type: String, default: "" },
			thum: { type: String, default: "//assets.talkn.io/icon/default.png" },
		 	layer: { type: Number, default: 0 },
			cnt: { type: Number, default: 0 },
			watchCnt:{ type: Number, default: 0 },
			updatedTime: { type: Date, default: Date },
			meta:{
				appId: { type: String, default: "https://itunes.apple.com/jp/store" },
				androidUrl: { type: String, default: "https://play.google.com/store/apps" },
				ogName: { type: String, default: "" },
				ogType: { type: String, default: "" },
				ogTwId: { type: String, default: "https://twitter.com" },
				ogFbId: { type: String, default: "https://facebook.com" },
				desc: { type: String, default: "" },
				keywords: { type: [String] , default: [] }
			}
		} 
	},
	boot: function(){

		var DomParser = require('dom-parser');

		talknServer.plugin.iconv	= require( "iconv" ).Iconv;
		talknServer.plugin.buffer	= require( "buffer" ).Buffer;
		talknServer.plugin.cheerio	= require("cheerio");
		talknServer.plugin.request	= require('request');
		talknServer.plugin.fs		= require('fs');
		talknServer.plugin.twit		= require('twit');
		talknServer.plugin.fb		= require('fb');
		var redis			= require( talknServer.path + 'socket.io-redis');
		var emitter			= require( talknServer.path + 'socket.io-emitter')({ host: talknServer.setting.redis.host, port: talknServer.setting.redis.port });
		$			    	= require( talknServer.path + 'jquery-deferred'); 

		if( process.argv[2] == "ssl" ){
			console.log( "HTTPS MODE" );
			var https		= require('https');
			var httpsServer		= https.createServer( {key: talknServer.plugin.fs.readFileSync('/etc/letsencrypt/live/talkn.io/privkey.pem'), cert: talknServer.plugin.fs.readFileSync('/etc/letsencrypt/live/talkn.io/cert.pem')} );
			httpsServer.listen( talknServer.setting.socket_io.https_port );
			talknServer.io		= require( talknServer.path + 'socket.io')( httpsServer );
		    
		}else{
			console.log( "HTTP MODE" );
			talknServer.io		= require( talknServer.path + 'socket.io')( talknServer.setting.socket_io.http_port );
		}

		talknServer.io.adapter( redis( { host: talknServer.setting.redis.host, port: talknServer.setting.redis.port } ) );

		if( this.db == null ){

			// connection option
			this.db				= [];
			this.db['mongoose']		= require( talknServer.path +  'mongoose' );
			this.db['mongoose'].Promise	= global.Promise;
			this.db['Schema']		= this.db['mongoose'].Schema;
			this.db['con']			= this.db['mongoose'].createConnection('mongodb://' + talknServer.setting.mongo.host + ':' + talknServer.setting.mongo.port + '/' + talknServer.setting.mongo.dbName, talknServer.setting.mongo.option );
			this.db['Schema']['setting']	= new this.db['Schema']( this.schema.setting,	{collection: "setting"} );
			this.db['Schema']['index']	= new this.db['Schema']( this.schema.index, 	{collection: "index"} );
			this.db['Schema']['post']	= new this.db['Schema']( this.schema.post, 	{collection: "post"} );

			// collection list
			this.db['setting']		= this.db['con'].model( "setting",this.db['Schema']['setting'] );
			this.db['index']  		= this.db['con'].model( "index",this.db['Schema']['index'] );
			this.db['post']			= this.db['con'].model( "post",	this.db['Schema']['post'] );

			talknServer.db[ 'index' ].update( { watchCnt:{ $exists: true, $ne: 0 } }, { $set:{ watchCnt: 0 } }, { upsert:false, multi: true }, function(){});

			talknServer.db[ 'setting' ].find( {}, {}, {}, function( error, setting ){
			    talknServer.setting  = setting[ 0 ];
			    talknServer.io.on( 'connection', talknServer.onUserEvents );
			});
		}

		talknServer.ins.tw = new talknServer.plugin.twit( talknServer.setting.tw );
		talknServer.api.social.setFbAccessToken();
	},
	onUserEvents: function( user ){

		console.log( 'connection( ' + user.nsp.name + ' ) ' + user.conn.id );

		user.dispThread = "";

		// Emit To User 
		talknServer.emitOneUser( 'getSettingData', user, this )();

		// Emit To All User In All Provider Node( Index )
		user.on( 'postTalkn',		talknServer.postTalkn );

		// Emit To One User In One Provider Node( DB: post )
		user.on( 'getIndexPost',	talknServer.emitOneUser( 'getIndexPost', user, this ) );

		user.on('disconnect', function(){
			talknServer.updateWatchCnt( { connection: user.dispThread }, -1 );
		});

		/****************/
		/* 	API	*/
		/****************/
	
		// Emit To One User In One Provider Node( DB: meta )
		user.on( 'getApiMeta',		talknServer.emitOneUser( 'getApiMeta', user, this ) );

		// Emit To One User From Social
		user.on( 'getApiSocial',	talknServer.emitOneUser( 'getApiSocial', user, this ) );
		
		// Emit To One User From Movie
		user.on( 'getApiMovie',		talknServer.emitOneUser( 'getApiMovie', user, this ) );

		// Emit To One User From Picture
		user.on( 'getApiPicture',	talknServer.emitOneUser( 'getApiPicture', user, this ) );

		// Emit To One User From Wikipedia 
		user.on( 'getApiWikipedia',	talknServer.emitOneUser( 'getApiWikipedia', user, this ) );

		// Emit To One User From Analyze 
		user.on( 'getApiAnalyze',	talknServer.emitOneUser( 'getApiAnalyze', user, this ) );


	},

	postTalkn: function( req ){

		  var savePost   = function( req ){
			
			var d		= new $.Deferred;
			var thum	= req.post.protcol + "//assets.talkn.io/icon/" + req.post.indexId + ".png";

			   talknServer.plugin.request(
				    {method: 'GET', url: thum, encoding: null},
				    function (error, response, body){

					     var saveIconFlg	  = ( !error && response.statusCode === 200 )? true : false ;
					     var newPost	      = new talknServer.db[ 'post' ]();
					     newPost.talk	     = req.post.talk;
					     newPost.connection      = req.post.connection;
					     newPost.thum	     = ( saveIconFlg )? thum : "//assets.talkn.io/img/default.png" ;
					     //newPost.thum	     = ( saveIconFlg )? "//assets.talkn.io/icon/" + newPost._id + ".png" : "//assets.talkn.io/img/default.png" ;
					     newPost.uid	      = req.post.uid;
					     newPost.title	    = req.post.title;
					     newPost.connections     = [ "/" ];

					     if( saveIconFlg ){
						      talknServer.plugin.fs.writeFileSync('../assets/icon/' + newPost._id + '.png', body, 'binary');
					     }

					     if( req.post.connection !== "/" ){

						      var connectionArr		 = req.post.connection.split( '/' );
						      var connectionLength	     = connectionArr.length;
						      var connectNewConnection	 = '';

						      for( var i = 1; i < connectionLength; i++ ){

								connectNewConnection    += ( '/' + connectionArr[ i ] );
								newPost.connections.push( connectNewConnection );
						      }
					     }

					     newPost.save( function( err, savedPost, savedPostCnt ){

						      if( err == null && savedPostCnt > 0 ){

								/********************/
								/* META	      */
								/********************/

								var connectionLength    = savedPost.connections.length;
								var date		  = talknServer.util.getDate();

								for( var i = 0; i < connectionLength; i++ ){

									 var set	  = {$set:{ meta:{}}};
									 var connection  = savedPost.connections[ i ];
									 var layer	= ( layer == 0 )? 1 : i ;
									 var condition   = { connection: connection };

									 if( req.post.connection === connection ){

										  set     = { $inc:{cnt: 1}, $set:{ connection:connection, meta:{}, layer:layer, updateTime: date.now}};

										  if( req.post.title && req.post.title !== "" ) set[ "$set" ][ "title" ] = req.post.title;
										  if( req.post.thum && req.post.thum !== "" ) set[ "$set" ][ "thum" ] = savedPost.thum;
									 }else{

										  set	  = { $inc:{cnt: 1}, $set:{ connection: connection, layer: layer } };
									 }

									 talknServer.db[ 'index' ].update( condition, set, {upsert:true}, function( err , index, saved ){});
								}

								d.resolve( savedPost );
						      }
					     });

				    }
			   );
			   return d.promise();
		  }

		  savePost( req ).done( function( saved ){
			   
			// response
			   var response		      = {};
			   var connectionLength	     = saved.connections.length;
			   response.post		     = ( saved.length == undefined )? [ saved ] : saved ;

			   for( var i = 0 ; i < connectionLength ; i++ ){

				    response.connection     = saved.connections[ i ];
				    response.length	  = 1;
				    response.called	  = 'savePost';

				    talknServer.io.emit( response.connection, response );

				    console.log( '====###### Broadcast: ' + response.connection + '(' + response.length + ') ' );
			   }
		  });
	},
	updateWatchCnt: function( condition, cnt ){

		talknServer.db[ 'index' ].update( condition, { $inc: { watchCnt: cnt } }, {upsert:true}, function( err , index ){
			talknServer.db[ 'index' ].find( condition, { connection: true, watchCnt: true }, function( err , data ){
				var response = data[ 0 ]
				talknServer.io.emit( response[ "connection" ], { called: "updateWatchCnt", connection: response[ "connection" ], watchCnt: response[ "watchCnt" ] } );
			});
		});
	},
	emitOneUser: function( type, user, self ){

		switch( type ){
		case "getSettingData":

			return function(){
				var setting = talknServer.setting;
				//var response = Object.assign( {}, setting._doc, { uid: user.conn.id, called: "getSettingData"}); 
				var response = { uid: user.conn.id, called: "getSettingData"}; 
				user.emit( 'me', response );
			}
			break;
		case 'getIndexPost':

			return function(){

				var parallelRequest    		= new Array();
				var talknIndex			= arguments[ '0' ]['talknIndex'];
				var connection			= arguments[ '0' ]['connection'];
				var protcol			= arguments[ '0' ]['protcol'];
				var dispThreadFlg		= arguments[ '0' ]['dispThreadFlg'];
				var offsetPostTime		= arguments[ '0' ]['offsetPostTime'];
				var limit			= arguments[ '0' ]['limit'];
				var called			= arguments[ '0' ]['called']; 
				var params			= { condition:{ connections: connection }, select:{}, option:{limit: limit, sort: { postTime: -1 } } };
				if( offsetPostTime ) params.condition.postTime = {$lt: new Date( offsetPostTime ).toISOString()} ;

console.log(arguments['0']);

				var findPost		= function( params, d ){

					var condition   = ( typeof( params.condition ) == 'undefined' )?{}		: params.condition ;
					var select	= ( typeof( params.select ) == 'undefined' )?   {}		: params.select ;
					var option	= ( typeof( params.option ) == 'undefined' )?   {}		: params.option ;
					var callback	= talknServer.getClousur( 'findPost', { d: d } );

					talknServer.db[ 'post' ].find( condition, select, option, callback );

					if( d ) return d.promise();
				}
				
				var findIndex	= function( params, d ){
				
					var condition = { connection: connection }
					var callback	= talknServer.getClousur( "findIndex", { d: d } );

					talknServer.db[ 'index' ].find( condition, {}, {}, callback );

					if( d ) return d.promise();
				}

				parallelRequest.push( findIndex( params, new $.Deferred ) );
				parallelRequest.push( findPost( params, new $.Deferred ) );

				$.when.apply( null, parallelRequest ).done(function() {

					var index	= {};
					var post	= [];

					for( var i = 0, max = Object.keys( arguments ).length; i < max; i++ ){

						if( arguments[ i.toString() ][ "requestType" ] === "findPost" ){
							
							// Post
							post = post.concat( arguments[ i.toString() ][ "response" ] );
						}

						if( arguments[ i.toString() ][ "requestType" ] === "findIndex" ){
		
							// Index( include meta )
							index	= ( arguments[ i.toString() ][ "response" ].length > 0 )? arguments[ i.toString() ][ "response" ][ 0 ] : new talknServer.db['index']() ;
							index.connection = connection;
						}
						
						// last loop
						if( i == max -1 ){

							post.reverse();
							var response		= {};
							response.talknIndex	= talknIndex;
							response.connection	= connection;
							response.index		= index;
							response.post		= post;
							response.called 	= called;

							// Emit to client
							var result = user.emit( 'me', response );

							/************************/
							/* EMIT CONNECTION CNT	*/
							/************************/
console.log("### 1");
							if( dispThreadFlg || user.dispThread === "" ){
console.log("### 2");

								talknServer.updateWatchCnt( { connection: user.dispThread }, -1 );

								user.dispThread = connection;
							
								talknServer.updateWatchCnt( { connection: user.dispThread }, 1 );

								if( true ){
								//if( index.meta.desc === "" ){
console.log("### 3");

									var host = user.dispThread.split("/")[1];

									talknServer.plugin.request(
										{method: 'GET', url: protcol + "//" + host , encoding: 'binary' },
										function (error, response, body){

console.log("### 4");
console.log(protcol + "//" + host );

											if( !error && response && response.statusCode === 200 ){
console.log("### 5");

												var date    	= talknServer.util.getDate();
												var utf8Body	= talknServer.util.toUtf8( body );
												var $		= talknServer.plugin.cheerio.load( utf8Body );
												var host	= response.request.uri.hostname;

												var layer	= ( connection === "/" )? 0 : connection.split( "/" ).length - 1;
												var condition	= { connection: connection };
												var set		= { $set:{ connection: connection, meta:{}, layer:layer, updateTime: date.now}};

												set[ "$set" ].title = $( "title" ).text();
												set[ "$set" ].thum = host + "/favicon.ico";
												set[ "$set" ].type = "www";
												var metaLength = $( "meta" ).length;
												var linkLength = $( "link" ).length;

												for( var i = 0; i < linkLength; i++ ){

													var item = $( "link" ).get( i );

													if( item.attribs.rel && item.attribs.href){

														if( item.attribs.rel.indexOf( "icon" ) !== -1 || item.attribs.rel.indexOf( "ICON" ) !== -1 ){
															
															if( item.attribs.href.indexOf("?") !== -1 ){
																set[ "$set" ][ "thum" ] = item.attribs.href.split("?")[0];
															}else{
																set[ "$set" ][ "thum" ] = item.attribs.href;
															}

															break;
														}
													}
												}

												for( var j = 0; j < metaLength; j++ ){

													var item = $( "meta" ).get( j );
													var propName = ( item.attribs.property )? item.attribs.property : "" ;
													var name = ( item.attribs.name )? item.attribs.name : false ;
													var content = ( item.attribs.content )? item.attribs.content : "" ;

													if( name && ( name === "keywords" || name === "Keywords" ) ){
														
														set[ "$set" ][ "meta" ][ "keywords" ] = content.split( "," );
													
													}else if( name && ( name === "description" || name === "Description" ) ){
														
														set[ "$set" ][ "meta" ][ "desc" ] = content;
														
													}else if( name && name.indexOf( "twitter:site" ) === 0 ){

														set[ "$set" ][ "meta" ][ "ogTwId" ] = content;

													}else if( propName && propName.indexOf( "al" ) === 0 ){
	    
														switch( propName ){
														case "al:ios:app_store_id" :
															set[ "$set" ][ "meta" ][ "appId" ] = content;
															break;
														case "al:android:url" :
															set[ "$set" ][ "meta" ][ "androidUrl" ] = content
															break;
														} 

													}else if( propName && propName.indexOf( "fb" ) === 0 ){

														switch( propName ){
														case "fb:admins":
														case "fb:page_id":
															set[ "$set" ][ "meta" ][ "ogFbId" ] = content;
															break;
														}

													}else if( propName && propName.indexOf( "og" ) === 0 ){

														switch( propName ){
														case "og:site_name" :
						
															set[ "$set" ][ "meta" ][ "ogName" ] = content;
															break;
														case "og:type":
															set[ "$set" ][ "meta" ][ "ogType" ] = content;
															break;
														}
				
													} 
												}


												var thum = ( set["$set"]["thum"].indexOf("http") === 0 )?
														set["$set"]["thum"] :
														protcol + "//" + set["$set"]["thum"];

console.log("### 6");
												talknServer.plugin.request({method: 'GET', url: thum, encoding: null}, function (error, response, body){
console.log("### 7");
				
													var saveIconFlg		= ( !error && response.statusCode === 200 )? true : false ;
								
													if( saveIconFlg ){
console.log("### 8");
														talknServer.plugin.fs.writeFileSync('../assets/icon/' + index._id + '.png', body, 'binary');
													}

													talknServer.db[ 'index' ].update( condition, set, {upsert:true}, function( err , index, saved ){
console.log("### 9");

														var response = {}
														response.connection = connection;
														response.talknIndex = talknIndex;
														response.called = "getApiMeta";
														response.index = set[ "$set" ];
														response.index.connection = connection;

														// Emit to client
														var result = user.emit( 'me', response );
													});
												});
											}
										});
								}
/*
								talknServer.plugin.request(
									{method: 'GET', url: "http:/" + user.dispThread, encoding: null},
									function (error, response, body){
										if( !error && response.statusCode === 200 ){
										}
									}
								);
*/
							}
						}
					}
				});
			}
			break;
		case 'getApiMeta':

			return function(){

				var talknIndex = arguments[ '0' ]['talknIndex'];
				var connection = arguments[ '0' ]['connection'];
				var condition = { connection: connection }

				talknServer.api.meta( user, talknIndex, connection, condition );

/*
				var talknIndex = arguments[ '0' ]['talknIndex'];
				var connection = arguments[ '0' ]['connection'];
				var condition = { connection: connection }

				talknServer.db[ 'index' ].find( condition, {}, {}, function( error, obj ){

					let response = {}
					response.connection = connection;
					response.talknIndex = talknIndex;
					response.called = "getApiMeta";
					response.index = ( obj.length > 0 )? obj[ 0 ] : new talknServer.db[ "index" ]() ;
					response.index.connection = connection;

					// Emit to client
					var result = user.emit( 'me', response );
				} );
*/
			}
			break;
		case "getApiSocial" :
			return function(){

				var talknIndex = arguments[ '0' ]['talknIndex'];
				var connection = arguments[ '0' ]['connection'];

				talknServer.ins.tw.get('search/tweets', {
							q: connection,
							local: talknServer.localMap[ "jp" ], 
							lang: talknServer.localMap[ "jp" ],
							count: 20
				}, function(err, data, response) {
					data.called = "getApiSocial";

					// Emit to client
					user.emit( 'me', data );
				});

/*
				request.get('https://graph.facebook.com/search' , {
					qs: {
							q:req.query.keyword,
							type:'page',    // post page user event group place checkin
							limit:20,
							locale: local_map[ req.query.country ],
							access_token: fb_access_token
					},
					json: true
				}, function( err, fb_res, data ){
					res.json({Facebook: data });
				});
*/
			}
		case "getApiMovie" :
			return function(){

				let response = {}
				response.called = "getApiMovie";
				
				// Emit to client
				user.emit( 'me', response );
			}
		case "getApiPicture" :
			return function(){

				let response = {}
				response.called = "getApiPicture";
				
				// Emit to client
				user.emit( 'me', response );
			}
		case "getApiWikipedia" :
			return function(){

				let response = {}
				response.called = "getApiWikipedia";
				
				// Emit to client
				user.emit( 'me', response );
			}
		case "getApiAnalyze" :

			return function(){

				var talknIndex = arguments[ '0' ]['talknIndex'];
				var connection = arguments[ '0' ]['connection'];
				var condition = { connection: connection }

				talknServer.db[ 'index' ].find( condition, {}, {}, function( error, obj ){

					let response = {}
					response.connection = connection;
					response.talknIndex = talknIndex;
					response.called = "getApiAnalyze";
					response.index = ( obj.length > 0 )? obj[ 0 ] : new talknServer.db[ "index" ]() ;
					response.index.connection = connection;

					// Emit to client
					var result = user.emit( 'me', response );
				} );
			}
			break;
		}
	},
	getClousur: function( requestType, embed ){
		return function( error, response ){
			embed.d.resolve( { requestType: requestType, response: response } );
		}
	},
	api:{

		meta: function( user, talknIndex, connection, condition ){

			talknServer.db[ 'index' ].find( condition, {}, {}, function( error, obj ){

				let response = {}
				response.connection = connection;
				response.talknIndex = talknIndex;
				response.called = "getApiMeta";
				response.index = ( obj.length > 0 )? obj[ 0 ] : new talknServer.db[ "index" ]() ;
				response.index.connection = connection;

				// Emit to client
				var result = user.emit( 'me', response );
			} );
		},

		social:{
			Twitter: function( req, res ){
				var T = new talknServer.plugin.twit({
					consumer_key: 'weOPdMaNu1aIr95WotqOA',
					consumer_secret: 'nl8OqDEnYqlEhPqgrIJ3GRGy5FcIWsx0lk0Ie81V8',
					access_token: '2240641298-52mCPHiTBTVNsNRVcNC9RNCkope0NJpNTXpuprv',
					access_token_secret: 'cz8u3UlUeWudYXVRxGFOUpxaBq4T3neHITBESLWidxAjw'
				});
				
				T.get('search/tweets', {
							q: req.query.keyword,
							local: local_map[ req.query.country ],
							lang: local_map[ req.query.country ],
							count: 20
				}, function(err, data, response) {
				
				});
			},
			Facebook: function( req, res ){

			},
			setFbAccessToken: function(){

				talknServer.plugin.fb.api( 'oauth/access_token', talknServer.setting.fb, function (res) { 

					if(!res || res.error) {
		
						return; 
					}

					if( !talknServer.setting){
						talknServer.setting = {};
					}
					talknServer.setting.fbAccessToken = res.access_token;

				}); 
			}
		}
	},
	util:{
		toUtf8: function( dom ){
			var iconv = new talknServer.plugin.iconv( talknServer.util.getCharset( dom ), 'UTF-8//TRANSLIT//IGNORE');
			var dom = new talknServer.plugin.buffer( dom, 'binary' );
			dom = iconv.convert( dom ).toString();
			return dom;
		},
		getCharset: function( dom ){
			var bin = dom.toString('binary');
			var re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
			return ( re )? re[ 1 ] : "utf-8";
		},
		getDate: function(){

			var date	= {};
			date.obj	= new Date();
			date.Y  	= date.obj.getFullYear();
			date.m		= talknServer.util.grantZero( talknServer.util.grantZero( date.obj.getMonth() + 1 ) );
			date.d  	= talknServer.util.grantZero( date.obj.getDate() );
			date.H		= talknServer.util.grantZero( date.obj.getHours() );
			date.i  	= talknServer.util.grantZero( date.obj.getMinutes() );
			date.s		= talknServer.util.grantZero( date.obj.getSeconds() );
			date.ms 	= date.obj.getMilliseconds();
			date.youbi 	= talknServer.util.grantZero( date.obj.getDay() );
			date.now	= ( date.Y + '-' + date.m + '-' + date.d + ' ' + date.H + ':' + date.i + ':' + date.s + '.' + date.ms ).toString(); 

			return date;
		},
		grantZero: function( num ){
			return ( num == '*' )? num : ( "0" + num ).slice( -2 );
		}
	}
}

/*****************************/
/*	START TALKN
/*****************************/

talknServer.boot();

