import axios from 'axios';
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

export const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.error("Error fetching my tweets:", error);
    }
  }, [id, dispatch]);

  const followingTweetHandler = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.error("Error fetching following tweets:", error);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isActive) {
      fetchMyTweets();
    } else {
      followingTweetHandler();
    }
  }, [isActive, refresh, fetchMyTweets, followingTweetHandler]);
};
