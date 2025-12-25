import { RefreshCw, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import NotificationItem from "@/components/notifications/NotificationItem";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const mockNotifications = [
  {
    id: "1",
    title: "موضوع مهم",
    sender: "Se3do",
    senderInitial: "s",
    preview: "asdasd",
    date: "2025-12-21",
    isRead: false,
  },
  {
    id: "2",
    title: "موضوع مهم",
    sender: "Se3do",
    senderInitial: "s",
    preview: "asdfghjk",
    date: "2025-12-21",
    isRead: true,
  },
  {
    id: "3",
    title: "تجربة رقم 4",
    sender: "hanatesting",
    senderInitial: "h",
    preview: ":kljl",
    date: "2025-12-17",
    isRead: true,
  },
  {
    id: "4",
    title: "موضوع مهم",
    sender: "Se3do",
    senderInitial: "s",
    preview: "موضوع مهم",
    date: "2025-12-17",
    isRead: true,
  },
];

const Notifications = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث الإشعارات");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto page-container animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              className="gap-2 hover:border-primary hover:text-primary transition-all duration-300"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            <h1 className="text-2xl font-bold gradient-text">الإشعارات</h1>
          </div>

          <div className="space-y-4">
            {mockNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NotificationItem {...notification} />
              </div>
            ))}
          </div>

          {mockNotifications.length === 0 && (
            <div className="text-center py-16 text-muted-foreground animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Check className="w-10 h-10 text-primary" />
              </div>
              لا توجد إشعارات جديدة
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
