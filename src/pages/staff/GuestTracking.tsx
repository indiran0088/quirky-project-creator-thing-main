
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Search, UserCheck, UserX, Clock, Calendar, Users, CheckCircle2 } from "lucide-react";

interface Guest {
  id: number;
  name: string;
  email: string;
  status: "Present" | "Absent" | "Not Arrived";
  checkInTime?: string;
  table?: number;
  profileImage?: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
  totalGuests: number;
  presentGuests: number;
  status: "Upcoming" | "In Progress" | "Completed";
}

const GuestTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  
  // Mock events data
  const events: Event[] = [
    {
      id: 1,
      name: "Annual Tech Conference",
      date: "2025-04-25",
      venue: "Grand Convention Center",
      totalGuests: 250,
      presentGuests: 180,
      status: "In Progress"
    },
    {
      id: 2,
      name: "Developer Meetup",
      date: "2025-05-10",
      venue: "Tech Hub",
      totalGuests: 120,
      presentGuests: 0,
      status: "Upcoming"
    },
    {
      id: 3,
      name: "Design Workshop",
      date: "2025-04-10",
      venue: "Creative Space",
      totalGuests: 75,
      presentGuests: 72,
      status: "Completed"
    }
  ];
  
  // Mock guests for the active event
  const generateGuests = (count: number): Guest[] => {
    const statuses: ("Present" | "Absent" | "Not Arrived")[] = ["Present", "Absent", "Not Arrived"];
    const guests: Guest[] = [];
    
    for (let i = 1; i <= count; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      guests.push({
        id: i,
        name: `Guest ${i}`,
        email: `guest${i}@example.com`,
        status,
        checkInTime: status === "Present" ? `${Math.floor(Math.random() * 12) + 9}:${Math.random() > 0.5 ? "30" : "00"} ${Math.random() > 0.5 ? "AM" : "PM"}` : undefined,
        table: status === "Present" ? Math.floor(Math.random() * 30) + 1 : undefined,
        profileImage: `https://i.pravatar.cc/150?u=${i}`
      });
    }
    
    return guests;
  };

  const [guests, setGuests] = useState<Guest[]>([]);
  
  // Handle event selection
  const handleSelectEvent = (event: Event) => {
    setActiveEvent(event);
    setGuests(generateGuests(event.totalGuests));
  };

  // Filter guests based on search
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Count guests by status
  const presentCount = filteredGuests.filter(g => g.status === "Present").length;
  const absentCount = filteredGuests.filter(g => g.status === "Absent").length;
  const notArrivedCount = filteredGuests.filter(g => g.status === "Not Arrived").length;

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <MapPin className="h-7 w-7" /> Guest Tracking
      </h1>
      
      <div className="grid md:grid-cols-3 gap-4">
        {events.map(event => (
          <Card 
            key={event.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${activeEvent?.id === event.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleSelectEvent(event)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.name}</CardTitle>
                <Badge className={
                  event.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  event.status === "Completed" ? "bg-green-100 text-green-800" :
                  "bg-purple-100 text-purple-800"
                }>
                  {event.status}
                </Badge>
              </div>
              <CardDescription>{event.venue}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.presentGuests}/{event.totalGuests}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {activeEvent ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{activeEvent.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" /> {activeEvent.venue} • <Calendar className="h-4 w-4" /> {activeEvent.date}
                  </CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Quick Check-in
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{guests.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground/50" />
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-green-600">Present</p>
                      <p className="text-2xl font-bold text-green-700">{presentCount}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-400" />
                  </CardContent>
                </Card>
                <Card className="bg-red-50">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-red-600">Absent</p>
                      <p className="text-2xl font-bold text-red-700">{absentCount}</p>
                    </div>
                    <UserX className="h-8 w-8 text-red-400" />
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-yellow-600">Not Arrived</p>
                      <p className="text-2xl font-bold text-yellow-700">{notArrivedCount}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="guestSearch" className="sr-only">Search guests</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="guestSearch"
                        placeholder="Search guests by name or email..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All ({filteredGuests.length})</TabsTrigger>
                    <TabsTrigger value="present">Present ({presentCount})</TabsTrigger>
                    <TabsTrigger value="absent">Absent ({absentCount})</TabsTrigger>
                    <TabsTrigger value="not-arrived">Not Arrived ({notArrivedCount})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr className="text-left">
                            <th className="px-4 py-3 font-medium">Guest</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Check-in Time</th>
                            <th className="px-4 py-3 font-medium">Table</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredGuests.slice(0, 10).map(guest => (
                            <tr key={guest.id} className="hover:bg-muted/30">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={guest.profileImage} />
                                    <AvatarFallback>{guest.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{guest.name}</p>
                                    <p className="text-xs text-muted-foreground">{guest.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge className={
                                  guest.status === 'Present' ? 'bg-green-100 text-green-800' : 
                                  guest.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }>
                                  {guest.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {guest.checkInTime || '—'}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {guest.table ? `Table ${guest.table}` : '—'}
                              </td>
                              <td className="px-4 py-3 text-right">
                                {guest.status !== "Present" ? (
                                  <Button size="sm" variant="outline">Mark Present</Button>
                                ) : (
                                  <Button size="sm" variant="ghost">Update</Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {filteredGuests.length > 10 && (
                        <div className="p-4 text-center border-t">
                          <Button variant="outline">Load More</Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="present">
                    <Card>
                      <CardContent className="pt-6">
                        {presentCount > 0 ? (
                          <div className="text-center py-12">
                            <UserCheck className="mx-auto h-12 w-12 text-green-500 mb-3" />
                            <h3 className="text-xl font-medium">Guests Present</h3>
                            <p className="text-muted-foreground">
                              {presentCount} of {filteredGuests.length} guests have checked in.
                            </p>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">No guests are present yet.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="absent">
                    <Card>
                      <CardContent className="pt-6">
                        {absentCount > 0 ? (
                          <div className="text-center py-12">
                            <UserX className="mx-auto h-12 w-12 text-red-500 mb-3" />
                            <h3 className="text-xl font-medium">Guests Absent</h3>
                            <p className="text-muted-foreground">
                              {absentCount} of {filteredGuests.length} guests are marked absent.
                            </p>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">No guests are marked as absent.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="not-arrived">
                    <Card>
                      <CardContent className="pt-6">
                        {notArrivedCount > 0 ? (
                          <div className="text-center py-12">
                            <Clock className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
                            <h3 className="text-xl font-medium">Guests Not Arrived</h3>
                            <p className="text-muted-foreground">
                              {notArrivedCount} of {filteredGuests.length} guests have not arrived yet.
                            </p>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">All guests have arrived or been marked absent.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
            <h3 className="text-xl font-medium">Select an Event</h3>
            <p className="text-muted-foreground max-w-md mx-auto mt-2">
              Choose an event from the list above to view and manage guest tracking details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestTracking;
