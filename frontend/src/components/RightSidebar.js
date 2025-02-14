import React from "react";
import { FiSearch } from "react-icons/fi";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

export const RightSidebar = ({otherUsers}) => {
  return (
    <div className="w-[25%]">
      <div className=" flex items-center p-2  bg-gray-100 rounded-full outline-none w-full">
        <FiSearch size="20px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4  bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {
            otherUsers?.map((user)=>{
              return(
                <div key={user?._id} className="flex items-center justify-between my-3">
                <div className="flex">
                  <div>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_400x400.jpg"
                    size="30"
                    round={true}
                  />
                  </div>
                  <div className="ml-1">
                    <h1 className="font-bold">{user?.name}</h1>
                    <p className="text-gray-500 text-sm">{`@${user?.username}`}</p>
                  </div>
                  <div>
                   <Link to ={`/profile/${user?._id}`}>
                    <button className="px-4 py-1 bg-black text-white rounded-full ml-12">Profile</button>
                    </Link> 
                  </div>
                </div>
              </div>
              )
            })
        }

       

  
      </div>
    </div>
  );
};
