"use client";

import { Layout, Shield } from "lucide-react";
import { Button } from "../../../components/ui/button"; // Adjust the path as needed
import React from "react";
import { Progress } from "../../../@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import path from "path";

const Sidebar = ({open}) => {
  const { user } = useUser();
  
  const getuserInfo=useQuery(api.user.GetUserInfo,{
    email:user?.primaryEmailAddress?.emailAddress
  });

  // Fetch user files
  const getfiles = useQuery(api.messages.GetUserfiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress,
  });
  const path=usePathname();
  


  // Ensure we handle undefined state
  const totalFiles = getfiles?.length || 0;
  const maxFiles = 5;
  const progressPercentage = Math.min((totalFiles / maxFiles) * 100, 100);
  console.log(getuserInfo)

  return (
    <div className="shadow-md h-screen p-7 relative">
      <Link href="/" className="font-bold text-3xl flex items-center text-white">
            <span className="text-black mr-2">Notes</span>
            <span className="text-blue-600">AI</span>
          </Link>

      <div className="mt-10">
        <UploadPdfDialog isMaxfile={(totalFiles>=maxFiles&&!getuserInfo?.upgrade)?true:false}>
          <Button className="w-full cursor-pointer">+ Upload Pdf</Button>
        </UploadPdfDialog>

        <Link href={'/dashboard'}>

        <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${path=='/dashboard'&&'bg-slate-200'}`}>
          <Layout />
          <h2>Workspace</h2>
        </div>
        </Link>
        
        <Link href={'/dashboard/upgrade'}>
        <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${path=='/dashboard/upgrade'&&'bg-slate-200'}`}>
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </Link>
      </div>

      {!getuserInfo?.upgrade &&<div className="absolute bottom-10 w-[80%]">
        <Progress value={progressPercentage} />
        <p className="text-sm mt-1">{totalFiles} out of {maxFiles} PDFs uploaded</p>
        <p className="text-sm mt-2 text-gray-400">Upgrade to upload more PDFs</p>
      </div>}
    </div>
  );
};

export default Sidebar;
