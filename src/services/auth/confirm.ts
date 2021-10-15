import { Db } from 'mongodb';

export async function confirm(token: string, database: Db) {
  return Promise.resolve({} as IUser);
}
