// File: src/App.tsx  
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminLayout from "./components/layouts/AdminLayout";
import StaffLayout from "./components/layouts/StaffLayout";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import UpcomingEvents from "./pages/admin/UpcomingEvents";
import GuestGallery from "./pages/admin/GuestGallery";
import GuestFeedback from "./pages/admin/GuestFeedback";
import StaffManagement from "./pages/admin/StaffManagement";
import AdminCalendar from "./pages/admin/AdminCalendar";

// Staff pages
import StaffInvitation from "./pages/staff/StaffInvitation";
import StaffGallery from "./pages/staff/StaffGallery"
import StaffFeedback from "./pages/staff/StaffFeedback";
import StaffCalendar from "./pages/staff/StaffCalendar";
import StaffUpcomingEvents from "./pages/staff/StaffUpcomingEvents";
import FindGuest from "./pages/staff/FindGuest";
import GuestTracking from "./pages/staff/GuestTracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* Login/Landing Page */}
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upcoming-events" element={<UpcomingEvents />} />
          <Route path="guest-gallery" element={<GuestGallery />} />
          <Route path="guest-feedback" element={<GuestFeedback />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="calendar" element={<AdminCalendar />} />
        </Route>
        
        {/* Staff Routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="invitation" element={<StaffInvitation />} />
          <Route path="gallery" element={<StaffGallery />} />
          <Route path="feedback" element={<StaffFeedback />} />
          <Route path="calendar" element={<StaffCalendar />} />
          <Route path="upcoming-events" element={<StaffUpcomingEvents />} />
          <Route path="find-guest" element={<FindGuest />} />
          <Route path="guest-tracking" element={<GuestTracking />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
