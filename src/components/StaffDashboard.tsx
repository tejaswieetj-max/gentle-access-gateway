import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Eye, Activity, CheckCircle2, AlertCircle, Heart, Stethoscope, Apple,
  Pill, FileText, Dumbbell, ChefHat, X, LayoutDashboard, ChevronRight
} from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import SettingsManager from "./SettingsManager";
import { cn } from "@/lib/utils";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

interface Medicine {
  name: string;
  dosage: string;
  timing: string; // e.g. "Before Breakfast", "After Lunch"
  taken: boolean;
}

interface Patient {
  id: string;
  name: string;
  room: string;
  status: "active" | "completed" | "attention";
  lastActivity: string;
  nurseNotes: string[];
  nutritionistCheckup: boolean;
  physiotherapistCheckup: boolean;
  meals: { label: string; eaten: boolean }[];
  medicines: Medicine[];
  vitals: {
    bloodPressure: { time: string; systolic: number; diastolic: number }[];
    heartRate: { time: string; bpm: number }[];
    oxygenSaturation: { time: string; spo2: number }[];
    breathingTherapy: { session: string; score: number }[];
  };
}

const patients: Patient[] = [


  {
    id: "1", name: "John Smith", room: "ICU-12", status: "active",
    lastActivity: "Breathing session in progress",
    nurseNotes: [
      "6:00 AM — Vitals stable. Patient rested well overnight.",
      "10:00 AM — Mild discomfort reported. Administered pain relief.",
      "2:00 PM — Completed breathing therapy. SpO2 improved to 97%.",
    ],
    nutritionistCheckup: true, physiotherapistCheckup: false,
    meals: [{ label: "Breakfast", eaten: true }, { label: "Lunch", eaten: true }, { label: "Dinner", eaten: false }],
    medicines: [
      { name: "Lisinopril 10mg", dosage: "10mg", timing: "Before Breakfast", taken: true },
      { name: "Metformin 500mg", dosage: "500mg", timing: "After Breakfast", taken: true },
      { name: "Aspirin 81mg", dosage: "81mg", timing: "After Lunch", taken: true },
      { name: "Omeprazole 20mg", dosage: "20mg", timing: "Before Dinner", taken: false },
    ],
    vitals: {
      bloodPressure: [
        { time: "6 AM", systolic: 135, diastolic: 88 }, { time: "10 AM", systolic: 128, diastolic: 82 },
        { time: "2 PM", systolic: 122, diastolic: 78 }, { time: "6 PM", systolic: 126, diastolic: 80 },
      ],
      heartRate: [
        { time: "6 AM", bpm: 78 }, { time: "10 AM", bpm: 72 }, { time: "2 PM", bpm: 68 }, { time: "6 PM", bpm: 74 },
      ],
      oxygenSaturation: [
        { time: "6 AM", spo2: 94 }, { time: "10 AM", spo2: 95 }, { time: "2 PM", spo2: 97 }, { time: "6 PM", spo2: 96 },
      ],
      breathingTherapy: [
        { session: "Day 1", score: 60 }, { session: "Day 2", score: 68 }, { session: "Day 3", score: 75 },
        { session: "Day 4", score: 72 }, { session: "Day 5", score: 82 },
      ],
    },
  },
  {
    id: "2", name: "Maria Garcia", room: "Ward-3A", status: "attention",
    lastActivity: "Missed medication reminder",
    nurseNotes: [
      "6:00 AM — Reported headache. BP slightly elevated.",
      "10:00 AM — Refused breakfast. Will monitor.",
    ],
    nutritionistCheckup: false, physiotherapistCheckup: true,
    meals: [{ label: "Breakfast", eaten: false }, { label: "Lunch", eaten: true }, { label: "Dinner", eaten: false }],
    medicines: [
      { name: "Amlodipine 5mg", dosage: "5mg", timing: "Before Breakfast", taken: false },
      { name: "Atorvastatin 20mg", dosage: "20mg", timing: "After Dinner", taken: false },
      { name: "Metformin 500mg", dosage: "500mg", timing: "After Lunch", taken: true },
      { name: "Losartan 50mg", dosage: "50mg", timing: "Before Lunch", taken: true },
    ],
    vitals: {
      bloodPressure: [
        { time: "6 AM", systolic: 148, diastolic: 95 }, { time: "10 AM", systolic: 142, diastolic: 90 },
        { time: "2 PM", systolic: 138, diastolic: 88 },
      ],
      heartRate: [
        { time: "6 AM", bpm: 88 }, { time: "10 AM", bpm: 84 }, { time: "2 PM", bpm: 80 },
      ],
      oxygenSaturation: [
        { time: "6 AM", spo2: 96 }, { time: "10 AM", spo2: 95 }, { time: "2 PM", spo2: 96 },
      ],
      breathingTherapy: [
        { session: "Day 1", score: 55 }, { session: "Day 2", score: 58 }, { session: "Day 3", score: 62 },
      ],
    },
  },
  {
    id: "3", name: "Robert Chen", room: "ICU-08", status: "completed",
    lastActivity: "All sessions completed today",
    nurseNotes: [
      "6:00 AM — Morning vitals normal. Patient in good spirits.",
      "10:00 AM — Completed physiotherapy session.",
      "2:00 PM — All medications administered. No complaints.",
      "6:00 PM — Dinner served. Patient ate well.",
    ],
    nutritionistCheckup: true, physiotherapistCheckup: true,
    meals: [{ label: "Breakfast", eaten: true }, { label: "Lunch", eaten: true }, { label: "Dinner", eaten: true }],
    medicines: [
      { name: "Insulin 10 units", dosage: "10u", timing: "Before Breakfast", taken: true },
      { name: "Lisinopril 20mg", dosage: "20mg", timing: "After Breakfast", taken: true },
      { name: "Aspirin 81mg", dosage: "81mg", timing: "After Lunch", taken: true },
      { name: "Clopidogrel 75mg", dosage: "75mg", timing: "After Dinner", taken: true },
    ],
    vitals: {
      bloodPressure: [
        { time: "6 AM", systolic: 120, diastolic: 78 }, { time: "10 AM", systolic: 118, diastolic: 76 },
        { time: "2 PM", systolic: 122, diastolic: 80 }, { time: "6 PM", systolic: 119, diastolic: 77 },
      ],
      heartRate: [
        { time: "6 AM", bpm: 70 }, { time: "10 AM", bpm: 68 }, { time: "2 PM", bpm: 72 }, { time: "6 PM", bpm: 69 },
      ],
      oxygenSaturation: [
        { time: "6 AM", spo2: 98 }, { time: "10 AM", spo2: 98 }, { time: "2 PM", spo2: 97 }, { time: "6 PM", spo2: 98 },
      ],
      breathingTherapy: [
        { session: "Day 1", score: 70 }, { session: "Day 2", score: 78 }, { session: "Day 3", score: 85 },
        { session: "Day 4", score: 88 }, { session: "Day 5", score: 92 },
      ],
    },
  },
];

const statusConfig = {
  active: { label: "Active", icon: Activity, className: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "Completed", icon: CheckCircle2, className: "bg-green-500/10 text-green-600 border-green-500/20" },
  attention: { label: "Attention", icon: AlertCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const CHART_COLORS = ["hsl(207, 90%, 54%)", "hsl(199, 89%, 48%)", "hsl(45, 93%, 47%)", "hsl(0, 84%, 60%)"];

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPatient(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-card p-4 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <SettingsManager />

      <div className="relative z-10 max-w-7xl mx-auto pt-8 animate-fade-in-up">
        <Breadcrumb 
          items={[
            { label: "Staff Dashboard", active: true }
          ]} 
        />

        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              Staff Portal
            </h1>
            <p className="text-muted-foreground">Comprehensive patient monitoring • High Density View</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Badge variant="outline" className="px-3 py-1">Mode: Laptop-Optimized</Badge>
            <Badge variant="outline" className="px-3 py-1">Shortcuts Enabled</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Dashboard - Left Column */}
          <div className={cn("space-y-6 transition-all duration-500", selectedPatient ? "lg:col-span-12 xl:col-span-8" : "lg:col-span-12")}>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(statusConfig).map(([key, config]) => {
                const Icon = config.icon;
                const count = patients.filter((p) => p.status === key).length;
                return (
                  <Card key={key} className="glass-card p-4 hover:shadow-clinical transition-all">
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
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-lg font-semibold text-foreground m-0">In-Patient Activity</h2>
                <div className="flex gap-2 text-[10px] text-muted-foreground font-mono">
                  <span>SORT: STATUS</span>
                  <span>|</span>
                  <span>AUTO-REFRESH: ON</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {patients.map((patient) => {
                  const status = statusConfig[patient.status];
                  const StatusIcon = status.icon;
                  return (
                    <div 
                      key={patient.id} 
                      onClick={() => setSelectedPatient(patient)}
                      className={cn(
                        "p-4 flex items-center justify-between hover:bg-primary/5 transition-colors cursor-pointer group",
                        selectedPatient?.id === patient.id && "bg-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-2 border-transparent group-hover:border-primary/20">
                          <span className="text-lg font-semibold text-primary">
                            {patient.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground m-0">{patient.name}</h3>
                            <Badge variant="outline" className="text-[10px] h-5">{patient.room}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{patient.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={cn("gap-1 text-[10px]", status.className)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Side Panel - Right Column (Laptop focus) */}
          {selectedPatient && (
            <div className="hidden xl:block xl:col-span-4 animate-fade-in-up">
              <div className="sticky top-8">
                <PatientDetailView patient={selectedPatient} isEmbedded onClose={() => setSelectedPatient(null)} />
              </div>
            </div>
          )}
        </div>

        {/* Modal for Mobile/Tablet */}
        {selectedPatient && (
          <div className="xl:hidden">
            <PatientDetailView patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
          </div>
        )}

        <p className="mt-8 text-xs text-muted-foreground text-center">
          Monitoring {patients.length} active sessions • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

const PatientDetailView = ({ patient, onClose, isEmbedded }: { patient: Patient; onClose: () => void; isEmbedded?: boolean }) => {
  const medsTaken = patient.medicines.filter((m) => m.taken).length;
  const mealsEaten = patient.meals.filter((m) => m.eaten).length;

  const content = (
    <Card className={cn("w-full glass-card p-6 animate-fade-in-up mb-8 hover:shadow-clinical transition-all", !isEmbedded ? "max-w-4xl" : "border-2 border-primary/30")}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground m-0">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">{patient.room}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 sticky top-0 bg-background/50 backdrop-blur-sm z-20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className={cn("grid gap-4", isEmbedded ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4")}>
            <StatusCard icon={Apple} label="Meals" value={`${mealsEaten}/3`} ok={mealsEaten === 3} />
            <StatusCard icon={Pill} label="Medicines" value={`${medsTaken}/${patient.medicines.length}`} ok={medsTaken === patient.medicines.length} />
            <StatusCard icon={ChefHat} label="Nutri" value={patient.nutritionistCheckup ? "OK" : "PND"} ok={patient.nutritionistCheckup} />
            <StatusCard icon={Dumbbell} label="Physio" value={patient.physiotherapistCheckup ? "OK" : "PND"} ok={patient.physiotherapistCheckup} />
          </div>

          <Card className="p-4 bg-secondary/30 rounded-xl">
            <h4 className="font-semibold text-foreground mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">Nutrition Status</h4>
            <div className="grid grid-cols-3 gap-2">
              {patient.meals.map((m, i) => (
                <div key={i} className={cn("p-2 rounded-lg border text-center text-[10px] font-bold",
                  m.eaten ? "bg-primary/10 border-primary/30 text-primary" : "bg-secondary/50 border-border/50 text-muted-foreground"
                )}>
                  {m.label}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <Card className="p-4 bg-secondary/30 rounded-xl">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm italic">
              <Heart className="w-4 h-4 text-destructive animate-pulse" /> Blood Pressure (mmHg)
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={patient.vitals.bloodPressure}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(206, 30%, 88%)" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="systolic" stroke={CHART_COLORS[0]} strokeWidth={3} dot={{ r: 4 }} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke={CHART_COLORS[1]} strokeWidth={3} dot={{ r: 4 }} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4 bg-secondary/30 rounded-xl">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm italic">
              <Activity className="w-4 h-4 text-primary" /> SpO₂ (%)
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={patient.vitals.oxygenSaturation}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(206, 30%, 88%)" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="spo2" stroke={CHART_COLORS[1]} strokeWidth={3} name="SpO₂" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Medicines Tab */}
        <TabsContent value="medicines" className="space-y-2">
          {patient.medicines.map((med, i) => (
            <div key={i} className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              med.taken ? "bg-primary/5 border-primary/20" : "bg-destructive/5 border-destructive/20"
            )}>
              <div className="flex items-center gap-2">
                <Pill className={cn("w-4 h-4", med.taken ? "text-primary" : "text-destructive")} />
                <div>
                  <p className="font-bold text-xs m-0">{med.name}</p>
                  <p className="text-[10px] text-muted-foreground m-0">{med.timing}</p>
                </div>
              </div>
              <Badge className={cn("text-[9px] h-4", med.taken ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground")}>
                {med.taken ? "OK" : "MISS"}
              </Badge>
            </div>
          ))}
        </TabsContent>

        {/* Nurse Notes Tab */}
        <TabsContent value="notes" className="space-y-2">
          {patient.nurseNotes.map((note, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
              <FileText className="w-3 h-3 text-primary mt-0.5 shrink-0" />
              <p className="text-[11px] leading-relaxed m-0">{note}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );

  if (isEmbedded) return content;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto">
      {content}
    </div>
  );
};

const StatusCard = ({ icon: Icon, label, value, ok }: { icon: any; label: string; value: string; ok: boolean }) => (
  <Card className={cn("p-4 rounded-xl border text-center", ok ? "bg-primary/5 border-primary/20" : "bg-secondary/50 border-border/50")}>
    <Icon className={cn("w-5 h-5 mx-auto mb-2", ok ? "text-primary" : "text-muted-foreground")} />
    <p className="text-lg font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </Card>
);

export default StaffDashboard;
