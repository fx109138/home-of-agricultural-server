'use strict';

const Err = require('err1st');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
    // 框架会统一监听，并打印对应的错误日志\
    ctx.app.emit('error', err, ctx);
    // 自定义错误时异常返回的格式
    if (!(err instanceof Err)) {
      err = new Err(err); // eslint-disable-line
    }

    ctx.status = err.status || 400;
    ctx.body = {
      code: err.code,
      message: err.message,
      data: err.data || {},
    };
  }
};
