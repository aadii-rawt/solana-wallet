"use client"

import useUser from "@/context/UserContext"
import clsx from "clsx"
import { GoArrowLeft } from "react-icons/go"
import { LuPlus } from "react-icons/lu"

const WalletDrawer = () => {
  const { headerDrawer, setHeaderDrawer, wallets, addWallet } = useUser()

  if (!headerDrawer) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inse
        t-0 z-40 bg-black/50 animate-fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-0 z-50">
        <div onClick={() => setHeaderDrawer(false)} className="mx-auto h-full max-w-md relative">
          <div onClick={(e) => e.stopPropagation()}
            className={clsx(
              "absolute top-0 left-0 h-full w-20 bg-[#111]",
              "animate-drawer-in will-change-transform"
            )}
          >
            {/* Header */}
            <div className="h-16 w-full cursor-pointer flex items-center justify-center border-b border-white/10">
              <button onClick={() => setHeaderDrawer(false)} className="cursor-pointer"><GoArrowLeft size={24} /></button>
            </div>

            <div className="flex items-center justify-between flex-col">

              {/* Wallets */}
              <div className="flex my-5 flex-col items-center gap-4">
                {wallets?.map((w, i) => (
                  <div key={i} className="flex flex-col items-center cursor-pointer">
                    <div className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
                      W
                    </div>
                    <span className="text-xs mt-1 text-gray-200">
                      Wallet {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <button onClick={addWallet} className=" hover:bg-white hover:text-black text-white cursor-pointer duration-300 transition-all p-2 rounded-lg text"><LuPlus size={24} /></button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default WalletDrawer
