import { Collection } from 'mongodb';

export async function getUserByEmail(email: string, collection: Collection) {
  return collection.findOne({ email }) as Promise<IUser>;
}

export async function createUser(user: IUser, collection: Collection) {
  const { email, name, password } = user;

  const newUser = await collection.insertOne({
    name,
    email,
    password,
  });

  return newUser.insertedId;
}
