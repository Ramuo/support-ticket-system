import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService'


// Let's set up key & value for initialState
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//Let's register new user
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
           const message = 
           (error.response && 
                error.response.data && 
                error.response.data.message) || 
            error.message || 
            error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Let's create the Thunk to get data to login user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        console.log(user)
    }
);

// Let's create the initial slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    },
});


export const {reset} = authSlice.actions
export default authSlice.reducer;









