"use client"
import { Keypair } from '@solana/web3.js'
import React, { useState } from 'react'
import bs58 from "bs58";
import WalletCard from './WalletCard';

type WalletType = {
    id: string,
    name: string,
    publicKey: string,
    privateKey: string
}
const Wallet = () => {

    const [wallets, setWallets] = useState<WalletType[]>([])

    const addWallet = () => {
        const keypair = Keypair.generate()
        const publicKey = keypair.publicKey.toString()
        const privateKey = bs58.encode(keypair.secretKey)
        setWallets((prev) => ([...prev, { id: crypto.randomUUID(), name: wallets?.length + 1, publicKey, privateKey }]))
    }



    return (
        <div className='px-3 my-10'>
            <div className='flex w-full items-center gap-3'>
                <input type="text" className='flex-1 px-2 py-2  focus-within:outline-1 focus-within:outline-white rounded border  border-gray-500' />
                <button onClick={addWallet} className='bg-white text-black cursor-pointer px-4 py-2 rounded'>Add Wallet</button>
            </div>

            <div className='my-10 space-y-2'>
                {wallets.map((w) => (
                    <WalletCard wallet={w}/>
                ))}
            </div>
        </div>
    )
}

export default Wallet