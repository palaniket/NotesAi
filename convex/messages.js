import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddfileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.insert('pdfFiles',{
              fileId:args.fileId,
              storageId:args.storageId,
              fileName:args.fileName,
              fileUrl:args.fileUrl, 
              createdBy:args.createdBy,
    })
    return 'INSERTED'
  }
})
export const getFileUrl=mutation({
  args:{
    storageId:v.string(),
    
  },
  handler:async(ctx,arg)=>{
    const url=await ctx.storage.getUrl(arg.storageId);
    return url;
  }
});
export const getFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    console.log("Query Result:", result); // Debugging

    if (result.length === 0) {
      return null; // Return null if no matching record is found
    }

    return result[0]; // Return the first matching record
  },
});


export const GetUserfiles=query({
  args:{
    createdBy:v.optional(v.string())
  },
  handler:async(ctx,args)=>{
    if(!args?.createdBy){
      return;
    }
    const result=await ctx.db.query('pdfFiles')
    .filter((q)=>q.eq(q.field('createdBy'),args.createdBy))
    .collect();
    if(result.length==0){
      return null;
    }
    return result
  }
  
  
})
