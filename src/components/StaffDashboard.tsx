import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PatientStatus = "active" | "completed" | "attention";

interface Patient {
  id: string;
  name: string;
  room: string;
  status: PatientStatus;
  lastActivity: string;
}

const patients: Patient[] = [
  { id: "1", name: "John Smith", room: "ICU-12", status: "active", lastActivity: "Breathing session in progress" },
  { id: "2", name: "Maria Garcia", room: "Ward-3A", status: "attention", lastActivity: "Missed medication reminder" },
  { id: "3", name: "Robert Chen", room: "ICU-08", status: "completed", lastActivity: "Session completed 10 min ago" },
  { id: "4", name: "Sarah Johnson", room: "Ward-2B", status: "active", lastActivity: "Viewing medications" },
  { id: "5", name: "Michael Brown", room: "Ward-4C", status: "completed", lastActivity: "All tasks completed" },
];

const statusConfig = {
  active: {
    label: "Active Session",
    icon: Activity,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  attention: {
    label: "Needs Attention",
    icon: AlertCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-5xl mx-auto pt-8 animate-fade-in-up">
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Medical Staff Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage patient sessions in real-time
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(statusConfig).map(([key, config]) => {
            const Icon = config.icon;
            const count = patients.filter((p) => p.status === key).length;

            return (
              <Card key={key} className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.className)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Patient List */}
        <Card className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Patient Sessions</h2>
          </div>
          <div className="divide-y divide-border">
            {patients.map((patient) => {
              const status = statusConfig[patient.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={patient.id}
                  className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {patient.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {patient.room}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{patient.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={cn("gap-1", status.className)}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Session
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground text-center">
          Medical-grade monitoring system • Real-time updates
        </p>
      </div>
    </div>
  );
};

export default StaffDashboard;
