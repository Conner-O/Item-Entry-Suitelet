/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */


define([], function () {
    function fieldChanged(context) {
        if (context.fieldId === 'subsidiary') {
            alert("Coupon Code Must Be 5 Characters");
        }
    }

    return {
        fieldChanged: fieldChanged
    };
});