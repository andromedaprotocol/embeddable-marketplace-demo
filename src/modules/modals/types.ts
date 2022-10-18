
export enum ModalType {
  Wallet = "wallet",
}

export interface WalletModalProps {
  modalType: ModalType.Wallet;
}

export type ModalProps = WalletModalProps