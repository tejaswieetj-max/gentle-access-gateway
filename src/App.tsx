import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageRoute from "./pages/LandingPage";
import PatientLoginPage from "./pages/PatientLoginPage";
import StaffLoginPage from "./pages/StaffLoginPage";
import NurseLoginPage from "./pages/NurseLoginPage";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import StaffDashboardPage from "./pages/StaffDashboardPage";
import NurseDashboardPage from "./pages/NurseDashboardPage";
import VisitorDashboardPage from "./pages/VisitorDashboardPage";
import BreathingSessionPage from "./pages/BreathingSessionPage";
import MedicationInfoPage from "./pages/MedicationInfoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageRoute />} />
          <Route path="/patient-login" element={<PatientLoginPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
          <Route path="/nurse-login" element={<NurseLoginPage />} />
          <Route path="/nurse-dashboard" element={<NurseDashboardPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboardPage />} />
          <Route path="/staff-dashboard" element={<StaffDashboardPage />} />
          <Route path="/visitor-dashboard" element={<VisitorDashboardPage />} />
          <Route path="/breathing-session" element={<BreathingSessionPage />} />
          <Route path="/medications" element={<MedicationInfoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
