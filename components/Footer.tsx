import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-center border-t border-gray-300/20 py-5'>
        <h1 className='text-sm text-gray-500'>Design & Develop by <Link href="">Aditya Rawat</Link></h1>
    </div>
  )
}

export default Footer