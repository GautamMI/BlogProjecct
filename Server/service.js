const mongoose = require('mongoose');
const Login = require('./Model/login');
const Comments = require('./Model/comments');
const comments = require('./Model/comments');


function getAllComments(callback){
    Comments.aggregate([
        {$match:{StatusFlag: 'A'}},
        {
            $project: {
                _id: 0,
                id: '$_id',
                userId: 1,
                username: 1,
                body: 1,
                parentId: '$ParentId',
                createdAt: '$CWhen'
            }
        }
    ]).exec((err, docs) => {
        
        callback(docs);
    })
}

exports.getLoginUsers = async function (req, res) {
    
    let docs = await Login.find({}).select('username password');
    
    res.status(200).send(docs);
}

exports.addUsers = function (req, res) {
    
    var login = new Login({
        username: req.body.username,
        password: req.body.password,
        CWhen: new Date()
    });
    
    login.save(() => {
        Login.find({}, 'username password', (err, docs) => {
            res.status(200).send(docs);
        })
    })
}
exports.getComments = function (req, res) {
    Comments.find({ StatusFlag: 'A' }, (err, docs) => {
        if (docs) {
           getAllComments((data)=>{
               
               res.status(200).send(data);
           })
        }
    })
}
exports.addComment = async (req, res) => {
    let loginName= await Login.findById(mongoose.Types.ObjectId(req.body.userId));
    var comment = new Comments({
        userId: mongoose.Types.ObjectId(req.body.userId),
        ParentId: req.body.parentId || null,
        body: req.body.body,
        username: loginName.username,
        CWhen: new Date(),
        StatusFlag: 'A'
    })

    comment.save(() => {
        getAllComments((data)=>{
            
            res.status(200).send(data);
        })
    })
}

exports.updateComment = (req, res) => {
    const updateData = { body: req.body.body };
    Comments.findByIdAndUpdate(req.body._id, updateData, () => {
        getAllComments((data)=>{
            
            res.status(200).send(data);
        });
    })
}

exports.deleteComment = (req, res) => {
    const updateData = { StatusFlag: 'D' };
    Comments.findByIdAndUpdate(req.body._id, updateData, () => {
        getAllComments((data)=>{
            
            res.status(200).send(data);
        });
    })
}