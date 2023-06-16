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
            fieldId: 'itemid', //SKU Needs to be created
            value: '3990590315'
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
            value: userInput.itemid + " " + userInput.displayname + " " + userInput.mpn
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
        ///
        inventoryItem.setValue({
            fieldId: 'externalid',
            value: "389339839"
        });
      

        inventoryItem.setCurrentSublistValue({
            sublistId: 'itemvendor',
            fieldId: 'vendor',
            value: '137142'
        });
        inventoryItem.setCurrentSublistValue({
            sublistId: 'itemvendor',
            fieldId: 'vendorname',
            value: userInput.externalid + " " + userInput.displayname + " " + userInput.mpn
        });
        inventoryItem.setCurrentSublistValue({
            sublistId: 'itemvendor',
            fieldId: 'subsidiary',
            value: 4
        });
        inventoryItem.setCurrentSublistValue({
            sublistId: 'itemvendor',
            fieldId: 'purchaseprice',
            value: userInput.cost
        });
        inventoryItem.commitLine({
            sublistId: 'itemvendor'
        });

        var recordId = inventoryItem.save();

        if (recordId) {
            log.debug('Record Created', 'Record ID: ' + recordId);
        } else {
            log.error('Record Creation Failed', 'No record created');
        }
    }

    function filterPopulate(form, savedSearchId, productCatId, label, name, internalId) {
        var optionsField = form.addField({
            id: productCatId,
            type: serverWidget.FieldType.SELECT,
            label: label,
            isMandatory: true
        });

        var savedSearchId = savedSearchId;
        var searchObj = search.load({
            id: savedSearchId
        });

        var categoryOptions = [];
        searchObj.run().each(function (result) {
            var optionText = result.getValue({
                name: name,
            });
            var optionValue = result.getValue({
                name: internalId,
            });
            categoryOptions.push({
                value: optionValue,
                text: optionText
            });

            return true;
        });

        optionsField.addSelectOption({
            value: '',
            text: ''
        });

        for (var i = 0; i < categoryOptions.length; i++) {
            var option = categoryOptions[i];
            optionsField.addSelectOption(option);
        }
        return optionsField
    }


    function onRequest(context) {
        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'My Suitelet Form'
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

            filterPopulate(form,'2082', 'custpage_class', 'Product Category', 'name', 'internalid');
            // var productCategoryField = form.addField({
            //     id: 'custpage_class',
            //     type: serverWidget.FieldType.SELECT,
            //     label: 'Product Category',
            //     isMandatory: true
            // });

            // var savedSearchId = '2082';
            // var searchObj = search.load({
            //     id: savedSearchId
            // });

            // var productCategoryOptions = [];
            // searchObj.run().each(function (result) {
            //     var optionText = result.getValue({
            //         name: 'name', 
            //     });
            //     var optionValue = result.getValue({
            //         name: 'internalid',
            //     });
            //     productCategoryOptions.push({
            //         value: optionValue,
            //         text: optionText
            //     });

            //     return true;
            // });

            // productCategoryField.addSelectOption({
            //     value: '',
            //     text: ''
            // });

            // for (var i = 0; i < productCategoryOptions.length; i++) {
            //     var option = productCategoryOptions[i];
            //     productCategoryField.addSelectOption(option);
            // }

            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);

        } else if (context.request.method === 'POST') {
            var userInput = {
                externalid: context.request.parameters.custpage_externalid,
                class: context.request.parameters.custpage_class,
                cost: context.request.parameters.custpage_cost,
                storedisplayname: context.request.parameters.custpage_storedisplayname,
                storedescription: context.request.parameters.custpage_storedescription,
                vendor: context.request.parameters.custpage_vendor,
                mpn: context.request.parameters.custpage_mpn,
                displayname: context.request.parameters.custpage_custpage_displayname,
                custitem_bkst_backstock1: context.request.parameters.custpage_custitem_bkst_backstock1,
                preferredstocklevel: context.request.parameters.custpage_preferredstocklevel
            };

            createRecord(userInput);
            context.response.write('Record created');
        }
    }


    return {
        onRequest: onRequest
    };
});