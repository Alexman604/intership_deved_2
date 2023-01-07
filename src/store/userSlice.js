import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userImage: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userName = action.payload.userName;
      state.userImage = action.payload.userImage;
      state.userId = action.payload.userId;
    },
    logoutUser(state) {
      state.userName = null;
      state.userImage = null;
      state.userId = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
