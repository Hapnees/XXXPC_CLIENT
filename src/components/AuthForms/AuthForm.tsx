import React, { FC, useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import { IoClose } from 'react-icons/io5'
import cl from './AuthForm.module.scss'
import RegisterForm from './RegisterForm/RegisterForm'

enum AuthState {
	login = 'login',
	register = 'register',
}

interface IProps {
	closeWindow: () => void
}

const AuthForm: FC<IProps> = ({ closeWindow }) => {
	const [authState, setAuthState] = useState(AuthState.login)

	return (
		<div className='absolute right-0 top-14 z-50'>
			<div className={cl.container}>
				<IoClose
					className='absolute right-1 top-1 p-1 cursor-pointer'
					size={30}
					onClick={closeWindow}
				/>
				<div className={cl.content}>
					{authState === AuthState.login ? (
						<LoginForm
							setAuthState={() => setAuthState(AuthState.register)}
							closeWindow={closeWindow}
						/>
					) : (
						authState === AuthState.register && (
							<RegisterForm
								setAuthState={() => setAuthState(AuthState.login)}
								closeWindow={closeWindow}
							/>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default AuthForm
