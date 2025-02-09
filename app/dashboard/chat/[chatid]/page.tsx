import ChatInterface from "@/components/ChatInterface";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface ChatPageProps {
  params:{
    chatId: Id<"chats">;
  };
}

async function ChatPage({ params }: ChatPageProps) {
  const { chatId } =  params;
  const { userId } = await auth();   // Get user authentication

  if (!userId) {
    redirect("/");
  }

  try {
    const convex = getConvexClient();// Get Convex client and fetch chat and messages
    const chat = await convex.query(api.chats.getChat, { // Check if chat exists & user is authorized to view it
      id:chatId,
      userId,
    });

    if (!chat) {
      console.log(
        "⚠️ Chat not found or unauthorized, redirecting to dashboard"
      );
      redirect("/dashboard");
    }

    // Get messages
    const initialMessages = await convex.query(api.messages.list, { chatId });

    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
      </div>
    );
  } catch (error) {
    console.error("🔥 Error loading chat:", error);
    redirect("/dashboard");
  }
}

export default ChatPage;