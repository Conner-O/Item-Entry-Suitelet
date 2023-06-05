/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define(['N/record', 'N/log'],
  function (record, log) {
    function afterSubmit(context) { 
      // Get the record object from the contlincoln navigatorext object
      var customer = context.newRecord;

      // Get the values of the relevant fields from the customer object
      var customerId = customer.getValue('entityid');
      var customerEmail = customer.getValue('email');
      var salesRepName = customer.getText('salesrep');
      var couponCode = customer.getValue('custentity_sdr_coupon_code');

      // Create an audit log of the customer information
      var auditLog = 'Customer ID: ' + customerId + '\n' +
        'Customer Email: ' + customerEmail + '\n' +
        'Sales Rep Name: ' + salesRepName + '\n' +
        'Coupon Code: ' + couponCode + '\n';


        
      // Log the audit information to the SuiteScript log
      log.audit({
        title: 'Customer Information Audit Trail',
        details: auditLog
      });
    }

    return { //enter point, this is the point in which the program executes
      afterSubmit: afterSubmit
      //log.debug('Something');
    };
  });
