import * as yup from "yup";
import { IAddCard } from "../../../types/popup";

export const schema: yup.SchemaOf<IAddCard> = yup.object().shape({
  name: yup.string().required("Field is required"),
});
