import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, Star } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  completed?: boolean;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Pausa Digital",
    description: "Fique 15 minutos sem celular",
    icon: "📱",
    duration: "15 min",
    difficulty: "easy",
  },
  {
    id: "2", 
    title: "Respiração Consciente",
    description: "10 respirações profundas",
    icon: "🫁",
    duration: "5 min",
    difficulty: "easy",
  },
  {
    id: "3",
    title: "Organizar Mesa",
    description: "Limpe seu espaço de trabalho",
    icon: "🗂️",
    duration: "10 min",
    difficulty: "medium",
  },
];

const ChallengeCard = () => {
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  const toggleChallenge = (challengeId: string) => {
    setCompletedChallenges(prev => {
      const newSet = new Set(prev);
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId);
      } else {
        newSet.add(challengeId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-accent";
      case "medium": return "text-primary";
      case "hard": return "text-secondary";
      default: return "text-primary";
    }
  };

  return (
    <Card className="dopamind-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Desafios do Dia
            </h2>
            <p className="text-sm text-muted-foreground">
              Pequenas ações, grandes mudanças
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-foreground">
              {completedChallenges.size}/{challenges.length}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {challenges.map((challenge) => {
            const isCompleted = completedChallenges.has(challenge.id);
            
            return (
              <div
                key={challenge.id}
                className={`
                  group p-4 rounded-lg border transition-all duration-300
                  ${isCompleted 
                    ? 'bg-accent/10 border-accent/30' 
                    : 'bg-muted/30 border-border hover:border-primary/30'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-6 w-6 rounded-full"
                    onClick={() => toggleChallenge(challenge.id)}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-accent bounce-in" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </Button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{challenge.icon}</span>
                      <h3 className={`font-medium text-sm ${
                        isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                        {challenge.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{challenge.duration}</span>
                      </div>
                      <span className={`font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty === 'easy' && 'Fácil'}
                        {challenge.difficulty === 'medium' && 'Médio'}
                        {challenge.difficulty === 'hard' && 'Difícil'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {completedChallenges.size === challenges.length && (
          <div className="text-center p-4 gradient-energy text-white rounded-lg bounce-in">
            <div className="text-2xl mb-2">🎉</div>
            <p className="font-medium">Parabéns! Você completou todos os desafios!</p>
            <p className="text-sm text-white/80">Continue assim amanhã!</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChallengeCard;