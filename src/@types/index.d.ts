interface IBaseMeta {
  _id?: string | import('mongodb').ObjectId;
  createdAt: Date;
  deletedAt?: Date | null;
  updatedAt?: Date;
}

interface IUser extends IBaseMeta {
  email: string;
  name: string;
  password: string;

  // User Meta
  confirmedAt: Date | null;
  lastActivity: Date;
}

interface IToken extends IBaseMeta {
  token: string;
  userId: string;
}

// Utils
type CopyWithPartial<T, K extends keyof T> = Omit<T, K> & Partial<T>;
