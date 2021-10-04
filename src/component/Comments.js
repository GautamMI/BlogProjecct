import {useState,useEffect} from 'react';
import {getComments as getCommentsApi, createComment as createCommentApi, 
    deleteComment as deleteCommentApi, updateComment as updateCommentApi  } from '../api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import Header from './Headers/headers';
import Content from './Content/content';
import config from '../config/config';
const Comments=()=>{
    const [backendComments,setBackendComments]=useState([]);
    const [activeComment,setActiveComment]=useState(null);
    const [userId,setUserId]=useState(null);
    const[currentUserId,setCurrentUserId]=useState(null);
   // const[userName,setUserName]=useState(null);
   const [allUsers,setAllUsers]=useState(null);
    const[openSignIn,setOpenSignIn]=useState(false);
    const[openSignUp,setOpenSignUp]=useState(false);
    
    const rootComments=backendComments.filter(backendComment=>backendComment.parentId===null);
    
 
    const getreplies=(commentId)=>{
        return backendComments.filter(backendComment=>backendComment.parentId===commentId)
             .sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());
    }

   const addComment=(text,parentId)=>{
       const message={
           body:text,
           parentId:parentId,
           userId:currentUserId
       }
       axios.post(config.addComment,message).then((resp)=>{
           setBackendComments(resp.data);
           setActiveComment(null);
       });
   }
   const updateComment=(text,commentId)=>{
    const message={
        body:text,
        _id:commentId
    }
       axios.post(config.updateComment,message).then((resp)=>{
        setBackendComments(resp.data);
        setActiveComment(null);
       })
   }
   const deleteComment=(commentId)=>{
    const message={
        _id:commentId
    }
    axios.post(config.deletComment,message).then((resp)=>{
        setBackendComments(resp.data);
        setActiveComment(null);
       })
   }
   const getUsers =async () =>{
    let users=await axios.get(config.getUsers);
    return users.data;
   }
    useEffect(()=>{
       axios.get(config.getComment).then((resp)=>{
           setBackendComments(resp.data);
           
       })    
       getUsers().then((data)=>{
           setAllUsers(data);
       })
        
    },[]);

    return(
        <div>
        <Header currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} 
         openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp}
         setOpenSignUp={setOpenSignUp} setAllUsers={setAllUsers} allUsers={allUsers}
        />
        <Content/>
        <div className="comments">
            <h3 className="comments-title">Is AI the Future?</h3>
            <div className="comment-form-title">Your comments</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} currentUserId={currentUserId}/>
            <div className="comments-container">
            {rootComments.map((rootComment)=>(
             <Comment comment={rootComment} replies={getreplies(rootComment.id)}
             currentUserId={currentUserId}
             deleteComment={deleteComment}
             activeComment={activeComment}
             setActiveComment={setActiveComment}
             updateComment={updateComment}
             addComment={addComment}
             getreplies={getreplies}/>
            ))}
            </div>
        </div>
        </div>
    )
}

export default Comments;