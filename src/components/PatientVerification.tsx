import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { User, Shield } from "lucide-react";

const PatientVerification = () => {
  const [patientName, setPatientName] = useState("");
  const [verificationAnswer, setVerificationAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification logic here
    console.log("Verification submitted:", { patientName, verificationAnswer });
  };

  return (
    <div className="min-h-screen clinical-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative breathing circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />
      
      <Card className="w-full max-w-md card-gradient shadow-clinical border-0 animate-fade-in-up">
        <CardHeader className="text-center pb-2 pt-8">
          {/* Icon */}
          <div className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Patient Verification
          </h1>
          
          {/* Subtext */}
          <p className="text-muted-foreground text-sm mt-2">
            Lightweight verification for supervised care
          </p>
        </CardHeader>

        <CardContent className="px-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Patient Name Input */}
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-sm font-medium text-foreground">
                Patient Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="patientName"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                  className="pl-10 h-12 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Verification Question Input */}
            <div className="space-y-2">
              <Label htmlFor="verification" className="text-sm font-medium text-foreground">
                Verification Question Answer
              </Label>
              <Input
                id="verification"
                type="text"
                value={verificationAnswer}
                onChange={(e) => setVerificationAnswer(e.target.value)}
                placeholder="Answer a question only the patient knows"
                className="h-12 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200"
              />
            </div>

            {/* Helper Text */}
            <p className="text-xs text-muted-foreground text-center px-4">
              This verification helps ensure safe supervised access.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="clinical"
              size="lg"
              className="w-full mt-2"
            >
              Continue to Care
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-8 pt-4">
          <p className="text-xs text-muted-foreground text-center w-full">
            Hospital-use prototype • Supervised access
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientVerification;
