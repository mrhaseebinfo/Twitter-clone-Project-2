import {createSlice} from "@reduxjs/toolkit";



 const userSlice = createSlice({

  name:"User",
  initialState:{
     user:null,
     otherUsers:null,
     profile:null
  },
  reducers:{
    //Multiple action
     getUser:(state,action)=>{
         state.user=action.payload;
     },
     getOtherUsers:(state,action)=>{
      state.otherUsers = action.payload;
    },
    getMyProfile:(state,action)=>{
      state.profile=action.payload;
    }
  }
});

export const {getUser, getOtherUsers,getMyProfile} = userSlice.actions;
export default userSlice.reducer;
