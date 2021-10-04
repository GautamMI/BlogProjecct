import { useState } from 'react';
import CommentForm from "./CommentForm";
import toggle from './toggle';
const Comment = ({
    comment,
    replies,
    currentUserId,
    deleteComment,
    activeComment,
    setActiveComment,
    updateComment,
    addComment,
    getreplies
}) => {
    const [showReply, setShowReply] = useState(false);
    const createdAt = new Date(comment.createdAt).toLocaleString();
    const hasDelete = currentUserId === comment.userId;
    const hasEdit = currentUserId === comment.userId;
    const IsEditing = activeComment && activeComment.type === 'edit' && activeComment.id === comment.id
    const isReply = activeComment && activeComment.type === 'reply' && activeComment.id === comment.id
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div className="comment-date">{createdAt}</div>
                </div>
                {!IsEditing &&
                    <div className="comment-text">{comment.body}</div>
                }
                {IsEditing &&
                    <CommentForm submitLabel="Update" initialText={comment.body}
                        hasCancelbutton currentUserId={currentUserId}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                }
                <div className="comment-actions">
                    {currentUserId === null &&
                        <div className="comment-action  diable-div" 
                       
                        onClick={() => setActiveComment({ type: 'reply', id: comment.id })}>Reply</div>
                    }
                    {currentUserId != null &&
                        <div className="comment-action" onClick={() => setActiveComment({ type: 'reply', id: comment.id })}>Reply</div>
                    }
                    {hasEdit &&
                        <div className="comment-action" onClick={() => setActiveComment({ type: 'edit', id: comment.id })}>Edit</div>
                    }
                    {!hasEdit &&
                        <div className="comment-action  diable-div" onClick={() => setActiveComment({ type: 'edit', id: comment.id })}>Edit</div>
                    }
                    {hasDelete &&
                        <div className="comment-action" onClick={() => deleteComment(comment.id)}>Delete</div>
                    }
                    {!hasDelete &&
                        <div className="comment-action  diable-div" onClick={() => deleteComment(comment.id)}>Delete</div>
                    }
                </div>
                {isReply && (
                    <CommentForm submitLabel="Reply" hasCancelbutton handleCancel={() => setActiveComment(null)}
                        handleSubmit={(text) => addComment(text, comment.id)} />
                )}
                {!showReply && replies.length > 0 && (
                    <div className="comment-actions">
                        <div className="comment-action" onClick={() => {
                            setShowReply(!showReply);
                        }}>load replies ...</div>
                    </div>
                )}
                {showReply && replies.length > 0 && (
                    <div className="comment-actions">
                        <div className="comment-action" onClick={() => {
                            setShowReply(!showReply);
                        }}>hide replies ...</div>
                    </div>
                )}
                {replies.length > 0 && showReply &&
                    <div className="replies">
                        {replies.map(reply => (
                            <Comment comment={reply} key={reply.id} replies={getreplies(reply.id)}
                                getreplies={getreplies} currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                updateComment={updateComment}
                                addComment={addComment}
                            />
                        ))}
                    </div>}
            </div>
        </div>
    );
};

export default Comment;