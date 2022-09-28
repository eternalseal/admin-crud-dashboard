import React from 'react';
import { Link } from 'react-router-dom';

const Root = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <main className="grid place-content-center min-h-screen gap-12">
        <h1 className="text-4xl text-slate-700">Welcome to Admin Dashboard</h1>
        <Link
          to="/dashboard"
          className="button text-2xl w-fit justify-self-center"
        >
          Let&apos; Go!!
        </Link>
      </main>
    </div>
  );
};

export default Root;
