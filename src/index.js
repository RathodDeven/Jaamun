import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { getAccessToken } from "./utils/token";
import Wrapper from "./Components/Common/Wrapper";
import { WalletProvider } from "@lifi/widget/providers";

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
  <Wrapper>
    <WalletProvider>
      <App />
    </WalletProvider>
  </Wrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
