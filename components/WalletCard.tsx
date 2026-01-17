"use client";

import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WalletCardProps {
    name: string;
    publicKey: string;
    collapsed: boolean;
    privateKey: string;
    handleDelete : () => void
}

export default function WalletCard({
    name,
    publicKey,
    collapsed,
    privateKey,
    handleDelete,
}: WalletCardProps) {
    const [showPrivate, setShowPrivate] = useState(false);

    const handleCopy = (str : string) => {
        window.navigator.clipboard.writeText(str)
        toast("Copied to clipboard")
    }

    return (
        <div key={publicKey} className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] p-6 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">{name} </h2>
                <button  onClick={handleDelete} className="text-red-500 hover:text-red-400 transition p-2 rounded-lg hover:bg-[#141414] cursor-pointer">
                    <Trash2 size={18} />
                </button>
            </div>


            <div className="rounded-xl bg-[#141414] p-5">
                {/* Public Key */}
                <p className=" text-white/60 mb-1">Public Key</p>
                <p className="text-white text-sm break-all cursor-pointer" onClick={() => handleCopy(publicKey)} onSelect={() => handleCopy(publicKey)} >
                    {publicKey}
                </p>

                {/* Private Key */}
                <div className="mt-6">
                    <p className="text-sm text-white/60 mb-2">Private Key</p>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 text-white tracking-widest text-sm cursor-pointer" onClick={() => handleCopy(privateKey)} onSelect={() => handleCopy(privateKey)}>
                            {showPrivate
                                ? collapsed ? privateKey.slice(0, 32) + "....." : privateKey
                                : "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •"}
                        </div>

                        <button
                            onClick={() => setShowPrivate(!showPrivate)}
                            className="text-white/60 hover:text-white transition p-2 rounded-lg hover:bg-[#0f0f0f] cursor-pointer"
                        >
                            <Eye size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
