import React from "react";
import { useState } from "react";
import Avatar from "react-avatar";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {  getIsActive, getRefresh } from "../redux/tweetSlice";

export const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const {isActive} = useSelector(store=>store.tweet);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  };
  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };


  return (
    <div className="w-[100%]">
      <div>
        <div className="flex item-center justify-evenly border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${isActive ? "border-b-4 border-blue-400": "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-grey-600 text-lg cursor-pointer">
              For you
            </h1>
          </div>

          <div
            onClick={followingHandler}
            className={`${!isActive ? "border-b-4 border-blue-400": "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-grey-600 text-lg ">Following</h1>
          </div>
        </div>

        <div>
          <div className="flex item-center p-4">
            <div>
              <Avatar
                src="https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_400x400.jpg"
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-lg ml-2"
              type="text"
              placeholder="What is happening?"
            />
          </div>
          <div className="flex item-center justify-between p-4 border-b border-gray-300">
            <div className="pt-4">
              <FaImage size="25px" />
            </div>
            <button
              onClick={submitHandler}
              className=" px-4 py-1 text-lg text-white text right border-none bg-blue-500 rounded-full">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
