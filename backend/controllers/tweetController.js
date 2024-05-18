import { promises } from "dns";
import {Tweet} from "../models/tweetSchema.js";
import { getOtherUsers } from "./userController.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req,res)=>{
  try{
    const {description, id}=req.body;
    if(!description ||  !id){
      return res.status(401).json({
        message:"Field are Required",
        success:false
      });
    };
    const user = await User.findById(id).select("-password")
    await Tweet.create({
      description,
      userId:id,
      userDetails:user
    });
    return res.status(201).json({
      message:"Tweet Created Successfully",
      success:true
    });


  }catch (error){
    console.log(error);
  }
};

export const deleteTweet = async(req,res) => {
  try{
    const {id} = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message:"Tweet deleted successfully.",
      success:true
    })
  }catch(error){
    console.log(error);
  }
}


export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    
    // Find the tweet by its ID
    const tweet = await Tweet.findById(tweetId);
    
    // Check if tweet is null
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        success: false
      });
    }

    if (tweet.like.includes(loggedInUserId)) {
      // User has already liked the tweet, so dislike it
      await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
      return res.status(200).json({
        message: "User disliked your tweet."
      });
    } else {
      // User hasn't liked the tweet yet, so like it
      await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
      return res.status(200).json({
        message: "User liked your tweet."
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};


export const getAllTweets = async(req,res)=>{
  try{
      const id = req.params.id;
      const loggedInUser = await User.findById(id);
      const loggedInUserTweets = await Tweet.find({userId:id});
      const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
        return Tweet.find({userId:otherUserId})
      }))
      return res.status(200).json({
        tweets:loggedInUserTweets.concat(...followingUserTweet)
      })
   }
  catch(error){
    console.log(error);
  }
}

export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the logged-in user
    const loggedInUser = await User.findById(id); // Assuming you have a User model

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!loggedInUser.following || !Array.isArray(loggedInUser.following)) {
      return res.status(400).json({ error: "Following list is not valid" });
    }

    // Fetch tweets from users the logged-in user is following
    const followingUserTweetPromises = loggedInUser.following.map(async (otherUserId) => {
      return Tweet.find({ userId: otherUserId });
    });

    const followingUserTweets = await Promise.all(followingUserTweetPromises);

    return res.status(200).json({
      tweets: [].concat(...followingUserTweets)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching following tweets" });
  }
};

