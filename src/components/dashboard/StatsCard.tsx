import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "primary" | "success" | "warning" | "default";
  className?: string;
  style?: React.CSSProperties;
}

const StatsCard = ({ title, value, change, variant = "primary", className, style }: StatsCardProps) => {
  const variants = {
    primary: "stat-card",
    success: "stat-card stat-card-success",
    warning: "stat-card stat-card-warning",
    default: "stat-card",
  };

  return (
    <div className={cn(variants[variant], "animate-fade-in", className)} style={style}>
      <p className="text-sm opacity-90 mb-2 text-right">{title}</p>
      <div className="flex items-end justify-between">
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
            "bg-background/20 backdrop-blur-sm"
          )}>
            {change.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{change.isPositive ? "+" : ""}{change.value}%</span>
          </div>
        )}
        <p className="text-4xl font-bold">{value.toLocaleString('ar-EG')}</p>
      </div>
    </div>
  );
};

export default StatsCard;
