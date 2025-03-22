import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import EditorExtensions from './EditorExtensions';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';

function TextEditor({fileId}) {
  //  const {fileId}=useParams()
  const notes = useQuery(api.notes.getNotes, {fileId: fileId });
console.log("Fetched Notes:", notes);

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: "Start taking your notes here...",
    }),
  ],
  editorProps: {
    attributes: {
      class: "focus:outline-none h-full p-5",
    },
  },
  immediatelyRender: false, // Explicitly set to false
});

useEffect(() => {
  editor&&editor.commands.setContent(notes)
}, [notes&&editor]); 


  

  return (
    <div className='h-full'>
     <EditorExtensions editor={editor} />
      <div className='h-full'>
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
}

export default TextEditor;