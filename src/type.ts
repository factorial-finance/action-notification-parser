
import { Address, Cell, Slice } from "@ton/core";

export type Maybe<T> = T | null | undefined;

export type BaseActionNotificationMsgBody = {
	opCode: number;
	queryId: bigint;
	actionOpCode: number;
	errorCode: number;
	forwardPayload?: Slice;
};

export type SuccessActionNotificationMsgBody = BaseActionNotificationMsgBody & {
	asset: Address;
	amount: bigint;
	share: bigint;
};

export type SuccessRepayActionNotificationMsgBody =
	SuccessActionNotificationMsgBody & {
		overRepaidAmount: bigint;
	};

export type SuccessLiquidateActionNotificationMsgBody =
	BaseActionNotificationMsgBody & {
		repayAsset: Address;
		seizeAsset: Address;
		repayAmount: bigint;
		repayShare: bigint;
		seizeShare: bigint;
	};

export type FailTransferInActionNotificationMsgBody =
	BaseActionNotificationMsgBody & {
		sender: Address;
		asset: Address;
		amount: bigint;
		recipient: Address;
		response: Address;
	};

export type FailLiquidateActionNotificationMsgBody =
	BaseActionNotificationMsgBody & {
		sender: Address;
		amount: bigint;
		repayAsset: Address;
		seizeAsset: Address;
		borrower: Address;
		response: Address;
	};

export type FailTransferOutActionNotificationMsgBody =
	BaseActionNotificationMsgBody & {
		asset: Address;
		isShare: boolean;
		value: bigint;
		recipient: Address;
		response: Address;
	};

export type ActionNotificationMsgBody =
	| SuccessActionNotificationMsgBody
	| SuccessRepayActionNotificationMsgBody
	| SuccessLiquidateActionNotificationMsgBody
	| FailTransferInActionNotificationMsgBody
	| FailLiquidateActionNotificationMsgBody
	| FailTransferOutActionNotificationMsgBody
	| null;
