import React from 'react'
import RepairCardLaptop from '../../components/RepairCards/RepairCardLaptop/RepairCardLaptop'
import RepairCardPC from '../../components/RepairCards/RepairCardPC/RepairCardPC'
import RepairCardPhoneAndroid from '../../components/RepairCards/RepairCardPhoneAndroid/RepairCardPhoneAndroid'
import RepairCardRestoreData from '../../components/RepairCards/RepairCardRestoreData/RepairCardRestoreData'
import cl from './RepairPage.module.scss'

const RepairPage = () => {
	return (
		<div className='flex flex-col items-center'>
			<p className={cl.top__title}>Ремонт компьютерной техники</p>

			<div className='mt-6'>
				<div>
					<ul className={cl.menu}>
						<li>
							<RepairCardPC />
						</li>
						<li>
							<RepairCardLaptop />
						</li>
						<li>
							<RepairCardPhoneAndroid />
						</li>
						<li>
							<RepairCardRestoreData />
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default RepairPage
