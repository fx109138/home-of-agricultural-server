'use strict';

module.exports = app => {
  const SOCKET = 'SOCKET';
  class IOService extends app.Service {
    // * login() {
    //   // console.log(this.ctx.socket.nsp.sockets);
    //   return 'Helle Man!';
    // }
    async login(token) {
      const userId = this.ctx.app.jwt.verify(token, '123456').userId;
      const socketId = this.ctx.socket.id;
      await app.redis.set(SOCKET + userId, socketId);
      return socketId;
    }

    async chat(to, message) {
      const userId = '5a16699d5e58179af45247d0';
      const targetSocketId = await app.redis.get(SOCKET + to);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('message', userId, message);
      }
    }

    async like() {
      //
    }
  }
  return IOService;
};
