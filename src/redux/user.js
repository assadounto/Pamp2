import {createSlice, createAsyncThunk, purge} from '@reduxjs/toolkit';
import {createApi} from '@reduxjs/toolkit/query';
import axios from 'axios';
import {backendURL} from '../services/http';



const initialState = {
  cancelled:false,
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
  location:{},
  recent_vendors:[],
  notification_count:0,
  newnoti: true,
  currentServiceIndex: 0,
  bottom_nav:true,
  categories:[],
  recent_view:{
    cat:'',
    search:''
  },
  vPM:{},
  serviceStatus:{
    color:'',
    status:''
   },
   rating:[],

  payment_methods:{
    default:  {  
       id:1,
      name: 'Pay with cash',
      img: 'cash'  
  },
    methods: [
      {   id:1,
        name: 'Pay with cash',
        img: 'cash'  
    },
    {   id:2,
      name: 'Pay with card',
      img: 'master'  
  },
  {   id:3,
    name: 'Pay with momo',
    img: 'momo'  
},
    ]
  },
}

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
initialState,

  reducers: {
    setMessage(state, action) {
      state.user = action.payload;
      state.tokens = action.payload;
    },
    setNotification(state, action) {
      state.notifications = action.payload;
    },
    addRecent(state, action) {
      state.recent_view= action.payload;
    },
    setCat(state, action) {
      state.categories = action.payload;
    },
    updateEmail(state, action) {
      state.userInfo = {...state.userInfo,email:action.payload};
    },
    setVerified_p(state, action) {
      state.unverified_p = action.payload;
    },
    showBottom(state, action) {
      state.bottom_nav= action.payload;
    },
    verified(state, action) {
      state.verified = action.payload;
    },
    setuser(state, action) {
      state.user = action.payload;
    },
    setUser(state, action) {
      state.userInfo = action.payload;
    },
    setRecentvendors(state, action) {
      state.recent_vendors.unshift(action.payload)
      if (state.recent_vendors.length>6){
        state.recent_vendors.pop()
      }
    },
    setImage(state, action) {
      state.userInfo = {...state.userInfo,image: action.payload};
    },
    userLogout(state) {
      return {...initialState,first_time:false};

    },
    setPayment(state,action){
      state.payment_methods.methods.push(action.payload)
    },
    setDefault(state,action){
      state.payment_methods.default=action.payload
    },
    cancel(state, action) {
      state.cancelled = !state.cancelled
      },
      setLocation(state, action) {
        state.location = action.payload
        },
        setCurrentServiceIndex(state, action) {
          state.currentServiceIndex = action.payload
          },
          setServiceStatus(state, action) {
            state.serviceStatus = action.payload
            },
            setVPM(state, action) {
              state.vPM= action.payload
              },
            setnotifications_count(state, action) {
              if (action.payload > state.notification_count) {
                return {
                  ...state,
                  notification_count: action.payload,
                  newnoti: true
                };
              } else {
                return {
                  ...state,
                  notification_count: action.payload,
                  newnoti: false
                };
              }
            },

            update_new(state, action) {
              state.newnoti=action.payload   
          }, 
     
          delete_rating(state, action) {
            state.rating=[]  
        }, 
             
      loginUser(state,action){
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.image1=action.payload.image;
        state.email_confirmed = action.payload.email_confirmed;
      }, 
        setExistingRating(state, action) {
          state.rating= action.payload
      }, 

  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.data.user;
        state.userToken = action.payload.data.token;
        state.loading = false;
        state.image1= action.payload.data.image
        state.email_confirmed = action.payload.data.email_confirmed;
       
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
  update_new,
  setnotifications_count,
  cancel,
  setImage,
  setNotification,
  setVerified_p,
  verified,
  userLogout,
  setuser,
  setPayment,
  setDefault,
  setLocation,
  setCurrentServiceIndex,
  setServiceStatus,
  setUser,
  showBottom,
  setCat,
  addRecent,
  delete_rating,
  add_new_rating,
  setExistingRating,
  setVPM,
  setRecentvendors,
  updateEmail,
  loginUser
} = userSlice.actions;
export default userSlice.reducer;
