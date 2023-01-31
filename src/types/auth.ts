export interface ISignUp {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface ILogin {
  email: string;
  password: string;
}
