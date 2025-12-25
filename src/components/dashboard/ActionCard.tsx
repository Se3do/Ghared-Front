import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  to: string;
  className?: string;
  style?: React.CSSProperties;
}

const ActionCard = ({ title, icon: Icon, to, className, style }: ActionCardProps) => {
  return (
    <Link to={to} className={cn("action-card flex flex-col items-center gap-4 text-center group", className)} style={style}>
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <span className="font-medium text-foreground">{title}</span>
    </Link>
  );
};

export default ActionCard;
