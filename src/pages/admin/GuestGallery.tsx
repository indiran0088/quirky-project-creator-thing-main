
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";

const GuestGallery = () => {
  // Sample gallery items by event
  const galleryItems = {
    "corporate-gala": [
      { id: 1, title: "Opening Speech", thumbnail: "https://source.unsplash.com/random/300x200?event=1", date: "2024-12-15" },
      { id: 2, title: "Award Ceremony", thumbnail: "https://source.unsplash.com/random/300x200?ceremony=1", date: "2024-12-15" },
      { id: 3, title: "Dinner Reception", thumbnail: "https://source.unsplash.com/random/300x200?dinner=1", date: "2024-12-15" },
      { id: 4, title: "Entertainment", thumbnail: "https://source.unsplash.com/random/300x200?entertainment=1", date: "2024-12-15" },
      { id: 5, title: "Group Photo", thumbnail: "https://source.unsplash.com/random/300x200?group=1", date: "2024-12-15" },
      { id: 6, title: "Venue Setup", thumbnail: "https://source.unsplash.com/random/300x200?venue=1", date: "2024-12-15" },
    ],
    "product-launch": [
      { id: 7, title: "Product Showcase", thumbnail: "https://source.unsplash.com/random/300x200?product=1", date: "2024-11-10" },
      { id: 8, title: "Demonstration", thumbnail: "https://source.unsplash.com/random/300x200?demo=1", date: "2024-11-10" },
      { id: 9, title: "Guest Interactions", thumbnail: "https://source.unsplash.com/random/300x200?interaction=1", date: "2024-11-10" },
      { id: 10, title: "Press Photos", thumbnail: "https://source.unsplash.com/random/300x200?press=1", date: "2024-11-10" },
    ],
    "charity-event": [
      { id: 11, title: "Opening Ceremony", thumbnail: "https://source.unsplash.com/random/300x200?charity=1", date: "2025-01-20" },
      { id: 12, title: "Fundraising Activities", thumbnail: "https://source.unsplash.com/random/300x200?fundraising=1", date: "2025-01-20" },
      { id: 13, title: "Volunteer Group", thumbnail: "https://source.unsplash.com/random/300x200?volunteer=1", date: "2025-01-20" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Guest Gallery</h1>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload Images</span>
        </Button>
      </div>
      
      <Tabs defaultValue="corporate-gala">
        <TabsList className="w-full border-b mb-1 pb-1">
          <TabsTrigger value="corporate-gala">Corporate Gala</TabsTrigger>
          <TabsTrigger value="product-launch">Product Launch</TabsTrigger>
          <TabsTrigger value="charity-event">Charity Event</TabsTrigger>
        </TabsList>

        {Object.entries(galleryItems).map(([event, items]) => (
          <TabsContent key={event} value={event}>
            <Card>
              <CardHeader>
                <CardTitle>{event.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</CardTitle>
                <CardDescription>
                  {items.length} photos from this event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="overflow-hidden rounded-md border bg-white shadow-sm">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="h-full w-full object-cover transition-all hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GuestGallery;
