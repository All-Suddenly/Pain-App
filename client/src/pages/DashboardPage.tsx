import { useEffect, useState } from 'react';

export function DashboardPage() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:4000/api/trackers')
      .then((res) => res.json()) // Success
      .then((data) => setData(data)) // Converted JSON
      .catch((error) => setError(error)) // Error
      .finally(() => setLoading(false)); // Finished
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading && <div>LOADING</div>}
      {Boolean(error) && <div className="text-red-500">{error?.message}</div>}
      <div>{data}</div>
    </div>
  );
}
