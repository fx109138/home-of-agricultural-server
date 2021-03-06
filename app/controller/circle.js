'use strict';

const Controller = require('egg').Controller;

module.exports = class CircleController extends Controller {

  /**
   * 发表动态
   */
  async addCircle() {
    this.ctx.validate({
      content: 'string',
      images: 'array',
    });
    const {
      content,
      images,
    } = this.ctx.request.body;
    const circle = await this.service.circle.addCircle(content, images);
    this.ctx.body = circle;
  }

  /**
   * 删除动态
   */
  async deleteCircle() {
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    const status = await this.service.circle.deleteCircle(circleId);
    this.ctx.body = status;
  }

  /**
   * 添加评论
   */
  async addComment() {
    this.ctx.validate({
      circleId: 'string',
      content: 'string',
      targetId: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
    });
    const {
      circleId,
      content,
      targetId,
    } = this.ctx.request.body;
    const comment = await this.service.circle.addComment(circleId, content, targetId);
    this.ctx.body = comment;
  }

  /**
   * 删除评论
   */
  async deleteComment() {
    this.ctx.validate({
      circleId: 'string',
      commentId: 'integer',
    });
    const {
      circleId,
      commentId,
    } = this.ctx.request.body;
    const status = await this.service.circle.deleteComment(circleId, commentId);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 点赞
   */
  async giveLike() {
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    const status = await this.service.circle.giveLike(circleId);
    this.ctx.body = status;
  }

  /**
   * 取消赞
   */
  async cancelLike() {
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    const status = await this.service.circle.cancelLike(circleId);
    this.ctx.body = status;
  }

  /**
   * 查看关注的人动态
   */
  async getAttentionList() {
    const last = this.ctx.params.last;
    const result = await this.service.circle.getAttentionList(last);
    this.ctx.body = {
      circleList: result,
    };
  }

  /**
   * 查看动态
   */
  async getCircleList() {
    const last = this.ctx.params.last;
    const result = await this.service.circle.getCircleList(last);
    this.ctx.body = {
      circleList: result,
    };
  }

  /**
   * 查看评论
   */
  async getComment() {
    const circleId = this.ctx.params.circleId;
    const result = await this.service.circle.getComment(circleId);
    this.ctx.body = result;
  }

  /**
   * 查看点赞列表
   */
  async getLikeList() {
    const circleId = this.ctx.params.circleId;
    const result = await this.service.circle.getLikeList(circleId);
    this.ctx.body = result;
  }
};
