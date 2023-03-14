import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the wallet modal
 * @returns
 */
export default function useConfigModal() {
  const { open } = useGlobalModalContext();

  return () => open(ModalType.Config);
}
