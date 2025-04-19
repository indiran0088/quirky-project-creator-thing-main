
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash2, MoreVertical, Share } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const StaffGallery = () => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  // Sample gallery items by event
  const galleryItems = {
    "corporate-gala": [
      { id: 1, title: "Opening Speech", thumbnail: "https://source.unsplash.com/random/300x200?event=1", date: "2024-12-15" },
      { id: 2, title: "Award Ceremony", thumbnail: "https://source.unsplash.com/random/300x200?ceremony=1", date: "2024-12-15" },
      { id: 3, title: "Dinner Reception", thumbnail: "https://source.unsplash.com/random/300x200?dinner=1", date: "2024-12-15" },
      { id: 4, title: "Entertainment", thumbnail: "https://source.unsplash.com/random/300x200?entertainment=1", date: "2024-12-15" },
    ],
    "product-launch": [
      { id: 5, title: "Product Showcase", thumbnail: "https://source.unsplash.com/random/300x200?product=1", date: "2024-11-10" },
      { id: 6, title: "Demonstration", thumbnail: "https://source.unsplash.com/random/300x200?demo=1", date: "2024-11-10" },
      { id: 7, title: "Guest Interactions", thumbnail: "https://source.unsplash.com/random/300x200?interaction=1", date: "2024-11-10" },
    ],
    "team-retreat": [
      { id: 8, title: "Team Building", thumbnail: "https://source.unsplash.com/random/300x200?team=1", date: "2025-01-20" },
      { id: 9, title: "Workshop Session", thumbnail: "https://source.unsplash.com/random/300x200?workshop=1", date: "2025-01-20" },
      { id: 10, title: "Group Photo", thumbnail: "https://source.unsplash.com/random/300x200?group=1", date: "2025-01-20" },
    ],
  };

  // Toggle image selection
  const toggleImageSelection = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // Clear all selections
  const clearSelection = () => {
    setSelectedImages([]);
  };

  // Handle bulk actions
  const handleDownloadSelected = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${selectedImages.length} images`,
    });
    clearSelection();
  };

  const handleDeleteSelected = () => {
    toast({
      title: "Images Deleted",
      description: `${selectedImages.length} images have been deleted`,
    });
    clearSelection();
  };

  const handleShareSelected = () => {
    toast({
      title: "Sharing Images",
      description: `${selectedImages.length} images ready to be shared`,
    });
    clearSelection();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload Images</span>
        </Button>
      </div>
      
      {selectedImages.length > 0 && (
        <div className="bg-muted p-4 rounded-md flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">{selectedImages.length} images selected</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={handleDownloadSelected}
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={handleShareSelected}
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              className="flex items-center gap-2"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearSelection}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="corporate-gala">
        <TabsList className="w-full border-b mb-1 pb-1">
          <TabsTrigger value="corporate-gala">Corporate Gala</TabsTrigger>
          <TabsTrigger value="product-launch">Product Launch</TabsTrigger>
          <TabsTrigger value="team-retreat">Team Retreat</TabsTrigger>
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
                    <div key={item.id} className="group relative overflow-hidden rounded-md border bg-white shadow-sm">
                      <div 
                        className="absolute left-2 top-2 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImageSelection(item.id);
                        }}
                      >
                        <div className={`h-5 w-5 rounded border ${
                          selectedImages.includes(item.id) 
                            ? 'bg-primary border-primary' 
                            : 'bg-white border-gray-300'
                        } flex items-center justify-center`}>
                          {selectedImages.includes(item.id) && (
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-3.5 w-3.5 text-white" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="absolute right-2 top-2 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Share className="h-4 w-4" />
                              <span>Share</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div 
                        className="relative aspect-video w-full overflow-hidden cursor-pointer"
                        onClick={() => toggleImageSelection(item.id)}
                      >
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className={`h-full w-full object-cover transition-all group-hover:scale-105 ${
                            selectedImages.includes(item.id) ? 'opacity-70' : ''
                          }`}
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

export default StaffGallery;
