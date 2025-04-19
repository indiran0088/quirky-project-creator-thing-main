import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Mail, Copy, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import InvitationForm from "@/components/staff/InvitationForm";
import { config } from "@/lib/config";


interface Invitation {
  id: number;
  guestName: string;
  guestEmail: string;
  collegeName: string;
  eventTitle: string;
  subject: string;
  staffNumber: string;
  staffEmail: string;
  status: "pending" | "sent" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
}

interface Template {
  id: number;
  name: string;
  subject: string;
  preview: string;
}

const StaffInvitation = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch invitations from API
  const fetchInvitations = async () => {
    try {
      const response = await fetch(`${config.env.serverUrl}/api/invitations`);
      if (!response.ok) {
        throw new Error('Failed to fetch invitations');
      }
      const result = await response.json();
      if (result.success) {
        setInvitations(result.data);
      } else {
        throw new Error(result.message || 'Failed to load invitations');
      }
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchInvitations();
  }, []);

  // Handle invitation refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchInvitations();
  };

  // Handle new invitation creation
  const handleInvitationCreated = () => {
    setDialogOpen(false);
    setRefreshing(true);
    fetchInvitations();
  };

  // Sample templates data (consider fetching from API)
  const templates: Template[] = [
    {
      id: 1,
      name: "Formal Invitation",
      subject: "You're Invited: [Event Name]",
      preview: "Dear [Guest Name], We are pleased to invite you to our [Event Name] taking place on [Date] at [Venue]..."
    },
    {
      id: 2,
      name: "Casual Invitation",
      subject: "Join us for [Event Name]!",
      preview: "Hey [Guest Name]! We'd love for you to join us at our upcoming [Event Name] on [Date]..."
    },
  ];

  // Calculate stats
  const stats = {
    total: invitations.length,
    sent: invitations.filter(i => i.status === "sent").length,
    accepted: invitations.filter(i => i.status === "accepted").length,
    declined: invitations.filter(i => i.status === "declined").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading invitations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Button onClick={handleRefresh} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Invitations</h1>
      
      {/* Invitation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Sent</h3>
              <p className="text-3xl font-bold mt-1 text-blue-600">{stats.sent}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Accepted</h3>
              <p className="text-3xl font-bold mt-1 text-green-600">{stats.accepted}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Declined</h3>
              <p className="text-3xl font-bold mt-1 text-red-600">{stats.declined}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invitations">
        <TabsList className="w-full border-b mb-1 pb-1">
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="invitations">
          {/* Invitations List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Invitations</CardTitle>
                  <CardDescription>Manage guest invitations</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    {refreshing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Refresh"
                    )}
                  </Button>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        <span>New Invitation</span>
                      </Button>
                    </DialogTrigger>
                    <InvitationForm 
                      open={dialogOpen} 
                      onOpenChange={setDialogOpen} 
                      // onSuccess={handleInvitationCreated}
                    />
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.length > 0 ? (
                    invitations.map(invitation => (
                      <TableRow key={invitation.id}>
                        <TableCell className="font-medium">{invitation.guestName}</TableCell>
                        <TableCell>{invitation.guestEmail}</TableCell>
                        <TableCell>{invitation.collegeName}</TableCell>
                        <TableCell>{invitation.eventTitle}</TableCell>
                        <TableCell>
                          {new Date(invitation.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              invitation.status === "accepted" ? "border-green-500 text-green-600" :
                              invitation.status === "declined" ? "border-red-500 text-red-600" :
                              "border-blue-500 text-blue-600"
                            }
                          >
                            {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span>Resend</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No invitations found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          {/* Email Templates */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage invitation templates</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Template</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map(template => (
                  <div key={template.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => {
                          navigator.clipboard.writeText(template.preview);
                          toast({
                            title: "Template Copied",
                            description: `The ${template.name} template has been copied to clipboard.`,
                          });
                        }}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Subject: {template.subject}</p>
                    <p className="text-sm text-muted-foreground border-l-2 pl-3 py-1">{template.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffInvitation;