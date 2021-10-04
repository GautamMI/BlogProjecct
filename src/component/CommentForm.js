import {useState} from 'react';

const CommentForm=({handleSubmit,submitLabel,handleCancel,initialText='',hasCancelbutton=false,
                  currentUserId})=>{
const [text,SetText]=useState(initialText);
const isTextAreaDisabled=text.length===0 || currentUserId===null;
const onSubmit=(event)=>{
    event.preventDefault();
    handleSubmit(text);
    SetText('');
}
return(
    <form onSubmit={onSubmit}>
        <textarea className="comment-form-textarea" value={text} onChange={(e)=>SetText(e.target.value)}/>
        <button className="comment-form-button" disabled={isTextAreaDisabled}>{submitLabel}</button>
        {hasCancelbutton && 
        <button type="button" className="comment-form-button comment-form-cancel-button"
        onClick={handleCancel}>cancel</button>
        }
    </form>
)
}

export default CommentForm;