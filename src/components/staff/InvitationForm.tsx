
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { config } from "@/lib/config";

// Define form validation schema
const formSchema = z.object({
  guestName: z.string().min(2, { message: "Guest name must be at least 2 characters." }),
  guestEmail: z.string().email({ message: "Please enter a valid email address." }),
  collegeName: z.string().min(2, { message: "College name must be at least 2 characters." }),
  eventTitle: z.string().min(2, { message: "Event title must be at least 2 characters." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  staffNumber: z.string().min(3, { message: "Staff number must be at least 3 characters." }),
  staffEmail: z.string().email({ message: "Please enter a valid staff email address." }),
});

type FormValues = z.infer<typeof formSchema>;

interface InvitationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InvitationForm = ({ open, onOpenChange }: InvitationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      collegeName: "",
      eventTitle: "",
      subject: "",
      staffNumber: "",
      staffEmail: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${config.env.serverUrl}/api/invitations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      toast({
        title: "Invitation Sent",
        description: `Invitation email has been sent to ${data.guestName}`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>New Invitation</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="guestEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Email</FormLabel>
                  <FormControl>
                    <Input placeholder="guest@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="University of Example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Annual Gala" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject (Purpose)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the invitation purpose" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="staffNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff Number</FormLabel>
                  <FormControl>
                    <Input placeholder="STF123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="staffEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff Email</FormLabel>
                  <FormControl>
                    <Input placeholder="staff@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default InvitationForm;
