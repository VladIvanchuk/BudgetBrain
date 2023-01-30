//Core
import { Navigate, Route, Routes } from "react-router-dom";
//Components
import { Home, Profile, MoneyBox, Login, SignUp, Goals, Transactions } from "./pages";
import { RequireAuth } from "./features";
import { Layout } from "./components";
import { useLocalToken } from "./hooks";

export const App = () => {
  const { isAuth } = useLocalToken();
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/money-box" element={<MoneyBox />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuth ? "/home" : "/login"} replace />} />
      </Routes>
    </Layout>
  );
};
