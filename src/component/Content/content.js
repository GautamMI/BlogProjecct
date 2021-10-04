import React from 'react';
import {useState} from 'react';
import './style.css';


const ReadMore = ()=>{
    const[isReadMore,setIsReadMore]=useState(true);
    const text='What is AI? Well, simply put, artificial intelligence is a way to enable computers to learn with the help of a teacher as well from their own experience. They can quickly adapt to the enormous volume of new parameters and perform tasks they couldn’t handle before.'+
    'In general, AI systems work by ingesting large amounts of labeled training data, analyzing the data for correlations and patterns, and using these patterns to make predictions about future states. In this way, a chatbot that is fed examples of text chats can learn to produce lifelike exchanges with people, or an image recognition tool can learn to identify and describe objects in images by reviewing millions of examples.';
    const Toggle=()=>{
        setIsReadMore(!isReadMore);
    }
    return (
       <div>
           {isReadMore ? text.slice(0,150):text}
           <span href="*" onClick={Toggle} className="toggle-container">
               {isReadMore ? "  ..read more":"  ..read less"}
           </span>
       </div>
    )
}
const Content=()=>{
    
    return (
    <div className="card-container">
       <div className="image-conatiner">
           <img src="/artificial.png"/>
       </div>
       <div className="card-title">
       <ReadMore/>
       </div>
    </div>
    )
}



export default Content