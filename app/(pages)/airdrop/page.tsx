"use client";

import useUser from "@/context/UserContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";

const PRESET_AMOUNTS = [1, 2, 5];

export default function Airdrop() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {connection} = useUser()
  
  const handleAirDrop = async () => {
    try {
      setError("");
      setLoading(true);
      const publicKey = new PublicKey(address);
      const lamports = amount * LAMPORTS_PER_SOL;

      const signature = await connection.requestAirdrop(
        publicKey,
        lamports
      );

      await connection.confirmTransaction(signature, "confirmed");
    } catch (err: any) {
      const message =
        err?.message ||
        err?.error?.message ||
        JSON.stringify(err);

      if (
        message.toLowerCase().includes("rate") ||
        message.toLowerCase().includes("limit") ||
        message.toLowerCase().includes("too many")
      ) {
        setError("Too many requests. Please try again later.");
      } else {
        setError("Airdrop failed. Invalid address or network issue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-white p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 my-10">
      <h1 className="text-xl font-semibold mb-4">Solana Airdrop</h1>

      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-2">
          Public Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Solana public address"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:border-purple-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-white/60 mb-2">
          Airdrop Amount (SOL)
        </label>

        <div className="flex gap-3">
          {PRESET_AMOUNTS.map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`flex-1 py-2 rounded-lg border transition ${
                amount === val
                  ? "bg-purple-500/20 border-purple-400 text-purple-300"
                  : "bg-black/30 border-white/10 hover:bg-white/10"
              }`}
            >
              {val} SOL
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-sm"
        />
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={handleAirDrop}
        disabled={!address || loading}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          address && !loading
            ? "bg-purple-500 hover:bg-purple-600"
            : "bg-white/10 cursor-not-allowed"
        }`}
      >
        {loading ? "Requesting..." : `Airdrop ${amount} SOL`}
      </button>
    </div>
  );
}
