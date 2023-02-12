import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ticketService from './ticketService';


// 1 - CREATE THE INITIAL STATE
const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

}

// 2 ACTION CREATORS -- REDUCERS,
// Let's create asyncThunpApi (for new ticket)
export const createTicket =  createAsyncThunk('tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token);
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


// 3 - CREATE INITIAL SLICE
export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false,
                state.isSuccess = true

            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = true,
                state.isError = true,
                state.message = action.payload
            })
           
    }
});

export const {reset} = ticketSlice.actions;
export default ticketSlice.reducer;
