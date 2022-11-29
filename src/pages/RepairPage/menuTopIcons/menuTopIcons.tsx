import { BsFillLaptopFill, BsFillPrinterFill, BsSlashLg } from 'react-icons/bs'
import { ImDrive } from 'react-icons/im'
import { IoDesktop, IoTvSharp } from 'react-icons/io5'
import { RiSmartphoneFill } from 'react-icons/ri'
import cl from './menuTopIcons.module.scss'

export const menuSmartPhone = (
	<RiSmartphoneFill className={cl.big__icon} size={55} />
)

export const menuPCTop = (
	<div className='flex gap-4 items-center'>
		<IoDesktop className={cl.big__icon} size={55} />
		<BsSlashLg className={cl.big__icon} size={35} />
		<BsFillLaptopFill className={cl.big__icon} size={55} />
	</div>
)

export const menuPrinter = (
	<BsFillPrinterFill className={cl.big__icon} size={55} />
)

export const menuTV = <IoTvSharp className={cl.big__icon} size={55} />

export const menuDrive = <ImDrive className={cl.big__icon} size={55} />
