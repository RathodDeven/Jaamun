import React, { useCallback } from "react";
import Swap from "./Swap";
import JaMoon from "../../utils/JaMoon.json";
import { useWallet } from "@lifi/widget/providers";
import { ethers } from "ethers";

const SwapPage = () => {
  const { account } = useWallet();
  const callSwap = useCallback(
    async (cid) => {
      console.log("CID", cid);
      // calling contract function here
      console.log("account.signer", account.signer);
      const swapContract = new ethers.Contract(
        "0x7DA6dA0B39085568aA91bdA0a8E8043E8713eBBB",
        JaMoon,
        account.signer
      );
      const res = await swapContract.swap(cid, {
        gasLimit: 100000,
      });
      console.log("res", res);
      const receipt = await res.wait();
      if (receipt.status === 1) {
        console.log("receipt", receipt);
        console.log("deployed");
      } else {
        console.log("failed");
      }
    },
    [account.signer]
  );
  return (
    <div className="pt-10">
      <Swap callSwap={callSwap} />
    </div>
  );
};

export default SwapPage;
