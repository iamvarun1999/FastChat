import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../../service/AuthApis";

let initialState = {
    data: []
}

export const getAllUsersSlice = createAsyncThunk(
    "getAllUsers",
    async () => {
     let res = await getAllUsers()
     return res?.data?.data || []
    }
)


export const userSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        updateUsers: (state, action) => {
            state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersSlice.fulfilled, (state, action) => {
                state.data = action.payload
            })
        // .addCase(getAllUsersSlice.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(getAllUsersSlice.rejected, (state) => {
        //     state.loading = false;
        // });
    }

})

export const { updateUsers } = userSlice.actions