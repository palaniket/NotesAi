import Header from './_components/Header'
import Sidebar from './_components/Sidebar' // Correct import statement
import React from 'react'

function DashboardLayout({children}) {
  return (
    <div>
      <div>
        <div className='md:w-64 h-screen fixed'>
          <Sidebar/>
        </div>
        <div className='md:ml-64'>
          <Header/>
          <div className='p-10'>

          {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout