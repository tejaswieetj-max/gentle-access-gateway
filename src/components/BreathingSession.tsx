import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Volume2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type BreathingPhase = "inhale" | "hold" | "exhale";

const phaseConfig = {
  inhale: { label: "Inhale", duration: 4000, instruction: "Breathe in slowly through your nose" },
  hold: { label: "Hold", duration: 4000, instruction: "Hold your breath gently" },
  exhale: { label: "Exhale", duration: 6000, instruction: "Release slowly through your mouth" },
};

const phaseOrder: BreathingPhase[] = ["inhale", "hold", "exhale"];

const BreathingSession = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<BreathingPhase>("inhale");
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const totalCycles = 5;

  const nextPhase = useCallback(() => {
    const currentIndex = phaseOrder.indexOf(phase);
    const nextIndex = (currentIndex + 1) % phaseOrder.length;
    
    if (nextIndex === 0) {
      setCycleCount((prev) => {
        if (prev + 1 >= totalCycles) {
          setIsActive(false);
          return prev + 1;
        }
        return prev + 1;
      });
    }
    
    setPhase(phaseOrder[nextIndex]);
  }, [phase]);

  useEffect(() => {
    if (!isActive) return;

    const phaseDuration = phaseConfig[phase].duration;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / phaseDuration) * 100);

      if (elapsed >= phaseDuration) {
        setProgress(0);
        nextPhase();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase, isActive, nextPhase]);

  const currentConfig = phaseConfig[phase];
  const overallProgress = ((cycleCount / totalCycles) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <div className="relative z-10 p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/patient-dashboard")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8 animate-fade-in-up">
          Guided Breathing Session
        </h1>

        {/* Breathing Circle */}
        <div className="relative mb-8">
          <div
            className={cn(
              "w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center transition-all duration-1000",
              "bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30",
              phase === "inhale" && "scale-110",
              phase === "hold" && "scale-110",
              phase === "exhale" && "scale-100"
            )}
          >
            <div
              className={cn(
                "w-48 h-48 md:w-60 md:h-60 rounded-full flex flex-col items-center justify-center transition-all duration-1000",
                "bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary/40"
              )}
            >
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {currentConfig.label}
              </span>
              <span className="text-sm text-muted-foreground text-center px-4">
                {currentConfig.instruction}
              </span>
            </div>
          </div>

          {/* Phase Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray={`${progress * 3.01} 301`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
        </div>

        {/* Voice Guidance Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
          <Volume2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Voice guidance enabled</span>
        </div>

        {/* Session Progress */}
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Session Progress</span>
            <span>Cycle {Math.min(cycleCount + 1, totalCycles)} of {totalCycles}</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Completion Message */}
        {!isActive && (
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-xl font-semibold text-primary mb-2">Session Complete!</p>
            <p className="text-muted-foreground">Great job completing your breathing exercise.</p>
          </div>
        )}
      </div>

      {/* Emergency Button */}
      <div className="relative z-10 p-6 pb-12">
        <Button
          variant="destructive"
          size="lg"
          className="w-full max-w-md mx-auto flex gap-2"
          onClick={() => alert("Emergency alert sent to medical staff!")}
        >
          <AlertTriangle className="w-5 h-5" />
          Call for Help
        </Button>
      </div>
    </div>
  );
};

export default BreathingSession;
