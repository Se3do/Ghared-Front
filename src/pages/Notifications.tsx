import { RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import NotificationItem from "@/components/notifications/NotificationItem";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const handleRefresh = () => {
    toast.success("تم تحديث الإشعارات");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto page-container animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              تحديث
            </Button>
            <h1 className="text-2xl font-bold">الإشعارات</h1>
          </div>

          <div className="space-y-4">
            {mockNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NotificationItem {...notification} />
              </div>
            ))}
          </div>

          {mockNotifications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              لا توجد إشعارات جديدة
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
