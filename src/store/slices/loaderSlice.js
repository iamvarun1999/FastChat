import { createSlice } from "@reduxjs/toolkit"



export const loaderSlice = createSlice({
    name:'globalLoader',
    initialState: false,
    reducers: {
        startLoader: (state,action) => true,
        stopLoader: (state,action) => false,
    }

})

export const {startLoader,stopLoader} = loaderSlice.actions