import { ILoginForm } from '../components/AuthForms/LoginForm/LoginForm.interface'
import { IRegisterForm } from '../components/AuthForms/RegisterForm/RegisterForm.interface'
import { IAuthResponse } from '../interfaces/auth/auth-response.interface'
import { ITokens } from '../interfaces/auth/tokens.interface'
import { baseApi } from './baseApi.api'

const authApi = baseApi.injectEndpoints({
	endpoints: build => ({
		register: build.mutation<IAuthResponse, IRegisterForm>({
			query: body => ({
				url: 'auth/register',
				method: 'POST',
				body,
			}),
		}),
		login: build.mutation<IAuthResponse, ILoginForm>({
			query: body => ({
				url: 'auth/login',
				method: 'POST',
				body,
			}),
		}),
		logout: build.mutation<void, any>({
			query: headers => ({
				url: 'auth/logout',
				method: 'POST',
				headers,
			}),
		}),
		refreshTokens: build.mutation<ITokens, any>({
			query: headers => ({
				url: 'auth/refresh',
				method: 'POST',
				headers,
			}),
		}),
	}),
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useRefreshTokensMutation,
} = authApi
