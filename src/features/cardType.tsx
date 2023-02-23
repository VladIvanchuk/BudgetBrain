import { SiAmericanexpress } from "react-icons/si";
import { FaCcVisa, FaCcMastercard, FaCreditCard, FaCcDiscover } from "react-icons/fa";

export const cardType = (cardNumber: string) => {
  switch (cardNumber[0]) {
    case "3":
      return <SiAmericanexpress />;
    case "4":
      return <FaCcVisa />;
    case "5":
      return <FaCcMastercard />;
    case "6":
      return <FaCcDiscover />;
    default:
      return <FaCreditCard />;
  }
};
