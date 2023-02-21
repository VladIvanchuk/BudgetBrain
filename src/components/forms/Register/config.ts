import * as yup from "yup";
import { ISignUp } from "../../../types/auth";
const tooShortMessage = "minimum length - ${min} characters";
const tooLongMessage = "maximum length - ${max} characters";

export const schema: yup.SchemaOf<ISignUp> = yup.object().shape({
  firstName: yup
    .string()
    .min(2, tooShortMessage)
    .max(40, tooLongMessage)
    .required("Field is required"),
  lastName: yup.string().default("").min(2, tooShortMessage).max(40, tooLongMessage),
  email: yup.string().email().required("Field is required"),
  password: yup
    .string()
    .min(8, tooShortMessage)
    .max(16, tooLongMessage)
    .matches(/[a-zA-Z0-9]/, "Can only contain Latin letters and numbers.")
    .required("Field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Those passwords didn’t match.Try again.")
    .required("Field is required"),
});
