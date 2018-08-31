
if( location.host !== 'talkn.io' ){
  var option = location.href.replace(/^(https:\/|http:\/)/, '');
  window.open('https://talkn.io' + option, 'talkn', 'width=700, height=450, resizable=no, toolbar=no, status=no, scrollbars=no ,menubar=no, location=no, directories=no');
}
