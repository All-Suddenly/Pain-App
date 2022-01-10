import { Request } from 'express';
import { Db } from 'mongodb';

export function getDatabaseFromRequest(req: Request) {
  return req.app.get('db');
}

export function getCollection(name: string, db: Db) {
  return db.collection(name);
}
