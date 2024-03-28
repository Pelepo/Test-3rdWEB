import "@/styles/globals.css";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet
} from "./../Context/ThirdwebProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const chain = "mumbai"

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect(),
          embeddedWallet()
        ]}
        activeChain={chain}
        clientId="3d60c6caaa12c62a65cecff17b2d0a40"
        queryClient={queryClient}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}


export default MyApp;
