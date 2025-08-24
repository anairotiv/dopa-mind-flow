import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const moodEmojis = [
  { emoji: "😔", label: "Muito triste", value: 1, color: "text-red-500" },
  { emoji: "😕", label: "Triste", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Neutro", value: 3, color: "text-yellow-500" },
  { emoji: "😊", label: "Feliz", value: 4, color: "text-green-500" },
  { emoji: "😄", label: "Muito feliz", value: 5, color: "text-emerald-500" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<number>(75);

  return (
    <Card className="dopamind-card p-6 gradient-dopamind text-white">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-shadow">
            Como você está se sentindo?
          </h2>
          <p className="text-white/80 text-sm">
            Acompanhe seu humor ao longo do dia
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {moodEmojis.map((mood) => (
            <Button
              key={mood.value}
              variant="ghost"
              size="lg"
              className={`
                relative h-16 w-16 rounded-full transition-all duration-300
                ${selectedMood === mood.value 
                  ? 'bg-white/20 scale-110 glow-effect' 
                  : 'bg-white/10 hover:bg-white/15'
                }
              `}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className={`text-2xl transition-transform duration-200 hover:scale-110 ${
                selectedMood === mood.value ? 'bounce-in' : ''
              }`}>
                {mood.emoji}
              </span>
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white/90">
              Nível de Energia
            </span>
            <span className="text-sm font-bold text-white">
              {energyLevel}%
            </span>
          </div>
          
          <div className="relative">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full gradient-energy rounded-full transition-all duration-500 ease-out"
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

        <Button 
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
          variant="outline"
        >
          💡 Ver sugestões da Mindy
        </Button>
      </div>
    </Card>
  );
};

export default MoodTracker;