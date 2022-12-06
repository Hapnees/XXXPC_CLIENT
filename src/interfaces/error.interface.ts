export interface IError {
	status: number
	data: {
		error: string
		messages: string[]
		statusCode: number
	}
}
