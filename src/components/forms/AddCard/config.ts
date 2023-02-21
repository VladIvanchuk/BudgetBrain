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
    .required("Field is required")
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      "Is not in correct card format"
    ),
  cardAmount: yup.string().required("Field is required"),
  colorValue: yup.string().required("Field is required"),
});
