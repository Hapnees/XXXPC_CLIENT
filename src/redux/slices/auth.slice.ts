import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	user: {
		username: string
	}
	accessToken: string
	refreshToken: string
}

const initialState: IState = {
	accessToken: '',
	refreshToken: '',
	user: { username: '' },
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<Partial<IState>>) => {
			state.user = action.payload.user || state.user
			state.accessToken = action.payload.accessToken || state.accessToken
			state.refreshToken = action.payload.refreshToken || state.refreshToken
		},

		authLogout: state => {
			state.user = { username: '' }
			state.accessToken = ''
			state.refreshToken = ''
		},
	},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
