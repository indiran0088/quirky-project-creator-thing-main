
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample events data
  const events = [
    { id: 1, title: "Annual Corporate Gala", date: new Date(2025, 4, 15), time: "18:00", location: "Grand Hotel Ballroom", guests: 150 },
    { id: 2, title: "Product Launch", date: new Date(2025, 3, 28), time: "10:00", location: "Conference Center", guests: 75 },
    { id: 3, title: "Team Building Retreat", date: new Date(2025, 6, 12), time: "09:00", location: "Mountain Resort", guests: 45 },
    { id: 4, title: "Client Appreciation Dinner", date: new Date(2025, 4, 22), time: "19:00", location: "Seaside Restaurant", guests: 60 },
    { id: 5, title: "Staff Training Workshop", date: new Date(2025, 3, 10), time: "13:00", location: "Training Center", guests: 30 },
    { id: 6, title: "Board Meeting", date: new Date(2025, 3, 15), time: "09:30", location: "Headquarters", guests: 12 },
  ];

  // Helper function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Get events for selected date
  const selectedDateEvents = events.filter(event => 
    date && 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Get upcoming events (next 5 events after today)
  const upcomingEvents = [...events]
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>Manage and view all scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
                modifiers={{
                  event: (day) => hasEvent(day),
                }}
                modifiersStyles={{
                  event: { fontWeight: 'bold', backgroundColor: 'rgba(59, 130, 246, 0.1)' }
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
                    <div key={event.id} className="flex flex-col rounded-lg border p-4 shadow-sm">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge>{event.time}</Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>{event.guests} guests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{event.time}</span>
                        </div>
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

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next {upcomingEvents.length} scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex flex-col border-b pb-3 last:border-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{event.guests} guests</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCalendar;
