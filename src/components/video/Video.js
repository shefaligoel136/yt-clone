import React from "react";
import "./_video.scss";

import { AiFillEye } from "react-icons/ai";

const Video = () => {
  return (
    <div className="video">
      <div className="video_top">
        <img src="https://i.ytimg.com/vi/DLX62G4lc44/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAerFBMpMABVPAoBUVS9MJpRerx4A" alt="" />
        <span>05:00</span>
      </div>
      <div className="video_title">Create react app</div>
      <div className="video_details">
        <span>
          <AiFillEye />
          5M Views •{" "}
        </span>
        <span>5 Days Ago</span>
      </div>

      <div className="video_channel">
        <img
          src="https://i.ytimg.com/vi/w7ejDZ8SWv8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLtqhjnv15Y388joYu5qQ3VjlhZw"
          alt=""
        />
        <p>REACT WHAT?</p>
      </div>
    </div>
  );
};

export default Video;
