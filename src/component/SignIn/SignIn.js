import { useState } from 'react';
import React from 'react';
import Modal from 'react-modal';
import './style.css';
import Error from '../Error/error';
import axios from 'axios';
import config from '../../config/config';

const SignIn = ({ currentUserId, setCurrentUserId, openSignIn, setOpenSignIn,openSignUp,setOpenSignUp,
                 headerText,purpose,setAllUsers,allUsers }) => {
    const[signUpError,setSignUpError]=useState(false);
    const[signInerror,setsignInerror]=useState(false);
    const[userName,setUserName]=useState('');
    const[password,setPassword]=useState('');
    const isSinUpEnabled=userName.length===0 || password.length===0 || signUpError
    const addUser = () =>{
        setOpenSignUp(false);
        setSignUpError(false);
        const user={
            username:userName,
            password:password
        }
        axios.post(config.addUsers,user).then((response)=>{
            setAllUsers(response.data);
        });
    }
    const checkUserExists =(userName)=>{
        setUserName(userName);
       if(allUsers.filter((x)=> x.username === userName).length>0){
           
           setSignUpError(true);
           
       }else{
        setSignUpError(false);
       
       }
    
    }
    const validUser=()=>{
        
        
        if(allUsers.some(x=>x.username===userName)){
            let index=allUsers.findIndex(x=>x.username===userName);
            
            if(allUsers[index].password===password){
                setsignInerror(false);
                setOpenSignIn(false);
                setCurrentUserId(allUsers[index]._id);
            }
        }
        else{
            setsignInerror(true);
        }
    }
   
    
    return (
        <div>
        <Modal isOpen={openSignIn} className="signin-container">
           <div>
           <form className="codehim-form">
           <div className="form-title">
           <div>
           </div>
           <h2 className="header-signin">{headerText}</h2>
           </div>
           <label for="text"> UserName:</label>
           <input type="text" id="text" className="cm-input" placeholder="Enter your username"
            onChange={(e)=>setUserName(e.target.value)} />
           <label for="pass"> Password:</label>
           <input id="pass" type="password" className="cm-input" placeholder="Enter your password"
            onChange={(e)=>setPassword(e.target.value)} />
           <button type="submit" className="btn-login  gr-bg" onClick={validUser}>{purpose}</button>
           <button type="submit" className="btn-login  gr-bg" onClick={()=>setOpenSignIn(false)}>Cancel</button>
           {signInerror && <Error statement="*Invalid credentials"/>}
           </form>
           </div>
        </Modal>
        <Modal isOpen={openSignUp} className="signin-container">
           <div>
           <form className="codehim-form">
           <div className="form-title">
           <div>
           </div>
           <h2 className="header-signin">{headerText}</h2>
           </div>
           <label for="email"> UserName:</label>
           <input type="text" id="text" className="cm-input" placeholder="Enter your username"
            onChange={(e)=>checkUserExists(e.target.value)} required
           />
           <label for="pass"> Password:</label>
           <input id="pass" type="password" className="cm-input" placeholder="Enter your password"
           onChange={(e)=>setPassword(e.target.value)} required/>
           <button type="submit" className="btn-login  gr-bg" disabled={isSinUpEnabled}
           onClick={addUser}>{purpose}</button>
           <button type="submit" className="btn-login  gr-bg" onClick={()=>setOpenSignUp(false)}>Cancel</button>
           {signUpError && <Error statement="*UserName already exists"/>}
           </form>
           </div>
        </Modal>
        </div>

        
        
    )
}

export default SignIn;