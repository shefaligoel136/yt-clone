import moment from "moment";
import React from "react";

import "./_comment.scss";

const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  return (
    <div className="comment p-2 d-flex">
      <img
        src={authorProfileImageUrl}
        alt="user img"
        className="rounded-circle"
        style={{ marginRight: "15px" }}
      />
      <div className="comment_body">
        <p className="mb-1 comment_header">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
