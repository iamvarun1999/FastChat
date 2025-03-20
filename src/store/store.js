import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./slices/loaderSlice";
import { contactSlice } from "./slices/contactSlice";
import { userSlice } from "./slices/usersSlice";
import { userDataSlice } from "./slices/userDataSlice";

export const store = configureStore({
    reducer:{
        loader:loaderSlice.reducer,
        contacts:contactSlice.reducer,
        usersData:userSlice.reducer,
        userData:userDataSlice.reducer
    }
})