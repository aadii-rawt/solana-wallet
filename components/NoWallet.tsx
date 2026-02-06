import useUser from '@/context/UserContext';
import React from 'react'
import { IoAdd, IoDownloadOutline, IoKeyOutline } from "react-icons/io5";

const NoWallet: React.FC = () => {

    const {generateWallet} = useUser();

    return (
        <div className="flex fixed top-0 left-0 w-full h-full bg-black items-center justify-center">
            <div className="w-full max-w-md space-y-4">
                <div onClick={generateWallet} className="flex items-center gap-4 bg-[#1f1f1f] rounded-2xl px-5 py-4 cursor-pointer hover:bg-[#2a2a2a] transition">
                    <div className="w-11 h-11 rounded-full bg-[#2c2c2c] flex items-center justify-center text-white">
                        <IoAdd size={22} />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-base">
                            Create New Account
                        </p>
                        <p className="text-gray-400 text-sm">
                            Add a new multi-chain account
                        </p>
                    </div>
                </div>
                <div className="flex  items-center gap-4 bg-[#1f1f1f] rounded-2xl px-5 py-4 cursor-pointer hover:bg-[#2a2a2a] transition">
                    <div className="w-11 h-11 rounded-full bg-[#2c2c2c] flex items-center justify-center text-white">
                        <IoKeyOutline size={22} />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-base">
                            Import Recovery Phrase
                        </p>
                        <p className="text-gray-400 text-sm">
                            Import accounts from another wallet
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-2xl px-5 py-4 cursor-pointer hover:bg-[#2a2a2a] transition">
                    <div className="w-11 h-11 rounded-full bg-[#2c2c2c] flex items-center justify-center text-white">
                        <IoDownloadOutline size={22} />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-base">
                            Import Private Key
                        </p>
                        <p className="text-gray-400 text-sm">
                            Import a single-chain account
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NoWallet