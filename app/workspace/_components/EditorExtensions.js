import { useAction, useMutation } from 'convex/react';
import { Sparkles } from 'lucide-react'
import React from 'react'
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { ChatSession } from '@google/generative-ai';
import {chatSession} from '../../../configs/AIModel'
// import { text } from 'stream/consumers';
import { toast } from "sonner"
import { useUser } from '@clerk/nextjs';

function EditorExtensions({ editor }) {
    
    const {fileId} = useParams();   
    const searchAi=useAction(api.myActions.search);
    const saveNotes=useMutation(api.notes.AddNotes);
    const {user}=useUser();

    const onAiClick=async()=>{

        toast("Ai is getting your answer")
       const selectedText=editor.state.doc.textBetween(editor.state.selection.from,
        editor.state.selection.to,
        '',
        
    );
    // console.log(selectedText);
    const result=await searchAi({
        query:selectedText,
        fileId:fileId
    });
    console.log("result "+result)
    const Unformattedans=JSON.parse(result)
    console.log("unformatted ans",result)
    let allUnformattedans=''
    Unformattedans&&Unformattedans.forEach(item => {
        allUnformattedans=allUnformattedans+item.pageContent
    });
    console.log(allUnformattedans)

    const Prompt="For question : "+selectedText+" with the given content as answer. Please give the appropriate answer in html format"+allUnformattedans;
    const Aimodel = await chatSession.sendMessage(Prompt);
//   console.log(result.response.text());
    console.log(Aimodel.response.text());

    const FinalAns=Aimodel.response.text().replace('```','').replace('html','').replace('```','');
    const AllText=editor.getHTML();
    editor.commands.setContent(AllText+'<p><strong>Answer: </strong>'+FinalAns+'</p>')


    saveNotes({
        fileId:fileId,
        notes:editor.getHTML(),
        createdBy:user?.primaryEmailAddress?.emailAddress
        
    })
    
    }

    
    return (
        <div>
            <div className="control-group">
                <div className="button-group flex gap-2">
                    {editor && (
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`px-4 py-2 rounded-2xl cursor-pointer bg-black text-white  ${editor.isActive('bold') ? 'is-active' : ''}`}
                        >
                            Toggle bold
                        </button>
                    )}
                    {editor && (
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`px-4 py-2 rounded-2xl cursor-pointer bg-black text-white  ${editor.isActive('italic') ? 'text-blue-500' : ''}`}
                        >
                            Toggle bold
                        </button>
                    )}

                    {editor && (
                        <button
                            onClick={() => onAiClick()}
                            className={'cursor-pointer hover:text-blue-500'}
                        >
                            <Sparkles/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditorExtensions
