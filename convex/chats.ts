import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
//import { chats } from "./_generated/dataModel";

export const createChat = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const chat = await ctx.db.insert("chats", {
      title: args.title,
      userId: identity.subject,
      createdAt: Date.now(),
    });

    return chat;
  },
});

// export const deleteChat = mutation({
//     args: { id: v.id("chats") },
//     handler: async (ctx, args) => {
//       const identity = await ctx.auth.getUserIdentity();
//       if (!identity) {
//         throw new Error("Not authenticated");
//       }
  
//       const chat = await ctx.db.get(args.id);
//       if (!chat || chat.userId !== Number(identity.subject)) {
//         throw new Error("Unauthorized");
//       }
  
//       // Delete all messages in the chat
//       const messages = await ctx.db
//         .query("messages")
//         .withIndex("by_chat", (q) => q.eq("chatId", args.id))
//         .collect();
  
//       for (const message of messages) {
//         await ctx.db.delete(message._id);
//       }
  
//       // Delete the chat
//       await ctx.db.delete(args.id);
//     },
//   });



  export const deleteChat = mutation({
    args: { id: v.id("chats") },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      console.log("Authenticated user:", identity); // Debugging the identity
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const chat = await ctx.db.get(args.id);
      console.log("Chat found:", chat); // Debugging the chat found in db
      if (!chat || chat.userId !== identity.subject) {
        throw new Error("Unauthorized");
      }
  
      // Delete all messages in the chat
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_chat", (q) => q.eq("chatId", args.id))
        .collect();
  
      for (const message of messages) {
        await ctx.db.delete(message._id);
      }
  
      // Delete the chat
      await ctx.db.delete(args.id);
    },
  });
  

  export const listChats = query({
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      // console.log(identity);
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .order("desc")
        .collect();
  
      return chats;
    },
  });
  
  export const getChat = query({
    args: { id: v.id("chats"), userId: v.string() },
    handler: async (ctx, args) => {
      try {
        const chat = await ctx.db.get(args.id);
  
        // Return null if chat doesn't exist or user is not authorized
        if (!chat || chat.userId.toString() !== args.userId) {
          console.log("❌ Chat not found or unauthorized", {
            chatExists: !!chat,
            chatUserId: chat?.userId,
            requestUserId: args.userId,
          }); 
          return null;
        }
  
        console.log("✅ Chat found and authorized");
        return chat;
      } catch (error) {
        console.error("🔥 Error in getChat:", error);
        return null;
      }
    },
  });