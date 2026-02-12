import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, VolumeX, Pill, Clock, AlertCircle, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  frequencyHi: string;
  purpose: string;
  purposeHi: string;
  description: string;
  descriptionHi: string;
  sideEffects: string[];
  sideEffectsHi: string[];
  instructions: string;
  instructionsHi: string;
}

const medications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    frequencyHi: "दिन में एक बार",
    purpose: "Blood Pressure Control",
    purposeHi: "रक्तचाप नियंत्रण",
    description: "This medicine helps lower your blood pressure by relaxing blood vessels, making it easier for your heart to pump blood throughout your body.",
    descriptionHi: "यह दवा रक्त वाहिकाओं को आराम देकर आपके रक्तचाप को कम करने में मदद करती है, जिससे आपके हृदय के लिए पूरे शरीर में रक्त पंप करना आसान हो जाता है।",
    sideEffects: ["Dizziness", "Dry cough", "Fatigue"],
    sideEffectsHi: ["चक्कर आना", "सूखी खांसी", "थकान"],
    instructions: "Take in the morning with or without food. Drink plenty of water.",
    instructionsHi: "सुबह खाने के साथ या बिना खाने के लें। खूब पानी पिएं।",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    frequencyHi: "दिन में दो बार",
    purpose: "Blood Sugar Management",
    purposeHi: "रक्त शर्करा प्रबंधन",
    description: "This medication helps control blood sugar levels by improving how your body responds to insulin and reducing glucose production in the liver.",
    descriptionHi: "यह दवा इंसुलिन के प्रति आपके शरीर की प्रतिक्रिया में सुधार करके और लिवर में ग्लूकोज उत्पादन को कम करके रक्त शर्करा के स्तर को नियंत्रित करने में मदद करती है।",
    sideEffects: ["Nausea", "Stomach upset", "Diarrhea"],
    sideEffectsHi: ["मतली", "पेट खराब", "दस्त"],
    instructions: "Take with meals to reduce stomach upset.",
    instructionsHi: "पेट की खराबी को कम करने के लिए भोजन के साथ लें।",
  },
  {
    id: "3",
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    frequencyHi: "दिन में एक बार",
    purpose: "Heart Protection",
    purposeHi: "हृदय सुरक्षा",
    description: "A low-dose aspirin helps prevent blood clots, reducing the risk of heart attack and stroke.",
    descriptionHi: "कम खुराक वाली एस्पिरिन रक्त के थक्कों को रोकने में मदद करती है, जिससे दिल के दौरे और स्ट्रोक का खतरा कम होता है।",
    sideEffects: ["Stomach irritation", "Easy bruising"],
    sideEffectsHi: ["पेट में जलन", "आसानी से चोट लगना"],
    instructions: "Take with food to protect your stomach.",
    instructionsHi: "अपने पेट की सुरक्षा के लिए भोजन के साथ लें।",
  },
];

const MedicationInfo = () => {
  const navigate = useNavigate();
  const [selectedMed, setSelectedMed] = useState<Medication>(medications[0]);
  const [isHindi, setIsHindi] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleReadAloud = useCallback((med: Medication) => {
    speechSynthesis.cancel();
    if (speakingId === med.id) {
      setSpeakingId(null);
      return;
    }
    const text = isHindi
      ? `${med.name}। ${med.dosage}, ${med.frequencyHi}। ${med.descriptionHi} ${med.instructionsHi}`
      : `${med.name}. ${med.dosage}, ${med.frequency}. ${med.description} ${med.instructions}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.lang = isHindi ? "hi-IN" : "en-US";
    utterance.onend = () => setSpeakingId(null);
    setSpeakingId(med.id);
    speechSynthesis.speak(utterance);
  }, [isHindi, speakingId]);

  const t = (en: string, hi: string) => (isHindi ? hi : en);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto pt-8 animate-fade-in-up">
        <Button variant="ghost" onClick={() => navigate("/patient-dashboard")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("Back to Dashboard", "डैशबोर्ड पर वापस")}
        </Button>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("Your Medications", "आपकी दवाइयाँ")}
          </h1>
          <Button
            variant="outline"
            onClick={() => { speechSynthesis.cancel(); setSpeakingId(null); setIsHindi(!isHindi); }}
            className="gap-2"
          >
            <Languages className="w-4 h-4" />
            {isHindi ? "English" : "हिन्दी"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Medication List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              {t("Prescribed Medicines", "निर्धारित दवाइयाँ")}
            </h2>
            {medications.map((med) => (
              <Card
                key={med.id}
                onClick={() => setSelectedMed(med)}
                className={cn(
                  "glass-card p-4 cursor-pointer transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-clinical",
                  selectedMed.id === med.id ? "border-2 border-primary bg-primary/5" : "border-transparent"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Pill className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{med.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {med.dosage} • {isHindi ? med.frequencyHi : med.frequency}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    onClick={(e) => { e.stopPropagation(); handleReadAloud(med); }}
                  >
                    {speakingId === med.id ? (
                      <VolumeX className="w-4 h-4 text-destructive" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-primary" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Medication Details */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6 h-full">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Pill className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedMed.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-primary font-medium">{selectedMed.dosage}</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{isHindi ? selectedMed.frequencyHi : selectedMed.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleReadAloud(selectedMed)}
                  className="gap-2 shrink-0"
                >
                  {speakingId === selectedMed.id ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                  {t("Read Aloud", "पढ़कर सुनाएं")}
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t("What this medicine does", "यह दवा क्या करती है")}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                    {isHindi ? selectedMed.purposeHi : selectedMed.purpose}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {isHindi ? selectedMed.descriptionHi : selectedMed.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t("How to take it", "इसे कैसे लें")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isHindi ? selectedMed.instructionsHi : selectedMed.instructions}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("Possible Side Effects", "संभावित दुष्प्रभाव")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isHindi ? selectedMed.sideEffectsHi : selectedMed.sideEffects).map((effect, index) => (
                      <span key={index} className="px-3 py-1 bg-warning/10 text-warning-foreground rounded-full text-sm">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          {t(
            "Always consult your healthcare provider before making changes to your medication",
            "अपनी दवा में कोई बदलाव करने से पहले हमेशा अपने स्वास्थ्य सेवा प्रदाता से परामर्श करें"
          )}
        </p>
      </div>
    </div>
  );
};

export default MedicationInfo;
