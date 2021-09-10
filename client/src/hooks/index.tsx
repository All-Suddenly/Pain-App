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

export function useLoginMutation(
  options?: UseMutationOptions<IFetchResults, Error, string>,
) {
  return useMutation<IFetchResults, Error, string>((email) => {
    return fetch(config.apiHost + '/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      method: 'POST',
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
  }, options);
}
