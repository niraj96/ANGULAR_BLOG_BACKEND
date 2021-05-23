const mongoose = require('mongoose');

exports.getUserModel = ()=>{

    const user = mongoose.Schema({
        email:{ type: String, required: true, unique: true},
        name: { type: String},
        password: {type: String, required: true},
        status : {type: Number, default:1}
    });

    return mongoose.model('user', user);
},

exports.getArticleModel = ()=>{

    const article = mongoose.Schema({
        author_id : {type: String, required:true},
        title:{ type:String, required:true},
        description:{type:String,  required:true},
        likes: {type:Number, default:0},
        dislikes: {type:Number, default:0},
        
    }, { timestamps: true });

    return mongoose.model('article', article);
}

exports.getCommentModel = ()=>{

    const comment = mongoose.Schema({
        
        article_id:{ type:String, required:true},
        author_id: { type:String, required:true},
        author_name: { type:String, required:true, default: ''},
        comment: { type:String, required:true}
        
    }, { timestamps: true });

    return mongoose.model('comment', comment);
}