import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
// import PdfViewer from './PdfViewer'
import {Button} from '../../../components/ui/button'
const WorkspaceHeader = ({fileName}) => {
  return (
    <div className='p-5 flex justify-between shadow-md'>
      <img src='/logo.svg' alt='logo' height={100} width={140} />
      <h2 className='font-bold'>{fileName}</h2>
      <div className='flex gap-2 items-center'>
      <Button>Save</Button>
      <UserButton/>
      </div>
    </div>
  )
}

export default WorkspaceHeader
