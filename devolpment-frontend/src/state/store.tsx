import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { adminReducer } from "./admin/adminSlice";
import { technicianReducer } from "./technician/technicianSlice"; // Import technician reducer

const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        technician: technicianReducer, 
    },
});

console.log("store state shape", store.getState());

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
