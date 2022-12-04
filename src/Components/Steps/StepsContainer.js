import React from "react";

const StepsContainer = ({ step }) => {
  return (
    <>
      {step !== 0 && (
        <div className="fixed top-10 right-10 z-10">
          <div className="flex flex-col">
            <div className="flex flex-row">
              {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" /> */}
              {step === 0 && (
                <img src="/loadingCircle.gif" className="w-10 h-10" />
              )}
              {step > 0 && <img src="/checkMark.png" className="w-10 h-10" />}
              <div>Swapped Successfully on Li.FI.</div>
            </div>
            <div className="flex flex-row">
              {step === 1 && (
                <img src="/loadingCircle.gif" className="w-10 h-10" />
              )}
              {step > 1 && <img src="/checkMark.png" className="w-10 h-10" />}
              <div>Swapped Successfully on Li.FI.</div>
            </div>
            <div className="flex flex-row">
              {step === 2 && (
                <img src="/loadingCircle.gif" className="w-10 h-10" />
              )}
              {step > 2 && <img src="/checkMark.png" className="w-10 h-10" />}
              <div>Swapped Successfully on Li.FI.</div>
            </div>
          </div>
        </div>
      )}
      {step === 0 && <></>}
    </>
  );
};

export default StepsContainer;
