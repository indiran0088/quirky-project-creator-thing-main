
import React, { useState, useEffect } from "react";
import { Search, Users, Filter, Linkedin, Download, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Guest interface
interface Guest {
  id: number;
  name: string;
  email: string;
  category: string;
  phone: string;
  status: "Confirmed" | "Pending" | "Declined";
  company?: string;
  position?: string;
  location?: string;
  linkedinProfile?: string;
  profileImage?: string;
  attendanceHistory?: {
    eventName: string;
    date: string;
    attended: boolean;
  }[];
}

const FindGuest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [linkedInImport, setLinkedInImport] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Technology categories
  const categories = [
    { id: "software-engineer", name: "Software Engineer" },
    { id: "catt", name: "CATT" },
    { id: "sports", name: "Sports" },
    { id: "culturals", name: "Culturals" },
    { id: "education", name: "Education" },
    { id: "womans-day", name: "Woman's Day" },
    { id: "graduation-day", name: "Graduation Day" },
    { id: "freshers-day", name: "Freshers Day" },
    { id: "iyarkai", name: "Iyarkai" },
  ];
  
  // Mock guest data generation - 1000 guests (100 per category)
  const generateMockGuests = (): Guest[] => {
    const guests: Guest[] = [];
    const statuses: ("Confirmed" | "Pending" | "Declined")[] = ["Confirmed", "Pending", "Declined"];
    const companies = ["TechCorp", "InnovateInc", "DataSystems", "WebSolutions", "AITech", "CloudComputing", "DevOpsLtd", "CyberSecurity", "MobileDev", "BlockchainTech"];
    const positions = ["Developer", "Engineer", "Manager", "Director", "Specialist", "Analyst", "Consultant", "Lead", "Architect", "Designer"];
    const locations = ["New York", "San Francisco", "London", "Bangalore", "Tokyo", "Berlin", "Toronto", "Sydney", "Paris", "Singapore"];
    
    categories.forEach(category => {
      for (let i = 1; i <= 100; i++) {
        const firstName = `Guest${Math.floor(Math.random() * 1000)}`;
        const lastName = `${category.name.split(' ')[0]}${Math.floor(Math.random() * 100)}`;
        const name = `${firstName} ${lastName}`;
        
        // Generate random attendance history
        const attendanceHistory = [];
        const eventNames = ["Annual Conference", "Tech Meetup", "Workshop", "Seminar", "Networking Event"];
        
        for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
          const eventDate = new Date();
          eventDate.setDate(eventDate.getDate() - Math.floor(Math.random() * 365));
          
          attendanceHistory.push({
            eventName: eventNames[Math.floor(Math.random() * eventNames.length)],
            date: eventDate.toISOString().split('T')[0],
            attended: Math.random() > 0.3
          });
        }
        
        guests.push({
          id: guests.length + 1,
          name,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          category: category.id,
          phone: `+1${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          company: companies[Math.floor(Math.random() * companies.length)],
          position: positions[Math.floor(Math.random() * positions.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          linkedinProfile: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
          profileImage: `https://i.pravatar.cc/150?u=${guests.length + 1}`,
          attendanceHistory
        });
      }
    });
    
    return guests;
  };

  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  
  // Initialize mock guest data
  useEffect(() => {
    setAllGuests(generateMockGuests());
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      let results = [...allGuests];
      
      // Filter by search query
      if (searchQuery) {
        results = results.filter(guest => 
          guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.position?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory) {
        results = results.filter(guest => guest.category === selectedCategory);
      }
      
      // Filter by status
      if (statusFilter) {
        results = results.filter(guest => guest.status.toLowerCase() === statusFilter.toLowerCase());
      }
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  // Handle LinkedIn import
  const handleLinkedInImport = () => {
    setLinkedInImport(true);
    toast({
      title: "LinkedIn Integration",
      description: "Connecting to LinkedIn API...",
    });
    
    setTimeout(() => {
      toast({
        title: "LinkedIn Import Complete",
        description: "Successfully imported guests from LinkedIn",
      });
      setLinkedInImport(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Find Guest</h1>
        <Button 
          onClick={handleLinkedInImport}
          className="flex items-center gap-2"
          disabled={linkedInImport}
        >
          <Linkedin className="h-4 w-4" />
          {linkedInImport ? "Connecting..." : "Import from LinkedIn"}
        </Button>
      </div>
      
      <Card className="border-t-4 border-t-primary shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Search className="h-5 w-5" /> Search Guests
          </CardTitle>
          <CardDescription>
            Find guests by name, email, or filter by categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">Search by name or email</Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder="Search by name, email, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    <Search className="h-4 w-4 mr-2" />
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                    <Filter className="h-4 w-4" />
                    Filters
                    {(selectedCategory || statusFilter) && (
                      <Badge variant="secondary" className="ml-2">
                        {(selectedCategory ? 1 : 0) + (statusFilter ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Options</h4>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Status</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedCategory(null);
                          setStatusFilter(null);
                        }}
                      >
                        Clear Filters
                      </Button>
                      <Button onClick={handleSearch}>Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Label className="mr-2 pt-1">Quick Filters:</Label>
              <ToggleGroup 
                type="single" 
                className="flex flex-wrap gap-2" 
                onValueChange={setSelectedCategory} 
                value={selectedCategory || ""}
              >
                {categories.map((category) => (
                  <ToggleGroupItem 
                    key={category.id} 
                    value={category.id} 
                    aria-label={category.name} 
                    className="px-3 py-1 text-xs h-auto"
                    onClick={handleSearch}
                  >
                    {category.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {searchResults.length > 0 && (
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Search Results <Badge variant="secondary">{searchResults.length} guests</Badge>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSearchResults([])}>
                Clear Results
              </Button>
            </div>
            <CardDescription>
              Select a guest to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.slice(0, 9).map((guest) => (
                <Card key={guest.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/5 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10 border-2 border-white/50">
                            <AvatarImage src={guest.profileImage} />
                            <AvatarFallback>{guest.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{guest.name}</h3>
                            <p className="text-sm text-muted-foreground">{guest.position} at {guest.company}</p>
                          </div>
                        </div>
                        <Badge className={
                          guest.status === 'Confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                          guest.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 
                          'bg-red-100 text-red-800 hover:bg-red-200'
                        }>
                          {guest.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-sm text-muted-foreground">{guest.email}</p>
                      <p className="text-sm text-muted-foreground">{guest.phone}</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === guest.category)?.name}
                        </Badge>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm">View Details</Button>
                          </SheetTrigger>
                          <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={guest.profileImage} />
                                  <AvatarFallback>{guest.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <SheetTitle>{guest.name}</SheetTitle>
                                  <SheetDescription>{guest.position} at {guest.company}</SheetDescription>
                                </div>
                              </div>
                            </SheetHeader>
                            <div className="py-6">
                              <Tabs defaultValue="profile">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="profile">Profile</TabsTrigger>
                                  <TabsTrigger value="history">History</TabsTrigger>
                                  <TabsTrigger value="notes">Notes</TabsTrigger>
                                </TabsList>
                                <TabsContent value="profile" className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium text-sm text-muted-foreground">Email</h4>
                                      <p>{guest.email}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sm text-muted-foreground">Phone</h4>
                                      <p>{guest.phone}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sm text-muted-foreground">Category</h4>
                                      <p>{categories.find(c => c.id === guest.category)?.name}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                                      <Badge className={
                                        guest.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                                        guest.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'
                                      }>
                                        {guest.status}
                                      </Badge>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
                                      <p>{guest.location}</p>
                                    </div>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">LinkedIn Profile</h4>
                                    <a 
                                      href={guest.linkedinProfile} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-primary hover:underline"
                                    >
                                      <Linkedin className="h-4 w-4" />
                                      View on LinkedIn
                                    </a>
                                  </div>
                                </TabsContent>
                                <TabsContent value="history" className="space-y-4 mt-4">
                                  {guest.attendanceHistory && guest.attendanceHistory.length > 0 ? (
                                    <div className="space-y-3">
                                      {guest.attendanceHistory.map((event, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                          <div>
                                            <p className="font-medium">{event.eventName}</p>
                                            <p className="text-sm text-muted-foreground">{event.date}</p>
                                          </div>
                                          {event.attended ? (
                                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                              <UserCheck className="h-3 w-3 mr-1" /> Attended
                                            </Badge>
                                          ) : (
                                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                              <AlertCircle className="h-3 w-3 mr-1" /> Missed
                                            </Badge>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-muted-foreground">No attendance history available.</p>
                                  )}
                                </TabsContent>
                                <TabsContent value="notes" className="space-y-4 mt-4">
                                  <p className="text-muted-foreground italic">No notes available for this guest.</p>
                                  <div className="space-y-2">
                                    <Label htmlFor="notes">Add a note</Label>
                                    <textarea 
                                      id="notes" 
                                      className="w-full h-32 resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                      placeholder="Add notes about this guest..."
                                    />
                                    <Button className="w-full">Save Note</Button>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {searchResults.length > 9 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Showing 9 of {searchResults.length} results
                </p>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export All Results
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {searchResults.length === 0 && searchQuery && !isLoading && (
        <div className="text-center py-10 border rounded-lg bg-gradient-to-b from-background to-muted/20">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No guests found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {isLoading && (
        <Card className="p-10 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-primary/20 h-12 w-12 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary/30" />
            </div>
            <h3 className="text-lg font-medium">Searching for guests...</h3>
            <p className="text-sm text-muted-foreground mt-1">This may take a moment</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FindGuest;
