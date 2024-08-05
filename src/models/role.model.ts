import { Model, RelationMappings } from 'objection';



interface Role {
    id: number;
    role : string;
    right_to_edit: boolean;
    right_to_delete: boolean;
    right_to_create: boolean;
    superuser: boolean;
}

class Role extends Model implements Role{
    static get tableName(): string {
        return 'roles';
    }



}

export default Role;
