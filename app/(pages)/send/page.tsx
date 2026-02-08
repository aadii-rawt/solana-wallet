"use client";

import useUser from "@/context/UserContext";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import Link from "next/link";
import { useState } from "react";
import bs58 from "bs58";

export default function SendSol() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [signature, setSignature] = useState("");
  const [error, setError] = useState<string>("")

  const { wallet, connection, rpcURL, balance } = useUser();

  const sendSolana = async () => {

    const isValidPublicKey = (value: any) => {
      try {
        new PublicKey(value);
        return true;
      } catch {
        return false;
      }
    }
    if (!isValidPublicKey(bs58.decode(address))) {
      setError("Invalid solana address");
      return
    }
    if(amount > balance) {
      return setError("Insufficient balance, Please try again.")
    }

    try {
      setLoading(true);
      const sender = Keypair.fromSecretKey(
        bs58.decode(wallet.privateKey)
      );

      const receiver = new PublicKey(bs58.decode(address));
      const lamports = amount * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sender.publicKey,
          toPubkey: receiver,
          lamports,
        })
      );

      const sig = await sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
      );

      setSignature(sig);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err)
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl text-white font-semibold mb-3">
            Sent!
          </h1>

          <p className="text-gray-400 mb-6">
            {amount} SOL was successfully sent to{" "}
            <span className="text-white">
              {address.slice(0, 4)}…{address.slice(-4)}
            </span>
          </p>

          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=${rpcURL == "https://api.devnet.solana.com" ? "devnet" : "mainnet"}`}
            target="_blank"
            className="text-purple-400 text-lg block mb-8"
          >
            View transaction
          </a>

          <button
            onClick={() => setSignature("")}
            className="block bg-[#2a2a2a] py-4 rounded-2xl text-white text-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/solana-sol-icon.png" className="w-10 h-10" />
        </div>

        <div className="space-y-4">
          <input
            value={address}

            onChange={(e) => setAddress(e.target.value)}
            placeholder="Recipient's Solana Devnet address"
            className="w-full bg-[#141414] text-white px-4 py-4 rounded-xl outline-none border border-[#222]"
          />

          <div className="flex items-center bg-[#141414] rounded-xl border border-[#222] px-4 py-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              onWheel={(e) => e.currentTarget.blur()}
              className="flex-1 no-spinner bg-transparent text-white outline-none"
            />
            <span className="text-gray-400 text-sm ml-2">SOL</span>
            <button className="bg-[#2a2a2a] px-2 ml-2 rounded-lg cursor-pointer" onClick={() => setAmount(balance)}>Max</button>
          </div>
        </div>

        <div>
          <p className="text-red-500 my-2 capitalize">{error}</p>
        </div>

        <div className="flex gap-4 mt-10">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center bg-[#2a2a2a] py-4 rounded-2xl text-white text-lg"
          >
            Cancel
          </Link>

          <button
            onClick={sendSolana}
            disabled={!address || !amount || loading}
            className={`flex-1 py-4 rounded-2xl text-lg ${address && amount && !loading
              ? "bg-purple-600 text-white cursor-pointer"
              : "bg-[#1a1a1a] text-gray-600"
              }`}
          >
            {loading ? "Sending..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
