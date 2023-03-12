import { autoserializeAs } from 'cerialize';
import { Role } from 'src/modules/users/entities/users.entity';

export class TokenPayload {
  @autoserializeAs('id')
  id!: string;

  @autoserializeAs('email')
  email!: string;

  @autoserializeAs('name')
  name?: string;

  @autoserializeAs('role')
  role!: Role;
}
