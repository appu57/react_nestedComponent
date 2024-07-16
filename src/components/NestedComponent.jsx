import React, { useState } from 'react';
import Comment from './Comment';
import UseCommentTree from './hooks/UseComment';
const NestedComponent = ({
    comments,
    onSubmit = () => { },
    onEdit = () => { },
    onDownVote = () => { },
    onDelete = () => { },
    onUpVote = () => { }


}) => {
    const { comments: CommentsData ,insertCommand,editComment,deleteComment} = UseCommentTree(comments);
    const [comment, setComment] = useState("");
    const handleChange = (e) => {
        setComment(e.target.value);
    }
    const handleSubmit = (e) => {
        if (comment) {
            handleReply(undefined,comment)
            setComment("")
        }
    }
    const handleReply =(commentId,content)=>{
        insertCommand(commentId,content);
        onSubmit();
    }

    const handleEdit = (commentId,comment)=>{
        console.log(comment)
        editComment(commentId,comment);
        onEdit();
    }
    const handleDelete =(commentID)=>{
        deleteComment(commentID);
    }
    return (
        <div className="commentt__container">

            <div className="add__comment">
                <textarea value={comment} onChange={handleChange} rows={4} cols={50} className="comment__textarea" placeholder="Add a new Comment" />
                <button className="comment__button" onClick={handleSubmit}>Add</button>

            </div>
            {CommentsData.map((comment) => {
                return (<Comment key={comment.id} comment={comment} 
                    onSubmitComment={handleReply}
                    onEditComment = {handleEdit} 
                    onDeleteComment ={handleDelete}
                    />
                );
            })}
        </div>

    );
}

export default NestedComponent;