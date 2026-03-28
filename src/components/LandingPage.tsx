import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BedDouble, Stethoscope, HeartHandshake, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "patient" | "staff" | "nurse" | "visitor";

const roles = [
  {
    id: "patient" as Role,
    title: "Patient",
    icon: BedDouble,
    subtext: "Vitals & breathing",
    route: "/patient-login",
  },
  {
    id: "staff" as Role,
    title: "Medical Staff",
    icon: Stethoscope,
    subtext: "Doctor & Nurse",
    route: "/staff-login",
    highlighted: true,
  },
  {
    id: "nurse" as Role,
    title: "Nurse Staff",
    icon: HeartHandshake,
    subtext: "Patient care tasks",
    route: "/nurse-login",
  },
  {
    id: "visitor" as Role,
    title: "Visiting Patient",
    icon: Activity,
    subtext: "Temporary session",
    route: "/visitor-dashboard",
  },
];

const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("staff");
  const navigate = useNavigate();

  const handleBeginJourney = () => {
    const role = roles.find((r) => r.id === selectedRole);
    if (role) {
      navigate(role.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative breathing circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto animate-fade-in-up">
        {/* App Icon */}
        <div className="mb-8 w-24 h-24 glass-card rounded-3xl flex items-center justify-center border border-primary/20">
          <Activity className="w-12 h-12 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center tracking-tight mb-2">
          Interactive Breathing Assistant
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-primary text-center mb-4">
          & Medication Tracker
        </h2>
        <p className="text-muted-foreground text-center text-lg mb-12 max-w-md">
          Secure access for patients, visitors, and medical staff
        </p>

        {/* Role Selection */}
        <div className="w-full mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground text-center uppercase tracking-wider mb-6">
            Select Your Role
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <Card
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "glass-card p-6 cursor-pointer transition-all duration-300 border-2",
                    "hover:scale-[1.02] hover:shadow-clinical",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-clinical"
                      : "border-transparent",
                    role.highlighted && !isSelected && "ring-2 ring-primary/30"
                  )}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                      )}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {role.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{role.subtext}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleBeginJourney}
          variant="clinical"
          size="lg"
          className="px-12 py-6 text-lg"
        >
          Begin Healing Journey
        </Button>

        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground text-center">
          Secure medical-grade system • Hospital-use prototype
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
