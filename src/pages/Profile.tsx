import { FC, useState } from "react";
import { useGetUserQuery } from "../redux/api/userApiSlice";
import { motion } from "framer-motion";
import { FiEdit3 } from "react-icons/fi";
import { PopUp } from "../components";
import { UpdateUser } from "../components/forms/User/UpdateUser";

export const Profile: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data = {} } = useGetUserQuery({});
  const { firstName, lastName, email } = data;

  return (
    <>
      <PopUp name="Edit Profile" open={openModal} onClose={() => setOpenModal(false)}>
        <UpdateUser onClose={() => setOpenModal(false)} />
      </PopUp>
      <main className="main-container profile">
        <div className="block-header">
          <h2>Profile</h2>
          <button className="button" onClick={() => setOpenModal(true)}>
            <span>Edit Profile </span>
            <FiEdit3 />
          </button>
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
            <div className="user-info">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Full name</span>
                    </td>
                    <td>
                      <span>{firstName}</span> <span>{lastName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Email</span>
                    </td>
                    <td>
                      <span>{email}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="profile-img"></div>
          </div>
        </motion.div>
      </main>
    </>
  );
};
