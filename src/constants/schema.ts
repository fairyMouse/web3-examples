import * as Yup from "yup";

export const tokenTransferSchema = Yup.object().shape({
  targetAddress: Yup.string().required("target address is required"),
  amount: Yup.string().required("amount is required"),
});
