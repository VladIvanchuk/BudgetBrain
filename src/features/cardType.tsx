import { SiAmericanexpress } from "react-icons/si";
import { FaCcVisa, FaCcMastercard, FaCreditCard, FaCcDiscover } from "react-icons/fa";

export const cardType = (cardNumber: string) => {
  switch (cardNumber[0]) {
    case "3":
      return <SiAmericanexpress className="logo" />;
    case "4":
      return <FaCcVisa className="logo" />;
    case "5":
      return <FaCcMastercard className="logo" />;
    case "6":
      return <FaCcDiscover className="logo" />;
    default:
      return <FaCreditCard className="logo" />;
  }
};
