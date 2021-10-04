const mongoose=require('mongoose');
const {Schema}=mongoose;

const CommentSchema=new Schema({
    userId:{
        type:Schema.ObjectId,
        ref:'Login'
    },
    username:String,
    body:String,
    CWhen:Date,
    ParentId:{
        type:Schema.ObjectId,
        default:null
    },
    StatusFlag:String
})

module.exports=mongoose.model('Comment',CommentSchema);