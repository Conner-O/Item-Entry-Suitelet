function findLastItem(savedSearchId, productCatId, label, name, internalId) {
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
    var counter = 0;
    var categoryOptions = [];

    while (counter > 1) {
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
            counter ++;

            return true;
        });
    }
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
