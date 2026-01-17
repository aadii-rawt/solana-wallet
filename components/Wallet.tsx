"use client"
import { Keypair } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import bs58 from "bs58";
import WalletCard from './WalletCard';
import AddWallet from './AddWallet';
import * as bip39 from "bip39";
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { toast } from 'sonner';
import { BiCopy } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type WalletType = {
    id: string,
    publicKey: string,
    privateKey: string,
    mnemonics: string,
    path: string,
}
const Wallet = () => {

    const [mnemonics, setMnemonics] = useState<string[]>(Array(12).fill(""))
    const [mnemonicsInput, setMnemonicsInput] = useState<string>("")
    const [wallets, setWallets] = useState<WalletType[]>([])
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [showMnemonics, setShowMnemonics] = useState<boolean>(false)

    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        const storedMnemonic = localStorage.getItem("mnemonics");

        if (storedWallets && storedMnemonic) {
            setMnemonics(JSON.parse(storedMnemonic));
            setWallets(JSON.parse(storedWallets));
        }
    }, []);


    const handleDelete = (id: string) => {
        const newWallet = wallets.filter((w) => w.id != id)
        setWallets(newWallet)
        localStorage.setItem("wallets", JSON.stringify(newWallet));
        toast("Wallet deleted successfully")
    }

    const handleClearWallets = () => {
        localStorage.removeItem("wallets");
        localStorage.removeItem("mnemonics");
        setWallets([]);
        setMnemonics([]);
        toast("All wallet cleared")
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
                toast.error("Invalid mnemonics please try again")
                console.log("invalid mnemonics please try again");
                return
            }
        } else {
            mnemonics = bip39.generateMnemonic()
        }
        const words = mnemonics.split(" ")
        setMnemonics(words)

        const wallet = generateWalletFromMnemonics(mnemonics, wallets.length);
        if (wallet) {
            const updatedWallet = [...wallets, wallet];
            setWallets(updatedWallet)
            localStorage.setItem("wallets", JSON.stringify(updatedWallet));
            localStorage.setItem("mnemonics", JSON.stringify(words));
            toast("Wallet generated successfully")
        }

    }

    // to add more wallet form mnemonics
    const addWallet = () => {
        if (!mnemonics) {
            toast.error("No mnemonics founds. Please generate wallet first");
            return
        }

        const wallet = generateWalletFromMnemonics(mnemonics.join(" "), wallets.length)
        if (wallet) {
            const updatedWallet = [...wallets, wallet];
            setWallets(updatedWallet)
            localStorage.setItem("wallets", JSON.stringify(updatedWallet));
            toast("Wallet generated successfully")
        }
    }

    const copyMnemonics = (str : string) => {
        window.navigator.clipboard.writeText(str)
        toast("Copied to clipboard")
    }

    return (
        <div className='px-3 my-10'>
            {wallets.length > 0 ?
                <div>
                    {/* mnemonics */}
                    <div className='border border-gray-200/20 p-5 rounded-xl mb-10 cursor-pointer' >
                        <div className='flex items-center justify-between' onClick={() => setShowMnemonics(!showMnemonics)}>
                            <h1 className='text-2xl font-extrabold'>Your Secret Phrase</h1>
                            <button className='p-2 rounded-lg hover:bg-[#141414] cursor-pointer' >{showMnemonics ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                        </div>
                        {showMnemonics && <div onClick={() => 
                            copyMnemonics(mnemonics.join(" "))}>
                            <div className='grid grid-cols-4 gap-3 mt-5'>
                                {mnemonics.map((word) =>
                                    <div key={word} className='bg-[#222222] p-4 rounded hover:bg-[#2f2e2e]'>
                                        <p>{word}</p>
                                    </div>
                                )}
                            </div>
                            <button className='flex items-center gap-3 text-sm my-5 cursor-pointer'> <BiCopy size={18} /> Copy anyware to copy</button>
                        </div>
                        }
                    </div>
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
                            {wallets.map((wallet, i) => (
                                <WalletCard
                                    key={i}
                                    name={`Wallet ${i + 1}`}
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