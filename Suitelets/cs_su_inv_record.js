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
            fieldId: 'vendorname',
            value: userInput.itemid + " " + userInput.displayname + " " + userInput.mpn
        }); // this needs updating once autogenerating sku is setup
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
        inventoryItem.setValue({
            fieldId: 'autoleadtime',
            value: true
        });
        inventoryItem.setValue({
            fieldId: 'autoreorderpoint',
            value: true
        });
        inventoryItem.setValue({
            fieldId: 'autopreferredstocklevel',
            value: true
        });
        inventoryItem.setValue({
            fieldId: 'vendorcode',
            value: userInput.externalid + " " + userInput.displayname + " " + userInput.mpn
        });
        // Base Price
        inventoryItem.selectLine({
            sublistId: 'price',
            line: 0
        });

        inventoryItem.setCurrentMatrixSublistValue({
            sublistId: 'price',
            fieldId: 'price',
            column: 0,
            value: userInput.retail,  //change
            ignoreFieldChange: true,
            fireSlavingSync: true
        });
        inventoryItem.commitLine({
            sublistId: 'price'
        });

        // Department Charge
        inventoryItem.selectLine({
            sublistId: 'price',
            line: 1
        });

        inventoryItem.setCurrentMatrixSublistValue({
            sublistId: 'price',
            fieldId: 'price',
            column: 0,
            value: userInput.retail, //change
            ignoreFieldChange: true,
            fireSlavingSync: true
        });
        inventoryItem.commitLine({
            sublistId: 'price'
        });
        // Online Price

        inventoryItem.selectLine({
            sublistId: 'price',
            line: 3
        });

        inventoryItem.setCurrentMatrixSublistValue({
            sublistId: 'price',
            fieldId: 'price',
            column: 0,
            value: userInput.retail,  //change
            ignoreFieldChange: true,
            fireSlavingSync: true
        });
        inventoryItem.commitLine({
            sublistId: 'price'
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

    function filterLockPop(form, savedSearchId, productCatId, label, name, internalId) {
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
                text: optionText,
            });

            return true;
        });

        optionsField.addSelectOption({
            value: '',
            text: '',
        });

        for (var i = 0; i < categoryOptions.length; i++) {
            var option = categoryOptions[i];
            optionsField.addSelectOption(option);
        }
        return optionsField
    }



    function onRequest(context) {
        if (context.request.method === 'GET') {

            var itemSearch = search.create({
                type: search.Type.INVENTORY_ITEM,
                columns: [
                    {
                        name: 'internalid',
                        sort: search.Sort.DESC
                    },
                    'name',
                ],
                filters: [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: [4] // Replace with the actual subsidiary ID
                    })
                ],
                sort: {
                    column: 'created',
                    direction: search.Sort.DECENDING
                }
            });
            var resultSet = itemSearch.run();
            var firstResult = resultSet.getRange({
                start: 0,
                end: 1
            });
 
            nameValue = firstResult[0].getValue('name')

            if (firstResult.length > 0) {
                // Log the first result
                log.debug({
                    title: 'Most Recent Item Record',
                    details: nameValue
                });
            } else {
                log.debug({
                    title: 'No results',
                    details: 'No items found.'
                });
            }


            // var skuData = JSON.parse(firstResult[0]);

            // var lastSku = skuData.values.name;

            // var htmlImage = form.addField({
            //     id: 'custpage_htmlfield',
            //     type: serverWidget.FieldType.INLINEHTML,
            //     label: 'HTML Image'
            // });
            // htmlImage.defaultValue = "<p>" + lastSku + "</p>";           

            var form = serverWidget.createForm({
                title: 'Item Entry Form'
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
                id: 'custpage_retail',
                type: serverWidget.FieldType.FLOAT,
                label: 'Retail'
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
                label: 'Location',
            });
            form.addField({
                id: 'custpage_preferredstocklevel',
                type: serverWidget.FieldType.TEXT,
                label: 'Reorder Point'
            });

            filterLockPop(
                form,
                '2082',
                'custpage_class',
                'Product Category',
                'name',
                'internalid'
            );

            form.addSubmitButton({
                label: 'Submit'
            });


            context.response.writePage(form);

        } else if (context.request.method === 'POST') {
            var userInput = {
                itemid: context.request.parameters.custpage_itemid,
                externalid: context.request.parameters.custpage_externalid,
                class: context.request.parameters.custpage_class,
                cost: context.request.parameters.custpage_cost,
                retail: context.request.parameters.custpage_retail,
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