import axios from "axios";

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: "AIzaSyCIPkel8XNLsLWMVNgQthdUVvZj22wCaPs",
    }
});

export default request