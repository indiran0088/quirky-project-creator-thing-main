
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Clock } from "lucide-react";

const UpcomingEvents = () => {
  // Sample upcoming events data
  const events = [
    { 
      id: 1, 
      title: "Annual Corporate Gala", 
      date: "2025-05-15", 
      time: "18:00", 
      location: "Grand Hotel Ballroom", 
      guests: 150, 
      status: "Confirmed" 
    },
    { 
      id: 2, 
      title: "Product Launch", 
      date: "2025-04-28", 
      time: "10:00", 
      location: "Conference Center", 
      guests: 75, 
      status: "Planning" 
    },
    { 
      id: 3, 
      title: "Charity Fundraiser", 
      date: "2025-06-05", 
      time: "19:30", 
      location: "City Park", 
      guests: 200, 
      status: "Confirmed" 
    },
    { 
      id: 4, 
      title: "Team Building Retreat", 
      date: "2025-07-12", 
      time: "09:00", 
      location: "Mountain Resort", 
      guests: 45, 
      status: "Planning" 
    },
    { 
      id: 5, 
      title: "Client Appreciation Dinner", 
      date: "2025-05-22", 
      time: "19:00", 
      location: "Seaside Restaurant", 
      guests: 60, 
      status: "Confirmed" 
    },
  ];

  // Featured upcoming event (the closest one)
  const featuredEvent = events.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      
      {/* Featured Event Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl">Next Event</CardTitle>
          <CardDescription>Your nearest upcoming event</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-2">{featuredEvent.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>{new Date(featuredEvent.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>{featuredEvent.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>{featuredEvent.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>{featuredEvent.guests} Guests</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Manage Event</Button>
        </CardFooter>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>All Upcoming Events</CardTitle>
          <CardDescription>Manage all your scheduled events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.guests}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === "Confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
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

export default UpcomingEvents;
