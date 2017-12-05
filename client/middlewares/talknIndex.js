export default store => next => state => {
  const promiseCondition = ( resolve, reject ) => resolve( state );
  const promiseThen = response => next( state );
  const promiseError = error => next( state );
  const promise =  new Promise( promiseCondition );
  return promise.then( promiseThen, promiseError );
}
