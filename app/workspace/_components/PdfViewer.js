import React from 'react'

function PdfViewer({fileUrl}) {
  return (
    <div className='w-full h-full'>
      <iframe src={fileUrl} height="800vh" width="100%" className=''/>
    </div>
  )
}

export default PdfViewer
