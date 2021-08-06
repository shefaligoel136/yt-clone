import firebase from "firebase/app";

import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCIPkel8XNLsLWMVNgQthdUVvZj22wCaPs",
  authDomain: "yt-cloned.firebaseapp.com",
  projectId: "yt-cloned",
  storageBucket: "yt-cloned.appspot.com",
  messagingSenderId: "590466688991",
  appId: "1:590466688991:web:be347878ea41450fd5866a",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();