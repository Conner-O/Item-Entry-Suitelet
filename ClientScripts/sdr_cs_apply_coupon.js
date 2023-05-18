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
            if (couponCodeField.isDisabled === false && couponCodeField.getValue().length()!==5) {
                alert("Coupon Code Must Be 5 Characters");
            } else {
                
            }
        }
    }

    return {
        fieldChanged: fieldChanged
    };
});