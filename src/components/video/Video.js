import React, { useEffect, useState } from "react";
import moment from "moment";
import "./_video.scss";
import request from "../../api";

import { AiFillEye } from "react-icons/ai";
import numeral from "numeral";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      publishedAt,
      title,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || id;

  const history = useHistory();

  useEffect(() => {
    const getVideoDetails = async () => {
      console.log("items");
      const {
        data: { items },
      } = await request.get("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [_videoId]);

  useEffect(() => {
    const getChannelIcons = async () => {
      const {
        data: { items },
      } = await request.get("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcons();
  }, [channelId]);

  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video_top">
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video_top_duration">{_duration}</span>
      </div>
      <div className="video_title">{title}</div>
      <div className="video_details">
        <span>
          <AiFillEye />
          {numeral(views).format("0.a")} Views •{" "}
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>

      <div className="video_channel">
        <LazyLoadImage src={channelIcon?.url} effect="blur" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
