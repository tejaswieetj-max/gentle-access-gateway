import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Pill, AlertTriangle, Shield, ArrowLeft, Home, User } from "lucide-react";
import Onboarding from "./Onboarding";
import Breadcrumb from "./Breadcrumb";
import SettingsManager from "./SettingsManager";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const actions = [
  {
    id: "breathing",
    title: "Start Breathing Therapy",
    description: "Guided breathing exercises for relaxation and recovery",
    icon: Wind,
    route: "/breathing-session",
    variant: "default" as const,
  },
  {
    id: "medications",
    title: "View Medications",
    description: "See your prescribed medicines and instructions",
    icon: Pill,
    route: "/medications",
    variant: "default" as const,
  },
  {
    id: "emergency",
    title: "Emergency Help",
    description: "Immediately alert medical staff",
    icon: AlertTriangle,
    route: "#",
    variant: "emergency" as const,
  },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem("patient_onboarded");
    if (!onboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("patient_onboarded", "true");
    setShowOnboarding(false);
    toast("Welcome aboard!", {
      description: "You've successfully completed the orientation.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <SettingsManager />

      <div className="relative z-10 max-w-4xl mx-auto pt-8 pb-32 md:pb-8 animate-fade-in-up">
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
        
        <Breadcrumb 
          items={[
            { label: "Dashboard", active: true }
          ]} 
        />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Supervised by medical staff</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Patient Dashboard
          </h1>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6">
          {actions.map((action) => {
            const Icon = action.icon;
            const isEmergency = action.variant === "emergency";

            return (
              <Card
                key={action.id}
                onClick={() => action.route !== "#" && navigate(action.route)}
                className={`
                  glass-card p-6 cursor-pointer transition-all duration-300
                  hover:scale-[1.01] hover:shadow-clinical
                  ${isEmergency ? "border-2 border-destructive/50 bg-destructive/5" : ""}
                `}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0
                      ${isEmergency ? "bg-destructive text-destructive-foreground" : "bg-primary/10 text-primary"}
                    `}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-1 ${isEmergency ? "text-destructive" : "text-foreground"}`}>
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>
                  <div className="hidden md:block">
                    <Button
                      variant={isEmergency ? "destructive" : "clinical"}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (action.route !== "#") navigate(action.route);
                      }}
                    >
                      {isEmergency ? "Call Now" : "Start"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground text-center">
          All activities are monitored • Medical staff on standby
        </p>
      </div>

      {/* Tablet-First Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border px-4 py-2 md:hidden flex justify-around items-center z-50 h-20 shadow-lg">
        <Link to="/" className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-muted-foreground hover:text-primary transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase">Home</span>
        </Link>
        {actions.map((action) => {
          const Icon = action.icon;
          const isEmergency = action.variant === "emergency";
          return (
            <button
              key={action.id}
              onClick={() => action.route !== "#" && navigate(action.route)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[48px] min-h-[48px] transition-all",
                isEmergency ? "text-destructive" : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-1 uppercase">{action.id}</span>
            </button>
          )
        })}
        <button className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-muted-foreground hover:text-primary">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default PatientDashboard;
