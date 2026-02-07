import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, Pill, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  description: string;
  sideEffects: string[];
  instructions: string;
}

const medications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    purpose: "Blood Pressure Control",
    description: "This medicine helps lower your blood pressure by relaxing blood vessels, making it easier for your heart to pump blood throughout your body.",
    sideEffects: ["Dizziness", "Dry cough", "Fatigue"],
    instructions: "Take in the morning with or without food. Drink plenty of water.",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    purpose: "Blood Sugar Management",
    description: "This medication helps control blood sugar levels by improving how your body responds to insulin and reducing glucose production in the liver.",
    sideEffects: ["Nausea", "Stomach upset", "Diarrhea"],
    instructions: "Take with meals to reduce stomach upset.",
  },
  {
    id: "3",
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    purpose: "Heart Protection",
    description: "A low-dose aspirin helps prevent blood clots, reducing the risk of heart attack and stroke.",
    sideEffects: ["Stomach irritation", "Easy bruising"],
    instructions: "Take with food to protect your stomach.",
  },
];

const MedicationInfo = () => {
  const navigate = useNavigate();
  const [selectedMed, setSelectedMed] = useState<Medication>(medications[0]);

  const handleReadAloud = () => {
    const text = `${selectedMed.name}. ${selectedMed.dosage}, ${selectedMed.frequency}. ${selectedMed.description} ${selectedMed.instructions}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto pt-8 animate-fade-in-up">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate("/patient-dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Your Medications
          </h1>
          <Button
            variant="outline"
            onClick={handleReadAloud}
            className="gap-2"
          >
            <Volume2 className="w-4 h-4" />
            Read Aloud
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Medication List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Prescribed Medicines
            </h2>
            {medications.map((med) => (
              <Card
                key={med.id}
                onClick={() => setSelectedMed(med)}
                className={cn(
                  "glass-card p-4 cursor-pointer transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-clinical",
                  selectedMed.id === med.id
                    ? "border-2 border-primary bg-primary/5"
                    : "border-transparent"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Pill className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{med.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {med.dosage} • {med.frequency}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Medication Details */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Pill className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedMed.name}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-primary font-medium">{selectedMed.dosage}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{selectedMed.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Purpose */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    What this medicine does
                  </h3>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                    {selectedMed.purpose}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMed.description}
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Why you are taking it
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMed.instructions}
                  </p>
                </div>

                {/* Side Effects */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Possible Side Effects
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMed.sideEffects.map((effect, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-warning/10 text-warning-foreground rounded-full text-sm"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground text-center">
          Always consult your healthcare provider before making changes to your medication
        </p>
      </div>
    </div>
  );
};

export default MedicationInfo;
