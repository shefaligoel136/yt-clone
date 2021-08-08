import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import {
  getPopularVideo,
  getVideosByCategories,
} from "../../redux/actions/videos.action";

import InfiniteScroll from "react-infinite-scroll-component";

import "./_homeScreen.scss";
import SkeletonVideo from "../../components/Skeleton/SkeletonVideo";
 
const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideo());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopularVideo());
    else {
      dispatch(getVideosByCategories(activeCategory));
    }
  };

  return (
    <Container>
      <CategoriesBar />

      {/* <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      > */}
      <Row>
        {!loading
          ? videos.map((video) => (
              <Col lg={3} md={4} key={video.id}>
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map(() => (
              <Col lg={3} md={4}>
                <SkeletonVideo />
              </Col>
            ))}
      </Row>
      {/* </InfiniteScroll> */}
    </Container>
  );
};

export default HomeScreen;
