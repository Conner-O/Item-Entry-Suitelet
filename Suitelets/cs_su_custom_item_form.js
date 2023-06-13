/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define([ 'N/query','N/search', 'N/ui/serverWidget', 'N/record'], function (query, search, serverWidget, record) {

  function onRequest(context) {
    if (context.request.method === 'GET') {
      var form = serverWidget.createForm({
        title: 'Item Creation Form'
      });

      var productCategoryField = form.addField({
        id: 'custpage_class',
        type: serverWidget.FieldType.SELECT, // Change the field type to SELECT
        label: 'Product Category',
        isMandatory: true
      });

      // Load the saved search to populate the product category field
      var productSavedSearchId = '2082'; // Replace with your actual saved search internal ID
      var productSearchObj = search.load({
        id: productSavedSearchId
      });

      var productCategoryOptions = [];
      productSearchObj.run().each(function (result) {
        var optionValue = result.getValue({
          name: 'Name' // Replace with the field name from the saved search that contains the product category values
        });

        productCategoryOptions.push({
          value: optionValue,
          text: optionValue
        });

        return true;
      });

      productCategoryField.addSelectOption({
        value: '',
        text: ''
      });

      productCategoryOptions.forEach(function(option) {
        productCategoryField.addSelectOption(option);
      });

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
    } else {
      // Handle form submission
      var itemName = context.request.parameters.custpage_itemid;
      var category = context.request.parameters.custpage_class;
      // var subsidiary = context.request.parameters.custpage_subsidiary;
      // var custitem_isu_bookstore_brand = context.request.parameters.custpage_custitem_isu_bookstore_brand;
      // var department = context.request.parameters.custpage_department;
      // var preferredlocation = context.request.parameters.custpage_preferredlocation;


      var sql =
        "SELECT " +
        "(SELECT id FROM inventoryitem WHERE name = '?') as itemId, " +
        "(SELECT id FROM class WHERE name = '?') as categoryId " // +
        // "(SELECT id FROM custitem_isu_bookstore_brand WHERE name = '?') as custitem_isu_bookstore_brandId, " +
        // "(SELECT id FROM preferredlocation WHERE name = '?') as preferredlocationId, " +
        // "(SELECT id FROM subsidiary WHERE name = '?') as subsidiaryId, " +
        // "(SELECT id FROM department WHERE name = '?') as departmentId, ";
      var resultSet = query.runSuiteQL({
          query: sql,
          params: [itemName, category] //, custitem_isu_bookstore_brand, preferredlocation, subsidiary, department]
      }); 


      console.log(resultSet.results);

      // // Create the item record
      // var item = record.create({
      //   type: record.Type.INVENTORY_ITEM,
      //   isDynamic: true
      // });

      // item.setValue({
      //   fieldId: 'subsidiary',
      //   value: '4' //Central Stores
      // });

      // item.setValue({
      //   fieldId: 'itemid',
      //   value: itemName
      // });

      // item.setValue({
      //   fieldId: 'class',
      //   value: '309' //Random Test Product Category
      // });

      // item.setValue({
      //   fieldId: 'custitem_isu_bookstore_brand',
      //   value: '126' //None/Unknown
      // });
      
      // item.setValue({
      //   fieldId: 'department',
      //   value: '101' //LSS - Central Stores Inventory
      // });

      // // item.setValue({
      // //   fieldId: 'custitem_nsts_csic_web_oos_behavior',
      // //   value: 'Allow back orders but display out-of-stock message'
      // // });

      // item.setValue({
      //   fieldId: 'preferredlocation',
      //   value: '30' //Central Stores - General Services Bldg
      // });

      // item.setValue({
      //   fieldId: 'cogsaccount',
      //   value: '243' //5001 Cost of Goods Sold : COGS
      // });

      // item.setValue({
      //   fieldId: 'assetaccount',
      //   value: '216' //1220 Inventory : Finished Goods Inventory
      // });

      // item.setValue({
      //   fieldId: 'incomeaccount',
      //   value: '523' //4010 Income : Revenue
      // });

      // item.setValue({
      //   fieldId: 'gainlossaccount',
      //   value: '814' //3210 Retained Earnings
      // });

      // item.setValue({
      //   fieldId: 'costingmethod',
      //   value: 'Average'
      // });



      // Save the item record
      // var itemId = item.save();

      // Redirect to the created item record
      context.response.sendRedirect({
        type: record.Type.INVENTORY_ITEM,
        identifier: itemId
      });
    }
  }

  return {
    onRequest: onRequest
  };
});
