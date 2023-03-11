import { ImCross } from "react-icons/im";

export const PopUp: React.FC<PopUpProps> = ({ open, onClose, children, name }) => {
  if (!open) return null;

  return (
    <div className="popup-wrapper" onClick={onClose}>
      <div
        className="popup"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header">
          <h3>{name}</h3>
          <ImCross onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};
interface PopUpProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  name: string;
}
