import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
// import PdfViewer from './PdfViewer'
import {Button} from '../../../components/ui/button'
const WorkspaceHeader = ({fileName}) => {
  return (
    <div className='p-5 flex   text-center items-center justify-center'>
    
      <h2 className='font-bold'>{fileName}</h2>
      
    </div>
  )
}

export default WorkspaceHeader
