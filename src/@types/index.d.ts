interface IBaseMeta {
  confirmedAt: Date | null;
  createdAt: Date;
  deletedAt: Date | null;
  lastActivity: Date;
  updatedAt: Date;
}

interface IUser extends IBaseMeta {
  _id: string | import('mongodb').ObjectId;
  email: string;
  name: string;
  password: string;
}
