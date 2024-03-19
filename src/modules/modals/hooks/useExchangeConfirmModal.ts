import { ModalType, ExchangeConfirmModalProps } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

export default function useExchangeConfirmModal(data: Omit<ExchangeConfirmModalProps, 'modalType'>) {
  const { open } = useGlobalModalContext();

  return () =>
    open(ModalType.ExchangeConfirm, data);
}