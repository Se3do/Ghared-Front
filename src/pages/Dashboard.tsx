import { Bell, Mail, Send, Plus, Archive, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import ActionCard from "@/components/dashboard/ActionCard";
import { fetchDashboardStats } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  const stats = [
    { title: "الصادرة", value: statsData?.outgoing ?? 0, change: { value: 10, isPositive: true }, icon: Send, variant: "primary" as const },
    { title: "الواردة", value: statsData?.incoming ?? 0, change: { value: 5, isPositive: false }, icon: Mail, variant: "default" as const },
    { title: "الأرشيف", value: statsData?.archived ?? 0, change: { value: 2, isPositive: true }, icon: Archive, variant: "default" as const },
    { title: "المتأخرة", value: statsData?.overdue ?? 0, change: { value: 1, isPositive: false }, icon: AlertCircle, variant: "warning" as const },
  ];

  const actions = [
    { title: "صفحة الإشعارات", icon: Bell, to: "/notifications" },
    { title: "المعاملات الواردة", icon: Mail, to: "/transactions/incoming" },
    { title: "المعاملات الصادرة", icon: Send, to: "/transactions/outgoing" },
    { title: "إنشاء معاملة", icon: Plus, to: "/transactions/create" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Statistics Section */}
        <section className="mb-12">
          <h2 className="section-title justify-end mb-8 animate-fade-in">إحصائيات عامة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-32 rounded-xl" />
                ))}
              </>
            ) : (
              stats.map((stat, index) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                  variant={stat.variant}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))
            )}
          </div>
        </section>

        <div className="border-t border-border/50 my-10" />

        {/* Quick Actions Section */}
        <section>
          <h2 className="section-title justify-start mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>لوحة الإدارة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <ActionCard
                key={action.title}
                title={action.title}
                icon={action.icon}
                to={action.to}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
