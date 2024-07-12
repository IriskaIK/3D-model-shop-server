export interface IOrderBodyRequest{
    recipient :{
        first_name : string,
        last_name : string,
        phone : string,
    },
    shipping_address : {
        region : string,
        city : string,
        postOffice : string,
    }
}