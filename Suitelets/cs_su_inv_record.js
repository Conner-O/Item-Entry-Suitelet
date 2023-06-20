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



          // Check the features enabled in the account. See Pricing Sublist Feature Dependencies for 
// details on why this is important.
var multiCurrency = runtime.isFeatureInEffect({
    feature: 'MULTICURRENCY'
});
var multiPrice = runtime.isFeatureInEffect({
    feature: 'MULTIPRICE'
});
var quantityPricing = runtime.isFeatureInEffect({
    feature: 'QUANTITYPRICING'
});
 
// Set the name of the Price sublist based on which features are enabled and currency type.
// See Pricing Sublist Internal IDs for details on why this is important.
var priceID;
var currencyID = 'USD';
 
// Set the ID for the sublist and the price field. Note that if all pricing-related features
// are disabled, you will set the price in the rate field. See Pricing Sublist Feature Dependencies
// for details.
if (multiCurrency === true && multiPrice === false && quantityPricing === false)
    priceID = 'rate';
else {
    priceID = 'price';
      if (multiCurrency === true){
          var internalId = search.create ({
            type: search.Type.CURRENCY,
            filters: [{
                name: 'symbol',
                operator: search.Operator.CONTAINS,
                values: currencyID
            }],
        });
        priceId = priceID + internalId;
    }
}
 
// Verify that the item is using a Quantity Schedule
// If a Quantity Schedule is used, only the base price needs to be set.
// All other prices will be set according to the schedule.
var itemRecord = record.load ({
    type: record.Type.INVENTORY_ITEM,
    id: itemId
});
var qtyPriceSchedule = itemRecord.getValue({
    fieldId: 'quantitypricingschedule'
});
 
// Set the base price
var basePrice = 100;
 
// You must select, set, and then commit the sublist line you want to change.
itemRecord.selectLine({
    sublistId: priceID,
    line: 1
}); 
itemRecord.setCurrentMatrixSublistValue({
    sublistId: priceID,
    fieldId: 'price',
    column: 1,
    value: basePrice
});
itemRecord.commitLine({
    sublistId: priceID
});
 
// Get the number of columns in the price matrix
// Each column represents a different quantity level
columnCount = itemRecord.getMatrixHeaderCount({
    sublistId: priceID,
    fieldId: 'price'
});
 
// Set the base price in each quantity of the price matrix for a specific sublist, for example, currency
 
   // Set the base price in each quantity
   for (var j = 1; j <= columnCount; j++){
    // Set the price for this cell of the matrix
      itemRecord.selectLine({
        sublistId: priceID,
        line: 1
    }); 
      itemRecord.setCurrentMatrixSublistValue({
        sublistId: priceID,
        fieldId: 'price',
        column: j,
        value: currencyBasePrice
    });
      itemRecord.commitLine({
        sublistId: priceID
    });
   }
 
// Display the full price matrix for a specific currency as an HTML table
 
// get the size of the matrix
var quantityLevels = itemRecord.getMatrixHeaderCount({
    sublistId: priceID,
    fieldId: 'price'
});
var priceLevels = itemRecord.getLineCount({
    sublistId: priceID
});
var priceName = "";
var priceNameField = 'pricelevel';
var itemPrice = 0;
var fieldObj = null;

// create an xml table to present the results
var strName = '<table>';
if (quantityLevels > 1){
    strName += '<tr>';
      // write out the quantity levels as the first row
    for (var j = 1; j <= quantityLevels; j++){
        strName += '<td>';
        fieldObj = itemRecord.getMatrixHeaderField( {
            sublistId: priceID,
            fieldId: 'price',
            column: j
        });
        if (fieldObj != null){
            strName += fieldObj.getLabel();
        }
        strName += j;
        strName += '</td>';
        strName += '<td>';

        // this matrix API obtains the value of the Quantity level
        strName += itemRecord.getMatrixHeaderValue({
            sublistId: priceID,
            fieldId: 'price',
            column: j
        });
        strName += '</td>';   
    }
    strName += '</tr>';
}

// loop through the matrix one row at a time
for (var i = 1; i <= priceLevels; i++){
    strName += '<tr>';
    // loop through each column of the matrix
    for (j = 1; j <= quantityLevels; j++){
        // get the price for this cell of the matrix
        itemPrice = itemRecord.getLineItemMatrixValue( priceID, 'price', i, j);
        // Get the name of the price level. Note: you will use a standard
        // sublist API and not a matrix API for this.
        priceName = itemRecord.getSublistText({
            sublistId: priceID,
            fieldId: priceNameField,
            line: i
        });
         
        strName += '<td>';
        strName += priceName;
        strName += '</td>';
        strName += '<td>';
        strName += itemPrice;
        strName += '</td>';
    }
    strName += '</tr>';
}
strName += '</table>'; 

        





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