import { createSlice } from "@reduxjs/toolkit";
import { userId } from "../../utils/utils";
import { listenToFirestore } from "../../Firebase/CloudFirestore/GetData";

let initialState = {
  data: []
};

export const userSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { updateUsers } = userSlice.actions;

export const listenToSocketUpdates = () => async (dispatch) => {
  const id = await userId();
  listenToFirestore('users', id, (data) => {
    dispatch(updateUsers(data));
  })
};
