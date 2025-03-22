import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const createUser=mutation({
    args:{
        username: v.string(),
        email:v.string(),
        // password: v.string,
        imageurl:v.string(),
        upgrade:v.boolean()

    },
    handler:async(ctx,args)=>{
        //if user exist
        const user=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email',args.email)))
        .collect()
        if(user?.length==0){
            await ctx.db.insert('users',{
                username: args.username,
                email:args.email,
                // password: v.string,
                imageurl:args.imageurl,
                upgrade:false
            });
            return 'INserted new user...'
        }
          return 'User already exist...'
        //if not,new user entry
    }
})

export const upgradeplans=mutation({
    args:{
        upgrade:v.boolean()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email',args.email)))
        .collect() 

        if(result){
            await ctx.db.patch(result[0]._id,{upgrade:true});
            return 'success';
        }
        return 'error'
    }
})


export const GetUserInfo=query({
    args:{
        email:v.optional(v.string()),

    },
    handler:async(ctx,args)=>{
        if(!args.email){
            return
        }
        const result=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args?.email))
        .collect() ;
        return result[0];
    }
})