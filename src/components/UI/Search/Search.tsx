import React, { FC, HtmlHTMLAttributes, HTMLProps } from 'react'
import cl from './Search.module.scss'

const Search: FC<HTMLProps<HTMLInputElement>> = ({ className, ...props }) => {
  return <input className={`${cl.input} ${className}`} {...props} />
}

export default Search
