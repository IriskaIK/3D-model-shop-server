export interface IOrderBodyRequest{
    recipient :{
        first_name : string,
        last_name : string,
        phone : string,
    },
    shipping_address : {
        region_id : number,
        city_id : number,
        postOffice_id : number,
    }
}