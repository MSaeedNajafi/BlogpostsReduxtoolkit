import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios';
const baseURL = "http://jsonplaceholder.typicode.com/posts"


// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: "I've heard good things.",
//         userId: '2',
//         date: sub(new Date(), {minutes: 10}).toISOString(),
//         reactions:{
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: '2',
//         title: 'Slices...',
//         content: "The more I say slice, the more I want pizza.",
//         userId: '0',
//         date: sub(new Date(), {minutes: 5}).toISOString(),
//         reactions:{
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     }
// ]

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
}

// createAsyncThunk gets 2 argumensts:
// first one is a string which is used as a prefix for generated action type
// payload creator callback => returns promise with data or error
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get(baseURL)
        return response.data
    }
    catch(e){
        return e.message;
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) =>{
    try{
        const response = await axios.post(baseURL, initialPost)
        return response.data
    }
    catch(e){
        return e.message;
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        postAdded: {
            reducer(state, action){
                state.posts.push(action.payload)
            },
            // callback to prepare a post to be added as a payload
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date:new Date().toISOString(),
                        userId,
                        reactions:{
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        // this is mutating code that changes the state
        // reduxtoolkit uses immerjs library under the hood and this makes sure
        // that we do not mutate the state, this can only happen inside the reducer (createSlice)
        reactionAdded(state, action){
            // console.log('store:' , action)
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postsRemoved(state, action){
            const {postId} = action.payload            
            const index = state.posts.findIndex((post) => post.id === postId);
            state.posts.splice(index, 1);           
        }
    },
    // sometime slice reducers needs to respond to other actions that were not defined as part of slices reducers 
    // builder parameter: is an object that lets us defined addiotional case reducers that run in reponse to the actions defined outside of an slice
    extraReducers(builder) {    
        //cases for promise status action types that are dispatched by fetchPosts thunk
        //then we responde by setting our state accordingly 
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading'
                })
            .addCase(fetchPosts.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                let minutes = 1;
                // mapping the date and reactions to our data from api
                const loadPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: minutes++}).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                // add fetch posts to the array
                state.posts = state.posts.concat(loadPosts)
            })
            .addCase(fetchPosts.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.payload.error
            })
            // since the api doesnt have some of the extra data we have been working on
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                // console.log(action)
                state.posts.push(action.payload)
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts; 
export const getPostsStatus = (state) => state.posts.status; 
export const getPostError = (state) => state.posts.error; 


export const { postAdded, reactionAdded, postsRemoved } = postsSlice.actions;
export default postsSlice.reducer