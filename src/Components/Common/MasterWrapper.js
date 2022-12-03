import React from "react";
import { WalletProvider } from "@lifi/widget/providers";

const MasterWrapper = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>;
};

export default MasterWrapper;
