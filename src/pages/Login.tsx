import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { UserRound, Building2, LogIn } from "lucide-react";
import { config } from "@/lib/config";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Staff";
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Admin" | "Staff">("Admin");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await fetch(`${config.env.serverUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password, 
          role 
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Login failed with status ${response.status}`);
      }
  
      const data: LoginResponse = await response.json();
      localStorage.setItem("token", data.token);
      
      const redirectPath = data.user.role === "Admin" 
        ? "/admin/dashboard" 
        : "/staff/invitation";
      
      navigate(redirectPath);
      
      toast({
        title: `Logged in as ${data.user.role}`,
        description: `Welcome to the ${data.user.role.toLowerCase()} panel`,
      });
  
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message.includes("credentials") 
          ? "Invalid email or password" 
          : error.message.includes("role") 
            ? "You don't have permission to access this panel"
            : error.message;
      }
  
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className="space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Guest Management System</CardTitle>
            <CardDescription className="text-center">Sign in to access your panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50"
                  required 
                />
              </div>
              <div className="space-y-2 pt-2">
                <Label>Select Role</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button" 
                    variant={role === "Admin" ? "default" : "outline"} 
                    className={`flex items-center gap-2 justify-center ${role === "Admin" ? "border-primary" : ""}`}
                    onClick={() => setRole("Admin")}
                  >
                    <Building2 className="h-4 w-4" />
                    Admin
                  </Button>
                  <Button 
                    type="button" 
                    variant={role === "Staff" ? "default" : "outline"} 
                    className={`flex items-center gap-2 justify-center ${role === "Staff" ? "border-primary" : ""}`}
                    onClick={() => setRole("Staff")}
                  >
                    <UserRound className="h-4 w-4" />
                    Staff
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
              onClick={handleLogin}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;