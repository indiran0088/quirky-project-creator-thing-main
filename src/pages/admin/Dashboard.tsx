
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, MessageSquare, Image } from "lucide-react";

const Dashboard = () => {
  // Sample dashboard data
  const stats = [
    { title: "Total Staff", value: "12", icon: <Users className="h-6 w-6" />, color: "bg-blue-100 text-blue-700" },
    { title: "Upcoming Events", value: "8", icon: <Calendar className="h-6 w-6" />, color: "bg-green-100 text-green-700" },
    { title: "New Feedback", value: "24", icon: <MessageSquare className="h-6 w-6" />, color: "bg-yellow-100 text-yellow-700" },
    { title: "Gallery Images", value: "126", icon: <Image className="h-6 w-6" />, color: "bg-purple-100 text-purple-700" },
  ];

  // Sample upcoming events
  const recentEvents = [
    { id: 1, title: "Annual Conference", date: "2025-05-15", guests: 120 },
    { id: 2, title: "Product Launch", date: "2025-04-28", guests: 75 },
    { id: 3, title: "Corporate Retreat", date: "2025-06-10", guests: 45 },
  ];

  // Sample recent feedback
  const recentFeedback = [
    { id: 1, name: "John Doe", message: "The service was excellent, thank you!", date: "2025-04-15" },
    { id: 2, name: "Jane Smith", message: "Food was amazing and the venue was perfect.", date: "2025-04-12" },
    { id: 3, name: "Robert Johnson", message: "Staff was very helpful and attentive.", date: "2025-04-10" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Recently scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">Guests: {event.guests}</p>
                  </div>
                  <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest guest comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map(feedback => (
                <div key={feedback.id} className="border-b pb-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{feedback.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{feedback.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
