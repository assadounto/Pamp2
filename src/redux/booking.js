import {createSlice, createAsyncThunk, purge} from '@reduxjs/toolkit';
import {createApi} from '@reduxjs/toolkit/query';
import axios from 'axios';
import Booking_detail from '../screens/home_screens/Booking_details';
import {backendURL} from '../services/http';


const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    cancelled:false,
     Booking_detail:null,
     time:null,
     date:null
  },
  reducers: {
    cancel(state, action) {
    state.cancelled = !state.cancelled
    },
    setbooking(state, action) {
    state.Booking_detail = action.payload;
    },
    set_date(state, action) {
        state.date = action.payload;
        },
        set_time(state, action) {
            state.time = action.payload;
            },
    
    

  },
  extraReducers: builder => {
  },
});

export const {
  cancel,
  setbooking,
  set_date,
  set_time
} = bookingSlice.actions;
export default bookingSlice.reducer;
