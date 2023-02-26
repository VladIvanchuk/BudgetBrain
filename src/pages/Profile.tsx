import { FC } from "react";
import { useGetUserQuery } from "../redux/api/userApiSlice";

export const Profile: FC = () => {
  const { data = {} } = useGetUserQuery({});
  const { firstName, lastName, email } = data;
  console.log(data);

  return (
    <div className="main-container">
      <div className="block-header">
        <h2>Profile</h2>
      </div>
      <div className="block-wrapper">
        {/* {<Loader />} */}
        <div className="profile-top">
          <div className="profile-img"></div>
          <div className="user-info">
            <div className="name">
              <span>{firstName}</span>
              <span>{lastName}</span>
            </div>
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
