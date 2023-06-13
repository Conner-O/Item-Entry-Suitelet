/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */


define(['N/ui/serverWidget', 'N/record'], function (serverWidget, record) {

    function onRequest(context) {
        // Suitelet logic here

    }

    function createRecord(userInput) {

        var inventoryItem = record.create({
            type: record.Type.INVENTORY_ITEM,
            isDynamic: true
        });

        inventoryItem.setValue({
            fieldId: 'subsidiary',
            value: 4
        });

        inventoryItem.setValue({//VARIABLE
            fieldId: 'itemid',
            value: userInput.itemid
        });

        inventoryItem.setValue({//VARIABLE
            fieldId: 'externalid',
            value: userInput.externalid
        });

        inventoryItem.setValue({//VARIABLE
            fieldId: 'cost',
            value: '100'
        });

        inventoryItem.setValue({//VARIABLE
            fieldId: 'class',
            value: 526
        });

        inventoryItem.setValue({
            fieldId: 'custitem_isu_bookstore_brand',
            value: 126
        });

        inventoryItem.setValue({
            fieldId: 'department',
            value: 101
        });

        inventoryItem.setValue({ //VARIABLE
            fieldId: 'pagetitle',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'storedisplayname',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'storedescription',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'featureddescription',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'vendorname',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'mpn',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'upccode',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'custitem_pos_code_custom_label',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'vendorname',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'displayname',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'custitem_bkst_backstock1',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE (Enter reorder qty)
            fieldId: 'preferredstocklevel',
            value: 101
        });
        inventoryItem.setValue({ //VARIABLE
            fieldId: 'reorderpoint',
            value: "T"
        });
        inventoryItem.setValue({
            fieldId: 'preferredlocation',
            value: 30
        });
        inventoryItem.setValue({
            fieldId: 'cogsaccount',
            value: 243
        });
        inventoryItem.setValue({
            fieldId: 'assetaccount',
            value: 216
        });
        inventoryItem.setValue({
            fieldId: 'incomeaccount',
            value: 523
        });
        inventoryItem.setValue({
            fieldId: 'custitem_nsts_csic_web_oos_behavior',
            value: 2
        });
        inventoryItem.setValue({
            fieldId: 'costingmethod',
            value: "AVG"
        });


        var recordId = inventoryItem.save();

        if (recordId) {
            log.debug('Record Created', 'Record ID: ' + recordId);
        } else {
            log.error('Record Creation Failed', 'No record created');
        }
    }

    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Create the form
            var form = serverWidget.createForm({
                title: 'My Suitelet Form'
            });

            // Add input fields to the form
            form.addField({
                id: 'custpage_itemid',
                type: serverWidget.FieldType.TEXT,
                label: 'Item Name'
            });

            form.addField({
                id: 'custpage_externalid',
                type: serverWidget.FieldType.TEXT,
                label: 'External ID'
            });

            // Add a submit button to the form
            form.addSubmitButton({
                label: 'Submit'
            });

            // Display the form to the user
            context.response.writePage(form);

        } else if (context.request.method === 'POST') {
            var userInput = {
                itemid: context.request.parameters.custpage_itemid,
                externalid: context.request.parameters.custpage_externalid
            };

            // Pass the user input to the createRecord function
            createRecord(userInput);
            context.response.write('Record created');
        }
    }


    return {
        onRequest: onRequest
    };
});