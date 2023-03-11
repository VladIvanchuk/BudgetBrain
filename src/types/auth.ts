export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IUPDUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
}
