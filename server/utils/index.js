
export default {
  includeProcessKey: ( key ) => {
    return process.argv.includes( key );
  },
/**
 * StackTrace APIを利用して呼び出し元を取得する
 * @param {Number} stackIndex 取得するstacktraceのindex, デフォルトは1
 * @return {Object} { file: 'ファイル名’, line: '行番号', func: '関数名（設定されている場合)' }
 */
  debug: (stackIndex) => {
    let callerInfo = {};
    let saveLimit = Error.stackTraceLimit;
    let savePrepare = Error.prepareStackTrace;

    stackIndex = (stackIndex - 0) || 1;

    Error.stackTraceLimit = stackIndex + 1;
    Error.captureStackTrace(this, getCaller);

    Error.prepareStackTrace = function (_, stack) {
      let caller = stack[stackIndex];
      callerInfo.file = caller.getFileName();
      callerInfo.line = caller.getLineNumber();
      let func = caller.getFunctionName();
      if (func) {
        callerInfo.func = func;
      }
    };
  
    this.stack;
    Error.stackTraceLimit = saveLimit;
    Error.prepareStackTrace = savePrepare;
    return callerInfo;
  }
}
