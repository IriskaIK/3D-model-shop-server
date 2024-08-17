import User from "@/models/user.model";

export interface IManyUserResponse {
    users : User[],
    offset : number
}
