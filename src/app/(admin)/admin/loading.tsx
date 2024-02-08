'use client';

import { NextPage } from 'next';

const LoadingPage: NextPage = () => {
  return (
    <div className="p-6 w-full h-full flex justify-center items-center">
      <span className="loading loading-dots loading-sm"></span>
    </div>
  );
};

export default LoadingPage;
