import { Home, Calendar, Users, Award, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "students", label: "Students", icon: Users },
  { id: "progress", label: "Progress", icon: Award },
];

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Award className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DojoManager</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Excellence in Training</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                onClick={() => onViewChange(item.id)}
                className={`gap-2 transition-all ${
                  currentView === item.id 
                    ? "gradient-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
            
            <div className="ml-2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
