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
          type: serverWidget.FieldType.TEXT, // Change the field type to SELECT
          label: 'Product Category',
          isMandatory: true
        });
  
        // Product Category cannot be populated using source, you must run a saved search and use that to populate the list for this
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

        // Create the item record
        var inventoryItem = record.create({
            type: record.Type.INVENTORY_ITEM,
            isDynamic: true
        });
  
        inventoryItem.setValue({
            fieldId: 'subsidiary',
            value: 4
        });

        // inventoryItem.setValue({
        //     fieldId: 'itemid',
        //     value: itemName
        // });

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

        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'pagetitle',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'storedisplayname',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'storedescription',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'featureddescription',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'vendorname',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'mpn',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'upccode',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'custitem_pos_code_custom_label',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'vendorname',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'displayname',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE
        //     fieldId: 'custitem_bkst_backstock1',
        //     value: 101
        // });
        // inventoryItem.setValue({ //VARIABLE (Enter reorder qty)
        //     fieldId: 'preferredstocklevel',
        //     value: 101
        // });
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
  
        // Save the item record
        var itemId = inventoryItem.save();
  
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