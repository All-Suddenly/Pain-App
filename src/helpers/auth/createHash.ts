import crypto from 'crypto';

export function createHashFromToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
