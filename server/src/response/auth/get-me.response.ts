import { autoserializeAs } from 'cerialize';

export class GetMeResponse {
  @autoserializeAs('id')
  id!: string;
  @autoserializeAs('email')
  email!: string;
  @autoserializeAs('name')
  name?: string;
  @autoserializeAs('avatar')
  avatar?: string;
  @autoserializeAs('createdAt')
  createdAt!: Date;
  @autoserializeAs('updatedAt')
  updatedAt!: Date;
}
