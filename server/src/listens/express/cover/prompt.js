function promptPromise(message) {
  return new Promise(function (resolve, reject) {
    var result = window.prompt(message);
    console.log(result, result === '1090', typeof result);
    if (result === '1090') {
      resolve(result);
    } else {
      reject(new Error('User cancelled'));
    }
  });
}

window.addEventListener('load', () => {
  promptPromise('Please input passworrd.').then(function (name) {
    document.querySelector('#secret').remove();
  });
});
