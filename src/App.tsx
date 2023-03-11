//Core
import { Navigate, Route, Routes } from "react-router-dom";
//Components
import { Home, Profile, Currencies, Login, SignUp, Transactions, Wallet } from "./pages";
import { RequireAuth } from "./features";
import { Layout } from "./components";
import { useLocalToken } from "./hooks";
import { Bounce, ToastContainer } from "react-toastify";
import { useToastMessage } from "./hooks/useToastMessage";
import { AnimatePresence } from "framer-motion";
import { useValidateTokenQuery } from "./redux/api/authApiSlice";

export const App = () => {
  useToastMessage();
  const { isSuccess } = useValidateTokenQuery({});
  const { isAuth } = useLocalToken();
  return (
    <Layout>
      <ToastContainer newestOnTop transition={Bounce} theme="dark" />
      <AnimatePresence>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/currencies" element={<Currencies />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={isAuth && !isSuccess ? "/home" : "/login"} replace />}
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};
