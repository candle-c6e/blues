import { Deserialize } from 'cerialize';

export const toInstanct = <T>(data: any, cnstr: new () => T): T => {
  return Deserialize(data, cnstr);
};
