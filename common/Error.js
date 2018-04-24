export default class E {
  static log( stackIndex ){
    let callerInfo = {};
    let saveLimit = Error.stackTraceLimit;
    let savePrepare = Error.prepareStackTrace;

    stackIndex = (stackIndex - 0) || 1;

    Error.stackTraceLimit = stackIndex + 1;
    Error.captureStackTrace(this, E.log);

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
