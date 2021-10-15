import { Collection } from 'mongodb';

export async function getUserByEmail(email: string, collection: Collection) {
  return collection.findOne({ email }) as Promise<IUser>;
}

function createMeta() {
  return {
    confirmedAt: null,
    createdAt: new Date(),
    deletedAt: null,
    lastActivity: new Date(),
    updatedAt: new Date(),
  };
}

export async function createUser(user: Partial<IUser>, collection: Collection) {
  const { email, name, password } = user;

  const newUser = await collection.insertOne({
    name,
    email,
    password,
    ...createMeta(),
  });

  return newUser.insertedId;
}
