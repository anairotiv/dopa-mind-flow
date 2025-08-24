import MoodTracker from "@/components/MoodTracker";
import ChallengeCard from "@/components/ChallengeCard";
import RoutineSummary from "@/components/RoutineSummary";
import AIAssistant from "@/components/AIAssistant";
import { Brain, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-primary pulse-gentle" />
                <Zap className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-dopamind bg-clip-text text-transparent">
                  Dopamind
                </h1>
                <p className="text-sm text-muted-foreground">
                  Organize sua mente, aumente sua produtividade
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-semibold text-foreground">
                Olá, João! 👋
              </p>
              <p className="text-sm text-muted-foreground">
                Pronto para organizar sua mente hoje?
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <MoodTracker />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <RoutineSummary />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ChallengeCard />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="dopamind-card p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">127</div>
                <div className="text-xs text-muted-foreground">Minutos de foco</div>
              </div>
              <div className="dopamind-card p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">23</div>
                <div className="text-xs text-muted-foreground">Desafios concluídos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Focus Recommendation */}
        <div className="mt-8">
          <div className="dopamind-card p-6 gradient-focus text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-shadow">
                  💡 Recomendação de Foco
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Com base no seu humor e energia, este é o melhor momento para se concentrar
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>⏰ Horário ideal: 14h-16h</span>
                  <span>⚡ Energia prevista: Alta</span>
                  <span>🎯 Duração sugerida: 45 min</span>
                </div>
              </div>
              <div className="text-4xl opacity-80">
                🧠
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Floating Button */}
      <AIAssistant />
    </div>
  );
};

export default Index;
