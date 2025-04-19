
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StaffFeedback = () => {
  // Sample event options
  const events = [
    { id: 1, name: "Corporate Gala", date: "2025-04-15" },
    { id: 2, name: "Product Launch", date: "2025-03-28" },
    { id: 3, name: "Team Building Retreat", date: "2025-07-12" },
    { id: 4, name: "Client Appreciation Dinner", date: "2025-05-22" },
  ];

  // Recent feedback
  const recentFeedback = [
    {
      id: 1,
      eventName: "Corporate Gala",
      guestName: "John Smith",
      rating: 5,
      comment: "The event was perfectly organized. Staff was attentive and the venue was beautiful.",
      date: "2025-02-20"
    },
    {
      id: 2,
      eventName: "Product Launch",
      guestName: "Emma Johnson",
      rating: 4,
      comment: "Great presentation and venue. The only issue was parking availability.",
      date: "2025-01-30"
    },
    {
      id: 3,
      eventName: "Corporate Gala",
      guestName: "Michael Brown",
      rating: 3,
      comment: "Food was excellent but the event ran too long. Consider shortening the speeches next time.",
      date: "2025-02-18"
    },
  ];

  // Handle feedback submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Requested",
      description: "The feedback request has been sent to the guest.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Guest Feedback</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle>Request Feedback</CardTitle>
            <CardDescription>Send a feedback request to guests</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event">Select Event</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {events.map(event => (
                        <SelectItem key={event.id} value={event.id.toString()}>
                          {event.name} ({new Date(event.date).toLocaleDateString()})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guest-email">Guest Email</Label>
                <Input id="guest-email" type="email" placeholder="guest@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <Textarea 
                  id="message" 
                  placeholder="Add a personal message to the feedback request..."
                  className="min-h-[100px]" 
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit}>Send Feedback Request</Button>
          </CardFooter>
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
                <div key={feedback.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">{feedback.guestName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {feedback.eventName} • {new Date(feedback.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-lg ${i < feedback.rating ? 'text-amber-500' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{feedback.comment}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>Thank</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ThumbsDown className="h-3.5 w-3.5" />
                      <span>Flag</span>
                    </Button>
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

export default StaffFeedback;
