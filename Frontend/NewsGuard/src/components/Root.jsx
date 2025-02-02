import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className='w-full'>
      <Sidebar />
      <section className='flex-1 min-h-screen bg-dark-2 p-12 ml-64'>
        <Outlet />
      </section>
    </div>
  );
};

export default Root;