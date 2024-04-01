import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Wallet = "wallet",
  Transaction = "transaction",
  PlaceBid = "placebid",
  BuyNow = "buynow",
  CrowdfundGroupBuy = 'crowdfundgroupbuy',
  ExchangeConfirm = 'exchangeconfirm'
}

export interface WalletModalProps {
  modalType: ModalType.Wallet;
}


export interface PlaceBidModalProps {
  modalType: ModalType.PlaceBid;
  contractAddress: string;
  auctionAddress: string;
  tokenId: string;
}

export interface BuyNowModalProps {
  modalType: ModalType.BuyNow;
  contractAddress: string;
  marketplaceAddress: string;
  tokenId: string;
}

export interface CrowdfundGroupBuyModalProps {
  crowdfundAddress: string;
  modalType: ModalType.CrowdfundGroupBuy;
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

export interface ExchangeConfirmModalProps {
  exchangeAddress: string;
  modalType: ModalType.ExchangeConfirm;
  exchangeRate: number,
  nativeAmount: number,
  nativeDenom: string,
  cw20Symbol: string,
}

export type ModalProps = WalletModalProps | TransactionModalProps | PlaceBidModalProps | BuyNowModalProps | CrowdfundGroupBuyModalProps | ExchangeConfirmModalProps