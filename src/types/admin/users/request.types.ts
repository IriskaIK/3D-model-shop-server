
export interface IManyUsersRequestBody {
    offset?: number | undefined;
    id? : number | undefined;
    phoneNumber? : string | undefined;
    email? : string | undefined;
    postOffice? : string | undefined;
    city? : string | undefined;
    region? : string | undefined;
}

export interface IUserRequestParam{
    id : number;
}