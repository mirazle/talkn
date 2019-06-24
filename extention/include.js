var connection = location.href.split('?')[1];
var hasSlash = connection.lastIndexOf("/") === ( connection.length - 1 );
connection = hasSlash ? connection : connection + "/";
var script = document.createElement("script");
script.setAttribute( 'id', 'talkn' );
script.setAttribute( 'type', 'text/javascript' );
script.setAttribute( 'src',"talkn.client.js" );
script.setAttribute( 'connection', connection );
script.setAttribute( 'hasSlash', hasSlash );
script.setAttribute( 'iframe', true );
script.setAttribute( 'width', '320px' );
document.head.appendChild( script );