"use client";

import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link'; // Correct import for Next.js Link component
import { Layout, Menu, Shield, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import UploadPdfDialog from './_components/UploadPdfDialog';
import { usePathname } from 'next/navigation';
import { Progress } from '../../@/components/ui/progress';
// import nprogre


const Dashboard = () => {
  const { user } = useUser();
  const getfiles = useQuery(api.messages.GetUserfiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(getfiles);
  const [open,setopen]=useState(false)
  const handleopen=()=>{
    setopen(!open);
  }
  
    
    const getuserInfo=useQuery(api.user.GetUserInfo,{
      email:user?.primaryEmailAddress?.emailAddress
    });
  
    // Fetch user files
  
    const path=usePathname();
    
  
  
    // Ensure we handle undefined state
    const totalFiles = getfiles?.length || 0;
    const maxFiles = 5;
    const progressPercentage = Math.min((totalFiles / maxFiles) * 100, 100);
    console.log(getuserInfo)

  return (
    <div className='min-h-screen  top-16 px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 '>
     <div className='px-4 relative '>
      <Button onClick={handleopen} className="left-0 mt-2"><Menu/></Button>
      <div>
{
  open && (
    <div className="fixed inset-0 z-40  ">
      <div className="flex flex-col gap-2 p-5 md:w-[40%] lg:w-[30%] bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600  h-full relative z-50">
        {/* Close Button */}
        <div className="flex justify-end">
          <Button onClick={handleopen}>
            <X />
          </Button>
        </div>

        {/* Upload Button with Limit Check */}
        <UploadPdfDialog isMaxfile={totalFiles >= maxFiles && !getuserInfo?.upgrade}>
          <Button className="w-full cursor-pointer">+ Upload Pdf</Button>
        </UploadPdfDialog>

        {/* Navigation Links */}
        <Link href={'/dashboard'}>
          <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${path === '/dashboard' && 'bg-slate-200'}`}>
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>

        <Link href={'/dashboard/upgrade'}>
          <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${path === '/dashboard/upgrade' && 'bg-slate-200'}`}>
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>

        {/* Progress Section - Bottom-Aligned, Within Sidebar */}
        {!getuserInfo?.upgrade && (
          <div className="absolute bottom-5 left-0 px-5 w-full">
            <Progress value={progressPercentage} />
            <p className="text-sm mt-1">{totalFiles} out of {maxFiles} PDFs uploaded</p>
            <p className="text-sm mt-2 text-gray-400">Upgrade to upload more PDFs</p>
          </div>
        )}
      </div>
    </div>
  )
}


      </div>
     </div>
      

      <div className='mx-4 text-center  '>

      
      <h2 className='font-medium text-3xl'>workspace</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 mt-10 gap-5'>
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
      </div>
    
  );
};

export default Dashboard;