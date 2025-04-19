
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, Image, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <NavLink 
                to="/admin/dashboard" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/upcoming-events" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/guest-gallery" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                <Image className="h-5 w-5" />
                <span>Guest Gallery</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/guest-feedback" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                <MessageSquare className="h-5 w-5" />
                <span>Guest Feedback</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/staff-management" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                <Users className="h-5 w-5" />
                <span>Staff Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/calendar" 
                className={({isActive}) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                <Calendar className="h-5 w-5" />
                <span>Calendar</span>
              </NavLink>
            </li>
            <li className="mt-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 w-full text-red-500 hover:text-red-700 hover:bg-red-50"
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
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
