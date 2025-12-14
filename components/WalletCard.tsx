"use client"
import React, { useRef } from 'react'

const WalletCard = ({wallet} : {wallet : any}) => {
    const privateKeyRef = useRef([])

    const viewPrivateKey = () => {
        privateKeyRef.current.type = privateKeyRef.current.type == "text" ? "password" : "text"
        
    }

  return (
    <div className='p-3 border border-gray-500/40 rounded-xl'>
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold '>Wallet {wallet.name}</h1>
            <button>Delete</button>
        </div>
        <div className='mt-3 space-y-1'>
            <div>
                <h1 className='text-gray-500 font-medium'>Public Key : </h1>
                <button>{wallet.publicKey}</button>
            </div>
            <div className=''>
                <h1 className='text-gray-500 font-medium'>Private Key : </h1>
                <div className='flex'><input ref={privateKeyRef} type="password" disabled value={wallet.privateKey} className='flex-1 cursor-pointer' /> <button onClick={viewPrivateKey} className='cursor-pointer'>eye</button></div>
            </div>
        </div>
    </div>
  )
}

export default WalletCard