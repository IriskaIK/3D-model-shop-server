
function validateDelivery(payload){
    const { region, city, postOffice} = payload;
    let values = {}

    if(region){
        if (typeof region !== 'string') return {status : false};
        values.region = region
    }
    
    
    if(city){
        if (typeof city !== 'string') return {status : false};
        values.city = city
    }


    if(postOffice){
        if (typeof postOffice !== 'string') return {status : false};
        values.postOffice = postOffice
    }

    return {values, status : true};
    
}

module.exports = validateDelivery