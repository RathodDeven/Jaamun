import { useRefresh } from "@memester-xyz/lens-use";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/token";

export const LensContent = createContext([]);

export const LensWrapperProvider = ({ children }) => {
  const [isLensLoggedIn, setIsLensLoggedIn] = useState(false);
  const [stateRefreshToken, setStateRefreshToken] = useState(null);
  const [refresh, { data: refreshData }] = useRefresh(stateRefreshToken);

  // After the request is complete
  // refreshData.refresh.accessToken has acccess token
  // refreshData.refresh.refreshToken has refresh token
  const refreshTokens = () => {
    // get refresh token and if it exists, refresh the tokens
    // Call this method to start the refresh request
    refresh();
  };

  useEffect(() => {
    // set access token and refresh token if they exist
    if (!refreshData) return;
    setAccessToken(refreshData.refresh.accessToken);
    setRefreshToken(refreshData.refresh.refreshToken);
    setStateRefreshToken(refreshData.refresh.refreshToken);
    window.location.reload();
  }, [refreshData]);

  const checkIfLensAccessTokenAndRefreshTokenExist = () => {
    const lensAccessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (lensAccessToken && refreshToken) {
      setStateRefreshToken(refreshToken);
      setIsLensLoggedIn(true);
    }
  };

  // const updateApolloClient = () => {
  //   // update apollo client with new access token
  // };

  // useEffect(() => {
  //   if (stateAccessToken) {
  //     updateApolloClient();
  //   }
  // }, [stateAccessToken]);

  useEffect(() => {
    // function to check if access token and refresh token exist
    // if they do, set them in local storage
    checkIfLensAccessTokenAndRefreshTokenExist();
  }, []);

  return (
    <LensContent.Provider
      value={{ isLensLoggedIn, refreshTokens, setIsLensLoggedIn }}
    >
      {children}
    </LensContent.Provider>
  );
};

export const useLensCustomHook = () => useContext(LensContent);
