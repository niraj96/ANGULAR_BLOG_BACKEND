const express = require('express')
const articleRouter = express.Router();
const articleController = require('../controller/article.controller');
const middleware = require('../middleware/authentication');

articleRouter.use(middleware.verifyToken);
articleRouter.get('/all', articleController.getAllArticles);
articleRouter.get('/own', articleController.getPersonalArtcles);
articleRouter.post('/create', articleController.createArticle);
articleRouter.put('/update/:id', articleController.updateArticle);
articleRouter.delete('/delete/:id', articleController.deleteArticle);
articleRouter.get('/fetch/:id', articleController.getArtcleByID);
articleRouter.get('/comments/:id', articleController.getCommentList);
articleRouter.post('/add_comment', articleController.addComment);
module.exports = articleRouter;