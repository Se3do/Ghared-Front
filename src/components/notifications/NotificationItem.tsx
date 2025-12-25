import { User, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  id: string;
  title: string;
  sender: string;
  senderInitial: string;
  preview: string;
  date: string;
  isRead: boolean;
}

const NotificationItem = ({ title, sender, senderInitial, preview, date, isRead }: NotificationItemProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl transition-all duration-300 animate-slide-up relative overflow-hidden",
        isRead ? "bg-primary/5" : "bg-card hover:bg-muted/50"
      )}
    >
      {/* Timeline indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
      
      {/* Date and read status */}
      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
        <span>{date}</span>
        {isRead && (
          <Check className="w-4 h-4 text-primary" />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 text-right">
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-sm text-primary flex items-center justify-end gap-1">
          <span>{sender}</span>
          <User className="w-4 h-4" />
        </p>
        <p className="text-sm text-muted-foreground mt-1">{preview}</p>
      </div>
      
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
        {senderInitial}
      </div>
    </div>
  );
};

export default NotificationItem;
