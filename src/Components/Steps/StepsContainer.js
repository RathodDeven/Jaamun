import React from "react";

const StepsContainer = ({ step }) => {
  return (
    <>
      {step !== -1 && (
        <div className="fixed top-20 right-10 z-10 border p-7 rounded-[20px]">
          <div className="flex flex-col">
            <div className="flex flex-row py-4 items-center">
              {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" /> */}
              {step === 0 && (
                <>
                  <img src="/loadingCircle.gif" className="w-10 h-10" />
                  <div className="pl-2">Swapping on Li.FI.</div>
                </>
              )}
              {step > 0 && (
                <>
                  <img src="/checkMark.png" className="w-10 h-10" />
                  <div className="pl-2">Swapped Successfully on Li.FI.</div>
                </>
              )}
            </div>
            <div className="flex flex-row py-4 items-center">
              {step === 1 && (
                <>
                  <img src="/loadingCircle.gif" className="w-10 h-10" />
                  <div className="pl-2">Uploading Swap Data to IPFS</div>
                </>
              )}
              {step > 1 && (
                <>
                  <img src="/checkMark.png" className="w-10 h-10" />
                  <div className="pl-2">Uploaded to IPFS</div>
                </>
              )}
              {step < 1 && (
                <>
                  <div className="pl-2">Waiting to Upload on IPFS</div>
                </>
              )}
            </div>
            <div className="flex flex-row py-4 items-center">
              {step === 2 && (
                <>
                  <img src="/loadingCircle.gif" className="w-10 h-10" />
                  <div className="pl-2">
                    Relaying CID to The Graph via Biconomy
                  </div>
                </>
              )}
              {step > 2 && (
                <>
                  <img src="/checkMark.png" className="w-10 h-10" />
                  <div className="pl-2">Relayed Successfully</div>
                </>
              )}
              {step < 2 && (
                <>
                  {/* <img src="/" className="w-10 h-10" /> */}
                  <div className="pl-2">Waiting for Generating CID</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {step === -1 && <></>}
    </>
  );
};

export default StepsContainer;
