import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";


export const Tweet = ({ tweet }) => {
    
   const {user} = useSelector(store=>store.user);
   const dispatch = useDispatch();
  const likeOrDislikeHandler = async(id)=>{
    try{
        const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{
          withCredentials:true
        })
        console.log(res)
        dispatch(getRefresh());
        toast.success(res.data.message);
      
    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const deleteTweetHandler =async (id) =>{
     try{
        axios.defaults.withCredentials=true;
        const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
        console.log(res);
        dispatch(getRefresh());
        toast.success(res.data.message);
     }catch(error){
      toast.error(error.response.data.message);
      console.log(error)
     }
  }
  return (
    <div className="border-b border-gray-200">
      <div className="flex p-4">
        <Avatar
          src={tweet?.userDetails[0].avatarUrl}
          size="30"
          round={true}
        />
        <div className="ml-2 w-full">
          <div className="flex items-center mt-1">
            <h1 className="font-bold">
              {tweet?.userDetails[0].name}
              <span className="text-gray-500 text-sm ml-2">
                {`@${tweet?.userDetails[0].username} • 1m`}
              </span>
            </h1>
          </div>
          <div>
            <p>{tweet?.description}</p>
          </div>
          <div className="flex justify-between my-3">
            <div className="flex items-center">
              <div className="p-2 hover:bg-blue-300 rounded-full cursor-pointer">
                <FaRegComment size="20px" />
              </div>
              <p className="ml-1">10</p>
            </div>
            <div className="flex items-center">
              <div  onClick={()=>likeOrDislikeHandler(tweet?._id)} className="p-2 hover:bg-blue-300 rounded-full cursor-pointer">
                <AiOutlineLike size="20px" />
              </div>
              <p className="ml-1">{tweet?.like.length}</p>
            </div>
            <div className="flex items-center">
              <div className="p-2 hover:bg-blue-300 rounded-full cursor-pointer">
                <CiBookmark size="20px" />
              </div>
              <p className="ml-1">13</p>
            </div>
           
            {
              user?._id === tweet?.userId && (
                <div onClick={()=>deleteTweetHandler(tweet?._id)} className="flex items-center">
                <div className="p-2 hover:bg-red-400 rounded-full cursor-pointer">
                  <MdOutlineDeleteForever size="20px" />
                </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
