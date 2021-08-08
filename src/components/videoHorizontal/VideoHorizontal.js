import React , {useState, useEffect} from "react";
import "./_videoHorizontal.scss";

import moment from "moment";
import request from "../../api";
import { AiFillEye } from "react-icons/ai";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const VideoHorizontal = ({ video }) => {

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails:{
        medium
      },
    },
  } = video;

  useEffect(() => {
    const getVideoDetails = async () => {
      console.log("items");
      const {
        data: { items },
      } = await request.get("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: id.videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [id]);

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

  const history = useHistory();
  const handleClick = () => {
    //TODO handle channel click
    history.push(`/watch/${id.videoId}`)
  }

  return (
    <Row className="videoHorizontal m-1 py-2 align-items-center" onClick={handleClick}>
      <Col xs={6} md={6} className="videoHorizontal_left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoHorizontal_thumbnail "
          wrapperClassName="videoHorizontal_thumbnail-wrapper"
        />
        <span className="videoHorizontal_duration">{_duration}</span>
      </Col>
      <Col xs={6} md={6} className="videoHorizontal_right p-0">
        <p className="videoHorizontal_title mb-1">{title}</p>
        <div className="videoHorizontal_details">
          <AiFillEye />
          {numeral(views).format("0.a")} Views •{" "}
          {moment(publishedAt).fromNow()}
        </div>
        <div className="videoHorizontal_channel d-flex align-items-center my-1">
          {/* <LazyLoadImage
            src=""
            effect="blur"
          /> */}
          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
