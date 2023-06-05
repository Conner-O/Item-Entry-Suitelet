/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/record'], function (serverWidget, record) {
    function onRequest(context) {
      if (context.request.method === 'GET') {
        var form = serverWidget.createForm({
          title: 'Item Creation Form'
        });
  
        var itemNameField = form.addField({
          id: 'custpage_itemname',
          type: serverWidget.FieldType.TEXT,
          label: 'Item Name'
        });
  
        var departmentField = form.addField({
          id: 'custpage_department',
          type: serverWidget.FieldType.SELECT,
          source: 'department',
          label: 'Department'
        });
  
        form.addSubmitButton({
          label: 'Create Item'
        });
  
        context.response.writePage(form);
      } else {
        var itemName = context.request.parameters.custpage_itemname;
        var departmentId = context.request.parameters.custpage_department;
  
        // Create the item record
        var itemRecord = record.create({
          type: record.Type.INVENTORY_ITEM, // Set the record type to Inventory Item
          isDynamic: true // Set isDynamic to true for dynamic record creation
        });
  
        // Set the field values for the item record
        itemRecord.setValue({
          fieldId: 'itemid',
          value: itemName
        });
  
        itemRecord.setValue({
          fieldId: 'department',
          value: departmentId
        });
  
        // Save the item record
        var itemId = itemRecord.save();
  
        context.response.write('Item created successfully. Item ID: ' + itemId);
      }
    }
  
    return {
      onRequest: onRequest
    };
  });
  