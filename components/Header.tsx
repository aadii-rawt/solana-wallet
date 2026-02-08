"use client"
import useUser from "@/context/UserContext"
import { Connection } from "@solana/web3.js"
import Link from "next/link"
import { useState } from "react"

const Header = () => {
  const { setHeaderDrawer, selectedWallet } = useUser()
  const { rpcURL, setrpcURL } = useUser()
  const {setConnection} = useUser()

  const handleRPC = (url : string) => {
    setConnection(new Connection(url,"confirmed"))
  }
  
  return (
    <div className='py-2.5 h-16 flex  items-center justify-between border-b border-gray-200/20 px-4'>

      <div className='flex items-center gap-2 cursor-pointer' onClick={() => setHeaderDrawer(true)}>
        <div className='w-9 h-9 flex items-center justify-center rounded-full bg-[#3B3B3F] font-bold text-lg cursor-pointer'><span>W</span></div>
        <h1 className='font-semibold'>{selectedWallet?.name}</h1>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          {/* Select Wrapper */}
          <div className="relative">
            <select
              value={rpcURL}
              onChange={(e) => { setrpcURL(e.target.value)
                handleRPC(e.target.value)
              }}
              className="
            appearance-none
            rounded-xl
            border border-white/10
            bg-black/60
            px-4 py-2 pr-10
            text-sm text-white
            backdrop-blur-md
            focus:outline-none
            focus:ring-1 focus:ring-white/20
            hover:bg-white/5
            transition
          "
            >
              <option value="https://api.mainnet.solana.com" className="bg-[#1c1c1c] text-white">
                Mainnet
              </option>
              <option value="https://api.devnet.solana.com" className="bg-[#1c1c1c] text-white">
                Devnet
              </option>
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="h-4 w-4 text-white/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Airdrop Button */}
          <Link href="/airdrop"
            className="
          flex items-center gap-2
          rounded-xl
          border border-white/10
          bg-black/60
          px-4 py-2
          text-sm text-white
          backdrop-blur-md
          hover:bg-white/5
          transition
        "
          >
            <svg
              className="h-4 w-4 text-white/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h10a4 4 0 000-8 6 6 0 10-11-4"
              />
            </svg>
            Airdrop
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header   