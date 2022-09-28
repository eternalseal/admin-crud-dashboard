import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@fontsource/inter/variable.css';
import './index.css';
import MedicineLayout from './layout/medicine.layout';
import Create from './routes/create';
import Dashboard, { loader as dashBoardLoader } from './routes/dashboard';
import Edit, { loader as editLoader } from './routes/edit';
import ErrorPage from './routes/error-page';
import Root from './routes/root';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    loader: dashBoardLoader(queryClient),
  },
  {
    path: '/medicine',
    element: <MedicineLayout />,
    children: [
      {
        path: 'create',
        element: <Create />,
      },
      {
        path: ':medicineId',
        element: <Edit />,
        loader: editLoader(queryClient),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
