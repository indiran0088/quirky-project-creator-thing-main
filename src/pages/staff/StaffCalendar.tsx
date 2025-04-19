
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Clock, MapPin, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StaffCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample events data
  const events = [
    { id: 1, title: "Annual Corporate Gala", date: new Date(2025, 4, 15), time: "18:00", location: "Grand Hotel Ballroom", assigned: true, role: "Guest Relations" },
    { id: 2, title: "Product Launch", date: new Date(2025, 3, 28), time: "10:00", location: "Conference Center", assigned: true, role: "Setup Coordinator" },
    { id: 3, title: "Team Building Retreat", date: new Date(2025, 6, 12), time: "09:00", location: "Mountain Resort", assigned: false, role: null },
    { id: 4, title: "Client Appreciation Dinner", date: new Date(2025, 4, 22), time: "19:00", location: "Seaside Restaurant", assigned: true, role: "Reception Host" },
    { id: 5, title: "Staff Training Workshop", date: new Date(2025, 3, 10), time: "13:00", location: "Training Center", assigned: false, role: null },
  ];

  // Helper function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Is staff assigned to event
  const isAssignedEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear() &&
      event.assigned
    );
  };

  // Get events for selected date
  const selectedDateEvents = events.filter(event => 
    date && 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Get upcoming assigned events
  const upcomingAssignedEvents = [...events]
    .filter(event => event.date >= new Date() && event.assigned)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  // Volunteer for event
  const handleVolunteer = (eventId: number) => {
    toast({
      title: "Volunteer Request Sent",
      description: "Your request to volunteer for this event has been sent to the admin.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Staff Schedule</CardTitle>
              <CardDescription>View your assigned events and available opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
                modifiers={{
                  event: (day) => hasEvent(day),
                  assigned: (day) => isAssignedEvent(day),
                }}
                modifiersStyles={{
                  event: { fontWeight: 'bold', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                  assigned: { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'rgb(16, 185, 129)', fontWeight: 'bold' }
                }}
              />
            </CardContent>
          </Card>

          {/* Selected Date Events */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                Events for {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Selected Date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className={`flex flex-col rounded-lg border p-4 shadow-sm ${
                      event.assigned ? 'border-green-200 bg-green-50' : ''
                    }`}>
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        {event.assigned ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>Assigned</span>
                          </Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => handleVolunteer(event.id)}
                          >
                            Volunteer
                          </Button>
                        )}
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{event.time}</span>
                        </div>
                        {event.assigned && (
                          <div className="flex items-center gap-1 text-green-700 font-medium mt-1">
                            <span>Role: {event.role}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-6">No events scheduled for this date</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Assigned Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Your Upcoming Events</span>
            </CardTitle>
            <CardDescription>Events you're assigned to</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAssignedEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssignedEvents.map(event => (
                  <div key={event.id} className="flex flex-col border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{event.location}</span>
                    </div>
                    <div className="mt-1 text-xs font-medium text-green-700">
                      {event.role}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">No upcoming events assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffCalendar;
