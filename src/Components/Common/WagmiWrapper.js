import { useWallet } from '@lifi/widget/providers'
import { getDefaultProvider } from 'ethers'
import React from 'react'
import { createClient, WagmiConfig } from 'wagmi'

const WagmiWrapper = ({children}) => {
    // const {provider} = useWallet()
    const client = createClient({
        autoConnect: true,
        provider: getDefaultProvider()
    })
  return (
    <WagmiConfig client={client}>{children}</WagmiConfig>
  )
}

export default WagmiWrapper