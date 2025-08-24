import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Brain, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const moodEmojis = [
  { emoji: "😔", label: "Muito triste", value: 1, color: "from-red-500 to-red-400" },
  { emoji: "😕", label: "Triste", value: 2, color: "from-orange-500 to-orange-400" },
  { emoji: "😐", label: "Neutro", value: 3, color: "from-yellow-500 to-yellow-400" },
  { emoji: "😊", label: "Feliz", value: 4, color: "from-green-500 to-green-400" },
  { emoji: "😄", label: "Muito feliz", value: 5, color: "from-emerald-500 to-emerald-400" },
];

const timelineData = [
  { time: "9:00", mood: 3, energy: 60 },
  { time: "12:00", mood: 4, energy: 80 },
  { time: "15:00", mood: 2, energy: 40 },
  { time: "18:00", mood: 4, energy: 70 },
];

const MoodPage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<number>(75);

  const currentMoodData = moodEmojis.find(m => m.value === selectedMood);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Meu Humor e Energia</h1>
                <p className="text-sm text-muted-foreground">Acompanhe seus padrões emocionais</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Mood Tracker */}
          <Card className="dopamind-card p-6 gradient-dopamind text-white">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-3 text-shadow">
                Como você está se sentindo agora?
              </h2>
              <div className="text-6xl mb-4 bounce-in">
                {currentMoodData?.emoji}
              </div>
              <p className="text-white/80 text-lg font-medium">
                {currentMoodData?.label}
              </p>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {moodEmojis.map((mood) => (
                <Button
                  key={mood.value}
                  variant="ghost"
                  size="lg"
                  className={`
                    h-14 w-14 rounded-full transition-all duration-300 text-2xl
                    ${selectedMood === mood.value 
                      ? 'bg-white/20 scale-110 glow-effect' 
                      : 'bg-white/10 hover:bg-white/15'
                    }
                  `}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>

            {/* Energy Level */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Nível de Energia
                </span>
                <span className="text-sm font-bold text-white">
                  {energyLevel}%
                </span>
              </div>
              
              <div className="relative">
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${currentMoodData?.color} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${energyLevel}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-white/70">
                <span>Baixa</span>
                <span>Média</span>
                <span>Alta</span>
              </div>
            </div>
          </Card>

          {/* Daily Timeline */}
          <Card className="dopamind-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Linha do Tempo do Humor
              </h3>
            </div>

            <div className="space-y-4">
              {timelineData.map((entry, index) => {
                const moodData = moodEmojis.find(m => m.value === entry.mood);
                return (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="text-sm font-medium text-foreground w-12">
                      {entry.time}
                    </div>
                    <div className="text-2xl">
                      {moodData?.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {moodData?.label}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 bg-gradient-to-r ${moodData?.color} rounded-full transition-all duration-300`}
                          style={{ width: `${entry.energy}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {entry.energy}%
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="dopamind-card p-6 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  🤖 Insights da Mindy
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Padrão identificado:</span> Você tende a ter mais energia nas manhãs e após o almoço. 
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Recomendação:</span> Agende suas tarefas mais importantes entre 12h-14h quando sua energia está no pico.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Atenção:</span> Suas 15h parecem ser um momento de baixa energia. Que tal uma pausa de 10 minutos?
                  </p>
                </div>
                
                <Button 
                  className="mt-4 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20"
                  variant="outline"
                >
                  💡 Ver mais sugestões personalizadas
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="dopamind-card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ações Baseadas no seu Humor
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl mb-2">🧘</span>
                <span className="text-xs">Respiração</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl mb-2">🎵</span>
                <span className="text-xs">Música</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl mb-2">☕</span>
                <span className="text-xs">Pausa</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <span className="text-2xl mb-2">💪</span>
                <span className="text-xs">Exercício</span>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MoodPage;