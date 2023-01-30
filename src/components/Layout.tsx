import { Header, Sidebar } from ".";
//Styles
import bgMain from "../theme/img/wallpaper6.jpg";
import bg2 from "../theme/img/wallpaper2.jpg";
import { useLocation } from "react-router-dom";

export const Layout: React.FC<ILayout> = ({ children }) => {
  const location = useLocation();
  const show = location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <div
      className="wrapper"
      style={{ background: `url(${!show ? bgMain : bg2}) center` }}
    >
      {!show && <Header />}
      {!show && <Sidebar />}
      {children}
    </div>
  );
};

interface ILayout {
  children: React.ReactNode;
}
