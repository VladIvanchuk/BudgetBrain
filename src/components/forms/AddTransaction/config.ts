import * as yup from "yup";
import { IAddTransaction } from "../../../types/popup";

export const schema: yup.SchemaOf<IAddTransaction> = yup.object().shape({
  name: yup.string().required("Field is required"),
  sum: yup.number().required("Field is required").typeError("Must be a number"),
  createdAt: yup.string().required("Field is required"),
  categoryName: yup.string().required("Field is required"),
  cardId: yup.number().required("Field is required").typeError("Field is required"),
});
