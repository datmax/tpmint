import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet],
  [
    publicProvider(), // i don't think we need more than public provider since the low traffic
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'TokenProfet alpha pass',
  projectId: 'c92fdd6b6f9d45aecb4b1d0bb9efd0cb', // https://cloud.walletconnect.com/ for project id creation if needed
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// NOTE: This branch uses wagmi.sh(https://wagmi.sh/) to connect to providers.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
