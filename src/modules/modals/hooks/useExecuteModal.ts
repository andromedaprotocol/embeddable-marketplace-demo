import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { ModalType } from "../types";
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
export default function useExecuteModal(contractAddress: string) {
  const { open } = useGlobalModalContext();

  return (msg: Msg, simulate = true, funds: Coin[] = []) =>
    open(ModalType.Transaction, {
      msg,
      funds,
      contractAddress,
      simulate,
    });
}
