import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Stethoscope, Hash, Lock, ArrowLeft } from "lucide-react";

const StaffLogin = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Staff login submitted:", { registerNumber });
    navigate("/staff-dashboard");
  };

  return (
    <div className="min-h-screen clinical-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative breathing circles */}
      <div className="absolute top-16 right-16 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-16 left-16 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />
      
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card className="w-full max-w-md glass-card border-0 animate-fade-in-up">
        <CardHeader className="text-center pb-2 pt-8">
          {/* Icon */}
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Medical Staff Login
          </h1>
          
          {/* Subtext */}
          <p className="text-muted-foreground text-sm mt-2">
            For doctors and nurses only
          </p>
        </CardHeader>

        <CardContent className="px-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Register Number Input */}
            <div className="space-y-2">
              <Label htmlFor="registerNumber" className="text-sm font-medium text-foreground">
                Register Number
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="registerNumber"
                  type="text"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="Enter your register number"
                  className="pl-10 h-12 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 h-12 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-muted-foreground text-center px-4">
              Authorized access for clinical supervision.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="clinical"
              size="lg"
              className="w-full mt-2"
            >
              Secure Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-8 pt-4">
          <p className="text-xs text-muted-foreground text-center w-full">
            Medical-grade system • Hospital-use prototype
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffLogin;
