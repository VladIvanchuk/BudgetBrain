export interface IAuth {
  token: string | null;
  message: {
    text: string;
    type: string;
  };
}
