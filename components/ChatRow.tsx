 // Adjust the import path as necessary

import { Doc, Id } from "@/convex/_generated/dataModel";
import { NavigationContext } from "@/lib/NavigationProvider";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Button } from "@/components/ui/button";


function ChatRow({
    chat,
    onDelete,
}: {
    chat: Doc<"chats">;
    onDelete: (id: Id<"chats">) => void;
  }) 
{

    const router = useRouter();
    const { closeMobileNav } = use(NavigationContext);

    const handleClick = () => {
        router.push(`/dashboard/chat/${chat._id}`);
        closeMobileNav();
    };

return(
    <div 
 className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-md p-4 hover:bg-white/60 
 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
 onClick={handleClick}
     >
      <div className="p-4">
        <div className="flex justify between items-start">chat
          
        </div>
      </div>

    {/* ChatRow
    <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat._id);
            }}
          >
            <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
          </Button> */}
    </div>
 );
 
}

export default ChatRow;
