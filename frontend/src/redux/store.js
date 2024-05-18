import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

export const store = configureStore({
    reducer:{
      // Action
      user:userSlice,
      tweet:tweetSlice
    }
});