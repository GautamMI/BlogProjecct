import React from 'react';
import './headers.css';
import SignIn from '../SignIn/SignIn';

const Header=({currentUserId,setCurrentUserId,openSignIn,setOpenSignIn,openSignUp,
              setOpenSignUp,setAllUsers,allUsers})=>{
    
    
    return(
        <header className="header">
            <nav className="headerMenu">
                <a href="#" onClick={()=>{setOpenSignUp(true)}}>SignUp</a>
                {currentUserId===null &&
                <a href="#" onClick={()=>{setOpenSignIn(true)}}>SignIn</a>
                }
                {currentUserId!==null &&
                <a href="#" className="dis-a" onClick={()=>{setOpenSignIn(true)}}>SignIn</a>
                }
                {currentUserId===null &&
                <a href="#" className="dis-a" onClick={()=>{setCurrentUserId(null)}}>LogOut</a>
                }
                {currentUserId!==null &&
                <a href="#" onClick={()=>{setCurrentUserId(null)}}>LogOut</a>
                }
            </nav>
            <div>
            {openSignIn && <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn}
             headerText="Enter username and password" purpose="Login" setAllUsers={setAllUsers}
             allUsers={allUsers} currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} />}
             </div>
             <div>
            {openSignUp &&  <SignIn openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}
            headerText="Sign Up" purpose="SignUp" setAllUsers={setAllUsers}
            allUsers={allUsers} currentUserId={currentUserId} setCurrentUserId={setCurrentUserId}/>}
            </div>
        </header>
    )
}

export default Header;