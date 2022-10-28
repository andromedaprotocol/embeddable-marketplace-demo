import { ModalType, PlaceBidModalProps } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the message modal for an execute message.
 *  ```
 *  // Example Usage
 *  const open = useExecuteModal("somecontractaddress")
 *
 *  await open(msg, false, [...some coins])
 *
 *  ```
 * @param contractAddress
 * @returns
 */
export default function usePlaceBidModal(data: Omit<PlaceBidModalProps, 'modalType'>) {
  const { open } = useGlobalModalContext();

  return () =>
    open(ModalType.PlaceBid, data);
}
