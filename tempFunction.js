function markupCalc(form) {
    var userInputCost = context.request.parameters.custpage_cost;
    retail.defaultValue =  userInputCost * .23;
}