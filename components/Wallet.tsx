"use client"
import { Keypair } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import bs58 from "bs58";
import WalletCard from './WalletCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import AddWallet from './AddWallet';
import { Grid, Rows } from 'lucide-react';
import * as bip39 from "bip39";
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';

type WalletType = {
    id: string,
    publicKey: string,
    privateKey: string,
    mnemonics: string,
    path: string,
}
const Wallet = () => {

    const [mnemonics, setMnemonics] = useState<string[]>(Array(12).fill(""))
    const [mnemonicsInput, setMnemonicsInput] = useState("")
    const [wallets, setWallets] = useState<WalletType[]>([])
    const [collapsed, setCollapsed] = useState(true);


    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        const storedMnemonic = localStorage.getItem("mnemonics");

        if (storedWallets && storedMnemonic) {
            setMnemonics(JSON.parse(storedMnemonic));
            setWallets(JSON.parse(storedWallets));
        }
    }, []);


    const handleDelete = (id) => {
        const newWallet = wallets.filter((w) => w.id != id)
        setWallets(newWallet)
    }

    const handleClearWallets = () => {
        localStorage.removeItem("wallets");
        localStorage.removeItem("mnemonics");
        setWallets([]);
        setMnemonics([]);
    };

    const generateWalletFromMnemonics = (mnemonics: string, accountIndex: number) => {

        try {
            const seedBuffer = bip39.mnemonicToSeedSync(mnemonics);
            const path = `m/44'/501'/0'/${accountIndex}'`; //501 for solana
            const { key: derivedSeed } = derivePath(path, seedBuffer.toString())

            const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
            const keypair = Keypair.fromSecretKey(secretKey);

            const privateKeyEncoded = bs58.encode(secretKey)
            const publicKeyEncoded = keypair.publicKey.toBase58()

            return {
                id: crypto.randomUUID(),
                privateKey: privateKeyEncoded,
                publicKey: publicKeyEncoded,
                mnemonics,
                path,
            }

        } catch (error) {
            console.log("failed to create wallet. Please try again.");
            return null;
        }
    }

    const generateWallet = () => {
        let mnemonics = mnemonicsInput.trim()

        if (mnemonics) {
            if (!bip39.validateMnemonic(mnemonics)) {
                console.log("invalid mnemonics please try again");
                return
            }
        } else {
            mnemonics = bip39.generateMnemonic()
        }

        console.log(mnemonics);

        const words = mnemonics.split(" ")
        console.log(words);
        setMnemonics(words)

        const wallet = generateWalletFromMnemonics(mnemonics, wallets.length);
        if (wallet) {
            const updatedWallet = [...wallets, wallet];
            setWallets(updatedWallet)
            localStorage.setItem("wallets", JSON.stringify(updatedWallet));
            localStorage.setItem("mnemonics", JSON.stringify(words));
        }

    }

    // to add more wallet form mnemonics
    const addWallet = () => {
        if (!mnemonics) {
            console.log("No mnemonics founds. Please generate wallet first");
            return
        }

        const wallet = generateWalletFromMnemonics(mnemonics.join(" "), wallets.length)
        if (wallet) {
            const updatedWallet = [...wallets, wallet];
            setWallets(updatedWallet)
            localStorage.setItem("wallets", JSON.stringify(updatedWallet));
        }
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
                            <button onClick={handleClearWallets} className='bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer'>Clear Wallet</button>
                        </div>
                    </div>

                    <div className='my-10'>
                        <div className={
                            collapsed
                                ? "grid grid-cols-1 md:grid-cols-2 gap-8"
                                : "flex flex-col gap-8"
                        }>
                            {wallets.map((wallet,i ) => (
                                <WalletCard
                                    name={`Wallet ${i+1}`}
                                    publicKey={wallet.publicKey}
                                    privateKey={wallet.privateKey}
                                    collapsed={collapsed}
                                    handleDelete={() => handleDelete(wallet.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div> :
                <AddWallet addWallet={generateWallet} mnemonicsInput={mnemonicsInput} setMnemonicsInput={setMnemonicsInput} />}
        </div>
    )
}

export default Wallet