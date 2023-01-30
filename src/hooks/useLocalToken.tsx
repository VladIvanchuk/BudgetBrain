export const useLocalToken = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    isAuth: !!token,
  };
};
