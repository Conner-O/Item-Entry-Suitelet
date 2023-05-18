// created by Tim Gale, SE

function intercompanyJournal(type) {
	var billRecord = nlapiGetNewRecord();

	if (billRecord.getFieldValue('custbody_intercompany') == 'T') {
		var NumOfLines = billRecord.getLineItemCount('expense');
		for (i = 1; i <= NumOfLines; i++) {
			var subToCharge = billRecord.getLineItemValue('expense', 'custcol_sub_to_charge', i);

			if (subToCharge) {
				var accountToCharge = billRecord.getLineItemValue('expense', 'custcol_account_to_charge', i);
				var amount = billRecord.getLineItemValue('expense', 'amount', i);
				var lineMemo = "Intercompany";
				var bodyTranDate = nlapiDateToString(new Date());
				var currency = billRecord.getFieldValue('currency');
				var reference = billRecord.getFieldValue('tranid');

				var record = nlapiCreateRecord('journalentry');
				record.setFieldValue('trandate', bodyTranDate);
				record.setFieldValue('subsidiary', subToCharge);
				record.setFieldValue('currency', currency);
				record.setFieldValue('custbody_ref', reference);


				//Debit
				record.setLineItemValue('line', 'account', '1', accountToCharge);
				record.setLineItemValue('line', 'debit', '1', amount);
				record.setLineItemValue('line', 'memo', '1', lineMemo);

				//Credit
				record.setLineItemValue('line', 'account', '2', '147'); // intercompany account
				record.setLineItemValue('line', 'credit', '2', amount);
				record.setLineItemValue('line', 'memo', '2', lineMemo);

				var id = nlapiSubmitRecord(record, true);
				nlapiSetRedirectURL('RECORD', record.getRecordType(), id, false);
			}
		}
	}
}