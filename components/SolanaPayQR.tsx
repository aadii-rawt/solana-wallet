"use client";

import { useEffect, useRef } from "react";
import { encodeURL } from "@solana/pay";
import { PublicKey } from "@solana/web3.js";
import QRCodeStyling from "@solana/qr-code-styling";

export default function SolanaPayQR() {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const url = encodeURL({
      recipient: new PublicKey(
        "9xQeWvG816bUx9EPfY1ZqZq7ZzZzExample"
      ),
    });

    const qr = new QRCodeStyling({
      width: 260,
      height: 260,
      data: url.toString(),
      dotsOptions: {
        color: "#7C3AED", // Tailwind purple-600
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
    });

    qrRef.current.innerHTML = "";
    qr.append(qrRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={qrRef}
        className="rounded-xl border p-4 shadow-lg bg-white"
      />
      <p className="text-sm text-gray-600">
        Scan with Phantom or Solflare
      </p>
    </div>
  );
}
