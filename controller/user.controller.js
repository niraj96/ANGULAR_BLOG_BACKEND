
const mongoose = require('mongoose');
const authentication = require('../middleware/authentication');


let User; 
try {
  User = mongoose.model('user');
} catch (error) {
  User =  require('../models/models').getUserModel();
}


exports.login = (req, res) =>{
   
    try{

        if( req.fields!=null){
            let userInfo = req.fields;
            
            let receivedEmail = userInfo.email;
            let receivedPassword = authentication.generateToken(userInfo.password);
    
            User.find({email:receivedEmail, password:receivedPassword},(err, data)=>{
            if(err){
                res.status(403).json('Not a valid user');
            }else if(data.length>0){
    
                let userInfo = {
                    name: data[0].name,
                    email:data[0].email,
                    status:data[0].status
                }
                res.status(200).json({token: authentication.generateToken(userInfo)});
            }else{
                res.status(404).json('Invalid Credentials');
            }
        });
        }else{
            res.status(404).json('Object is null');
        }
    
       }catch(err){
           res.status(500).json('Internal Server Error');
       }
}

exports.signup = (req, res) =>{
    let info = req.fields;
    info.password = authentication.generateToken(info.password); 

    let createUser = new User(info);
    createUser.save().then(data=>{
        let userInfo = {
            name: data.name,
            email:data.email,
            status:data.status
        }

        res.status(200).json({token: authentication.generateToken(userInfo)});

    }).catch(err=>res.status(500).json('Internal Server error'));
}