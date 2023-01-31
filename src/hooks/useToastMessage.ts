import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../features/toastOptions";
import { resetMessage, selectMessage, selectMessageType } from "../redux/auth/authSlice";

export const useToastMessage = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const messageType = useSelector(selectMessageType);

  useEffect(() => {
    if (messageType === "error") {
      toast.error(message, toastOptions);
      dispatch(resetMessage);
    }
    if (messageType === "success") {
      toast.success(message, toastOptions);
      dispatch(resetMessage);
    }
  }, [dispatch, message, messageType]);
};
