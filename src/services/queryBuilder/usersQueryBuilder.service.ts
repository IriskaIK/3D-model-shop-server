import { OrderByDirection } from "objection";
import User from "../../models/user.model";
import { IManyUsersRequestBody } from "../../types/admin/users/request.types";
import { QueryBuilderBase } from "./queryBuilderBase";

export class UserQueryBuilder extends QueryBuilderBase<User> {
    private _phoneNumber: string | undefined = undefined;
    private _email: string | undefined = undefined;
    private _region: string | undefined = undefined;
    private _city: string | undefined = undefined;
    private _postOffice: string | undefined = undefined;

    constructor(queryParams: IManyUsersRequestBody) {
        super(User, queryParams);
        this.query = this.query.withGraphFetched("shipping_address")
        this.setUserQueryParams(queryParams);
    }

    setUserQueryParams(queryParams: IManyUsersRequestBody): void {
        if (queryParams.phoneNumber !== undefined) {
            this._phoneNumber = queryParams.phoneNumber;
        }
        if (queryParams.email !== undefined) {
            this._email = queryParams.email;
        }
        if (queryParams.region !== undefined) {
            this._region = queryParams.region;
        }
        if (queryParams.city !== undefined) {
            this._city = queryParams.city;
        }
        if (queryParams.postOffice !== undefined) {
            this._postOffice = queryParams.postOffice;
        }
    }

    private filterByPhoneNumber(): void {
        if (this._phoneNumber !== undefined) {
            this.query = this.query.where('phone', this._phoneNumber);
        }
    }

    private filterByEmail(): void {
        if (this._email !== undefined) {
            this.query = this.query.where('email', this._email);
        }
    }

    private filterByShippingAddress(): void {
        if (this._city !== undefined || this._region !== undefined || this._postOffice !== undefined) {
            this.query = this.query.withGraphJoined('shipping_address');

            if (this._city !== undefined) {
                this.query = this.query.where('shipping_address.city', this._city);
            }
            if (this._region !== undefined) {
                this.query = this.query.where('shipping_address.region', this._region);
            }
            if (this._postOffice !== undefined) {
                this.query = this.query.where('shipping_address.postOffice', this._postOffice);
            }
        }
    }

    async getProductById(id: number){
        try {
            return await this.query.findOne('id', "=", id)
                .withGraphFetched('shipping_address')
                .withGraphFetched('wishlist')
                .withGraphFetched('cart');
        } catch (error) {
            throw new Error("Error fetching user");
        }
    }

    protected applyFilters(): void {
        super.applyFilters();
        this.filterByPhoneNumber();
        this.filterByEmail();
        this.filterByShippingAddress();
    }
}
