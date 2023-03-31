import * as yup from "yup";
import { IUPDUser } from "../../../types/auth";
// eslint-disable-next-line no-template-curly-in-string
const tooShortMessage = "minimum length - ${min} characters";
// eslint-disable-next-line no-template-curly-in-string
const tooLongMessage = "maximum length - ${max} characters";

export const schema: yup.SchemaOf<IUPDUser> = yup.object().shape({
  firstName: yup
    .string()
    .default("")
    .min(2, tooShortMessage)
    .max(20, tooLongMessage)
    .required("Field is required"),
  lastName: yup
    .string()
    .default("")
    .min(2, tooShortMessage)
    .max(20, tooLongMessage)
    .required("Field is required"),
  email: yup.string().email().required("Field is required"),
  password: yup
    .string()
    .min(8, tooShortMessage)
    .max(16, tooLongMessage)
    .matches(/[a-zA-Z0-9]/, "Can only contain Latin letters and numbers.")
    .required("Field is required"),
});
