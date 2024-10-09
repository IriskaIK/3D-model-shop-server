
export interface IManyUsersRequestBody {
    offset?: number | undefined;
    phoneNumber? : string | undefined;
    email? : string | undefined;
    postOffice? : number | undefined;
    city? : number | undefined;
    region? : number | undefined;

}

export interface IUserRequestParam{
    id : number;
}
