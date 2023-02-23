export interface IPopUp {
  onClose: () => void;
}
export interface IPopUpSlice {
  id: number | null;
  isOpen: boolean;
}
export interface IAddTransaction {
  name: string;
  sum: number;
  createdAt: string;
  categoryName: string;
  cardId: number;
}
export interface ICurrencyStatus {
  isSuccess: boolean | undefined;
}
