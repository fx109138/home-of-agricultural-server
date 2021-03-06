'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var IOController = function (_Controller) {
  _inherits(IOController, _Controller);

  function IOController() {
    _classCallCheck(this, IOController);

    return _possibleConstructorReturn(this, (IOController.__proto__ || Object.getPrototypeOf(IOController)).apply(this, arguments));
  }

  _createClass(IOController, [{
    key: 'login',


    /**
     * 登录
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = this.ctx.args[0];
                _context.next = 3;
                return this.service.io.login(token);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _ref.apply(this, arguments);
      }

      return login;
    }()

    /**
     * 聊天
     */

  }, {
    key: 'chat',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var userToken, targetId, content, type;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userToken = this.ctx.args[0];
                targetId = this.ctx.args[1];
                content = this.ctx.args[2];
                type = this.ctx.args[3];
                _context2.next = 6;
                return this.service.io.chat(userToken, targetId, content, type);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function chat() {
        return _ref2.apply(this, arguments);
      }

      return chat;
    }()

    /**
     * 消息已读
     */

  }, {
    key: 'read',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var userToken, targetId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userToken = this.ctx.args[0];
                targetId = this.ctx.args[1];
                _context3.next = 4;
                return this.service.io.read(userToken, targetId);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function read() {
        return _ref3.apply(this, arguments);
      }

      return read;
    }()

    /**
     * 点赞
     */

  }, {
    key: 'like',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var userToken, targetId, circleId;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userToken = this.ctx.args[0];
                targetId = this.ctx.args[1];
                circleId = this.ctx.args[2];
                _context4.next = 5;
                return this.service.io.like(userToken, targetId, circleId);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function like() {
        return _ref4.apply(this, arguments);
      }

      return like;
    }()

    /**
     * 评论
     */

  }, {
    key: 'comment',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var userToken, circleId, targetId;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userToken = this.ctx.args[0];
                circleId = this.ctx.args[1];
                targetId = this.ctx.args[2];
                _context5.next = 5;
                return this.service.io.comment(userToken, circleId, targetId);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function comment() {
        return _ref5.apply(this, arguments);
      }

      return comment;
    }()

    /**
     * 回答
     */

  }, {
    key: 'answer',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var userToken, questionId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userToken = this.ctx.args[0];
                questionId = this.ctx.args[1];
                _context6.next = 4;
                return this.service.io.answer(userToken, questionId);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function answer() {
        return _ref6.apply(this, arguments);
      }

      return answer;
    }()

    /**
     * 邀请回答
     */

  }, {
    key: 'invite',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var userToken, expertId, questionId;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userToken = this.ctx.args[0];
                expertId = this.ctx.args[1];
                questionId = this.ctx.args[2];
                _context7.next = 5;
                return this.service.io.invite(userToken, expertId, questionId);

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function invite() {
        return _ref7.apply(this, arguments);
      }

      return invite;
    }()

    /**
     * 关注用户
     */

  }, {
    key: 'follow',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var userToken, targetId;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userToken = this.ctx.args[0];
                targetId = this.ctx.args[1];
                _context8.next = 4;
                return this.service.io.follow(userToken, targetId);

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function follow() {
        return _ref8.apply(this, arguments);
      }

      return follow;
    }()
  }]);

  return IOController;
}(Controller);

module.exports = IOController;
//# sourceMappingURL=io.js.map