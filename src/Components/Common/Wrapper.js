import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import React from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { setContext } from "@apollo/client/link/context";

import "@rainbow-me/rainbowkit/styles.css";
import { getAccessToken } from "../../utils/token";
import { LensWrapperProvider } from "./LensWrapperProvider";

const API_URL = "https://api.lens.dev";

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: API_URL,
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Wrapper = ({ children }) => {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai, chain.goerli],
    [
      // process.env.NEXT_PUBLIC_ALCHEMY_ID
      // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "JaMoon",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains} theme={midnightTheme()}>
        <ApolloProvider client={apolloClient}>
          <LensWrapperProvider>{children}</LensWrapperProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Wrapper;
