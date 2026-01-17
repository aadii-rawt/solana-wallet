import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className=' py-5 flex items-center justify-between'>
        <h1 className='text-3xl font-extrabold'>SOl</h1>
        <Link href="/playground" className='bg-white text-black px-2 py-2 rounded text-sm cursor-pointer font-medium'>Play Ground</Link>
    </div>
  )
}

export default Header   