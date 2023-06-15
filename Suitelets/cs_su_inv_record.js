/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * A script made to simplify the item entry process
 */


define(['N/search', 'N/ui/serverWidget', 'N/record'], function (search, serverWidget, record) {

    function createRecord(userInput) {

        var inventoryItem = record.create({
            type: record.Type.INVENTORY_ITEM,
            isDynamic: true
        });

        inventoryItem.setValue({
            fieldId: 'subsidiary',
            value: 4
        });

        inventoryItem.setValue({
            fieldId: 'itemid',
            value: userInput.itemid
        });

        inventoryItem.setValue({
            fieldId: 'externalid',
            value: userInput.externalid
        });

        inventoryItem.setValue({
            fieldId: 'cost',
            value: userInput.cost
        });

        inventoryItem.setValue({
            fieldId: 'class',
            value: userInput.class
        });

        inventoryItem.setValue({
            fieldId: 'custitem_isu_bookstore_brand',
            value: 126
        });

        inventoryItem.setValue({
            fieldId: 'department',
            value: 101
        });

        inventoryItem.setValue({
            fieldId: 'pagetitle',
            value: 101
        });
        inventoryItem.setValue({
            fieldId: 'storedisplayname',
            value: userInput.storedisplayname
        });
        inventoryItem.setValue({
            fieldId: 'storedescription',
            value: userInput.storedescription
        });
        inventoryItem.setValue({
            fieldId: 'featureddescription',
            value: userInput.storedescription
        });
        inventoryItem.setValue({
            fieldId: 'vendorname',
            value: userInput.externalid + " " + userInput.displayname + " " + userInput.mpn
        }); // this needs updating once autogenerating sku is setup
        inventoryItem.setValue({
            fieldId: 'mpn',
            value: userInput.mpn
        });
        inventoryItem.setValue({
            fieldId: 'custitem_pos_code_custom_label',
            value: 101
        });
        inventoryItem.setValue({
            fieldId: 'displayname',
            value: userInput.displayname
        });
        inventoryItem.setValue({
            fieldId: 'custitem_bkst_backstock1',
            value: userInput.custitem_bkst_backstock1
        });
        inventoryItem.setValue({ //WRONG ID?
            fieldId: 'preferredstocklevel',
            value: userInput.preferredstocklevel
        });
        inventoryItem.setValue({
            fieldId: 'reorderpoint',
            value: true
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
        inventoryItem.setValue({
            fieldId: 'purchaseprice',
            value: userInput.cost
        });
        inventoryItem.setValue({
            fieldId: 'preferredvendor',
            value: true
        });
        inventoryItem.setCurrentSublistValue({
            sublistId: 'itemvendor',
            fieldId: 'vendor',
            value: '137142'
        });
        inventoryItem.setValue({
            fieldId: 'vendor',
            value: '137142'
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

            var form = serverWidget.createForm({
                title: 'My Suitelet Form'
            });
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
            form.addField({
                id: 'custpage_cost',
                type: serverWidget.FieldType.FLOAT,
                label: 'Cost'
            });
            form.addField({
                id: 'custpage_storedisplayname',
                type: serverWidget.FieldType.TEXT,
                label: 'Store Dislay Name'
            });
            form.addField({
                id: 'custpage_storedescription',
                type: serverWidget.FieldType.TEXT,
                label: 'Store Description'
            });
            // form.addField({
            //     id: 'custpage_vendor',
            //     source: 'vendor',
            //     type: serverWidget.FieldType.SELECT,
            //     label: 'Vendor',
            //     container: 'custpage_purchasing_section'
            // });
            form.addField({
                id: 'custpage_mpn',
                type: serverWidget.FieldType.TEXT,
                label: 'MPN'
            });
            form.addField({
                id: 'custpage_displayname',
                type: serverWidget.FieldType.TEXT,
                label: 'Display Name'
            });
            form.addField({
                id: 'custpage_custitem_bkst_backstock1',
                source: '690',
                type: serverWidget.FieldType.SELECT,
                label: 'Location'
            });
            form.addField({
                id: 'custpage_preferredstocklevel',
                type: serverWidget.FieldType.TEXT,
                label: 'Reorder Point'
            });

            var productCategoryField = form.addField({
                id: 'custpage_class',
                type: serverWidget.FieldType.SELECT,
                label: 'Product Category',
                isMandatory: true
            });
            // Load the saved search to populate the product category field
            var savedSearchId = '2082';
            var searchObj = search.load({
                id: savedSearchId
            });

            var productCategoryOptions = [];
            searchObj.run().each(function (result) {
                var optionText = result.getValue({
                    name: 'name', // Replace 'name' with the actual field name from the saved search
                });
                var optionValue = result.getValue({
                    name: 'internalid', // Replace 'internalid' with the actual field name from the saved search
                });
                productCategoryOptions.push({
                    value: optionValue,
                    text: optionText
                });

                return true;
            });

            // Add select options to the product category field
            productCategoryField.addSelectOption({
                value: '',
                text: ''
            });

            for (var i = 0; i < productCategoryOptions.length; i++) {
                var option = productCategoryOptions[i];
                productCategoryField.addSelectOption(option);
            }

            // Add a submit button to the form
            form.addSubmitButton({
                label: 'Submit'
            });

            // Display the form to the user
            context.response.writePage(form);

        } else if (context.request.method === 'POST') {
            var userInput = {
                itemid: context.request.parameters.custpage_itemid,
                externalid: context.request.parameters.custpage_externalid,
                class: context.request.parameters.custpage_class,
                cost: context.request.parameters.custpage_cost,
                storedisplayname: context.request.parameters.custpage_storedisplayname,
                storedescription: context.request.parameters.custpage_storedescription,
                // vendor: context.request.parameters.custpage_vendor,
                mpn: context.request.parameters.custpage_mpn,
                displayname: context.request.parameters.custpage_custpage_displayname,
                custitem_bkst_backstock1: context.request.parameters.custpage_custitem_bkst_backstock1,
                preferredstocklevel: context.request.parameters.custpage_preferredstocklevel
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