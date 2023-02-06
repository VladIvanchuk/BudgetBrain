import { FcSimCardChip } from "react-icons/fc";

export const Card = () => {
  return (
    <div className="card">
      <div className="name">Card name</div>
      <FcSimCardChip />
      <div className="number">**** **** **** 5492</div>
      <div className="balance">2656 $</div>
    </div>
  );
};
