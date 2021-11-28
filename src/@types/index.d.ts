// Base Types
interface IBaseMeta {
  _id?: import('mongodb').ObjectId;
  createdAt: Date;
  deletedAt?: Date | null;
  updatedAt?: Date;
}

// User
interface IUser extends IBaseMeta {
  email: string;
  hashedPassword: string;
  name: string;

  // User Meta
  confirmedAt?: Date | null;
  lastActivity?: Date;
}

// Token
const enum TokenType {
  RESET = 'reset',
  CONFIRM = 'confirm',
}

interface IToken extends IBaseMeta {
  hashedToken: string;
  type: TokenType;
  userId: import('mongodb').ObjectId;
}

// Utils
type CopyWithPartial<T, K extends keyof T> = Omit<T, K> & Partial<T>;
