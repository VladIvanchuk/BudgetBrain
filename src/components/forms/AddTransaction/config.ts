import * as yup from "yup";
import { ITransaction } from "../../../types/transaction";

export const schema: yup.SchemaOf<ITransaction> = yup.object().shape({
  name: yup.string().required("Field is required"),
  sum: yup.string().required("Field is required"),
  date: yup.string().required("Field is required"),
});
