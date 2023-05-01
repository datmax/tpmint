import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const { chains, provider } = configureChains(
  [mainnet],
  [
    publicProvider(),
    alchemyProvider({ apiKey: '99ZtIFctYseznPT5dycyD_BtNHGAZyRN' }), // i don't think we need more than public provider since the low traffic
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'TokenProfet alpha pass',
  projectId: '543bea22df816112b370063e27145cfd', // https://cloud.walletconnect.com/ for project id creation if needed
  chains,
});

const wagmiClient = createClient({
  autoConnect: false, // we don't want to autoconnect to wallet
  connectors,
  provider,
});

// NOTE: This branch uses wagmi.sh(https://wagmi.sh/) to connect to providers.
export function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
