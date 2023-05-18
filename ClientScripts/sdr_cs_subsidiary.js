If(subsidiary == 1) // 1 is the internal id of the subsidiary
{‌
    //do this
}

//https://suiteanswers.custhelp.com/app/answers/detail/a_id/34658/loc/en_US
// For instance, following is a user event script that sets the field value of Memo field on a Sales Order if the transaction subsidiary is 7(internal id of the desired subsidiary)


function aftersubmit(type) // after submit function
{‌
    var recordid = nlapiGetRecordId(); // get the current existing record’s internal id
    var record = nlapiLoadRecord('salesorder', recordid); // load the record
    var subsidiary = record.getFieldValue('subsidiary'); // get the transaction subsidiary for the record
    if (subsidiary == 7) //check if subsidiary equals the desired subsidiary
    {‌
        record.setFieldValue('memo', 'abcd'); //set Memo field = abcd
        nlapiSubmitRecord(record); // submit the record
    }
}