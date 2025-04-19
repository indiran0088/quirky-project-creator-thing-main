
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const GuestFeedback = () => {
  // Sample feedback data
  const feedbacks = [
    {
      id: 1,
      guestName: "John Smith",
      eventName: "Corporate Gala",
      date: "2025-02-15",
      rating: 5,
      comment: "The event was perfectly organized. Staff was attentive and the venue was beautiful.",
      status: "reviewed"
    },
    {
      id: 2,
      guestName: "Emma Johnson",
      eventName: "Product Launch",
      date: "2025-01-28",
      rating: 4,
      comment: "Great presentation and venue. The only issue was parking availability.",
      status: "reviewed"
    },
    {
      id: 3,
      guestName: "Michael Brown",
      eventName: "Corporate Gala",
      date: "2025-02-15",
      rating: 3,
      comment: "Food was excellent but the event ran too long. Consider shortening the speeches next time.",
      status: "pending"
    },
    {
      id: 4,
      guestName: "Sarah Wilson",
      eventName: "Charity Fundraiser",
      date: "2025-03-05",
      rating: 5,
      comment: "Wonderful event for a great cause. Very well organized and the entertainment was top-notch.",
      status: "pending"
    },
    {
      id: 5,
      guestName: "David Lee",
      eventName: "Product Launch",
      date: "2025-01-28",
      rating: 4,
      comment: "The product demonstration was impressive. Refreshments could have been better.",
      status: "reviewed"
    },
    {
      id: 6,
      guestName: "Jennifer Taylor",
      eventName: "Team Building Retreat",
      date: "2025-04-12",
      rating: 5,
      comment: "The activities were engaging and the facilitators were excellent. Our team really bonded during this event.",
      status: "pending"
    },
  ];

  // Feedback statistics
  const stats = {
    total: feedbacks.length,
    averageRating: (feedbacks.reduce((sum, item) => sum + item.rating, 0) / feedbacks.length).toFixed(1),
    fiveStars: feedbacks.filter(item => item.rating === 5).length,
    pending: feedbacks.filter(item => item.status === "pending").length
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Guest Feedback</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Total Feedback</h3>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
              <p className="text-3xl font-bold mt-1 text-amber-500">
                {stats.averageRating} <span className="text-lg">/ 5</span>
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">5-Star Reviews</h3>
              <p className="text-3xl font-bold mt-1 text-green-600">{stats.fiveStars}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Pending Reviews</h3>
              <p className="text-3xl font-bold mt-1 text-blue-600">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>Review and manage guest feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map(feedback => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.guestName}</TableCell>
                  <TableCell>{feedback.eventName}</TableCell>
                  <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`text-amber-500 ${feedback.rating >= 4 ? 'font-semibold' : ''}`}>
                      {renderStars(feedback.rating)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{feedback.comment}</TableCell>
                  <TableCell>
                    <Badge variant={feedback.status === "reviewed" ? "outline" : "default"}>
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </Badge>
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

export default GuestFeedback;
