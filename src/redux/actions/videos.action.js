import { HOME_VIDEO_FAIL, HOME_VIDEO_REQUEST, HOME_VIDEO_SUCCESS } from "../actionTypes";

import request from "../../api";

export const getPopularVideo = () => async (dispatch,getState) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const {data} = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken
      },
    });
    console.log(data.items)
;    dispatch({
        type: HOME_VIDEO_SUCCESS,
        payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: 'All'
        }
    })

  } catch (error) {
      console.log(error.message);
      dispatch({
          type: HOME_VIDEO_FAIL,
          payload: error.message
      })
  }
};


export const getVideosByCategories = (keyword) => async (dispatch,getState) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const {data} = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type:'video'
      },
    });
    console.log(data.items)
;    dispatch({
        type: HOME_VIDEO_SUCCESS,
        payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: keyword
        }
    })

  } catch (error) {
      console.log(error.message);
      dispatch({
          type: HOME_VIDEO_FAIL,
          payload: error.message
      })
  }
};
