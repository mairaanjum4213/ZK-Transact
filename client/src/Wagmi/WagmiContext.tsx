import { createConfig, configureChains, mainnet, WagmiConfig} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { sepolia } from 'viem/chains';
import { FC, ReactNode } from 'react'


// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet,sepolia],
  [infuraProvider({ apiKey: '04d517efcdac462eb4e6b60a13f3701c' }), publicProvider()],
)

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options:{
      shimDisconnect:true,
      UNSTABLE_shimOnConnectSelectAccount:true,
    } })
  ],
  publicClient,
  webSocketPublicClient,
})

interface WagmiProviderProps{
  children?: ReactNode;  //children is a react node that will be rendered inside of this component
}

export const WagmiProvider:FC <WagmiProviderProps>=({children})=>{
  return <WagmiConfig config={config}>{children}</WagmiConfig>};

  