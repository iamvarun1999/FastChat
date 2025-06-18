// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { getAllUsers } from "../../service/AuthApis";
// import { userId } from "../../utils/utils";
// import { socket } from "../../service/socket";

// let initialState = {
//     data: []
// }

// export const getAllUsersSlice = createAsyncThunk(
//     "getAllUsers",
//     async () => {
//       let id = await userId();
      
//       return new Promise((resolve, reject) => {
//         socket.emit('refresh_chats', id);
  
//         socket.on('allContacts', (data) => {
//           console.log(data, 'vvvvvvvvvvvvv');
//           resolve(data);
//         });
  
//         socket.on('error', (error) => {
//           console.error(error);
//           reject(error); // Reject in case of error
//         });
//       });
//     }
//   );


// export const userSlice = createSlice({
//     name: 'allUsers',
//     initialState,
//     reducers: {
//         updateUsers: (state, action) => {
//             state = action.payload
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllUsersSlice.fulfilled, (state, action) => {
//                 console.log(action.payload,'store')
//                 state.data = action.payload
//             })
//         // .addCase(getAllUsersSlice.pending, (state) => {
//         //     state.loading = true;
//         // })
//         .addCase(getAllUsersSlice.rejected, (state, action) => {
//             console.error('Error fetching data:', action.error);
//           });
//     }

// })

// export const { updateUsers } = userSlice.actions


import { createSlice } from "@reduxjs/toolkit";
import { userId } from "../../utils/utils";
import { socket } from "../../service/socket";

let initialState = {
  data: []
};

export const userSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.data = action.payload; // Ensure this properly updates the state
    }
  }
});

export const { updateUsers } = userSlice.actions;

export const listenToSocketUpdates = () => async (dispatch) => {
  const id = await userId();
  socket.emit("refresh_chats", id);

  socket.on("allContacts", (data) => {
    console.log(data)
    // console.log(data, "Received data from socket");
    dispatch(updateUsers(data));
  });

  socket.on("error", (error) => {
    console.error(error, "Socket error");
  });
};
