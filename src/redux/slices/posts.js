import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

// const fetchPosts is async action
export const fetchPosts = createAsyncThunk('/posts/fetchPosts' , async () => {
    const {data} = await axios.get('/posts');
    return data
})

export const fetchPostByTag = createAsyncThunk('/tag/fetchPostByTag', async (tag) => {
    const {data} = await axios.get(`/posts/tag/${tag}`)
    return data
})

export const fetchTags = createAsyncThunk('/tags/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`)
})

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

// slice bu tipa reducer
const postsSlice = createSlice({
    name: 'posts',
    // initialState bu extraReducers ichidegi callbackdegi state
    initialState,
    reducers: {},
    extraReducers: {
        // []: bu narsa key (klyuch)  (state) => {} bu bosa funksiya
        // GET POSTS
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // GET POST BY TAG
        [fetchPostByTag.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostByTag.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPostByTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // GET TAGS
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        // REMOVE POST
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postsSlice.reducer
