import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { UserCheck, Hash, User, FileText, Pill } from "lucide-react";

const VisitorAccess = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [medicalContext, setMedicalContext] = useState("");
  const [medications, setMedications] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Visitor access submitted:", { registerNumber, patientName, medicalContext, medications });
  };

  return (
    <div className="min-h-screen clinical-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative breathing circles */}
      <div className="absolute top-24 left-1/4 w-56 h-56 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-accent/6 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />
      
      <Card className="w-full max-w-lg card-gradient shadow-clinical border-0 animate-fade-in-up">
        <CardHeader className="text-center pb-2 pt-8">
          {/* Icon */}
          <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
            <UserCheck className="w-8 h-8 text-accent" />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Visitor Access
          </h1>
          
          {/* Subtext */}
          <p className="text-muted-foreground text-sm mt-2">
            Temporary supervised session
          </p>
        </CardHeader>

        <CardContent className="px-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Doctor/Nurse Register Number */}
            <div className="space-y-2">
              <Label htmlFor="registerNumber" className="text-sm font-medium text-foreground">
                Doctor or Nurse Register Number
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="registerNumber"
                  type="text"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="Supervising staff register number"
                  className="pl-10 h-12 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Patient Name */}
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

            {/* Medical Context */}
            <div className="space-y-2">
              <Label htmlFor="medicalContext" className="text-sm font-medium text-foreground">
                Medical Context / Reason for Visit
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="medicalContext"
                  value={medicalContext}
                  onChange={(e) => setMedicalContext(e.target.value)}
                  placeholder="Brief description of visit purpose"
                  rows={3}
                  className="pl-10 pt-3 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Current Medications */}
            <div className="space-y-2">
              <Label htmlFor="medications" className="text-sm font-medium text-foreground">
                Current Medications <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <div className="relative">
                <Pill className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="medications"
                  type="text"
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="List any current medications"
                  className="pl-10 h-12 bg-secondary/50 border-border/50 rounded-xl focus:bg-card focus:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-muted-foreground text-center px-4 pt-1">
              Visitor sessions are supervised and time-limited.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="clinical"
              size="lg"
              className="w-full mt-2"
            >
              Start Supervised Session
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-8 pt-4">
          <p className="text-xs text-muted-foreground text-center w-full">
            Temporary access • No account required
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VisitorAccess;
