import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Pill, AlertTriangle, Shield, ArrowLeft } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-4xl mx-auto pt-8 animate-fade-in-up">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

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
    </div>
  );
};

export default PatientDashboard;
