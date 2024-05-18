import React from "react";
import { CreatePost } from "./CreatePost";
import { Tweet } from "./Tweet.js";
import { useSelector } from "react-redux";

export const Feed =() =>{
  const {tweets} = useSelector(store=>store.tweet);
  return(
    <div className="w-[50%]">
      <div>
        <CreatePost />
        {
          tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet}/>)
        }
      </div>
    </div>
  
  )
}