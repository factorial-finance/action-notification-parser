import { beginCell, Cell } from "@ton/core";
import {
	FailTransferOutActionNotificationMsgBody,
	FailTransferInActionNotificationMsgBody,
	FailLiquidateActionNotificationMsgBody,
	SuccessActionNotificationMsgBody,
	SuccessLiquidateActionNotificationMsgBody,
	SuccessRepayActionNotificationMsgBody,
} from "./type";

export function parseSuccessActionNotificationMsgBody(
	cell: Cell
): SuccessActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	const asset = ds.loadAddress();
	const amount = ds.loadCoins();
	const share = ds.loadCoins();

	return {
		opCode,
		queryId,
		actionOpCode,
		errorCode,
		asset,
		amount,
		share,
		forwardPayload: ds,
	};
}
export function parseSuccessRepayActionNotificationMsgBody(
	cell: Cell
): SuccessRepayActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	const asset = ds.loadAddress();
	const amount = ds.loadCoins();
	const share = ds.loadCoins();
	const overRepaidAmount = ds.loadCoins();

	return {
		opCode,
		queryId,
		actionOpCode,
		errorCode,
		asset,
		amount,
		share,
		overRepaidAmount,
		forwardPayload: ds,
	};
}

export function parseSuccessLiquidationActionNotificationMsgBody(
	cell: Cell
): SuccessLiquidateActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	const repayAsset = ds.loadAddress();
	const seizeAsset = ds.loadAddress();
	const repayAmount = ds.loadCoins();
	const repayShare = ds.loadCoins();
	const seizeShare = ds.loadCoins();

	return {
		opCode,
		queryId,
		actionOpCode,
		errorCode,
		repayAsset,
		seizeAsset,
		repayAmount,
		repayShare,
		seizeShare,
		forwardPayload: ds,
	};
}

export function parseFailTransferOutActionNotificationMsgBody(
	cell: Cell
): FailTransferOutActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	const requestDs = ds.loadRef().beginParse();

	const asset = requestDs.loadAddress();
	const isShare = requestDs.loadBoolean();
	const value = requestDs.loadCoins();
	const recipient = requestDs.loadAddress();
	const response = requestDs.loadAddress();

	return {
		opCode,
		queryId,
		actionOpCode,
		errorCode,
		asset,
		isShare,
		value,
		recipient,
		response,
		forwardPayload: requestDs,
	};
}

export function parseFailTransferInActionNotificationMsgBody(
	cell: Cell
): FailTransferInActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	const amount = ds.loadCoins();
	const sender = ds.loadAddress();

	const forwardDS = ds.loadRef().beginParse();
	const recipient = forwardDS.loadAddress();
	const subOp = forwardDS.loadUint(32);
	const asset = forwardDS.loadAddress();
	const response = forwardDS.loadAddress();

	return {
		opCode,
		queryId,
		actionOpCode: subOp,
		errorCode,
		sender,
		amount,
		recipient,
		asset,
		response,
		forwardPayload: forwardDS,
	};
}

export function parseFailLiquidateActionNotificationMsgBody(
	cell: Cell
): FailLiquidateActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	const amount = ds.loadCoins();
	const sender = ds.loadAddress();

	const forwardDS = ds.loadRef().beginParse();
	const borrower = forwardDS.loadAddress();
	const subOp = forwardDS.loadUint(32);
	const repayAsset = forwardDS.loadAddress();
	const response = forwardDS.loadAddress();

	if (forwardDS.remainingRefs >= 2) {
		for (let i = 0; i < forwardDS.remainingRefs; i++) {
			forwardDS.loadRef();
		}
	}

	const liquidationDs = forwardDS.loadRef().beginParse();
	const seizeAsset = liquidationDs.loadAddress();


	return {
		opCode,
		queryId,
		actionOpCode: subOp,
		errorCode,
		sender,
		amount,
		borrower,
		response,
		repayAsset,
		seizeAsset,
		forwardPayload: liquidationDs,
	};
}
