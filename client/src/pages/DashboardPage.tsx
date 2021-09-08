import { useQuery } from 'react-query';

import { config } from '../config/config';

function useGetUsers() {
  return useQuery<void, Error, any[]>('users', () => {
    return fetch(config.apiHost + '/users').then((res) => res.json());
  });
}

export function DashboardPage() {
  const { isLoading, error, data } = useGetUsers();

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading && <div>LOADING</div>}
      {Boolean(error) && <div className="text-red-500">{error?.message}</div>}
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
