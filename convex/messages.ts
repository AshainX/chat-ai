import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const SHOW_COMMENTS = true;

export const list = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) {
    //   throw new Error("Not authenticated");
    // }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .order("asc")
      .collect();

    if (SHOW_COMMENTS) {
      console.log("📜 Retrieved messages:", {
        chatId: args.chatId,
        count: messages.length,
      });
    }

    return messages;
  },
});
