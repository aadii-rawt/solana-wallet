"use client";

import SolanaPayQR from "@/components/SolanaPayQR";
import useUser from "@/context/UserContext";
import { encodeURL } from "@solana/pay";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { FiCopy } from "react-icons/fi";


export default function ReceiveAddress() {
  const { wallet } = useUser()
  const qrRef = useRef(null)
  useEffect(() => {
    if (!wallet?.publicKey || !qrRef.current) return;

    // Clear previous QR (VERY IMPORTANT)
    qrRef.current.innerHTML = "";

    const qr = new QRCodeStyling({
      width: 200,
      height: 200,
      data: wallet.publicKey.toString(),
      dotsOptions: { color: "#000000" },
      imageOptions: { crossOrigin: "anonymous", margin: 5 },
    });

    qr.append(qrRef.current);
  }, [wallet?.publicKey]);


  return (
    <div className="h-[calc(100vh-80px)] text-white flex flex-col items-center px-6 py-6">
    

      <div className="bg-white p-1 rounded-lg relative">
        <div ref={qrRef}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/17978/17978725.png" alt="" className="w-14" />
        </div>
      </div>
      <div className="w-full max-w-md rounded-2xl border border-white/10 my-5 bg-white/5 backdrop-blur-md overflow-hidden">
        <div className="p-4 text-center break-all text-sm">
          {wallet?.publicKey}
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(wallet.publicKey)}
          className="w-full cursor-pointer flex items-center justify-center gap-2 border-t border-white/10 py-3 hover:bg-white/10 transition"
        >
          <FiCopy />
          Copy
        </button>
      </div>

      <p className="text-center text-white/60 text-sm mt-6 px-4">
        This address can only be used to receive compatible tokens.{" "}
        <span className="text-purple-400 cursor-pointer">Learn more</span>
      </p>

      <Link href="/"
        className="mt-auto w-full max-w-md flex items-center justify-center rounded-full bg-white/10 py-4 text-lg font-semibold hover:bg-white/20 transition"
      >
        Close
      </Link >
    </div>
  );
}
