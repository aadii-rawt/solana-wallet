"use client"
import React, { useState } from 'react'
import nacl from 'tweetnacl'
import bs58 from "bs58";
import Verify from '@/components/Verify';
const Playground = () => {

    const [message,setMessage] = useState("")
    const [privateKey,setPrivateKey] = useState("")

    const [signature,setSignature] = useState("")

    const createSignature = () => {
        const msg = new TextEncoder().encode(message)
        const secretKey = bs58.decode(privateKey)
        const sig = nacl.sign(msg,secretKey)
        console.log(bs58.encode(sig));
        setSignature(bs58.encode(sig))
        // setSignature(sig.to)
    }
    return (
        <div className="min-h-screen font-sans dark:bg-black">
            <div className="max-w-5xl mx-auto flex gap-10  justify-between">
                <div className='w-full'>
                    <h1 className='text-xl font-semibold mb-5'>Sign</h1>
                    <div className='flex flex-col space-y-2'>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='message' className='px-2 py-2 border border-gray-500/40 flex-1 focus-within:outline focus-within:outline-white rounded' />
                        <input value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} type="password" placeholder='private key' className='px-2 py-2 border border-gray-500/40 flex-1 focus-within:outline focus-within:outline-white rounded' />
                        <button onClick={createSignature} className='bg-white text-black px-2 py-1.5 cursor-pointer rounded'>Sign</button>
                    </div>
                    <div>
                        <textarea value={signature} className='my-4 p-3 border border-gray-500/40 rounded w-full' rows={10} />
                    </div>
                </div>
                <Verify />
            </div>
        </div>
    )
}

export default Playground