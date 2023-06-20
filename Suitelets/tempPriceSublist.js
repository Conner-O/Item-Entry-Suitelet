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

        