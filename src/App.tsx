import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import MoodFirst from "./pages/MoodFirst";
import RoutineScreen from "./pages/RoutineScreen";
import ChallengesScreen from "./pages/ChallengesScreen";
import Index from "./pages/Index";
import MoodPage from "./pages/MoodPage";
import RoutinesPage from "./pages/RoutinesPage";
import ChallengesPage from "./pages/ChallengesPage";
import AIChat from "./pages/AIChat";
import Stats from "./pages/Stats";
import Explore from "./pages/Explore";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16 lg:pb-0">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mood-first" element={<MoodFirst />} />
            <Route path="/routine-summary" element={<RoutineScreen />} />
            <Route path="/challenges-screen" element={<ChallengesScreen />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/mood" element={<MoodPage />} />
            <Route path="/routines" element={<RoutinesPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/explore" element={<Explore />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
