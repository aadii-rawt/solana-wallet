import React from 'react'

const AddWallet = ({addWallet} : {addWallet : () => void}) => {
    return (
        <div>
            <div className="mt-20">
                <h1 className="font-extrabold text-4xl">Secret Recovery Phrase</h1>
                <p className="text-lg text-gray-300 py-1 font-semibold">Save these words in a safe place.</p>
            </div>
            <div className='flex gap-3 w-full mt-10'>
                <input className='py-2 flex-1 rounded-lg border px-4 border-gray-200/20 outline-none focus:border-2 focus:border-white ' type='password' placeholder='Enter your secret phase (or leave blank to generate)' />
                <button onClick={addWallet} className='bg-white text-black rounded-lg px-3 py-2 cursor-pointer '>Add Wallet</button>
            </div>
        </div>
    )
}

export default AddWallet