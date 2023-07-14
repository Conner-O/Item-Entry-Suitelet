/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * A script made to simplify the item entry process
 */


define(['N/search', 'N/ui/serverWidget', 'N/record'], function (search, serverWidget, record) {

    function createRecord(userInput, nameValue) {

        nameValue = nameValue.toString();

        log.debug({
            title: 'Decimal Check',
            details: nameValue
        });

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
            value: nameValue
        });
        inventoryItem.setValue({
            fieldId: 'externalid',
            value: "CS-" + nameValue
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
            value: userInput.displayname
        });
        inventoryItem.setValue({
            fieldId: 'storedisplayname',
            value: userInput.displayname
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
            value: nameValue
        });
        inventoryItem.setValue({
            fieldId: 'displayname',
            value: userInput.displayname
        });
        inventoryItem.setValue({
            fieldId: 'vendorname',
            value: nameValue + " " + userInput.displayname + " " + userInput.mpn
        }); // this needs updating once autogenerating sku is setup
        inventoryItem.setValue({
            fieldId: 'custitem_bkst_backstock1',
            value: userInput.custitem_bkst_backstock1
        });
        inventoryItem.setValue({ //WRONG ID?
            fieldId: 'preferredstocklevel',
            value: userInput.preferredstocklevel
        });


        // inventoryItem.selectLine({
        //     sublistId: 'locations',
        //     line: 1
        // });

        // inventoryItem.setCurrentMatrixSublistValue({
        //     sublistId: 'locations',
        //     fieldId: 'preferredstocklevel',
        //     column: 0,
        //     value: userInput.preferredstocklevel,
        //     ignoreFieldChange: true,
        //     fireSlavingSync: true
        // });
        // inventoryItem.commitLine({
        //     sublistId: 'locations'
        // });

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
            value: false
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
            fieldId: 'vendorcode',
            value: nameValue + " " + userInput.displayname + " " + userInput.mpn
        });
        inventoryItem.setCurrentSublistValue({
            sublistId: 'itemvendor',
            fieldId: 'vendorname',
            value: nameValue + " " + userInput.displayname + " " + userInput.mpn
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
        }); // its own helper cause they all share the sublistId
        inventoryItem.commitLine({
            sublistId: 'itemvendor'
        });

        var recordId = inventoryItem.save();

        if (recordId) {
            log.debug('Record Created', 'Record ID: ' + nameValue);
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
        var nameValue;

        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'Item Entry Form'
            });

            var cost = form.addField({
                id: 'custpage_cost',
                type: serverWidget.FieldType.FLOAT,
                label: 'Cost'
            });


            var retail = form.addField({
                id: 'custpage_retail',
                type: serverWidget.FieldType.FLOAT,
                label: 'Retail'
            });

            var importjquery = form.addField({
                id: 'custpage_htmlfield',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'HTML Image'
            });
            importjquery.defaultValue = "<script src=\"https://code.jquery.com/jquery-latest.min.js\"></script>"

            $(document).ready(function() {
                var costCheck = context.request.parameters.custpage_cost;
              
                // Watch for changes in the costCheck variable
                $(document).on('change', 'input[name="custpage_cost"]', function() {
                    var markup = costCheck * .23 + costCheck;
                    retail.defaultValue = markup;
                });
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
                type: serverWidget.FieldType.FLOAT,
                label: 'Reorder Point'
            }); // helper that returns a form

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

            var itemSearch = search.create({
                type: search.Type.INVENTORY_ITEM, // Adjust the search type as per your requirement
                columns: [
                    {
                        name: 'internalid',
                        sort: search.Sort.DESC
                    },
                    'storedescription', 'name', 'price', 'mpn', 'class', 'preferredstocklevel', 'custitem_bkst_backstock1'
                ],
                filters: [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: [4] // Replace with the actual subsidiary ID
                    }),
                    search.createFilter({
                        name: 'name',
                        operator: search.Operator.DOESNOTSTARTWITH,
                        values: "CSSO"
                    })
                ], // Add any additional filters if required
                sort: [{
                    column: 'created',
                    direction: search.Sort.DECENDING
                }],
                pageSize: 20
            });

            var searchResults = itemSearch.run().getRange({
                start: 0,
                end: 19
            });


            var tableHtml = '<div class="style-menu uif350 uif351 n-w-header__navigation" style="font-weight: bold; color: white; font-size: 18px; max-width: 100%; float:left;">Last Entered SKUs</div><table style="border-collapse: collapse; width: 100%;">';
            tableHtml += '<tr style="background-color: #f2f2f2; text-align: left;">';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">View/Edit</th>';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">SKU</th>';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">Item Description</th>';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">MPN</th>';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">Product Category</th>';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">Location</th>';
            tableHtml += '<th style="padding: 8px; border: 1px solid #ddd;">Reorder Point</th>';
            tableHtml += '</tr>';
            //preferredstocklevel

            searchResults.forEach(function (result, index) {
                var internalId = result.getValue('internalId');
                var viewUrl = '/app/common/item/item.nl?id=' + internalId + '&e=T';
                var internalId = result.getValue('name');
                var itemName = result.getValue('storedescription');
                var mpn = result.getValue('mpn');
                var productCategory = result.getText('class');
                var location = result.getText('custitem_bkst_backstock1');
                var reorder = result.getValue('preferredstocklevel');
                var rowColor = index % 2 === 0 ? '#ffffff' : '#f2f2f2';

                tableHtml +=
                    '<tr style="background-color: ' + rowColor + ';">' +
                    '<td><a href="' + viewUrl + '">Edit</a></td>' +
                    '<td>' + internalId + '</td>' +
                    '<td>' + itemName + '</td>' +
                    '<td>' + mpn + '</td>' +
                    '<td>' + productCategory + '</td>' +
                    '<td>' + location + '</td>' +
                    '<td>' + reorder + '</td>' +
                    '</tr>';
            });

            tableHtml += '</table>';

            var htmlField = form.addField({
                id: 'custpage_html',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'HTML Content',
                container: 'Test'
            });

            var htmlContent = tableHtml;

            htmlField.defaultValue = htmlContent;

            context.response.writePage(form);

        } else if (context.request.method === 'POST') {

            context.response.write('<script>window.location.href = "/app/site/hosting/scriptlet.nl?script=868&deploy=2";</script>'); //Change in prod


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
                    }),
                    search.createFilter({
                        name: 'name',
                        operator: search.Operator.DOESNOTSTARTWITH,
                        values: "CSSO"
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

            if (firstResult.length > 0) {
                log.debug({
                    title: 'Most Recent Item Record',
                    details: nameValue
                });
                nameValue = parseInt(firstResult[0].getValue('name'), 10) + 1;

            } else {
                log.debug({
                    title: 'No results',
                    details: 'No items found.'
                });
            }

            var userInput = {
                class: context.request.parameters.custpage_class,
                cost: context.request.parameters.custpage_cost,
                retail: context.request.parameters.custpage_retail,
                storedisplayname: context.request.parameters.custpage_storedisplayname,
                storedescription: context.request.parameters.custpage_storedescription,
                vendor: context.request.parameters.custpage_vendor,
                mpn: context.request.parameters.custpage_mpn,
                displayname: context.request.parameters.custpage_displayname,
                custitem_bkst_backstock1: context.request.parameters.custpage_custitem_bkst_backstock1,
                preferredstocklevel: context.request.parameters.custpage_preferredstocklevel
            };


            createRecord(userInput, nameValue);

        }

    }

    return {
        onRequest: onRequest
    };


});