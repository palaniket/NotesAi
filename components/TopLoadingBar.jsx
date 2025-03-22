// "use client";

// import { useEffect } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// NProgress.configure({ showSpinner: false });

// export default function TopLoadingBar() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     NProgress.start();
//     const timer = setTimeout(() => {
//       NProgress.done();
//     }, 500); // Ensures smooth animation

//     return () => clearTimeout(timer);
//   }, [pathname, searchParams]);

//   return null;
// }


"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Function to set progress to 10%
  const handleClick = () => {
    NProgress.set(0.1); // 10% progress
  };

 
}
