import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// regis store
import authenReducer from './slice/authSlice';
import postReducer from './slice/postSlice';

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    post: postReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();