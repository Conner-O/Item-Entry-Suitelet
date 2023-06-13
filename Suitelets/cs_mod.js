/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/record'], function (serverWidget, record) {
    function createRecord(formParams) {
        // Extract form data from the formParams object and perform record creation
        var inventoryItem = record.create({
            type: record.Type.INVENTORY_ITEM,
            isDynamic: true
        });

        // Set field values based on the formParams object (user input)
        // Example:
        inventoryItem.setValue({
            fieldId: 'itemid',
            value: formParams.itemid
        });

        // Set other field values accordingly
        inventoryItem.setValue({
            fieldId: 'subsidiary',
            value: 4
        });

        inventoryItem.setValue({//VARIABLE
            fieldId: 'externalid',
            value: category
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
        // Save the record and handle the result
        var recordId = inventoryItem.save();
        if (recordId) {
            log.debug('Record Created', 'Record ID: ' + recordId);
        } else {
            log.error('Record Creation Failed', 'No record created');
        }
    }

    return {
        onRequest: function (context) {
            if (context.request.method === 'GET') {
                // Render the form
                var form = serverWidget.createForm({
                    title: 'Create Inventory Item'
                });

                // Add fields and buttons to the form as needed
                var itemNameField = form.addField({
                    id: 'custpage_itemid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Item Name',
                    isMandatory: true
                  });

                  form.addSubmitButton({
                    label: 'Create Item'
                  });
                  
                context.response.writePage(form);
            } else if (context.request.method === 'POST') {
                // Process the form submission
                createRecord(context.request.parameters);
                context.response.write('Record created');
            }
        }
    };
});
