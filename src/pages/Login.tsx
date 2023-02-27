import { LoginForm, Logo } from "../components";
import { motion } from "framer-motion";

export const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="authorization"
    >
      <LoginForm />
      <Logo />
    </motion.div>
  );
};
