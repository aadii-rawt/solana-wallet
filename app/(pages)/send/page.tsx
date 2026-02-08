"use client";

import useUser from "@/context/UserContext";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { connect } from "http2";
import Link from "next/link";
import { useState } from "react";
import bs58 from "bs58"

export default function SendSol() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const {wallet,connection} = useUser()

  const sendSolana = () => {
    const senderPublicKey = new PublicKey(wallet.publicKey)
    console.log(senderPublicKey);
    
    const receiver = new PublicKey(address)
    const lamport = amount * LAMPORTS_PER_SOL
    const keypair = bs58.decode(wallet.privateKey)
    const secret = Keypair.fromSecretKey(keypair)
    const sender = secret.secretKey

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey : senderPublicKey,
            toPubkey : receiver,
            lamports : lamport
        })
    )

    console.log("Transaction : ", transaction);

    const signature =  sendAndConfirmTransaction(connection,transaction,[sender])

    console.log("signature : ", signature);
    
    
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full  flex items-center justify-center">
            <img
              src="/solana-logo.svg"
              alt="Solana"
              className="w-10 h-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Recipient's Solana Devnet address"
              className="w-full bg-[#141414] text-white placeholder-gray-500 px-4 py-4 rounded-xl outline-none border border-[#222]"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              @
            </div>
          </div>

          <div className="flex items-center bg-[#141414] rounded-xl border border-[#222] px-4 py-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
            <span className="text-gray-400 mr-3">SOL</span>
            <button className="text-sm bg-[#2a2a2a] px-3 py-1 rounded-lg text-white">
              Max
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <Link href='/' className="flex-1 items-center justify-center flex bg-[#2a2a2a] py-4 rounded-2xl text-white text-lg">
            Cancel
          </Link>
          <button
          onClick={sendSolana}
            disabled={!address || !amount}
            className={`flex-1 py-4 rounded-2xl text-lg ${
              address && amount
                ? "bg-purple-600 text-white"
                : "bg-[#1a1a1a] text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
