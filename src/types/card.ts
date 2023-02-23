export interface ICard {
  id: number | null;
  cardName: string;
  cardAmount: number;
  createdAt: string;
  numberCard: string;
  colorValue: string;
}
export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export interface IAddCard {
  cardName: string;
  numberCard: string;
  cardAmount: number;
  colorValue: string;
}
export interface ITransaction {
  id: number;
  name: string;
  sum: number;
  type: number;
  category: {
    id: number;
    image: string;
    name: string;
  };
  createdAt: string;
  homepage?: boolean;
}
