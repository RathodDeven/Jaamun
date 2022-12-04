import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { getAccessToken } from "./utils/token";
// import Wrapper from "./Components/Common/Wrapper";
// import { WalletProvider } from "@lifi/widget/providers";
import MasterWrapper from "./Components/Common/MasterWrapper";
import "./index.css";
// import { Biconomy } from "@biconomy/mexa";
// import { ethers } from "ethers";
// import JaMoon from "./utils/JaMoon.json";

// const biconomy = new Biconomy(window.ethereum, {
//   apiKey: "e8e28b81-65b5-4952-b689-e2aa650dee1e",
//   debug: true,
//   contractAddresses: ["0x2F5D8F645c7FD35e3Abd86231624fB9f6672C13E"], // list of contract address you want to enable gasless on
// });
// // To create contract instances you can do:
// const contractInstance = new ethers.Contract(
//   "0x2F5D8F645c7FD35e3Abd86231624fB9f6672C13E",
//   JaMoon,
//   biconomy.ethersProvider
// );

// biconomy
//   .onEvent(biconomy.READY, async () => {
//     setWeb3ConnectStatus(1);

//     window.ethereum.on("accountsChanged", function (accounts) {
//       setUserAddress(accounts[0]);
//     });
//   })
//   .onEvent(biconomy.ERROR, (err, message) => {
//     alert(message);
//     console.log(err, message);
//   });

// const API_URL = "https://api.lens.dev";

// const authLink = setContext((_, { headers }) => {
//   const token = getAccessToken();
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const httpLink = createHttpLink({
//   uri: API_URL,
// });

// const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Wrapper>
  // <WalletProvider>
  <MasterWrapper>
    <App />
  </MasterWrapper>
  // </WalletProvider>
  // </Wrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
