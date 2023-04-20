import {createSlice, createAsyncThunk, purge} from '@reduxjs/toolkit';
import {createApi} from '@reduxjs/toolkit/query';
import axios from 'axios';
import {backendURL} from '../services/http';

export const login = createAsyncThunk(
  'user/login',
  async (details, {rejectWithValue}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post(
        `${backendURL}/user/login`,
        details,
        config,
      );
      // store user's token in local storage

      return {data};
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('Invalid credentials');
      }
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (data, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(`${backendURL}/user/signup`, data, config);
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await userServices.logout();
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userInfo: null,
    userToken: null,
    errorMessage: null,
    success: false,
    first_time: true,
    email_confirmed: false,
    notifications: false,
    createError: null,
    user: null,
    image1: null,
    payment_methods:{
      default:null,
      methods: [
        {   id:1,
          name: 'Pay with cash',
          img: 'cash'  
      },
      ]
    },
    
    
  },
  reducers: {
    setMessage(state, action) {
      state.user = action.payload;
      state.tokens = action.payload;
    },
    setNotification(state, action) {
      state.notifications = action.payload;
    },
    setVerified_p(state, action) {
      state.unverified_p = action.payload;
    },
    verified(state, action) {
      state.verified = action.payload;
    },
    setuser(state, action) {
      state.user = action.payload;
    },
    setImage(state, action) {
      state.image1 = action.payload;
    },
    userLogout(state) {
      (state.userInfo = null),
        (state.userToken = null),
        (state.email_confirmed = null),
        (state.first_time = false),
        (state.user = null);
    },
    setPayment(state,action){
      state.payment_methods.methods.push(action.payload)
    },
    setDefault(state,action){
      state.payment_methods.default=action.payload
    }

  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.data.user;
        state.userToken = action.payload.data.token;
        state.loading = false;
        state.email_confirmed = action.payload.data.email_confirmed;
        console.log(state);
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.loading = false;
        state.errorMessage = payload;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createError = null;
        // registration successful
        // state.notifications = action.payload.notifications;
      })
      .addCase(register.rejected, (state, {payload}) => {
        state.loading = false;
        state.createError = payload;
        console.log(state);
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.tokens = null;
        state.unverified_e = true;
        state.unverified_p = true;
        state.first_time = true;
        state.verified = false;
        state.notifications = false;
        state.errorMessage = null;
      });
  },
});

export const {
  setMessage,
  setImage,
  setNotification,
  setVerified_p,
  verified,
  userLogout,
  setuser,
  setPayment,
  setDefault
} = userSlice.actions;
export default userSlice.reducer;
