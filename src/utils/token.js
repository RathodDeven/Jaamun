export const setAccessToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token) => {
  sessionStorage.setItem("refreshToken", token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return sessionStorage.getItem("refreshToken");
};
