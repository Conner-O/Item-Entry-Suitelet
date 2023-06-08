/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/search', 'N/ui/serverWidget', 'N/record'], function (search, serverWidget, record) {

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
      var savedSearchId = '2082'; // Replace with your actual saved search internal ID
      var searchObj = search.load({
        id: savedSearchId
      });

      var productCategoryOptions = [];
      searchObj.run().each(function (result) {
        var optionValue = result.getValue({
          name: 'NAME' // Replace with the field name from the saved search that contains the product category values
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

      productCategoryField.addSelectOptions({
        items: productCategoryOptions
      });

      // Product Category cannot be populated using source, you must run a saved search and use that to populate the list for this
      var itemNameField = form.addField({
        id: 'custpage_itemid',
        type: serverWidget.FieldType.TEXT,
        label: 'Item Name',
        isMandatory: true
      });

      var categoryField = form.addField({
        id: 'custpage_subsidiary',
        source: 'subsidiary',
        type: serverWidget.FieldType.SELECT,
        label: 'Subsidiary',
        defaultSelected: 'Roll-Up ISU : Logistics and Support Services : Central Stores',
        isMandatory: true
      });

      var brandField = form.addField({
        id: 'custpage_custitem_isu_bookstore_brand',
        type: serverWidget.FieldType.TEXT,
        label: 'Brand',
        isMandatory: true
      });
      brandField.defaultValue = 'None/Unknown';
      log.debug('Brand Field:', brandField);

      var departmentField = form.addField({
        id: 'custpage_department',
        type: serverWidget.FieldType.SELECT,
        source: 'department',
        label: 'Department',
        defaultValue: 'LSS - Central Stores Inventory',
        isMandatory: true
      });

      log.debug('Department Field:', departmentField);

      form.addSubmitButton({
        label: 'Create Item'
      });

      context.response.writePage(form);
    } else {
      // Handle form submission
      var itemName = context.request.parameters.custpage_itemid;
      var category = context.request.parameters.custpage_class;
      var brand = context.request.parameters.custpage_custitem_isu_bookstore_brand;
      var department = context.request.parameters.custpage_department;

      // Create the item record
      var item = record.create({
        type: record.Type.INVENTORY_ITEM,
        isDynamic: true
      });

      item.setValue({
        fieldId: 'itemid',
        value: itemName
      });

      item.setValue({
        fieldId: 'class',
        value: category
      });

      item.setValue({
        fieldId: 'custitem_isu_bookstore_brand',
        value: brand
      });

      item.setValue({
        fieldId: 'department',
        value: department
      });

      // Save the item record
      var itemId = item.save();

      // Redirect to the created item record
      context.response.sendRedirect({
        type: 'ITEM',
        identifier: itemId
      });
    }
  }

  return {
    onRequest: onRequest
  };
});
