import { AlertCircle, WifiOff, FileSearch, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ErrorStateProps {
  type: "session-drop" | "no-protocol" | "network-lost";
  onRetry?: () => void;
}

const ErrorStates = ({ type, onRetry }: ErrorStateProps) => {
  const navigate = useNavigate();

  const configs = {
    "session-drop": {
      title: "Session Paused",
      description: "We've lost connection to the breathing sensor. Please stay calm and try to reconnect.",
      icon: RefreshCcw,
      color: "text-primary bg-primary/10",
      action: "Reconnect Sensor",
    },
    "no-protocol": {
      title: "No Protocol Assigned",
      description: "A customized breathing plan hasn't been assigned to you yet. Medical staff will update this shortly.",
      icon: FileSearch,
      color: "text-accent bg-accent/10",
      action: "Alert Nurse",
    },
    "network-lost": {
      title: "Connection Lost",
      description: "The hospital network is temporarily unavailable. Your current session data is saved locally.",
      icon: WifiOff,
      color: "text-destructive bg-destructive/10",
      action: "Try Again",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
      <Card className="max-w-md glass-card p-10 flex flex-col items-center shadow-xl border-t-4 border-t-primary">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${config.color}`}>
          <Icon className="w-10 h-10 animate-pulse" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {config.title}
        </h2>
        
        <p className="text-muted-foreground leading-relaxed mb-8">
          {config.description}
        </p>

        <div className="flex flex-col w-full gap-3">
          <Button onClick={onRetry} size="lg" className="clinical w-full">
            {config.action}
          </Button>
          <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </Card>
      
      <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
        <AlertCircle className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium italic">
          System automatically monitors all critical states
        </span>
      </div>
    </div>
  );
};

export default ErrorStates;
