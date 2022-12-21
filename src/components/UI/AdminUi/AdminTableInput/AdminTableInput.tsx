import React, { forwardRef, useState } from 'react'
import { IAdminTableField } from './AdminTableInput.interface'
import cl from './AdminTableInput.module.scss'

export const AdminTableInput = forwardRef<HTMLInputElement, IAdminTableField>(
  ({ error, width, ...props }, ref) => {
    const [isHover, setIsHover] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    return (
      <div
        className={cl.wrapper}
        style={{
          backgroundColor: `${
            error
              ? 'rgba(227, 44, 44, 0.626)'
              : isHover || isFocus
              ? 'rgba(50, 115, 181, 0.608)'
              : 'transparent'
          }`,
        }}
      >
        <div className={cl.container}>
          <input
            {...props}
            ref={ref}
            className={cl.input}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            style={{
              width: width - 3,
            }}
          />
        </div>
      </div>
    )
  }
)

AdminTableInput.displayName = 'AdminTableInput'
