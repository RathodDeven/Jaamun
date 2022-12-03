import {
  useAuthenticate,
  //   useAuthenticate,
  useChallenge,
} from "@memester-xyz/lens-use";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useLensCustomHook } from "../../Components/Common/LensWrapperProvider";
import { WalletModal } from "../../Components/Common/WalletModal";
import { setAccessToken, setRefreshToken } from "../../utils/token";

const HomePage = () => {
  const { isLensLoggedIn } = useLensCustomHook();
  const { address } = useAccount();
  const [show, setShow] = useState(false);
  const { signMessageAsync } = useSignMessage({
    onSettled(data, error) {
      console.log(data, error);
    },
  });
  const [signedChallenge, setSignedChallenge] = useState(null);
  const { data: challengeData } = useChallenge(address);
  const [authenticate, { data: authenticateData }] = useAuthenticate(
    address,
    signedChallenge
  );

  useEffect(() => {
    if (!signedChallenge) return;
    authenticate();
  }, [signedChallenge]);

  const loginLens = async () => {
    try {
      const signature = await signMessageAsync({
        message: challengeData?.challenge.text,
      });
      setSignedChallenge(signature);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authenticateData) return;
    console.log(authenticateData);
    setAccessToken(authenticateData.authenticate.accessToken);
    setRefreshToken(authenticateData.authenticate.refreshToken);
    location.reload();
  }, [authenticateData]);

  console.log("isLensLoggedIn", isLensLoggedIn);

  //   useEffect(() => {

  //   },[])
  return (
    <div>
      <ConnectButton />
      {!isLensLoggedIn && (
        <button disabled={!challengeData} onClick={loginLens}>
          Login Lens
        </button>
      )}
      {isLensLoggedIn && <div>Lens Logged In </div>}
      <WalletModal
        show={show}
        onOk={() => {
          setShow(false);
        }}
        onCancle={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default HomePage;
