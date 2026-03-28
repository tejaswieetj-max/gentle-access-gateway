import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Activity, ArrowLeft, ShieldCheck, Clock } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import SettingsManager from "./SettingsManager";

const VisitingPatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <SettingsManager />

      <div className="relative z-10 max-w-4xl mx-auto pt-8 animate-fade-in-up">
        <Breadcrumb 
          items={[
            { label: "Visiting Session", active: true }
          ]} 
        />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Supervised Session Only</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight m-0">
            Visitor Mode
          </h1>
          <p className="text-muted-foreground mt-2">Temporary access to breathing therapy systems</p>
        </div>

        <div className="grid gap-6">
          <Card
            onClick={() => navigate("/breathing-session")}
            className="glass-card p-8 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-clinical border-2 border-primary/20"
          >
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 animate-pulse">
                <Wind className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Guided Breathing Session</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start a supervised 5-minute breathing exercise. This session will not be saved to a permanent medical record.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-xs text-primary font-bold">
                    <Clock className="w-4 h-4" /> 5 MINS
                  </div>
                  <div className="flex items-center gap-1 text-xs text-accent font-bold">
                    <Activity className="w-4 h-4" /> LOW STRESS
                  </div>
                </div>
              </div>
              <Button size="lg" className="clinical hidden md:flex">Start Now</Button>
            </div>
          </Card>

          <Card className="glass-card p-6 border border-warning/30 bg-warning/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Session Protocol</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  As a visiting patient, your session data is cleared upon exit. Please consult with the duty nurse if you experience any dizziness during the therapy.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mt-12 mx-auto flex"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terminate Visitor Session
        </Button>
      </div>
    </div>
  );
};

export default VisitingPatientDashboard;
