var connection = location.href.split('?')[1];
var script = document.createElement("script");
script.setAttribute( 'id', 'talkn' );
script.setAttribute( 'type', 'text/javascript' );
script.setAttribute( 'src',"talkn.client.js" );
script.setAttribute( 'connection', connection );
script.setAttribute( 'width', '320px' );
document.head.appendChild( script );