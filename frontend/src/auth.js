export const isLoggedIn = () => !!localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("walletAddress");
  window.location.href = "/login";
};
