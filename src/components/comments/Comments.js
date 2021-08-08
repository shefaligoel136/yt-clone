import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCommentsOfVideoById, addComment } from "../../redux/actions/comment.action";

import Comment from "../comment/Comment";
import "./_comments.scss";

const Comments = ({ videoId, totalComment }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId]);

  const { comments } = useSelector((state) => state.commentList);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const [text, setText] = useState('') 

  const handleComment = (e) => {
    e.preventDefault();
    if(text.length === 0){
      return;
    }
    dispatch(addComment(videoId, text))
    setText('')
  };

  return (
    <div className="comments">
      <p>{totalComment} comments</p>
      <div className="comments_form d-flex w-100 my-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GNdfefPfPYzh0VvZB3WUDPk8x07-oC-a0A&usqp=CAU"
          alt="user img"
          className="rounded-circle mr-3"
          style={{ marginRight: "15px" }}
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment"
            value={text}
            onChange = {e => setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments_list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
