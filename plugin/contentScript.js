var host = 'localhost:8080';
if( location.host !== host ){
  var option = location.href.replace(/^(https:\/|http:\/)/, '');
  window.open('https://' + host + option, 'talkn', 'width=700, height=450, resizable=no, toolbar=no, status=no, scrollbars=no ,menubar=no, location=no, directories=no');
}
