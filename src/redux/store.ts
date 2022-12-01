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

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
})

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [authSlice.name],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
