import { useWallet } from "@lifi/widget/providers";
import React, { useState } from "react";
import { WalletModal } from "../Common/WalletModal";

const ConnectButton = () => {
  const [show, setShow] = useState(false);
  const { account } = useWallet();
  return (
    <div>
      {account?.address ? (
        <div>{account.address} </div>
      ) : (
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          Connect Wallet
        </button>
      )}
      <WalletModal
        show={show}
        onOk={() => {
          setShow(false);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default ConnectButton;
