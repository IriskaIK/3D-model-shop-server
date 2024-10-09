
export interface IAccountDetailsRequestBody {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}
export interface IDeliveryDetailsRequestBody {
    region_id: number;
    city_id: number;
    postOffice_id: number;
}
