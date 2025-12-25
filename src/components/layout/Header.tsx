import { Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            تواصل معنا
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="text-lg font-bold text-primary">جامعة الغردقة</h1>
              <p className="text-xs text-muted-foreground">HURGHADA UNIVERSITY</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xl font-bold">غ</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
          غرد
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/contact" 
            className="text-foreground hover:text-primary transition-colors"
          >
            اتصل بنا
          </Link>
          <Link 
            to="/services" 
            className="text-foreground hover:text-primary transition-colors"
          >
            خدماتنا
          </Link>
          <Link 
            to="/" 
            className={`transition-colors ${location.pathname === "/" ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
          >
            الرئيسية
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/notifications" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                3
              </Badge>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="bg-foreground text-background rounded-full w-9 h-9">
              <span className="font-bold">F</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
