'use client';

import dynamic from 'next/dynamic';

import React from 'react';

import { Navbar } from '~/components';

const Test = dynamic(
  () => import('~/components/test').then((mod) => mod.Test),
  {
    ssr: false,
  }
);

const Home = () => {
  return (
    <div>
      <Navbar />
      <Test />
    </div>
  );
};

export default Home;
