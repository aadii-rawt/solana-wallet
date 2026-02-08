'use client'
import { Wallet } from "lucide-react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import * as bip39 from "bip39";
import { toast } from "sonner";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { walletType } from "@/types/types";



interface ContextType {
    wallet: any,
    currentWallet: walletType,
    setCurrentWallet: Dispatch<SetStateAction<walletType>>,
    generateWallet: () => void,
    selectedWallet: any,
    headerDrawer: boolean,
    setHeaderDrawer: Dispatch<SetStateAction<boolean>>,
    addWallet: () => void,
    rpcURL: string,
    setrpcURL: Dispatch<SetStateAction<string>>,
    connection: any,
    setConnection : any,

}
const userContext = createContext<ContextType>(null)

export const UserProvider = ({ children }) => {

    const [wallet, setWallet] = useState<walletType | null>(null)
    const [currentWallet, setCurrentWallet] = useState<walletType>(null)
    const [headerDrawer, setHeaderDrawer] = useState(false)
    const [mnemonics, setMnemonics] = useState<string[]>(Array(12).fill(""))
    const [rpcURL, setrpcURL] = useState<string>("https://api.devnet.solana.com") // mainnet url https://api.mainnet.solana.com and devnet url  https://api.devnet.solana.com
    // const connection =  new Connection("https://api.devnet.solana.com")
    const [ connection, setConnection ] = useState(new Connection("https://api.devnet.solana.com","confirmed"))

    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        const storedMnemonic = localStorage.getItem("mnemonics");

        if (storedWallets && storedMnemonic) {
            setMnemonics(JSON.parse(storedMnemonic));
            setWallet(JSON.parse(storedWallets));
        }
}, []);

    const generateWallet = () => {
        let mnemonics = bip39.generateMnemonic()
        console.log(mnemonics);

        const words = mnemonics.split(" ")
        setMnemonics(words)

        const wallet = generateWalletFromMnemonics(mnemonics, 0);
        if (wallet) {
            // const updatedWallet = [...wallets, wallet];
            setWallet(wallet)
            localStorage.setItem("wallets", JSON.stringify(wallet));
            localStorage.setItem("mnemonics", JSON.stringify(words));
            toast("Wallet generated successfully")
        }

    }

    const generateWalletFromMnemonics = (mnemonics: string, accountIndex: number) => {

        try {
            const seedBuffer = bip39.mnemonicToSeedSync(mnemonics);
            const path = `m/44'/501'/0'/${accountIndex}'`;
            const { key: derivedSeed } = derivePath(path, seedBuffer.toString())

            const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
            const keypair = Keypair.fromSecretKey(secretKey);

            const privateKey = bs58.encode(secretKey)
            const publicKey = keypair.publicKey.toBase58()
            

            return {
                id: crypto.randomUUID(),
                privateKey ,
                publicKey ,
                mnemonics,
                path,
            }

        } catch (error) {
            console.log("failed to create wallet. Please try again.");
            return null;
        }
    }

    const addWallet = () => {
        if (!mnemonics) {
            toast.error("No mnemonics founds. Please generate wallet first");
            return
        }

        const wallet = generateWalletFromMnemonics(mnemonics.join(" "), wallets.length)
        if (wallet) {
            const updatedWallet = [...wallets, wallet];
            setWallets(updatedWallet)

            setSelectedWallet((prev) => ({ ...wallet, name: `Wallet ${length + 1}` }))
            console.log(selectedWallet);
            localStorage.setItem("wallets", JSON.stringify(updatedWallet));
            toast("Wallet generated successfully")
        }
    }

    return <userContext.Provider value={{
        wallet,
        currentWallet, setCurrentWallet,
        generateWallet, addWallet,
        headerDrawer, setHeaderDrawer,
        rpcURL, setrpcURL,
        connection,setConnection
    }}>
        {children}
    </userContext.Provider>
}

const useUser = () => {
    return useContext(userContext)
}

export default useUser;
