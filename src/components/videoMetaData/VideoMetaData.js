import React, { useEffect } from "react";
import "./_videoMetaData.scss";

import numeral from "numeral";
import moment from "moment";

import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoretext from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";

import {
  getChannelDetails,
  checkSubscriptionStatus,
} from "../../redux/actions/channel.action";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelTitle, publishedAt, channelId, description, title } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const  subscriptionStatus  = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData_top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-item-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span style={{ marginRight: "15px" }}>
              <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
            </span>
            <span style={{ marginRight: "15px" }}>
              <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 my-2 videoMetaData_channel d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt=""
            className="mr-3 rounded-circle"
            style={{ marginRight: "15px" }}
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {" "}
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'}`}>
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData_description">
        <ShowMoretext
          lines={3}
          more="Show More"
          less="Show Less"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoretext>
      </div>
    </div>
  );
};

export default VideoMetaData;
