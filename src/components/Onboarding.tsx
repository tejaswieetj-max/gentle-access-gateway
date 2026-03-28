import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Pill, AlertTriangle, Shield, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
  icon: any;
  color: string;
}

const steps: Step[] = [
  {
    title: "Welcome to Gentle Access",
    description: "Your healing journey starts here. This platform is designed to support your recovery through guided therapy and clear information.",
    icon: Shield,
    color: "text-primary bg-primary/10",
  },
  {
    title: "Breathing Therapy",
    description: "Our interactive breathing system helps you manage stress and improve lung function. Follow the expanding circle and the soft audio prompts.",
    icon: Wind,
    color: "text-accent bg-accent/10",
  },
  {
    title: "Medication Clarity",
    description: "Never wonder about your treatment again. View all your prescribed medicines with plain-language explanations of their purpose.",
    icon: Pill,
    color: "text-primary bg-primary/10",
  },
  {
    title: "Always Protected",
    description: "The 'Call for Help' button is always available. Use it any time you feel discomfort or need immediate medical attention.",
    icon: AlertTriangle,
    color: "text-destructive bg-destructive/10",
  },
  {
    title: "Ready to Begin?",
    description: "You're all set. Take a deep breath and start your first session whenever you feel comfortable.",
    icon: CheckCircle2,
    color: "text-green-500 bg-green-500/10",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeStep = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <Card className="w-full max-w-lg glass-card p-8 animate-fade-in-up relative overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary flex">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-full transition-all duration-500",
                i <= currentStep ? "bg-primary" : "bg-transparent"
              )}
              style={{ width: `${100 / steps.length}%` }}
            />
          ))}
        </div>

        {/* Action: Skip */}
        {!isLastStep && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onComplete}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            Skip
          </Button>
        )}

        <div className="flex flex-col items-center text-center mt-4">
          <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-6", activeStep.color)}>
            <activeStep.icon className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {activeStep.title}
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            {activeStep.description}
          </p>

          <div className="flex items-center justify-between w-full pt-4 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(currentStep === 0 && "opacity-0 pointer-events-none")}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={nextStep}
              size="lg"
              className={cn("px-8", isLastStep ? "bg-green-600 hover:bg-green-700 text-white" : "clinical")}
            >
              {isLastStep ? "Ready" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
