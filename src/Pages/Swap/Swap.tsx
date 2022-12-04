import { Token } from "@lifi/sdk";
import { switchChain } from "@lifi/wallet-management";
import {
  LiFiWidget,
  useWidgetEvents,
  WidgetConfig,
  WidgetEvent,
} from "@lifi/widget";
import { useEffect, useMemo, useState } from "react";
import { WalletModal } from "../../Components/Common/WalletModal";
import { useWallet } from "@lifi/widget/providers";
import type { Route } from "@lifi/sdk";
import type { RouteExecutionUpdate } from "@lifi/widget";
import { pinJSONToIPFSAndReturnCid } from "../../utils/utils";
import StepsContainer from "../../Components/Steps/StepsContainer";

// import { Biconomy } from "@biconomy/mexa";
// import { ethers } from "ethers";
// import JaMoon from "../../utils/JaMoon.json";
// import { useWallet } from './WalletProvider'

const Swap = ({ callSwap }) => {
  const { disconnect, account, addToken, addChain } = useWallet();
  const [showConnectModal, setShowConnectModal] = useState<{
    show: boolean;
    promiseResolver?: Function;
  }>({ show: false });
  const [step, setStep] = useState(-1);

  // const Swap = async (cid) => {
  //   // const res = await connectWallet(cid, account?.address);
  //   // const provider = account?.signer.provider;
  //   // console.log(provider);
  //   try {
  //     const biconomy = new Biconomy(window.ethereum, {
  //       apiKey: "a25b3acc-2d71-4658-a189-0f5eb0fc8a15",
  //       debug: true,
  //     });
  //     // await window.ethereum.enable();
  //     // if (!(window.ethereum.networkVersion === "137")) {
  //     //   alert("Please switch to matic mumbai");
  //     // }
  //     const providerBiconomy = new ethers.providers.Web3Provider(biconomy);

  //     // biconomy.addListener(biconomy).onEvent(biconomy.READY, () => {
  //     //   // Initialize your dapp here like getting user accounts etc
  //     // }).onEvent(biconomy.ERROR, (error, message) => {
  //     //   // Handle error while initializing mexa
  //     // });
  //     const signer = providerBiconomy.getSigner();
  //     const contract = new ethers.Contract(
  //       "0x7DA6dA0B39085568aA91bdA0a8E8043E8713eBBB",
  //       JaMoon,
  //       signer
  //     );

  //     // const nonce = await JaMoon.contract.methods.getNonce(address).call();
  //     // console.log(nonce);

  //     // const ContractName = JaMoon.contractName;
  //     const functionSignature = JaMoon.contract.methods.swap(cid).encodeABI();
  //     console.log(functionSignature);
  //     const res = await contract.swap(cid);
  //     const receipt = await res.wait();

  //     if (receipt.status === 1) {
  //       console.log(
  //         "Domain minted! https://rinkeby.etherscan.io/tx/" + res.hash
  //       );
  //       return res.hash;
  //     } else {
  //       alert("Transaction failed! Please try again");
  //     }
  //   } catch (error) {
  //     console.log("Please allow access to connect to web3 ");
  //   }
  //   console.log("res", res);
  // };

  const widgetConfig: WidgetConfig = useMemo(() => {
    return {
      walletManagement: {
        signer: account.signer,
        connect: async () => {
          let promiseResolver;
          const loginAwaiter = new Promise<void>(
            (resolve) => (promiseResolver = resolve)
          );

          setShowConnectModal({ show: true, promiseResolver });

          await loginAwaiter;
          return account.signer;
        },
        disconnect: async () => {
          disconnect();
        },
        switchChain: async (reqChainId: number) => {
          await switchChain(reqChainId);
          return account.signer;
        },
        addToken: async (token: Token, chainId: number) => {
          await addToken(chainId, token);
        },
        addChain: async (chainId: number) => {
          return await addChain(chainId);
        },
      },
      containerStyle: {
        borderRadius: "16px",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
      },
      variant: "expandable",
      disableI18n: true,
      // buildSwapUrl: true,
      languages: {
        default: "en",
      },
      appearance: "light",
      disableAppearance: true,
    };
  }, [account, disconnect, addChain, addToken]);

  const widgetEvents = useWidgetEvents();

  // ...

  useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      setStep(0);
      console.log("Route execution started", route);
      // console.log('onRouteExecutionStarted fired.');
    };
    // const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
    //   console.log("Route execution updated", update);
    //   // console.log('onRouteExecutionUpdated fired.');
    // };

    const onRouteExecutionCompleted = async (route: Route) => {
      try {
        console.log("Route execution completed", route);
        setStep(1);
        const data = route;
        delete data.steps;
        delete data.tags;
        console.log(data);
        const cid = await pinJSONToIPFSAndReturnCid(data);
        setStep(2);
        console.log("CID", cid);
        // calling contract function here
        await callSwap(cid);
        // swap(cid) call this contract using biconomy provider and signer
      } catch (err) {
        console.log(err);
      }

      // console.log('onRouteExecutionCompleted fired.');
      // swap here
      setStep(3);
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      console.log("Route execution failed", update);
      // console.log('onRouteExecutionFailed fired.');
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted
    );
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);

    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  return (
    <>
      <LiFiWidget config={widgetConfig} />
      <WalletModal
        show={showConnectModal.show}
        onOk={() => {
          setShowConnectModal({ show: false });
          showConnectModal.promiseResolver?.();
        }}
        onCancel={() => {
          setShowConnectModal({ show: false, promiseResolver: undefined });
        }}
      />
      <StepsContainer step={step} />
    </>
  );
};

export default Swap;
