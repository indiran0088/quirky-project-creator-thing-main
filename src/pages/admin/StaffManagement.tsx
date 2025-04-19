
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus, MoreVertical, Mail } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StaffManagement = () => {
  // Sample staff data
  const staffMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Event Coordinator",
      avatar: "SJ",
      status: "active",
      joinedDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      role: "Guest Relations",
      avatar: "MC",
      status: "active",
      joinedDate: "2023-02-22"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      role: "Venue Manager",
      avatar: "ER",
      status: "inactive",
      joinedDate: "2022-11-05"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@example.com",
      role: "Catering Supervisor",
      avatar: "DK",
      status: "active",
      joinedDate: "2023-04-10"
    },
    {
      id: 5,
      name: "Jessica Taylor",
      email: "jessica.t@example.com",
      role: "Event Coordinator",
      avatar: "JT",
      status: "active",
      joinedDate: "2023-05-18"
    },
    {
      id: 6,
      name: "Robert Wilson",
      email: "robert.w@example.com",
      role: "Guest Relations",
      avatar: "RW",
      status: "active",
      joinedDate: "2023-03-07"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add New Staff</span>
        </Button>
      </div>
      
      {/* Staff Roles Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Event Coordinators</CardTitle>
            <CardDescription>
              {staffMembers.filter(staff => staff.role === "Event Coordinator").length} staff members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {staffMembers
                .filter(staff => staff.role === "Event Coordinator")
                .map(staff => (
                  <Avatar key={staff.id} className="h-8 w-8 border border-primary">
                    <AvatarFallback>{staff.avatar}</AvatarFallback>
                  </Avatar>
                ))}
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Guest Relations</CardTitle>
            <CardDescription>
              {staffMembers.filter(staff => staff.role === "Guest Relations").length} staff members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {staffMembers
                .filter(staff => staff.role === "Guest Relations")
                .map(staff => (
                  <Avatar key={staff.id} className="h-8 w-8 border border-primary">
                    <AvatarFallback>{staff.avatar}</AvatarFallback>
                  </Avatar>
                ))}
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Other Roles</CardTitle>
            <CardDescription>
              {staffMembers.filter(staff => 
                staff.role !== "Event Coordinator" && staff.role !== "Guest Relations"
              ).length} staff members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {staffMembers
                .filter(staff => 
                  staff.role !== "Event Coordinator" && staff.role !== "Guest Relations"
                )
                .map(staff => (
                  <Avatar key={staff.id} className="h-8 w-8 border border-primary">
                    <AvatarFallback>{staff.avatar}</AvatarFallback>
                  </Avatar>
                ))}
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle>All Staff</CardTitle>
          <CardDescription>Manage staff members and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map(staff => (
                <TableRow key={staff.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{staff.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      staff.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(staff.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default StaffManagement;
