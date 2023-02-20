import * as yup from "yup";
import { IAddCard } from "../../../types/card";
const tooShortMessage = "minimum length - ${min} characters";
const tooLongMessage = "maximum length - ${max} characters";

export const schema: yup.SchemaOf<IAddCard> = yup.object().shape({
  cardName: yup
    .string()
    .default("")
    .min(2, tooShortMessage)
    .max(20, tooLongMessage)
    .required("Field is required"),
  numberCard: yup
    .string()
    .default("")
    .min(2, tooShortMessage)
    .max(16, tooLongMessage)
    .required("Field is required"),
  cardAmount: yup.string().required("Field is required"),
});
