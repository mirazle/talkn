export function c(obj, called){
  if(called) console.log("##### == " + called);
  console.log(JSON.stringify(obj,null,'\t'));
}

/**
 * StackTrace APIを利用して呼び出し元を取得する
 *
 * @param {Number} stackIndex 取得するstacktraceのindex, デフォルトは1
 * @return {Object} { file: 'ファイル名’, line: '行番号', func: '関数名（設定されている場合)' }
 */
export function getCaller(stackIndex) {
  var callerInfo = {};
  var saveLimit = Error.stackTraceLimit;
  var savePrepare = Error.prepareStackTrace;

  stackIndex = (stackIndex - 0) || 1;

  Error.stackTraceLimit = stackIndex + 1;
  Error.captureStackTrace(this, getCaller);

  Error.prepareStackTrace = function (_, stack) {
    var caller = stack[stackIndex];
    callerInfo.file = caller.getFileName();
    callerInfo.line = caller.getLineNumber();
    var func = caller.getFunctionName();
    if (func) {
      callerInfo.func = func;
    }
  };
  this.stack;
  Error.stackTraceLimit = saveLimit;
  Error.prepareStackTrace = savePrepare;
  return callerInfo;
}
