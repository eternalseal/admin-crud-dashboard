import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as any;
  return (
    <div className="min-h-screen bg-stone-50">
      <main className="grid place-content-center min-h-screen gap-12 text-red-600 text-center">
        <h1 className="text-4xl font-bold ">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-slate-500">
          <i>{error?.statusText || error?.message}</i>
        </p>
      </main>
    </div>
  );
};

export default ErrorPage;
