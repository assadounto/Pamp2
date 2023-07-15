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
     date:null,
     vendors:[],
     vendor:[],
     vendor_name:'',
     actual_booking:{},
     vendor_id: null,
     staff:'',
     vendorimg:''
  },
  reducers: {
    cancel(state, action) {
    state.cancelled = !state.cancelled
    },
    setbooking(state, action) {
    state.Booking_detail = action.payload;
    },
     set_actual_booking(state, action) {
    state.actual_booking = action.payload;
    },
    set_date(state, action) {
        state.date = action.payload;
        },
        set_time(state, action) {
            state.time = action.payload;
            },
            setvendorname(state, action) {
              state.vendor_name = action.payload;
              },
              setvendorid(state, action) {
                state.vendor_id = action.payload;
                },
            setVendor(state, action) {
              state.vendor = action.payload;
              },
              set_staff(state, action) {
                state.staff = action.payload;
                },
                setvendorimg(state, action) {
                  state.vendorimg = action.payload;
                  },
              findVendor(state, action) {
                let vendor= state.vendors.filter((vendor)=>
                vendor.id==action.payload    
                )
                state.vendor=vendor
                },

  },
  extraReducers: builder => {
  },
});

export const {
  cancel,
  setbooking,
  set_date,
  set_time,
  setVendor,
  setvendorname,
  setvendorid,
  set_actual_booking,
  set_staff,
  setvendorimg
} = bookingSlice.actions;
export default bookingSlice.reducer;
