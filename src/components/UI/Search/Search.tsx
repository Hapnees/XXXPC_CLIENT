import React from 'react'
import cl from './Search.module.scss'

const Search = () => {
	return <input type='text' className={cl.input} placeholder='Какой-то текст' />
}

export default Search
