import { useMutation, UseMutationOptions } from 'react-query';

import { config } from '../config/config';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IFetchResults {
  data?: IUser;
  error?: any;
}

interface IParams {
  email: string;
  password: string;
}

export function useLoginMutation(
  options?: UseMutationOptions<IFetchResults, Error, IParams>,
) {
  return useMutation<IFetchResults, Error, IParams>(({ email, password }) => {
    return fetch(config.apiHost + '/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      method: 'POST',
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
  }, options);
}
