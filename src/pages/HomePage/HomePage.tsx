import React, { useEffect, useState } from 'react'
import cl from './HomePage.module.scss'
import image from '@assets/img/PC.png'
import { news } from './news'

const HomePage = () => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (offset >= (news.length - 1) * 677) {
        setOffset(0)
      } else {
        setOffset(prev => prev + 677)
      }
    }, 3_000)

    return () => {
      clearInterval(interval)
    }
  }, [offset])

  return (
    <div className={cl.wrapper}>
      <div className='my-auto w-[677px]'>
        <div className='overflow-hidden'>
          <div
            className='flex duration-300'
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {news.map((el, idx) => (
              <div className={cl.text__container} key={idx}>
                <p className={cl.title}>{el.title}</p>

                <p className={cl.body}>{el.body}</p>
              </div>
            ))}
          </div>
        </div>
        <button className={cl.button}>кнопка</button>
      </div>

      <div className='flex items-center justify-end'>
        <img src={image} alt='' className='w-[600px] h-[600px]' />
      </div>
    </div>
  )
}

export default HomePage
