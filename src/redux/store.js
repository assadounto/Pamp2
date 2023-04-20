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
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'errorMessage', 'successMessage'],
  stateReconciler: autoMergeLevel2
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
