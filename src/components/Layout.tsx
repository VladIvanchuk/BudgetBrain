import { Header, Sidebar } from ".";
//Styles
import bgMain from "../theme/img/bg-img.jpg";
import { useLocation } from "react-router-dom";

export const Layout: React.FC<ILayout> = ({ children }) => {
  const location = useLocation();
  const show = location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <div className="wrapper" style={{ background: `url(${bgMain}) center` }}>
      <div className="video-bg">
        <video autoPlay loop muted>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
      </div>
      {!show && <Header />}
      {!show && <Sidebar />}
      {children}
    </div>
  );
};

interface ILayout {
  children: React.ReactNode;
}
