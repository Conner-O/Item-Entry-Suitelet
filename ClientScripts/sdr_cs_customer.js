/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define([], function () {
    function fieldChanged(context) {
        if (context.fieldId === 'custentity_sdr_apply_coupon') {
            var currentRecord = context.currentRecord;
            var couponCodeField = currentRecord.getField({
                fieldId: 'custentity_sdr_coupon_code'
            });
            if (currentRecord.getValue({ fieldId: 'custentity_sdr_apply_coupon' })) {
                couponCodeField.isDisabled = false;
            } else {
                couponCodeField.isDisabled = true;
                currentRecord.setValue({ fieldId: 'custentity_sdr_coupon_code', value: '' });
            }
        }
    }

    return {
        fieldChanged: fieldChanged
    };
});
