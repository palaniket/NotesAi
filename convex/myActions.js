import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { OpenAIEmbeddings } from "@langchain/openai";
import { action } from "./_generated/server";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(), // Ensure this matches the expected input type
    fileId: v.string(),
  },
  handler: async (ctx,args) => {
   
    

    await ConvexVectorStore.fromTexts(
      args.splitText,
      {fileId:args.fileId},
      
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyCxJjkAJC7HRudnK3qomaiV-a3fXpwfWSg",
       
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "completed";
  },
});

// export const search = action({
//   args: {
//     query: v.string(),
//     fileId:v.string(),
//   },
//   handler: async (ctx, args) => {
//     const vectorStore = new ConvexVectorStore(
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY,
       
//         model: "text-embedding-004", // 768 dimensions
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       })
//       , { ctx });

//     const resultOne =await (await vectorStore.similaritySearch(args.query, 1))
//     .filter(q=>{q.metadata.fileId==args.fileId,console.log(q.metadata.fileId)});
//     console.log(args.query);
//     return JSON.stringify(resultOne)
//   },
// });

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyCxJjkAJC7HRudnK3qomaiV-a3fXpwfWSg",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    console.log("Searching for:", args.query);
    const resultOne = await vectorStore.similaritySearch(args.query, 1);
    console.log("Raw Results:", resultOne);

    const filteredResults = resultOne.filter(q => q.metadata.fileId === args.fileId);

    console.log("Filtered Results:", filteredResults);
    return JSON.stringify(filteredResults);
  },
})