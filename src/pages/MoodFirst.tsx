import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MoodFirst = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedEnergy, setSelectedEnergy] = useState("");

  const moods = [
    { emoji: "😊", label: "Feliz", value: "happy" },
    { emoji: "😌", label: "Calmo", value: "calm" },
    { emoji: "😴", label: "Cansado", value: "tired" },
    { emoji: "😤", label: "Estressado", value: "stressed" },
    { emoji: "🤔", label: "Pensativo", value: "thoughtful" },
    { emoji: "😐", label: "Neutro", value: "neutral" }
  ];

  const energyLevels = [
    { emoji: "⚡", label: "Alta energia", value: "high" },
    { emoji: "🔋", label: "Energia moderada", value: "medium" },
    { emoji: "🪫", label: "Baixa energia", value: "low" }
  ];

  const handleContinue = () => {
    // Here we would save the mood data
    navigate('/routine-summary');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-dopamind bg-clip-text text-transparent mb-2">
            Como você está se sentindo?
          </h1>
          <p className="text-muted-foreground">
            Vamos mapear seu estado atual para personalizar sua experiência
          </p>
        </div>

        <div className="space-y-6">
          {/* Mood Selection */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>💭</span>
              Estado emocional
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`
                    p-4 rounded-lg border-2 text-center transition-all duration-200 hover:scale-105
                    ${selectedMood === mood.value 
                      ? 'border-primary bg-primary/10 glow-effect transform scale-105' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium text-foreground">
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Energy Level */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>⚡</span>
              Nível de energia
            </h3>
            <div className="space-y-3">
              {energyLevels.map((energy) => (
                <button
                  key={energy.value}
                  onClick={() => setSelectedEnergy(energy.value)}
                  className={`
                    w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-4
                    ${selectedEnergy === energy.value 
                      ? 'border-accent bg-accent/10 glow-effect' 
                      : 'border-border hover:border-accent/50'
                    }
                  `}
                >
                  <span className="text-2xl">{energy.emoji}</span>
                  <span className="font-medium text-foreground">{energy.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* AI Analysis */}
          {selectedMood && selectedEnergy && (
            <Card className="dopamind-card p-6 gradient-focus text-white animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    🤖 Análise da Mindy
                  </h3>
                  <p className="text-white/90 text-sm mb-3">
                    Baseado no seu estado atual, identifico que seu córtex pré-frontal está 
                    {selectedEnergy === 'high' ? ' altamente ativo' : 
                     selectedEnergy === 'medium' ? ' moderadamente ativo' : ' em modo de conservação'}.
                    Vou ajustar suas recomendações para otimizar sua neuroplasticidade hoje!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span>🧠</span>
                    <span>Análise neurocientífica em tempo real</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            disabled={!selectedMood || !selectedEnergy}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 h-12"
          >
            Continuar para Rotina
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodFirst;