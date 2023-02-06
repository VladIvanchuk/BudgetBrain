import * as yup from "yup";
import { IAddTransaction } from "../../../types/popup";

export const schema: yup.SchemaOf<IAddTransaction> = yup.object().shape({
  name: yup.string().required("Field is required"),
  sum: yup.string().required("Field is required"),
  date: yup.string().required("Field is required"),
});
