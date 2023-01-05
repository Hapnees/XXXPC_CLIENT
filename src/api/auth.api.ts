import { ILoginForm } from '../components/AuthForms/LoginForm/LoginForm.interface'
import { IAuthResponse } from '../interfaces/auth/auth-response.interface'
import { ITokens } from '../interfaces/auth/tokens.interface'
import { Roles } from '../interfaces/roles.interface'
import { baseApi } from './baseApi.api'

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<IAuthResponse, any>({
      query: headers => ({
        url: 'auth/register',
        method: 'POST',
        headers,
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
    refreshTokens: build.mutation<{ tokens: ITokens; role: Roles }, any>({
      query: headers => ({
        url: 'auth/refresh',
        method: 'POST',
        headers,
      }),
    }),
    loginAdmin: build.mutation<IAuthResponse, ILoginForm>({
      query: body => ({
        url: 'auth/admin/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokensMutation,
  useLoginAdminMutation,
} = authApi
