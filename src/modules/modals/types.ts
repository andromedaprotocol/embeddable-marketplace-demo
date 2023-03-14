import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Wallet = "wallet",
  Transaction = "transaction",
  PlaceBid = "placebid",
  Config = "config"
}

export interface WalletModalProps {
  modalType: ModalType.Wallet;
}

export interface ConfigModalProps {
  modalType: ModalType.Config;
  
}

export interface PlaceBidModalProps {
  modalType: ModalType.PlaceBid;
  contractAddress: string;
  auctionAddress: string;
  tokenId: string;
}

export interface TransactionModalProps {
  contractAddress: string;
  funds: Coin[];
  simulate: boolean;
  msg: Msg;
  modalType: ModalType.Transaction;
  fee?: Fee;
  memo?: string
}

export type ModalProps = WalletModalProps | TransactionModalProps | PlaceBidModalProps | ConfigModalProps