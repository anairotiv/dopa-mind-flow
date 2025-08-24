import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Brain, 
  Calendar, 
  Target, 
  MessageCircle, 
  BarChart3, 
  Compass,
  User
} from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard", color: "text-primary" },
    { path: "/mood", icon: Brain, label: "Humor", color: "text-secondary" },
    { path: "/routines", icon: Calendar, label: "Rotinas", color: "text-accent" },
    { path: "/challenges", icon: Target, label: "Desafios", color: "text-yellow-600" },
    { path: "/ai-chat", icon: MessageCircle, label: "Mindy", color: "text-purple-600" },
    { path: "/stats", icon: BarChart3, label: "Estatísticas", color: "text-green-600" },
    { path: "/explore", icon: Compass, label: "Explorar", color: "text-orange-600" },
    { path: "/profile", icon: User, label: "Perfil", color: "text-blue-600" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 z-50 lg:hidden">
      <div className="flex justify-around items-center py-2">
        {navigationItems.slice(0, 5).map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center gap-1 h-14 px-3
                ${isActive(item.path) 
                  ? `${item.color} bg-muted/50` 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <IconComponent className={`w-5 h-5 ${isActive(item.path) ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;