import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../features/toastOptions";
import {
  resetMessage,
  selectErrorMessage,
  selectSuccessMessage,
} from "../redux/auth/authSlice";

export const useToastMessage = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, toastOptions);
      dispatch(resetMessage);
    }
    if (successMessage) {
      toast.success(successMessage, toastOptions);
      dispatch(resetMessage);
    }
  }, [dispatch, errorMessage, successMessage]);
};
