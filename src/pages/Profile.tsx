import { FC } from "react";
import { Nothing } from "../components";

export const Profile: FC = () => {
  return (
    <div className="main-container">
      <div className="block-header">
        <h2>Profile</h2>
      </div>
      <div className="block-wrapper">
        {/* {<Loader />} */}
        <div className="profile-top">
          <div className="profile-img"></div>
          <span>Username</span>
        </div>
        {<Nothing />}
      </div>
    </div>
  );
};
