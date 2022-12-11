import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi.api'
import { authReducer, authSlice } from './slices/auth.slice'
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import { ErrorHandler } from '../middlewares/error-handler.middleware'
import { tabReducer, tabSlice } from './slices/tab.slice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  tab: tabReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [authSlice.name, tabSlice.name],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware, ErrorHandler]),
})

export type TypeRootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
