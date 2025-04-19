
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StaffUpcomingEvents = () => {
  // Sample upcoming events data
  const events = [
    { 
      id: 1, 
      title: "Annual Corporate Gala", 
      date: "2025-05-15", 
      time: "18:00", 
      location: "Grand Hotel Ballroom", 
      guests: 150, 
      assigned: true,
      role: "Guest Relations",
      status: "confirmed" 
    },
    { 
      id: 2, 
      title: "Product Launch", 
      date: "2025-04-28", 
      time: "10:00", 
      location: "Conference Center", 
      guests: 75, 
      assigned: true,
      role: "Setup Coordinator",
      status: "confirmed" 
    },
    { 
      id: 3, 
      title: "Charity Fundraiser", 
      date: "2025-06-05", 
      time: "19:30", 
      location: "City Park", 
      guests: 200, 
      assigned: false,
      role: null,
      status: "planning" 
    },
    { 
      id: 4, 
      title: "Team Building Retreat", 
      date: "2025-07-12", 
      time: "09:00", 
      location: "Mountain Resort", 
      guests: 45, 
      assigned: false,
      role: null,
      status: "planning" 
    },
    { 
      id: 5, 
      title: "Client Appreciation Dinner", 
      date: "2025-05-22", 
      time: "19:00", 
      location: "Seaside Restaurant", 
      guests: 60, 
      assigned: true,
      role: "Reception Host",
      status: "confirmed" 
    },
    { 
      id: 6, 
      title: "Staff Training Workshop", 
      date: "2025-04-10", 
      time: "13:00", 
      location: "Training Center", 
      guests: 30, 
      assigned: false,
      role: null,
      status: "planning" 
    },
  ];

  // Featured upcoming event (the closest assigned one)
  const featuredEvents = [...events]
    .filter(event => event.assigned && new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const featuredEvent = featuredEvents.length > 0 ? featuredEvents[0] : null;

  // Handle volunteer action
  const handleVolunteer = (eventId: number) => {
    toast({
      title: "Volunteer Request Sent",
      description: "Your request to volunteer for this event has been sent to the admin.",
    });
  };

  // Handle decline event
  const handleDecline = (eventId: number) => {
    toast({
      title: "Request Sent",
      description: "Your request to be removed from this event has been sent to the admin.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      
      {/* Featured Event Card */}
      {featuredEvent && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl">Your Next Assignment</CardTitle>
            <CardDescription>Your upcoming assigned event</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{featuredEvent.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span>{new Date(featuredEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>{featuredEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>{featuredEvent.guests} Guests Expected</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Your Role: {featuredEvent.role}
                  </Badge>
                </div>
              </div>
              <div>
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={() => handleDecline(featuredEvent.id)}
                >
                  Request Removal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>All Upcoming Events</CardTitle>
          <CardDescription>View all events and volunteer opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(event => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === "confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {event.assigned ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span>{event.role}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        <span>Not Assigned</span>
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!event.assigned && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVolunteer(event.id)}
                      >
                        Volunteer
                      </Button>
                    )}
                    {event.assigned && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDecline(event.id)}
                      >
                        Request Removal
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffUpcomingEvents;
