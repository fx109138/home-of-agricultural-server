'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (app) {
  var _app$model = app.model,
      Question = _app$model.Question,
      User = _app$model.User,
      Tag = _app$model.Tag;

  var PAGE_SIZE = 30;

  var QuestionService = function (_app$Service) {
    _inherits(QuestionService, _app$Service);

    function QuestionService() {
      _classCallCheck(this, QuestionService);

      return _possibleConstructorReturn(this, (QuestionService.__proto__ || Object.getPrototypeOf(QuestionService)).apply(this, arguments));
    }

    _createClass(QuestionService, [{
      key: 'addQuestion',


      /**
       * 新建问题
       * @param {String} title 标题
       * @param {String} content 内容
       * @param {String} tagName 分类标签名
       * @param {String} images 图片地址
       * @return {*} 问题详情数据
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title, content, tagName, images) {
          var user, desc, tag, question;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  user = this.ctx.user;
                  _context.prev = 1;
                  desc = void 0;

                  if (content.length > 30) {
                    desc = content.slice(0, 30);
                  } else {
                    desc = content;
                  }
                  _context.next = 6;
                  return Tag.findOne({
                    tagName: tagName
                  });

                case 6:
                  tag = _context.sent;
                  _context.next = 9;
                  return new Question({
                    title: title,
                    content: content,
                    tag: tag,
                    images: images,
                    desc: desc,
                    userId: user._id,
                    nickName: user.nickName,
                    headImage: user.headImage,
                    location: user.location
                  }).save();

                case 9:
                  question = _context.sent;
                  _context.next = 12;
                  return User.findByIdAndUpdate(user._id, {
                    $inc: {
                      questionCount: 1
                    }
                  });

                case 12:
                  return _context.abrupt('return', {
                    question: question
                  });

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context['catch'](1);
                  throw new Error('SOMETHING_ERROR');

                case 18:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 15]]);
        }));

        function addQuestion(_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        }

        return addQuestion;
      }()

      /**
       * 删除问题
       * @param {String} questionId 问题id
       * @return {*} 成功状态
       */

    }, {
      key: 'deleteQuestion',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(questionId) {
          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return Question.remove({
                    _id: questionId,
                    userId: this.ctx.user._id
                  });

                case 3:
                  res = _context2.sent;

                  if (!(res.result.n !== 1)) {
                    _context2.next = 6;
                    break;
                  }

                  throw new Error();

                case 6:
                  return _context2.abrupt('return', 'success');

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 9]]);
        }));

        function deleteQuestion(_x5) {
          return _ref2.apply(this, arguments);
        }

        return deleteQuestion;
      }()

      /**
       * 添加回答
       * @param {String} questionId 问题id
       * @param {String} content 内容
       * @param {String} images 图片地址
       * @return {*} 回答
       */

    }, {
      key: 'addAnswer',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(questionId, content, images) {
          var user, question, result;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  user = this.ctx.user;
                  _context3.prev = 1;
                  _context3.next = 4;
                  return Question.findById(questionId);

                case 4:
                  question = _context3.sent;
                  _context3.next = 7;
                  return Question.findByIdAndUpdate(questionId, {
                    $inc: {
                      count: 1,
                      answerCount: 1
                    },
                    $push: {
                      answers: {
                        _id: question.count + 1,
                        content: content,
                        userId: user._id,
                        nickName: user.nickName,
                        headImage: user.headImage,
                        certification: user.certification,
                        images: images
                      }
                    }
                  });

                case 7:
                  _context3.next = 9;
                  return Question.findById(questionId, 'answers');

                case 9:
                  result = _context3.sent;
                  return _context3.abrupt('return', result.answers.id(question.count + 1));

                case 13:
                  _context3.prev = 13;
                  _context3.t0 = _context3['catch'](1);
                  throw new Error('SOMETHING_ERROR');

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[1, 13]]);
        }));

        function addAnswer(_x6, _x7, _x8) {
          return _ref3.apply(this, arguments);
        }

        return addAnswer;
      }()

      /**
       * 删除回答
       * @param {String} questionId 问题id
       * @param {Number} answerId 回答id
       * @return {*} 成功状态
       */

    }, {
      key: 'deleteAnswer',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(questionId, answerId) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return Question.update({
                    _id: questionId
                  }, {
                    $inc: {
                      answerCount: -1
                    },
                    $pull: {
                      answers: {
                        _id: answerId
                      }
                    }
                  });

                case 3:
                  res = _context4.sent;

                  if (!(res.nModified !== 1)) {
                    _context4.next = 6;
                    break;
                  }

                  throw new Error();

                case 6:
                  return _context4.abrupt('return', 'success');

                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4['catch'](0);
                  throw new Error('DELETE_ERROR');

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 9]]);
        }));

        function deleteAnswer(_x9, _x10) {
          return _ref4.apply(this, arguments);
        }

        return deleteAnswer;
      }()

      /**
       * 采纳答案
       * @param {String} questionId 问题id
       * @param {Number} answerId 回答id
       * @return {*} 成功状态
       */

    }, {
      key: 'acceptAnswer',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(questionId, answerId) {
          var res;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return Question.update({
                    _id: questionId,
                    'answers._id': answerId
                  }, {
                    $set: {
                      'answers.$._id': 0
                    }
                  });

                case 3:
                  res = _context5.sent;

                  if (!(res.nModified !== 1)) {
                    _context5.next = 6;
                    break;
                  }

                  throw new Error();

                case 6:
                  console.log(res);
                  return _context5.abrupt('return', 'success');

                case 10:
                  _context5.prev = 10;
                  _context5.t0 = _context5['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 13:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 10]]);
        }));

        function acceptAnswer(_x11, _x12) {
          return _ref5.apply(this, arguments);
        }

        return acceptAnswer;
      }()
    }, {
      key: 'getExpertList',
      value: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function getExpertList() {
          return _ref6.apply(this, arguments);
        }

        return getExpertList;
      }()
    }, {
      key: 'getQuestionList',


      /**
       * 分类获取问题列表
       * @param {String} tag 标签
       * @param {String} last 最后时间
       * @return {*} 问题列表
       */
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(tag, last) {
          var res;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return Question.find({
                    'tag.tagId': tag,
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time userId').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  res = _context7.sent;
                  return _context7.abrupt('return', res);

                case 7:
                  _context7.prev = 7;
                  _context7.t0 = _context7['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 7]]);
        }));

        function getQuestionList(_x13, _x14) {
          return _ref7.apply(this, arguments);
        }

        return getQuestionList;
      }()

      /**
       * 获取全部问题列表
       * @param {String} last 最后时间
       * @return {*} 问题列表
       */

    }, {
      key: 'getAllQuestionList',
      value: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(last) {
          var res;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return Question.find({
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time userId').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  res = _context8.sent;
                  return _context8.abrupt('return', res);

                case 7:
                  _context8.prev = 7;
                  _context8.t0 = _context8['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 7]]);
        }));

        function getAllQuestionList(_x15) {
          return _ref8.apply(this, arguments);
        }

        return getAllQuestionList;
      }()

      /**
       * 获取问题详情
       * @param {String} id 问题id
       * @return {*} 问题列表
       */

    }, {
      key: 'getQuestion',
      value: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id) {
          var res;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  _context9.next = 3;
                  return Question.findById(id);

                case 3:
                  res = _context9.sent;
                  return _context9.abrupt('return', res);

                case 7:
                  _context9.prev = 7;
                  _context9.t0 = _context9['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this, [[0, 7]]);
        }));

        function getQuestion(_x16) {
          return _ref9.apply(this, arguments);
        }

        return getQuestion;
      }()

      /**
       * 获取问题标签
       * @return {*} 问题标签
       */

    }, {
      key: 'getTags',
      value: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
          var res;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  _context10.next = 3;
                  return Tag.find({});

                case 3:
                  res = _context10.sent;
                  return _context10.abrupt('return', res);

                case 7:
                  _context10.prev = 7;
                  _context10.t0 = _context10['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[0, 7]]);
        }));

        function getTags() {
          return _ref10.apply(this, arguments);
        }

        return getTags;
      }()
    }]);

    return QuestionService;
  }(app.Service);

  return QuestionService;
};
//# sourceMappingURL=question.js.map