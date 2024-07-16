import React,{useState} from 'react';
const UseCommentTree = (initialComment) =>{
    const [comments,setComments]=useState(initialComment);
    const insertNode = (tree,commentId,content)=>{
      return tree.map((comment)=>{
          if(comment.id === commentId)
          {
              return {
                  ...comment,
                  replies:[...comment.replies,content]
              }
          }else if(comment.replies && comment.replies.length>0)
          {
              return{
                  ...comment,
                  replies:insertNode(comment.replies, commentId, content)
              }
          }
          return comment;//if no condition matches return the comment back to map the current comment at its index
      })
    }
    const insertCommand =(commentId,content)=>{
      const newComment ={
          id:Date.now(),
          content,
          votes:0,
          timestamp:new Date().toISOString(),
          replies:[]
      }
      if(commentId)
      {
        setComments((prevComments)=>insertNode(prevComments,commentId,newComment))
      }
      else{
          setComments(prevComments=>[newComment,[...prevComments]])
      }
    }
    const deleteComment = (commentId)=>{
      setComments(prevComments=> deleteNode(prevComments,commentId))
    }

    const deleteNode=(tree,commentId)=>{

        return tree.reduce((acc,comment)=>{
            console.log('acc',acc);
          if(comment.id==commentId)
          {
              return acc;
          }
          else if(comment.replies && comment.replies.length>0)
          {
              comment.replies= deleteNode(comment.replies,commentId);//if commentID is in comment.replies then get inside and now when we get inside acc is still [] then we see comment.replies in turn have empty comment.reply so if is not true also else is not true so comment2 is added to acc[] and then comment1 in if is true then return the current accumulator what ever it was empty or filled 
          }
          return [...acc,comment];
        },[])
    }

    const editComment =(commentId,content)=>{
          setComments((prevComments)=>editNode(prevComments,commentId,content))
    }
    
    const editNode = (tree,commentId,content)=>{
      return tree.map((comment)=>{
          if(commentId===comment.id){
              console.log(commentId);
            return{
                ...comment,
                content:content,
                timestamp:new Date().toISOString()
            }
          }
          else{
            if(comment.replies && comment.replies.length>0)
            {
               return{
                   ...comment,
                   replies: editNode(comment.replies,commentId,content)
               }
            }
          }
          return comment;
      })
    }
    return {
        comments,
        insertCommand,
        editComment,
        deleteComment
    }
}
export default UseCommentTree;