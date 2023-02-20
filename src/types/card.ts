export interface ICard {
  id: number | null;
  cardName: string;
  cardAmount: number;
  createdAt: string;
  numberCard: number;
}
export interface IActiveCardSlice {
  id: number | null;
  isOpen: boolean;
}

export interface IAddCard {
  cardName: string;
  numberCard: string;
  cardAmount: string;
}
export interface ITransaction {
  id: number;
  name: string;
  sum: number;
  type: number;
  category: string;
  createdAt: string;
}
