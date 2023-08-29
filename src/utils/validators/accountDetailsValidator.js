function isValidPhoneNumber(phone) {
    // Check if the phone number has the prefix +38
    return /^\+38\d{10}$/.test(phone);
  }

function validateAccountDetails(payload){
    const { first_name, last_name, email, phone } = payload;
    let values = {}

    if(phone){
        if (!isValidPhoneNumber(phone)) return {status : false};
        values.phone = phone
    }
    
    
    if(first_name){
        if (typeof first_name !== 'string') return {status : false};
        values.first_name = first_name
    }


    if(last_name){
        if (typeof last_name !== 'string') return {status : false};
        values.last_name = last_name
    }

    if(email){
        if ( !/^\S+@\S+\.\S+$/.test(email)) return {status : false};
        values.email = email
    }

    return {values, status : true};
    
}

module.exports = validateAccountDetails