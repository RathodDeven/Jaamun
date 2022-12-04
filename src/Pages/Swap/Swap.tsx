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
// import { useWallet } from './WalletProvider'

const Swap = () => {
  const { disconnect, account, addToken, addChain } = useWallet();
  const [showConnectModal, setShowConnectModal] = useState<{
    show: boolean;
    promiseResolver?: Function;
  }>({ show: false });
  const [step, setStep] = useState(0);

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
      console.log("Route execution started", route);
      // console.log('onRouteExecutionStarted fired.');
    };
    const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
      console.log("Route execution updated", update);
      // console.log('onRouteExecutionUpdated fired.');
    };
    const onRouteExecutionCompleted = async (route: Route) => {
      console.log("Route execution completed", route);
      setStep(step + 1);
      const data = route;
      delete data.steps;
      delete data.tags;
      console.log(data);
      const cid = await pinJSONToIPFSAndReturnCid(data);
      setStep(step + 1);
      console.log("CID", cid);
      //

      // swap(cid) call this contract using biconomy provider and signer
      // console.log('onRouteExecutionCompleted fired.');
      // swap here
      setStep(step + 1);
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      console.log("Route execution failed", update);
      // console.log('onRouteExecutionFailed fired.');
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
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
