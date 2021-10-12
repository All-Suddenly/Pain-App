import { addMinutes } from 'date-fns';
import jsonwebtoken from 'jsonwebtoken';

import { config } from '../../config';
import { getUnixTimestamp } from '../date';

export async function generateToken(user: IUser, pid?: string) {
  return jsonwebtoken.sign(
    {
      // User Info
      id: String(user._id),
      email: user.email,
      name: user.name,

      // Token Info
      exp: getUnixTimestamp(addMinutes(new Date(), config.jwt.expiresIn)),
      iat: getUnixTimestamp(),
      pid: pid || '',
    },
    config.jwt.secret,
  );
}
