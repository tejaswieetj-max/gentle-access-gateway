import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Settings, Sun, Moon, Eye, Languages, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "high-contrast";
type Language = "en" | "hi";

const SettingsManager = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [previousSettings, setPreviousSettings] = useState<{ theme: Theme; language: Language } | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "high-contrast");
    if (theme === "dark") root.classList.add("dark");
    if (theme === "high-contrast") root.classList.add("high-contrast");
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme === theme) return;
    setPreviousSettings({ theme, language });
    setTheme(newTheme);
    showUndoToast("Theme changed", { theme: newTheme, language });
  };

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language) return;
    setPreviousSettings({ theme, language });
    setLanguage(newLang);
    showUndoToast(`Language changed to ${newLang === "en" ? "English" : "हिन्दी"}`, { theme, language: newLang });
  };

  const showUndoToast = (message: string, current: { theme: Theme; language: Language }) => {
    toast(message, {
      description: "You have 10 seconds to undo this change.",
      action: {
        label: "Undo",
        onClick: () => {
          if (previousSettings) {
            setTheme(previousSettings.theme);
            setLanguage(previousSettings.language);
            toast("Setting reverted");
          }
        },
      },
      duration: 10000,
    });
  };

  return (
    <div className="fixed top-4 right-4 z-[60] flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="glass-card w-12 h-12 rounded-full shadow-lg border-primary/20 hover:border-primary/50 transition-all">
            <Settings className="w-5 h-5 text-primary animate-spin-slow hover:animate-spin" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 glass-card border-primary/20 mt-2" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
             <Eye className="w-4 h-4 text-primary" /> Accessibility & Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleThemeChange("light")} className="flex items-center gap-3 cursor-pointer">
            <Sun className="w-4 h-4" />
            <span className={cn("flex-1", theme === "light" && "font-bold text-primary")}>Default (Light)</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="flex items-center gap-3 cursor-pointer">
            <Moon className="w-4 h-4" />
            <span className={cn("flex-1", theme === "dark" && "font-bold text-primary")}>Clinical Dark</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleThemeChange("high-contrast")} className="flex items-center gap-3 cursor-pointer">
            <Eye className="w-4 h-4" />
            <span className={cn("flex-1", theme === "high-contrast" && "font-bold text-warning-foreground")}>High Contrast</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2">
             <Languages className="w-4 h-4 text-primary" /> Display Language
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="flex items-center justify-between cursor-pointer">
            <span>English</span>
            {language === "en" && <div className="w-2 h-2 rounded-full bg-primary" />}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleLanguageChange("hi")} className="flex items-center justify-between cursor-pointer">
            <span>हिन्दी (Hindi)</span>
            {language === "hi" && <div className="w-2 h-2 rounded-full bg-primary" />}
          </DropdownMenuItem>

          {previousSettings && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => {
                  setTheme(previousSettings.theme);
                  setLanguage(previousSettings.language);
                  setPreviousSettings(null);
                  toast("Reverted to previous settings");
                }} 
                className="flex items-center gap-3 cursor-pointer text-accent font-bold"
              >
                <RotateCcw className="w-4 h-4" />
                Quick Undo
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsManager;
