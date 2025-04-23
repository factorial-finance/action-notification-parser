import { Cell } from "@ton/core";
import { ActionNotificationMsgBody } from "./type";
import { parseFailLiquidateActionNotificationMsgBody, parseFailTransferInActionNotificationMsgBody, parseFailTransferOutActionNotificationMsgBody, parseSuccessActionNotificationMsgBody, parseSuccessLiquidationActionNotificationMsgBody, parseSuccessRepayActionNotificationMsgBody } from "./parser";
import { Pool, JettonWallet } from "./constant";

export function parseActionNotification(cell: Cell): ActionNotificationMsgBody {
	const ds = cell.beginParse();

	const opCode = ds.loadUint(32);
	if (opCode !== Pool.Op.ActionNotification) return null;

	const queryId = ds.loadUintBig(64);
	const actionOpCode = ds.loadUint(32);
	const errorCode = ds.loadUint(16);

	if (errorCode === 0) {
		if (actionOpCode === Pool.Op.Supply) {
			return parseSuccessActionNotificationMsgBody(cell);
		} else if (actionOpCode === Pool.Op.Withdraw) {
			return parseSuccessActionNotificationMsgBody(cell);
		} else if (actionOpCode === Pool.Op.Borrow) {
			return parseSuccessActionNotificationMsgBody(cell);
		} else if (actionOpCode === Pool.Op.Repay) {
			return parseSuccessRepayActionNotificationMsgBody(cell);
		} else if (actionOpCode === Pool.Op.Liquidate) {
			return parseSuccessLiquidationActionNotificationMsgBody(cell);
		}
	} else {
		if (actionOpCode === JettonWallet.Op.TransferNotification) {
			ds.loadCoins();
			ds.loadAddress();
			const forwardDS = ds.loadRef().beginParse();
			forwardDS.loadAddress();
			const subOp = forwardDS.loadUint(32);
			if (subOp === Pool.Op.Supply) {
				return parseFailTransferInActionNotificationMsgBody(cell);
			} else if (subOp === Pool.Op.Repay) {
				return parseFailTransferInActionNotificationMsgBody(cell);
			} else if (subOp === Pool.Op.Liquidate) {
				return parseFailLiquidateActionNotificationMsgBody(cell);
			}
		} else if (actionOpCode === Pool.Op.Withdraw) {
			return parseFailTransferOutActionNotificationMsgBody(cell);
		} else if (actionOpCode === Pool.Op.Borrow) {
			return parseFailTransferOutActionNotificationMsgBody(cell);
		}
	}
	return null;
}