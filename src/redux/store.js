import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from './authapi';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { homeApi } from './homeapi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'errorMessage', 'successMessage'],
};

const user = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
  
});

export const persistor = persistStore(store);
