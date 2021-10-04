const mongoose=require('mongoose');
var {Schema}=mongoose;

const LoginSchema=new Schema({
    username:String,
    password:String,
    CWhen:Date
})

module.exports=mongoose.model('Login',LoginSchema);