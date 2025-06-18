import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    data: {}
}


let userIdState = {
    id:''
}


export const userDataSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.data = action.payload
        }
    }

})
export const userDat = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.data = action.payload
        }
    }

})

export const { updateUserData } = userDataSlice.actions