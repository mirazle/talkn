/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import Actions from '~/actions';
import sequence from '~/../common/sequence'

class TalknServer{

	constructor(){
		this.connection = this.connection.bind(this);
	}

	async start(){
		const setting = await Actions.setUp();
		const io = await Actions.getIo();
		io.on( 'connection', this.connection );
		return true;
	}

	connection( ioUser ){
		Object.keys( sequence.sequenceMap ).forEach( endpoint => {
			ioUser.on( endpoint, ( requestState ) => {
				Actions[ endpoint ]( sequence.sequenceMap[ endpoint ], ioUser, requestState );
			});
		});
	}
}

const talknServer = new TalknServer();
talknServer.start();

const _talknServer = {
	params:{
		socket: null,
		io: null,
		User: null,
		MongoDB: null,
	},
	actions: {},
	io: null,
	setup: function(){

		let io;
		io = Actions.Setup.runIoServer();
		io = Actions.Setup.runRedisServer(io);
		const MongoDB = Actions.Setup.runMongoDB();

		// All watchCnt update 0(reset)
    MongoDB[ 'Index' ].update(
      { watchCnt:{ $exists: true, $ne: 0 } },
      { $set:{ watchCnt: 0 } },
      { upsert:false, multi: true }
    );

    // Get Setting Data.
    MongoDB[ 'Setting' ].findOne( talknServer.boot );
	},
	boot: ( error, Setting ) => {

		const ServerStaticSetup =　Actions.Setup(talknServer.params);

		// Connectioned One User.
		talknServer.io.on( 'connection', talknServer.onEndpoints);
	},

	onEndpoints: ( io ) => {

		console.log('====================================== CONNECTION ');

		// Generate talkn user
    const User = new Schemas.User( io );

		Actions.Broadcast.updateWatchCnt( { connection: User.get('connection') }, 1, 'connection' );

		// Emit To All User In All Provider Node( Index )
		io.on( 'postTalkn',		talknServer.postTalkn );

		io.on('disconnect', (param) => {
			console.log('====================================== DISCONNECTION ');

			talknServer.updateWatchCnt( { connection: User.get('connection') }, -1, 'diconnect' );
		});

		/****************/
		/* 	API	*/
		/****************/

		// Emit To User
		talknServer.emitOneUser( 'connectioned', io, User, this )();

		// Emit To One User In One Provider Node( DB: meta )
		io.on( 'getApiMeta',		talknServer.emitOneUser( 'getApiMeta', io, User, this ) );

		// Emit To One User From Analyze
		io.on( 'getApiAnalyze',	talknServer.emitOneUser( 'getApiAnalyze', io, User, this ) );
	},

	postTalkn: function( req ){

		  var savePost   = function( req ){

			var d		= new $.Deferred;
			var thum	= req.post.protcol + "//assets.talkn.io/icon/" + req.post.indexId + ".png";

			   request(
				    {method: 'GET', url: thum, encoding: null},
				    function (error, response, body){

					     var saveIconFlg	  = ( !error && response.statusCode === 200 )? true : false ;
					     var newPost	      = new MongoDB[ 'Post' ]();
					     newPost.talk	     = req.post.talk;
					     newPost.connection      = req.post.connection;
					     newPost.thum	     = ( saveIconFlg )? thum : "//assets.talkn.io/img/default.png" ;
					     //newPost.thum	     = ( saveIconFlg )? "//assets.talkn.io/icon/" + newPost._id + ".png" : "//assets.talkn.io/img/default.png" ;
					     newPost.uid	      = req.post.uid;
					     newPost.title	    = req.post.title;
					     newPost.connections     = [ "/" ];

					     if( saveIconFlg ){
						      fs.writeFileSync('./assets/icon/' + newPost._id + '.png', body, 'binary');
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

									 MongoDB[ 'Index' ].update( condition, set, {upsert:true}, function( err , index, saved ){});
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

				    c( '====###### Broadcast: ' + response.connection + '(' + response.length + ') ', "savePost" );
			   }
		  });
	},
	updateWatchCnt: ( condition, cnt, called )　=> {
		MongoDB[ 'Index' ].update( condition, { $inc: { watchCnt: cnt } }, {upsert:true}, function( err , index ){
			MongoDB[ 'Index' ].find( condition, { connection: true, watchCnt: true }, function( err , data ){
				var response = data[ 0 ];
        if(response['connection']){
				  talknServer.io.emit( response[ "connection" ],
						{ called: "updateWatchCnt",
							connection: response[ "connection" ],
							watchCnt: response[ "watchCnt" ]
						} );
        }
			});
		});
	},
	emitOneUser: ( type, io, User, self ) => {

		switch( type ){
		case "connectioned":

			return function(){

				console.log("############ " + type +" ############");

				const response = {
					Setting: Settings.user,
					User: User,
					called: type
				};
				io.emit( 'me', response );
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

				console.log("############ getIndexPost ############");

				var findPost		= function( params, d ){

					var condition   = ( typeof( params.condition ) == 'undefined' )?{}		: params.condition ;
					var select	= ( typeof( params.select ) == 'undefined' )?   {}		: params.select ;
					var option	= ( typeof( params.option ) == 'undefined' )?   {}		: params.option ;
					var callback	= talknServer.getClousur( 'findPost', { d: d } );

					MongoDB[ 'Post' ].find( condition, select, option, callback );

					if( d ) return d.promise();
				}

				var findIndex	= function( params, d ){

					var condition = { connection: connection }
					var callback	= talknServer.getClousur( "findIndex", { d: d } );

					MongoDB[ 'Index' ].find( condition, {}, {}, callback );

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
							index	= ( arguments[ i.toString() ][ "response" ].length > 0 )? arguments[ i.toString() ][ "response" ][ 0 ] : new MongoDB['Index']() ;
							index = {...index,
									meta: index.meta ? index.meta : {},
									connection
							};
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
							var result = io.emit( 'me', response );

							/************************/
							/* EMIT CONNECTION CNT	*/
							/************************/

							// 今みているスレッドの場合
							if( dispThreadFlg ){

								if( called === "changeThread" ){
									talknServer.updateWatchCnt( { connection: User.get('connection') }, -1, "getIndexPostDisconnect" );
									User.setConnection(connection);
									talknServer.updateWatchCnt( { connection: User.get('connection') }, 1, "getIndexPostConnect" );
								}

								if( true ){

									var host = User.get('connectionTop');

									request(
										{method: 'GET', url: protcol + "//" + host , encoding: 'binary' },
										function (error, response, body){

											if( !error && response && response.statusCode === 200 ){

												var date    	= talknServer.util.getDate();
												var utf8Body	= talknServer.util.toUtf8( body );
												var $		= cheerio.load( utf8Body );
												var host	= response.request.uri.hostname;

												var layer	= ( connection === "/" )? 0 : connection.split( "/" ).length - 1;
												var condition	= { connection: connection };
												var set		= { $set:{ connection: connection, meta:{}, layer:layer, updateTime: date.now}};

												set[ "$set" ].title = $( "title" ).text();
												set[ "$set" ].thum = User.get('origin') + "/favicon.ico";
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

												var thum = set["$set"]["thum"].indexOf("http") === 0 ?
														set["$set"]["thum"] :
														protcol + "//" + set["$set"]["thum"];

												request({method: 'GET', url: thum, encoding: null}, function (error, response, body){
													var saveIconFlg		= ( !error && response.statusCode === 200 )? true : false ;

													if( saveIconFlg ){
														fs.writeFileSync('./assets/icon/' + index._id + '.png', body, 'binary');
													}

													MongoDB[ 'Index' ].update( condition, set, {upsert:true}, function( err , index, saved ){

														var response = {}
														response.connection = connection;
														response.talknIndex = talknIndex;
														response.called = "getApiMeta";
														response.index = set[ "$set" ];
														response.index.connection = connection;

														// Emit to client
														var result = io.emit( 'me', response );
													});
												});
											}
										});
								}
							}
						}
					}
				});
			}
			break;
		case 'getApiMeta':

			return function(){
				console.log("############ getApiMeta ############");
				var talknIndex = arguments[ '0' ]['talknIndex'];
				var connection = arguments[ '0' ]['connection'];
				var condition = { connection: connection }

				talknServer.api.meta( io, talknIndex, connection, condition );
			}
			break;
		case "getApiAnalyze" :

			return function(){
				console.log("############ getApiAnalyze ############");
				var talknIndex = arguments[ '0' ]['talknIndex'];
				var connection = arguments[ '0' ]['connection'];
				var condition = { connection: connection }

				MongoDB[ 'Index' ].find( condition, {}, {}, function( error, obj ){

					let response = {}
					response.connection = connection;
					response.talknIndex = talknIndex;
					response.called = "getApiAnalyze";
					response.index = ( obj.length > 0 )? obj[ 0 ] : new MongoDB[ "Index" ]() ;
					response.index.connection = connection;

					// Emit to client
					var result = io.emit( 'me', response );
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

		meta: function( io, talknIndex, connection, condition ){

			MongoDB[ 'Index' ].find( condition, {}, {}, function( error, obj ){

				let response = {}
				let index = ( obj.length > 0 )? obj[ 0 ] : MongoDB[ "Index" ]() ;
				index = {...index,
						meta: index.meta ? index.meta : {},
						connection
				};

				response.connection = connection;
				response.talknIndex = talknIndex;
				response.called = "getApiMeta";
				response.index = index;

				// Emit to client
				var result = io.emit( 'me', response );
			} );
		},
	},
	util:{
		toUtf8: function( dom ){
			var iconv = new Iconv( talknServer.util.getCharset( dom ), 'UTF-8//TRANSLIT//IGNORE');
			var dom = new Buffer( dom, 'binary' );
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

//talknServer.setup();
