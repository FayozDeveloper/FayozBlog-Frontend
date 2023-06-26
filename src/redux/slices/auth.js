import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuthData = createAsyncThunk('/auth/fetchUserData', async (params) => {
    try {
        const {data} = await axios.post('/auth/login', params)
        return data
    } catch (e) {
        alert('Something gone wrong')
    }
})
export const fetchAuthSignUp = createAsyncThunk('/auth/signup/fetchSignUp', async (params) => {
    const {data} = await axios.post('/auth/signup', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('/auth/me/fetchAuthMe',  async () => {
    const {data} = await axios.get('/auth/me');
    return data
})


const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
          state.data = null
      }
    },
    extraReducers: {
        [fetchAuthData.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthData.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthData.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthSignUp.pending]: (state) => {
            state.status = 'loading';
            state.data = null
        },
        [fetchAuthSignUp.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthSignUp.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
})

export const {logout} = authSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;