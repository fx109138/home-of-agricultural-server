'use strict';
const cheerio = require('cheerio');
module.exports = app => {
  const baseUrl = 'http://news.wugu.com.cn/';
  const {
    User,
  } = app.model;
  class UserService extends app.Service {

    /**
     * 获取新闻首页
     * @return {*} 导航栏，轮播图，今日热点
     */
    async getArticleIndex() {
      const result = await this.ctx.curl(baseUrl, {
        timeout: 3000,
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const navItem = [];
      const scroll = [];
      const todayNews = [];
      $('.nav_item').each((index, element) => {
        const itemName = $(element).find('a').text();
        const navUrl = $(element).find('a').attr('href')
          .slice(1);
        navItem.push({
          itemName,
          navUrl,
        });
      });
      navItem.splice(8, 1);
      $('.iscroll_li').each((index, element) => {
        const title = $(element).find('.banner_title').text()
          .trim();
        const imageUrl = $(element).find('img').data('url');
        const articleUrl = $(element).find('a').attr('href');
        const articleId = this.getArticleId(articleUrl);
        scroll.push({
          title,
          imageUrl,
          articleId,
        });
      });
      $('.focus_contain a').each((index, element) => {
        const title = $(element).attr('title');
        const articleUrl = $(element).attr('href');
        const articleId = this.getArticleId(articleUrl);
        todayNews.push({
          rank: index + 1,
          title,
          articleId,
        });
      });
      return {
        navItem,
        scroll,
        todayNews,
      };
    }

    /**
     * 获取文章内容
     * @param {string} articleId 新闻id
     * @return {*} 新闻详情
     */
    async getArticleInfo(articleId) {
      const url = `${baseUrl}article/${articleId}.html`;
      const result = await this.ctx.curl(url, {
        timeout: 3000,
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const content = [];
      const images = [];
      const articles = $('.articles');
      const title = $('.la', articles).text();
      const from = $('.words_author', articles).text();
      const time = $('.time', articles).text();
      const read = $('.reyd', articles).text();
      const desc = $('.ddcon', articles).text();
      let imageUrl;
      $('.wd p', articles).each((index, element) => {
        imageUrl = $(element).find('img').data('url');
        if (imageUrl) {
          images.push(imageUrl);
        }
        content.push($(element).text().trim());
      });
      const articleInfo = [];
      let index = 0;
      content.forEach(element => {
        if (element !== '') {
          articleInfo.push({
            type: 'word',
            content: element,
          });
        } else {
          if (index < images.length) {
            articleInfo.push({
              type: 'image',
              content: images[index++],
            });
          } else {
            articleInfo.push({
              type: 'word',
              content: '',
            });
          }
        }
      });
      return {
        title,
        from,
        time,
        read,
        desc,
        articleInfo,
      };
    }

    /**
     * 分页查询新闻列表
     * @param {string} itemName 列表项导航
     * @param {string} page 页码
     * @return {string} 列表信息
     */
    async getArticleListByPage(itemName, page) {
      const url = `${baseUrl}${itemName}_${page}.html`;
      const result = await this.ctx.curl(url, {
        timeout: 3000,
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const articles = [];
      $('.recommend_item').each((index, element) => {
        const articleUrl = $(element).find('a').attr('href');
        const articleId = this.getArticleId(articleUrl);
        const title = $(element).find('a').text()
          .trim();
        const imageUrl = $(element).find('img').data('url');
        const desc = $(element).find('.recommend_explain').text()
          .trim();
        const date = $(element).find('.recommend_date').text();
        const read = $(element).find('.recommend_read').text();
        articles.push({
          articleId,
          title,
          imageUrl,
          desc,
          date,
          read,
        });
      });
      return {
        articles,
      };
    }

    /**
     * 收藏文章
     * @param {string} articleId 新闻id
     * @param {string} title 新闻标题
     * @return {string} 成功状态
     */
    async addToCollections(articleId, title) {
      try {
        await User.update({
          _id: this.ctx.user._id,
        }, {
          $push: {
            collections: {
              articleId,
              title,
            },
          },
          $inc: {
            collectionCount: 1,
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 取消收藏
     * @param {string} articleId 新闻id
     * @return {string} 成功状态
     */
    async deleteFromCollections(articleId) {
      try {
        await User.update({
          _id: this.ctx.user._id,
        }, {
          $pull: {
            collections: {
              articleId,
            },
          },
          $inc: {
            collectionCount: -1,
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 获取新闻id
     * @param {string} articleUrl 新闻url
     * @return {string} 新闻id
     */
    getArticleId(articleUrl) {
      return articleUrl.slice(articleUrl.lastIndexOf('/') + 1, -5);
    }
  }
  return UserService;
};
