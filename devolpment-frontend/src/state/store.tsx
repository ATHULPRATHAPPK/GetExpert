import { configureStore } from "@reduxjs/toolkit";
import {userReducer}  from "./user/userSlice";
import { adminReducer } from "./admin/adminSlice"; 

 const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer, // Adding admin reducer
    },
});

console.log("store state shape", store.getState());



export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
