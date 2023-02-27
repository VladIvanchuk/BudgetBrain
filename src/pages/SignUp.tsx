import { FC } from "react";
import { Logo, RegisterForm } from "../components";
import { motion } from "framer-motion";

export const SignUp: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="authorization"
    >
      <Logo />
      <RegisterForm />
    </motion.div>
  );
};
