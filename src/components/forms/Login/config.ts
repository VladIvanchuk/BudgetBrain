import * as yup from "yup";
import { ILogin } from "../../../types/auth";
// eslint-disable-next-line no-template-curly-in-string
const tooShortMessage = "minimum length - ${min} characters";
// eslint-disable-next-line no-template-curly-in-string
const tooLongMessage = "maximum length - ${max} characters";

export const schema: yup.SchemaOf<ILogin> = yup.object().shape({
  email: yup.string().email().required("Field is required"),
  password: yup
    .string()
    .min(6, tooShortMessage)
    .max(16, tooLongMessage)
    .required("Field is required"),
});
