import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));


// 1 - GLOBAL STATE
// Let's set up the initial State 
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
 
// 2 - ACTIONS
//Let's register new user
export const register =  createAsyncThunk('auth/register',
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

//Let's login user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
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

//Let's create thunk  to logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

// 3 - ACTION CREATORS -- REDUCERS,
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
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isError = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isError = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
});


export const {reset} = authSlice.actions
export default authSlice.reducer;









