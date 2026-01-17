"use client"
import { Keypair } from '@solana/web3.js'
import React, { useState } from 'react'
import bs58 from "bs58";
import WalletCard from './WalletCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import AddWallet from './AddWallet';
import { Grid, Rows } from 'lucide-react';

type WalletType = {
    id: string,
    name: string,
    publicKey: string,
    privateKey: string
}
const Wallet = () => {

    const [wallets, setWallets] = useState<WalletType[]>([])
    const [collapsed, setCollapsed] = useState(true);

    const addWallet = () => {
        const keypair = Keypair.generate()
        const publicKey = keypair.publicKey.toString()
        const privateKey = bs58.encode(keypair.secretKey)
        setWallets((prev) => ([...prev, { id: crypto.randomUUID(), name: wallets?.length + 1, publicKey, privateKey }]))
    }

    const handleDelete = (id) => {
        const newWallet = wallets.filter((w) => w.id != id)
        setWallets(newWallet)
    }

    return (
        <div className='px-3 my-10'>
            {wallets.length > 0 ?
                <div>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-extrabold'>Solana Wallet</h1>
                        <div className='flex items-center gap-2'>
                            {wallets.length > 1 &&
                                <button onClick={() => setCollapsed(!collapsed)} className='cursor-pointer p-2 rounded-lg hover:bg-[#141414]'>
                                    {collapsed ? <Rows /> : <Grid />}
                                </button>}
                            <button onClick={addWallet} className='bg-white text-black px-4 py-2 rounded-lg cursor-pointer'>Add Wallet</button>
                            <button onClick={() => setWallets([])} className='bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer'>Clear Wallet</button>
                        </div>
                    </div>

                    <div className='my-10'>
                        <div className={
                            collapsed
                                ? "grid grid-cols-1 md:grid-cols-2 gap-8"
                                : "flex flex-col gap-8"
                        }>
                            {wallets.map((wallet) => (
                                <WalletCard
                                    key={wallet.name}
                                    name={wallet.name}
                                    publicKey={wallet.publicKey}
                                    privateKey={wallet.privateKey}
                                    collapsed={collapsed}
                                    handleDelete={() => handleDelete(wallet.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div> :
                <AddWallet addWallet={addWallet} />}
        </div>
    )
}

export default Wallet