import customToast from '@utils/customToast'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

// Создаём сокет
export const useCreateSocket = (setSocket: (socket: Socket) => void) => {
	useEffect(() => {
		if (!process.env.REACT_APP_SOCKET_ADDR) {
			customToast.error('Отсутствует адрес сокета')
			return
		}

		const newSocket = io(process.env.REACT_APP_SOCKET_ADDR)
		setSocket(newSocket)
	}, [setSocket])
}
