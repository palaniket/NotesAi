"use client";

import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link'; // Correct import for Next.js Link component
// import nprogre


const Dashboard = () => {
  const { user } = useUser();
  const getfiles = useQuery(api.messages.GetUserfiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(getfiles);

  return (
    <div>
      <h2 className='font-medium text-3xl'>workspace</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 mt-10 gap-5'>
        {getfiles?.length > 0 ? (
          getfiles.map((file, index) => (
            <Link href={`/workspace/${file?.fileId}`} key={index}>
              <div className='flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all'>
                <img src='/pdf.png' alt='file' width={50} height={50} />
                <h2 className='mt-1 font-bold'>{file?.fileName}</h2>
              </div>
            </Link>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div key={index} className='bg-slate-200 rounded-md h-[150px] animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;