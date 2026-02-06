  const generateWallet = () => {
    
        if (mnemonics) {
            if (!bip39.validateMnemonic(mnemonics)) {
                toast.error("Invalid mnemonics please try again")
                console.log("invalid mnemonics please try again");
                return
            }
        } else {
            mnemonics = bip39.generateMnemonic()
        }
        const words = mnemonics.split(" ")
        setMnemonics(words)

        const wallet = generateWalletFromMnemonics(mnemonics, wallets.length);
        if (wallet) {
            const updatedWallet = [...wallets, wallet];
            setWallets(updatedWallet)
            localStorage.setItem("wallets", JSON.stringify(updatedWallet));
            localStorage.setItem("mnemonics", JSON.stringify(words));
            toast("Wallet generated successfully")
        }

    }
