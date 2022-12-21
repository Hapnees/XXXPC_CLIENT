import React, { FC, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import avatar from '@assets/img/avatar.jpg'
import { usernameFormat } from '@utils/username.format'
import cl from './AuthComponent.module.scss'
import PopupMenu from './PopupMenu/PopupMenu'

interface IProps {
  username: string
  avatarPath: string
}

const AuthComponent: FC<IProps> = ({ username, avatarPath }) => {
  const ref = useRef<HTMLUListElement>(null)
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  return (
    <div>
      <div
        className={cl.container__avatar}
        onClick={() => setIsOpenPopup(!isOpenPopup)}
        style={
          isOpenPopup
            ? {
                borderBottomColor: '#c36eb889',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {}
        }
      >
        <img src={avatarPath || avatar} className={cl.avatar} alt='' />
        <p className={cl.title}>{usernameFormat(username)}</p>
      </div>
      <div className='relative'>
        <CSSTransition
          in={isOpenPopup}
          timeout={300}
          classNames='popup'
          nodeRef={ref}
          unmountOnExit
        >
          <PopupMenu closePopup={() => setIsOpenPopup(false)} ref={ref} />
        </CSSTransition>
      </div>
    </div>
  )
}

export default AuthComponent
