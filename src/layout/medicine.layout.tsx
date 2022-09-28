import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MedicineLayout = () => {
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
        <Outlet />
      </main>
    </div>
  );
};

export default MedicineLayout;
