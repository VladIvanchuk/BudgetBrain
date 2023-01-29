import { Header, Sidebar } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Profile, MoneyBox, Login, SignUp, Goals, Transactions } from "./pages";
import bgMain from "./theme/img/wallpaper6.jpg";
import bg2 from "./theme/img/wallpaper2.jpg";

export const App = () => {
  const isAuth = true;
  return (
    <div
      className="wrapper"
      style={{ background: `url(${isAuth ? bgMain : bg2}) center` }}
    >
      {isAuth && <Header />}
      {isAuth && <Sidebar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/money-box" element={<MoneyBox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};
