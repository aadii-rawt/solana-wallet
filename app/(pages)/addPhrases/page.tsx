"use client";

import { useState } from "react";

export default function RecoveryPhrase() {
  const [is24Words, setIs24Words] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white px-4 flex justify-center">
      <div className="w-full max-w-md pt-16">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-3">
          Recovery Phrase
        </h1>

        <p className="text-gray-400 text-center mb-10">
          Import an existing wallet with your 12 or 24-word recovery phrase.
        </p>

        {/* Input Grid */}
        <div className="grid grid-cols-3 gap-4">

          {/* 1–12 always visible */}
          <InputBox number={1} />
          <InputBox number={2} />
          <InputBox number={3} />
          <InputBox number={4} />
          <InputBox number={5} />
          <InputBox number={6} />
          <InputBox number={7} />
          <InputBox number={8} />
          <InputBox number={9} />
          <InputBox number={10} />
          <InputBox number={11} />
          <InputBox number={12} />

          {/* 13–24 only when enabled */}
          {is24Words && (
            <>
              <InputBox number={13} />
              <InputBox number={14} />
              <InputBox number={15} />
              <InputBox number={16} />
              <InputBox number={17} />
              <InputBox number={18} />
              <InputBox number={19} />
              <InputBox number={20} />
              <InputBox number={21} />
              <InputBox number={22} />
              <InputBox number={23} />
              <InputBox number={24} />
            </>
          )}
        </div>

        {/* Toggle */}
        {!is24Words && (
          <button
            onClick={() => setIs24Words(true)}
            className="mt-8 w-full text-purple-400 text-center text-base hover:underline"
          >
            I have a 24-word recovery phrase
          </button>
        )}

        {/* Import Button */}
        <button
          disabled
          className="mt-10 w-full bg-[#1f1f1f] text-gray-500 py-4 rounded-full text-lg cursor-not-allowed"
        >
          Import Wallet
        </button>

      </div>
    </div>
  );
}

/* ---------- Input Box ---------- */
function InputBox({ number }: { number: number }) {
  return (
    <div className="relative">
      <span className="absolute top-3 left-3 text-gray-500 text-sm">
        {number}.
      </span>
      <input
        type="text"
        className="w-full h-12 bg-[#1c1c1c] border border-[#2e2e2e]
                   rounded-xl pl-8 pr-2 text-sm text-white
                   focus:outline-none focus:border-gray-500"
      />
    </div>
  );
}
