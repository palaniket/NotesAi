import { Button } from "../components/ui/button"
import { useUser } from "@clerk/nextjs"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Hero() {
    const user=useUser();
    const [load,setLoad]=useState('/sign-up')
    useEffect(()=>{
       if(user){
        setLoad('/dashboard');
       }
    },[user])


  return (
    <div className="flex-1 flex flex-col items-center justify-center mt-10 px-4 text-center">
      <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl">
          <span className="text-white drop-shadow-md">
            AI Note Taking is <span className="text-black">Easy</span>
          </span>
        </h1>

        <Button
          size="lg"
          className="text-lg px-8 py-6 bg-white text-purple-700 hover:bg-black cursor-pointer hover:text-white transition-all duration-300"
        >
            <Link href={load}>
          Get Started
            </Link>
        </Button>
      </div>
    </div>
  )
}

