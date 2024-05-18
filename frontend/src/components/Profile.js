import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoBalloon } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useGetProfile } from "../hooks/useGetProfile";
import { useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";

export const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${TWEET_API_END_POINT}/unfollow/${id}`,{id: user?._id});
        console.log(res);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${TWEET_API_END_POINT}/follow/${id}`,{id: user?._id});
        console.log(res);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center px-4 py-2">
          <Link
            to="/"
            className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer"
          >
            <IoArrowBack size="24px" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-grey-500 text-sm ">10 post</p>
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/1551112401411530754/1687901177/600x200"
          alt="banner"
        />

        <div className="absolute top-52  ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_400x400.jpg"
            size="120"
            round={true}
          />
        </div>

        <div className="text-right m-4">
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-4 py-1 hover:bg-black-200 text-black  rounded-full border border-gray-400">
              {user.following.includes(id) ? "Following": "Follow" }
            </button>
          )}
        </div>
        <div className="m-2">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div>
          <p>
            |King Babar Azam| PCT Lover| Work for - Channel 9-K Com Box | Lahore
            Qalandars fan
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex ml-1 p-1">
            <BsJournalBookmarkFill size="20px" />
            Journalist
          </div>
          <div className="flex ml-1 p-1">
            <FaLocationDot size="20px" />
            Pakistan
          </div>
          <div className="flex ml-1 p-1">
            <IoBalloon size="20px" />
            Born 18 May
          </div>
          <div className="flex ml-1 p-1">
            <FaRegCalendarAlt size="20px" />
            Joined July 2000
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-between mt-5 ml-4 ">
            <h1>
              <span className=" font-bold">709</span> Following
            </h1>
            <h1 className=" pl-5">
              <span className=" font-bold">24K</span> Follower
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
