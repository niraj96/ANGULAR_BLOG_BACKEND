const models =  require('../models/models');
const Article =  models.getArticleModel();
const Comment =  models.getCommentModel();

exports.getAllArticles = async (req, res) => {

    let allArticle = await Article.find().sort({createdAt: -1});
    res.status(200).json(allArticle);

}

exports.getPersonalArtcles = async(req, res) =>{

    let tokeninfo = JSON.parse(req.headers.token);
    let id =  tokeninfo['_id'];
    let allArticle = await Article.find({author_id: id}).sort({createdAt: -1});
  
    res.status(200).json(allArticle);
}

exports.getArtcleByID = async(req, res) =>{

    let articleId = req.params.id;
    let detail = await Article.findOne({_id:articleId});

    res.status(200).json(detail);
}

exports.createArticle = (req,res) =>{

    let tokeninfo = JSON.parse(req.headers.token);
    let userId =  tokeninfo['_id'];
   
    let info = {...req.fields, author_id: userId, likes: 0, dislikes:0 }

    let newArticle = new Article(info);
    newArticle.save().then(data=>{
        
        res.status(200).json(data);

    }).catch(err=>res.status(500).json('Internal Server error'));
}
exports.updateArticle = async(req,res) =>{
    let articleId = req.params.id;
    let input = req.fields;

    let updated = await Article.findByIdAndUpdate(articleId, input);

    res.status(200).json(updated);

}

exports.deleteArticle = (req,res) =>{
 
    let articleId = req.params.id;
    
    Article.deleteOne({_id:articleId}).then(data=>{

        res.status(200).json(data);

    }).catch(err=>res.status(500).json('Internal Server error'));

    
  
    
}

exports.getCommentList = async(req, res) =>{
  
    let articleId = req.params.id;
    let allComments = await Comment.find({article_id: articleId});
    res.status(200).json(allComments);
}

exports.addComment = async(req, res) =>{
  
    let tokeninfo = JSON.parse(req.headers.token);
    let userId =  tokeninfo['_id'];
    let userName = tokeninfo['name'];
   
    let info = {...req.fields, author_id: userId, author_name: userName}

    let comment = new Comment(info);
    comment.save().then(data=>{
        res.status(200).json(data);

    }).catch(err=>res.status(500).json('Internal Server error'));
}