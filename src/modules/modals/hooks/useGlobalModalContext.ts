import { createContext, useContext } from "react";
import type { ModalProps } from "../types";

/**
 * Directly Omitting the modal type didn't exported type properly for TransactionModalProps.
 * This is a wraper over omit and it checks using operator and type export works properly
 */
type ExtractModalParameters<A, T> = A extends { modalType: T } ? Omit<A, 'modalType'> : never
export interface GlobalModalContextProps {
  isOpen: boolean;
  open: <T extends ModalProps['modalType']>(
    type: T,
    props?: ExtractModalParameters<ModalProps, T>,
    onClose?: () => Promise<void>,
  ) => void;
  close: () => void;
  error?: Error;
  setError: (error?: Error) => void;
}

const defaultContext: GlobalModalContextProps = {
  isOpen: false,
  open: () => ({}),
  close: () => ({}),
  setError: () => ({}),
};

export const GlobalModalContext =
  createContext<GlobalModalContextProps>(defaultContext);

export default function useGlobalModalContext() {
  return useContext(GlobalModalContext);
}
