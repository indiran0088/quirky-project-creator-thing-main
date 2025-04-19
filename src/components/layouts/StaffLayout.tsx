
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Mail, Calendar, Image, MessageSquare, Bell, LogOut, Search, UserRound, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const StaffLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar shadow-xl">
        <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
            <UserRound className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-sidebar-foreground">Staff Panel</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <NavLink 
                to="/staff/invitation" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Mail className="h-5 w-5" />
                <span>Invitation</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/staff/gallery" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Image className="h-5 w-5" />
                <span>Gallery</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/staff/feedback" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <MessageSquare className="h-5 w-5" />
                <span>Feedback</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/staff/calendar" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Calendar className="h-5 w-5" />
                <span>Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/staff/upcoming-events" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Bell className="h-5 w-5" />
                <span>Upcoming Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/staff/find-guest" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Search className="h-5 w-5" />
                <span>Find Guest</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/staff/guest-tracking" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <MapPin className="h-5 w-5" />
                <span>Guest Tracking</span>
              </NavLink>
            </li>
            <li className="mt-4">
              <Button 
                variant="ghost" 
                className="flex w-full items-center gap-2 text-red-400 hover:text-red-300 hover:bg-sidebar-accent"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;
