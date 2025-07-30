import { configureStore } from "@reduxjs/toolkit";
import userReducers from './userSlice'

const store = configureStore({
    reducer : {
        user : userReducers
    }
})


export type Rootstate  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;