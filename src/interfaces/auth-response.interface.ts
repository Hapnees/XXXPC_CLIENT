export interface IAuthResponse {
	user: {
		username: string
	}
	accessToken: string
	refreshToken: string
}
