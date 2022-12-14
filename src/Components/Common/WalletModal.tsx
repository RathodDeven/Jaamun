import * as React from "react";
import { supportedWallets, Wallet } from "@lifi/wallet-management";
import { Avatar, Modal, Popconfirm, Typography } from "antd";
import { useEffect, useState } from "react";
// import { useWallet } from './WalletProvider'
import { useWallet } from "@lifi/widget/providers";

interface WalletModalProps {
  show: boolean;
  onOk: Function;
  onCancel: Function;
}

export const WalletModal = ({ show, onOk, onCancel }: WalletModalProps) => {
  const [showWalletIdentityPopover, setShowWalletIdentityPopover] =
    useState<Wallet>();
  const [isOk, setIsOk] = useState(false);
  // const { connect, signer } = useLiFiWalletManagement()

  const { connect, account } = useWallet();

  const login = async (wallet: Wallet) => {
    const { ethereum } = window as any;

    if (wallet.checkProviderIdentity) {
      const checkResult = wallet.checkProviderIdentity({ provider: ethereum });
      if (!checkResult) {
        setShowWalletIdentityPopover(wallet);
        return;
      }
    }
    await connect(wallet);
    setIsOk(true);
    // onOk()
  };
  useEffect(() => {
    setShowWalletIdentityPopover(undefined);
  }, [show]);

  useEffect(() => {
    if (account.address && account.signer != null && isOk) {
      console.log("account", account);
      onOk();
    }
  }, [account, isOk]);

  return (
    <Modal
      zIndex={9000}
      destroyOnClose={true}
      className="wallet-selection-modal"
      open={show}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Typography.Title level={4} style={{ marginBottom: 32 }}>
        Choose a wallet
      </Typography.Title>
      {supportedWallets.map((wallet) => {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          return (
            <Popconfirm
              zIndex={9001}
              key={wallet.name + "_identitiy_popover"}
              showCancel={false}
              onConfirm={() => {
                setShowWalletIdentityPopover(undefined);
              }}
              onCancel={() => {
                setShowWalletIdentityPopover(undefined);
              }}
              title={
                <Typography.Text>
                  {`Please make sure that only the ${wallet.name} browser extension is active before choosing this wallet.`}
                </Typography.Text>
              }
              open={showWalletIdentityPopover?.name === wallet.name}
            >
              <div
                style={{
                  // width: '100%',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                key={wallet.name}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => await login(wallet)}
                className="wallet-provider-button"
              >
                <div>{wallet.name}</div>
                <div>
                  <Avatar
                    shape="square"
                    size={"large"}
                    src={wallet.icon}
                  ></Avatar>
                </div>
              </div>
            </Popconfirm>
          );
        }
      })}
    </Modal>
  );
};
