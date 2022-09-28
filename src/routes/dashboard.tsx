import { QueryClient, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import Table from '../components/Table';
import { getAllMedicine } from '../service';

export const loader = (queryClient: QueryClient) => {
  return async () => {
    const query = getAllMedicine();
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
};

const Dashboard = () => {
  const { data } = useQuery(getAllMedicine());

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white/30 h-16 w-full shadow fixed top-0">
        <nav className="flex w-full items-center h-full px-4 py-2">
          <Link
            to="/dashboard"
            className="font-bold text-xl text-slate-700 hove:text-slate-800 hover:cursor-pointer"
          >
            Home
          </Link>
        </nav>
      </header>

      <main className="pt-32 container mx-auto">
        <div className="flex justify-end px-4 sm:px:0">
          <Link to="/medicine/create" className="button">
            Create
          </Link>
        </div>
        {data?.content ? <Table data={data.content} /> : null}
      </main>
    </div>
  );
};

export default Dashboard;
