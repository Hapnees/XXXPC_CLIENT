import React, { FC, HTMLAttributes } from 'react'
import cl from './Search.module.scss'

const Search: FC<HTMLAttributes<HTMLInputElement>> = props => {
  return <input type='text' className={cl.input} {...props} />
}

export default Search
