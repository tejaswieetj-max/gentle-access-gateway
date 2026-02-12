import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, ClipboardList, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PatientTask {
  id: string;
  label: string;
  done: boolean;
}

interface PatientChecklist {
  id: string;
  name: string;
  room: string;
  vitals: { time: string; done: boolean }[];
  meals: { label: string; done: boolean }[];
  medicines: { name: string; done: boolean }[];
  note: string;
}

const initialPatients: PatientChecklist[] = [
  {
    id: "1", name: "John Smith", room: "ICU-12",
    vitals: [
      { time: "6:00 AM", done: false }, { time: "10:00 AM", done: false },
      { time: "2:00 PM", done: false }, { time: "6:00 PM", done: false }, { time: "10:00 PM", done: false },
    ],
    meals: [{ label: "Breakfast", done: false }, { label: "Lunch", done: false }, { label: "Dinner", done: false }],
    medicines: [
      { name: "Lisinopril 10mg", done: false }, { name: "Metformin 500mg", done: false },
      { name: "Aspirin 81mg", done: false }, { name: "Omeprazole 20mg", done: false },
    ],
    note: "",
  },
  {
    id: "2", name: "Maria Garcia", room: "Ward-3A",
    vitals: [
      { time: "6:00 AM", done: true }, { time: "10:00 AM", done: true },
      { time: "2:00 PM", done: false }, { time: "6:00 PM", done: false }, { time: "10:00 PM", done: false },
    ],
    meals: [{ label: "Breakfast", done: true }, { label: "Lunch", done: false }, { label: "Dinner", done: false }],
    medicines: [
      { name: "Amlodipine 5mg", done: true }, { name: "Atorvastatin 20mg", done: false },
      { name: "Metformin 500mg", done: false },
    ],
    note: "Patient reported mild headache in the morning.",
  },
  {
    id: "3", name: "Robert Chen", room: "ICU-08",
    vitals: [
      { time: "6:00 AM", done: true }, { time: "10:00 AM", done: true },
      { time: "2:00 PM", done: true }, { time: "6:00 PM", done: false }, { time: "10:00 PM", done: false },
    ],
    meals: [{ label: "Breakfast", done: true }, { label: "Lunch", done: true }, { label: "Dinner", done: false }],
    medicines: [
      { name: "Insulin 10 units", done: true }, { name: "Lisinopril 20mg", done: true },
      { name: "Aspirin 81mg", done: false }, { name: "Clopidogrel 75mg", done: false },
    ],
    note: "",
  },
  {
    id: "4", name: "Sarah Johnson", room: "Ward-2B",
    vitals: [
      { time: "6:00 AM", done: false }, { time: "10:00 AM", done: false },
      { time: "2:00 PM", done: false }, { time: "6:00 PM", done: false }, { time: "10:00 PM", done: false },
    ],
    meals: [{ label: "Breakfast", done: false }, { label: "Lunch", done: false }, { label: "Dinner", done: false }],
    medicines: [
      { name: "Paracetamol 500mg", done: false }, { name: "Amoxicillin 500mg", done: false },
      { name: "Omeprazole 20mg", done: false },
    ],
    note: "",
  },
];

const NurseDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patients, setPatients] = useState<PatientChecklist[]>(initialPatients);
  const [selectedId, setSelectedId] = useState(patients[0].id);

  const selected = patients.find((p) => p.id === selectedId)!;

  const toggleVital = (idx: number) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, vitals: p.vitals.map((v, i) => (i === idx ? { ...v, done: !v.done } : v)) }
          : p
      )
    );
  };

  const toggleMeal = (idx: number) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, meals: p.meals.map((m, i) => (i === idx ? { ...m, done: !m.done } : m)) }
          : p
      )
    );
  };

  const toggleMedicine = (idx: number) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, medicines: p.medicines.map((m, i) => (i === idx ? { ...m, done: !m.done } : m)) }
          : p
      )
    );
  };

  const updateNote = (note: string) => {
    setPatients((prev) => prev.map((p) => (p.id === selectedId ? { ...p, note } : p)));
  };

  const saveNote = () => {
    toast({ title: "Note saved", description: `Note for ${selected.name} has been saved.` });
  };

  const completedCount = (items: { done: boolean }[]) => items.filter((i) => i.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto pt-8 animate-fade-in-up">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Nurse Dashboard
          </h1>
          <p className="text-muted-foreground">Daily patient care checklist</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Assigned Patients
            </h2>
            {patients.map((p) => {
              const total = p.vitals.length + p.meals.length + p.medicines.length;
              const done = completedCount(p.vitals) + completedCount(p.meals) + completedCount(p.medicines);
              return (
                <Card
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={cn(
                    "glass-card p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
                    selectedId === p.id ? "border-2 border-primary bg-primary/5" : "border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm truncate">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">{p.room}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {done}/{total}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Checklist Detail */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.room}</p>
                </div>
              </div>

              {/* Vitals Checks */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Vitals Check ({completedCount(selected.vitals)}/{selected.vitals.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {selected.vitals.map((v, i) => (
                    <label
                      key={i}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors",
                        v.done ? "bg-primary/10 border-primary/30" : "bg-secondary/50 border-border/50"
                      )}
                    >
                      <Checkbox checked={v.done} onCheckedChange={() => toggleVital(i)} />
                      <span className={cn("text-sm", v.done ? "text-primary font-medium" : "text-foreground")}>
                        {v.time}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meals */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Meals ({completedCount(selected.meals)}/{selected.meals.length})
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {selected.meals.map((m, i) => (
                    <label
                      key={i}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors",
                        m.done ? "bg-primary/10 border-primary/30" : "bg-secondary/50 border-border/50"
                      )}
                    >
                      <Checkbox checked={m.done} onCheckedChange={() => toggleMeal(i)} />
                      <span className={cn("text-sm", m.done ? "text-primary font-medium" : "text-foreground")}>
                        {m.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Medicines */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Medicines ({completedCount(selected.medicines)}/{selected.medicines.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selected.medicines.map((m, i) => (
                    <label
                      key={i}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors",
                        m.done ? "bg-primary/10 border-primary/30" : "bg-secondary/50 border-border/50"
                      )}
                    >
                      <Checkbox checked={m.done} onCheckedChange={() => toggleMedicine(i)} />
                      <span className={cn("text-sm", m.done ? "text-primary font-medium" : "text-foreground")}>
                        {m.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Nurse Notes
                </h3>
                <Textarea
                  value={selected.note}
                  onChange={(e) => updateNote(e.target.value)}
                  placeholder="Add notes about this patient..."
                  rows={3}
                  className="bg-secondary/50 border-border/50 rounded-xl resize-none mb-3"
                />
                <Button variant="clinical" size="sm" className="gap-2" onClick={saveNote}>
                  <Save className="w-4 h-4" />
                  Save Note
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          Nursing care system • All actions logged
        </p>
      </div>
    </div>
  );
};

export default NurseDashboard;
