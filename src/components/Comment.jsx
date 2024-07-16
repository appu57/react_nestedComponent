import React, { useState } from 'react';
const Comment = ({ comment = {}, onSubmitComment = {} ,onEditComment,onDeleteComment}) => {
    const [expand, setExpand] = useState(false);
    const [replyContent, setReplyContent] = useState("")
    const [editMode,setEditMode] = useState(false);
    const [editMessage,setEditMessage]=useState("");
    const toggleExpand = () => {
        setExpand((expand) => !expand);
    }
    const handleChange = (e) => {
        setReplyContent(e.target.value);
    }
    const handleReplySubmit = () => {
        if (replyContent) {
            onSubmitComment(comment.id,replyContent)
            setReplyContent("");
        }
    }
    const toggleEdit = ()=>{
        console.log(editMode)
        setEditMode((editMode)=>!editMode);
        setEditMessage(comment.content);
    }
    const handleEditComment=()=>{
        console.log(comment);
        onEditComment(comment.id,editMessage);
        setEditMode((editMode)=>!editMode);
    }
    const handleEditMessage=(e)=>{
        setEditMessage(e.target.value);
    }
    const deleteComment=(e)=>{
        onDeleteComment(comment.id);
    }
    return (
        <div className="comment">

            <div>
                {
                    editMode? (
                        <div className="add__comment">
                        <textarea value={editMessage} onChange={handleEditMessage} rows={4} cols={50} className="comment__textarea" placeholder="Add a new Comment" />
                        <button className="comment__button" onClick={handleEditComment}>Save</button>

                    </div>
                    ):(
                        <p className="comment__content">{comment.content}</p>
                    )
                }
                <p className="comment__info">Votes : {comment.votes}</p>
                <p className="comment__info">Date : {new Date(comment.timestamp).toLocaleString()}</p>
            </div>
            <div className="comment__buttons">
                <button className="comment__button" onClick={toggleExpand}>{expand ? 'Hide Reply' : ' Reply'}</button>
                <button className="comment__button" onClick={toggleEdit}>Edit</button>
                <button className="comment__button" onClick={deleteComment}>Delete</button>
            </div>
            {
                expand && (
                    <div className="reply__comment">

                        <div className="add__comment">
                            <textarea value={replyContent} onChange={handleChange} rows={4} cols={50} className="comment__textarea" placeholder="Add a new Comment" />
                            <button className="comment__button" onClick={handleReplySubmit}>Add</button>

                        </div>
                        {
                            comment?.replies?.map((reply) => {
                                return (<Comment key={reply.id} comment={reply} onSubmitComment={onSubmitComment} onEditComment={onEditComment} onDeleteComment={onDeleteComment}/>);
                            })
                        }
                    </div>

                )
            }
        </div>

    )
}

export default Comment;