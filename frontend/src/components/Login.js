import axios from "axios";
import React, { useState } from "react";
import {USER_API_END_POINT} from "../utils/constant";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from "../redux/userSlice";



export const Login = () =>{
    const [isLogin,setIsLogin]= useState(true);

    const [name,setName] = useState();
    const [username,setUserName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) =>{
      e.preventDefault();
      if(isLogin){
         // login
         try{
          const res = await axios.post(`${USER_API_END_POINT}/login`, {email,password},{
            header:{
              'content-Type':"application/json"
            },
            withCredentials:true
            
          });
          dispatch(getUser(res?.data?.user));
          if(res.data.success){
            navigate("/");
            toast.success(res.data.message);
          }
          
        }catch(error){
          toast.success(error.response.data.message);
          console.log(error);
        }
      }else{
         // signIn
        try{
          const res = await axios.post(`${USER_API_END_POINT}/register`, {name,username,email,password},{
            header:{
              'content-Type':"application/json"
            },
            withCredentials:true
          });
          console.log(res);
          if(res.data.success){
            toast.success(res.data.message);
          }

        }catch(error){
          toast.success(error.response.data.message);
           console.log(error);
        }
      }
    }

    const loginSignUpHandler =()=>{
      setIsLogin(!isLogin);
    }

    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex items-center justify-evenly w-[80%]">
          <div>
            <img
              className="ml-5"
              width={"580px"}
              src="https://logolook.net/wp-content/uploads/2021/06/Twitter-Log%D0%BE.png"
              alt="Logo"
            ></img>
          </div>

          <div className="ml-5">
            <h1 className="font-bold text-6xl">Happening now</h1>
            <h1 className="mt-4 mb-2 text-2xl font-bold">{isLogin ? "Login" :"SignUp"}</h1>
            <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
              {!isLogin && (
                <>
                  <input
                     value={name} onChange={(e)=>setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="outline-blue-500  border-gray-800 px-3 py-1 rounded-full my-1 font-semibold"
                  />
                  <input
                     value={username}  onChange={(e)=>setUserName(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="outline-blue-500  border-gray-800 px-3 py-1 rounded-full my-1 font-semibold"
                  />
                </>
              )}

              <input
                value={email}  onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="outline-blue-500  border-gray-800 px-3 py-1 rounded-full my-1 font-semibold"
              />
              <input
                value={password}  onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="outline-blue-500  border-gray-800 px-3 py-1 rounded-full my-1 font-semibold"
              />
              <button className="bg-[#1D98F0] border-none py-2 my-4 rounded-full text-lg text-white ">
              {isLogin ? "Login" :"Create Account"}
              </button>
              <h1>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  className="font-bold text-blue-700 cursor-pointer"
                  onClick={loginSignUpHandler}
                >
                  {isLogin ? "Signup" : "Login"}
                </span>{" "}
              </h1>
            </form>
          </div>
        </div>
      </div>
    );
}