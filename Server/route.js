module.exports=function(app){
    const request=require('./service');
    app.get('/service/getLoginUsers',request.getLoginUsers);
    app.post('/service/addUsers',request.addUsers);
    app.get('/service/getComments',request.getComments);    
    app.post('/service/addComment',request.addComment);   
    app.post('/service/updateComment',request.updateComment);   
    app.post('/service/deleteComment',request.deleteComment);   
}