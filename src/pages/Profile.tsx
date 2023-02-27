import { FC } from "react";
import { useGetUserQuery } from "../redux/api/userApiSlice";
import { motion } from "framer-motion";

export const Profile: FC = () => {
  const { data = {} } = useGetUserQuery({});
  const { firstName, lastName, email } = data;

  return (
    <main className="main-container">
      <div className="block-header">
        <h2>Profile</h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="block-wrapper"
      >
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
      </motion.div>
    </main>
  );
};
