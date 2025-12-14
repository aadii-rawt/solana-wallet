"use client"
import React, { useState } from 'react'
import nacl from 'tweetnacl'
import bs58 from "bs58";
const Verify = () => {
    const [message, setMessage] = useState("")
    const [publicKey, setPublicKey] = useState("")
    const [signature, setSignature] = useState("")

    const handleVerify = () => {

        const msg = bs58.decode(message)
        const secret = bs58.decode(publicKey)
        const result = nacl.sign.detached(msg, secret)

        console.log(result);
    }

    return (
        <div className='w-full'>
            <h1 className='text-xl font-semibold mb-5'>Verify</h1>
            <div className='flex flex-col space-y-2 w-full'>
                <input value={signature} onChange={(e) => setSignature(e.target.value)} type="text" placeholder='signature' className='px-2 py-2 border border-gray-500/40 flex-1 focus-within:outline focus-within:outline-white rounded' />
                <input value={publicKey} onChange={(e) => setPublicKey(e.target.value)} type="text" placeholder='public key' className='px-2 py-2 border border-gray-500/40 flex-1 focus-within:outline focus-within:outline-white rounded' />
                <button onClick={handleVerify} className='bg-white text-black px-2 py-1.5 cursor-pointer rounded'>verify</button>
            </div>
            <div>
                <textarea value={message} className='my-4 p-3 border border-gray-500/40 rounded w-full' rows={10} />
            </div>
        </div>
    )
}

export default Verify