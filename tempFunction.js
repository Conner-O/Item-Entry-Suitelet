
function filterLockPop(form) {
    var optionsField = form.addField({
        id: productCatId,
        type: serverWidget.FieldType.SELECT,
        label: label,
        isMandatory: true
    });

    var itemSearch = search.create({
        type: search.Type.COMMERCE_CATEGORY, // Adjust the search type as per your requirement
        columns: [
            {
                name: 'internalid',
                sort: search.Sort.DESC
            },
            'storedescription', 'name'
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
        ]
    });

    var categoryOptions = [];
    itemSearch.run().each(function (result) {

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

filterLockPop(
    form,
    '2082',
    'custpage_class',
    'Product Category',
    'name',
    'internalid'
);

// function filterLockPop(form, savedSearchId, productCatId, label, name, internalId) {
//     var optionsField = form.addField({
//         id: productCatId,
//         type: serverWidget.FieldType.SELECT,
//         label: label,
//         isMandatory: true
//     });

//     var searchObj = search.load({
//         id: savedSearchId
//     });

//     var categoryOptions = [];
//     searchObj.run().each(function (result) {

//         var optionText = result.getValue({
//             name: name,
//         });
//         var optionValue = result.getValue({
//             name: internalId,
//         });
//         categoryOptions.push({
//             value: optionValue,
//             text: optionText,
//         });

//         return true;
//     });

//     optionsField.addSelectOption({
//         value: '',
//         text: '',
//     });

//     for (var i = 0; i < categoryOptions.length; i++) {
//         var option = categoryOptions[i];
//         optionsField.addSelectOption(option);
//     }
//     return optionsField
// }