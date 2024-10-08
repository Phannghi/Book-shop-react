import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
};

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount) => {
        const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
    },
});

export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
