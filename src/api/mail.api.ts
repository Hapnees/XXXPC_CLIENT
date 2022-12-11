import { IRegisterForm } from '../components/AuthForms/RegisterForm/RegisterForm.interface'
import { baseApi } from './baseApi.api'

export const mailApi = baseApi.injectEndpoints({
  endpoints: build => ({
    sendEmail: build.mutation<{ message: string }, IRegisterForm>({
      query: body => ({
        url: 'mail/send',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSendEmailMutation } = mailApi
