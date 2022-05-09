import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./feature/post/postsSlice";
import usersReducer from "./feature/user/usersSlice";


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})