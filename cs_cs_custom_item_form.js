/**
*@NApiVersion 2.x
*@NScriptType ClientScript
*/
define(['N/error'], function (error) {
    function pageInit(context) {

    }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord;
        if (sublistName === 'item' && sublistFieldName === 'item')
            currentRecord.setValue({
                fieldId: 'memo',
                value: 'Item: ' + currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item'
                }) + ' is selected'
            });
    }

    return {
        pageInit: pageInit,
    };
});

