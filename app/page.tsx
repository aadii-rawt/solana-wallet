"use client"
import { IoAdd, IoDownloadOutline, IoEyeOutline, IoHardwareChipOutline, IoKeyOutline, IoQrCodeOutline } from "react-icons/io5";
import HomeWallet from "../components/Home";
import { LuSend } from "react-icons/lu";
import { TbSend } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useUser from "@/context/UserContext";
import NoWallet from "@/components/NoWallet";
import { useEffect, useState } from "react";
import axios from "axios";
import { VscArrowSwap } from "react-icons/vsc";
import { BsCurrencyDollar } from "react-icons/bs";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import bs58 from "bs58"

export default function Home() {

  const router = useRouter()
  const { wallet, balance } = useUser()
  return (
    <div className="relative w-full">

      <div className="flex items-center justify-center my-10">
        <div className="flex items-center gap-5">
          <img className="w-8" src="https://brandlogos.net/wp-content/uploads/2025/10/solana-logo_brandlogos.net_0evmb-512x446.png" alt="" />
          <h1 className="text-4xl font-extrabold">{balance?.toFixed(2)}  <span className="text-sm text-gray-400 font-normal">SOL</span></h1>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5 py-5">
        <ActionButton icon={<TbSend />} label="Send" handleclick={() => router.push("send")} />
        <ActionButton icon={<IoQrCodeOutline />} label="Receive" handleclick={() => router.push("receive")} />
        <ActionButton icon={<VscArrowSwap />} label="Swap" />
        <ActionButton icon={<BsCurrencyDollar />} label="Buy" />
      </div>

      {!wallet && <NoWallet />}
    </div>
  );
}

const ActionButton = ({ icon, label, handleclick }) => {
  return (
    <button onClick={handleclick}
      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 transition px-5 py-3">
      <div className="text-purple-300 text-3xl">{icon}</div>
      <span className="text-sm text-white/80">{label}</span>
    </button>
  )
}