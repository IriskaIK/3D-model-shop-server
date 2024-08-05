import {Model, RelationMappings} from 'objection';
import bcrypt from "bcryptjs";
import Role from "./role.model";

import {Admin as IAdmin} from '../types/AuthenticatedUser'

interface Admin {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role_id: number;
    role : Role;
}

class Admin extends Model implements IAdmin{
    type: 'admin' = 'admin';
    static get tableName(): string {
        return 'admins';
    }

    async $beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    verifyPassword(password: string) {
        return bcrypt.compare(password, this.password);
    }

    static get relationMappings(): RelationMappings {
        return {

            shipping_address: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: 'admins.role_id',
                    to: 'roles.id'
                }
            },
        };
    }

}

export default Admin;
