import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const LeftSidebar =() =>{
  const { user } = useSelector(store => store.user);
  return(
    <div className="w-[20%]">
      <div>
        <div>
          <img className='ml-5' width={"50px"} src="https://logolook.net/wp-content/uploads/2021/06/Twitter-Log%D0%BE.png" alt="Logo"></img>
        </div>
        <div className="my-4">

        <Link  to={`/home`} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200  hover:cursor-pointer rounded-full">
          <div>

            <FaHome size={'24px'}/>
          </div>
          <h1 className="font-bold text-lg ml-2">Home</h1>
        </Link>

        <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200  hover:cursor-pointer rounded-full">
          <div>
            <FiSearch size={'30px'}/>
          </div>
          <h1 className="font-bold text-lg ml-2">Explore</h1>
        </div>

        <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200  hover:cursor-pointer rounded-full">
          <div>
            <IoMdNotifications size={'24px'}/>
          </div>
          <h1 className="font-bold text-lg ml-2">Notification</h1>
        </div>

        <Link  to={`/profile/${user?._id}`} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200  hover:cursor-pointer rounded-full">
          <div>
            <CgProfile size={'24px'}/>
          </div>
          <h1 className="font-bold text-lg ml-2">Profile</h1>
        </Link>

        <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200  hover:cursor-pointer rounded-full">
          <div>
            <FaBookmark size={'24px'}/>
          </div>
          <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
        </div>

        <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200  hover:cursor-pointer rounded-full">
          <div>
            <HiOutlineLogout size={'24px'}/>
          </div>
          <h1 className="font-bold text-lg ml-2">Log0ut</h1>
        </div>
         <button className="px-4 py-2 border-none text-md bg-blue-300 hover:bg-blue-500 w-full font-bold rounded-full text-white">Post</button>
      </div>
      </div>
    </div>
  
  )
}