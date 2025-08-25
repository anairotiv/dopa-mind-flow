import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Zap, Star, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChallengesScreen = () => {
  const navigate = useNavigate();
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const challenges = [
    {
      id: 1,
      title: "Foco Ninja",
      description: "Complete 25 minutos de foco ininterrupto",
      difficulty: "Médio",
      points: 50,
      icon: "🎯",
      category: "focus",
      reward: "Badge de Concentração"
    },
    {
      id: 2,
      title: "Respiração Consciente",
      description: "Pratique 5 minutos de respiração profunda",
      difficulty: "Fácil",
      points: 25,
      icon: "🫁",
      category: "wellness",
      reward: "Badge de Mindfulness"
    },
    {
      id: 3,
      title: "Pomodoro Master",
      description: "Complete 3 ciclos Pomodoro consecutivos",
      difficulty: "Difícil",
      points: 100,
      icon: "🍅",
      category: "productivity",
      reward: "Badge de Produtividade"
    },
    {
      id: 4,
      title: "Digital Detox",
      description: "Fique 30 minutos sem redes sociais",
      difficulty: "Médio",
      points: 40,
      icon: "📱",
      category: "wellness",
      reward: "Badge de Disciplina"
    },
    {
      id: 5,
      title: "Micro Learning",
      description: "Aprenda algo novo por 10 minutos",
      difficulty: "Fácil",
      points: 30,
      icon: "📚",
      category: "learning",
      reward: "Badge de Curiosidade"
    }
  ];

  const completeChallenge = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId]);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Médio": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Difícil": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "focus": return <Target className="w-4 h-4" />;
      case "wellness": return <Star className="w-4 h-4" />;
      case "productivity": return <Zap className="w-4 h-4" />;
      case "learning": return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const totalPoints = completedChallenges.reduce((sum, challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    return sum + (challenge?.points || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-dopamind bg-clip-text text-transparent mb-2">
            Desafios do Dia
          </h1>
          <p className="text-muted-foreground">
            Micro-desafios gamificados para otimizar seu cérebro
          </p>
        </div>

        <div className="space-y-6">
          {/* Points Overview */}
          <Card className="dopamind-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Pontos Conquistados
                </h3>
                <p className="text-muted-foreground text-sm">
                  {completedChallenges.length}/{challenges.length} desafios concluídos
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-1">
                  {totalPoints}
                </div>
                <div className="text-sm text-muted-foreground">
                  pontos
                </div>
              </div>
            </div>
          </Card>

          {/* Challenges List */}
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              
              return (
                <Card 
                  key={challenge.id} 
                  className={`
                    dopamind-card p-6 transition-all duration-200 cursor-pointer
                    ${isCompleted 
                      ? 'border-accent/50 bg-accent/5 opacity-75' 
                      : 'hover:border-primary/50 hover:glow-effect'
                    }
                  `}
                  onClick={() => completeChallenge(challenge.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Challenge Icon */}
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                      ${isCompleted ? 'bg-accent/20' : 'bg-primary/10'}
                    `}>
                      {isCompleted ? '✅' : challenge.icon}
                    </div>

                    {/* Challenge Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`
                          font-semibold
                          ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}
                        `}>
                          {challenge.title}
                        </h3>
                        {getCategoryIcon(challenge.category)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {challenge.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={getDifficultyColor(challenge.difficulty)}
                          >
                            {challenge.difficulty}
                          </Badge>
                          <span className="text-sm font-medium text-primary">
                            +{challenge.points} pts
                          </span>
                        </div>

                        {isCompleted && (
                          <div className="text-xs text-accent font-medium">
                            🏆 {challenge.reward}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* AI Insights */}
          <Card className="dopamind-card p-6 gradient-focus text-white">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  🤖 Neurociência da Gamificação
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Cada desafio concluído libera dopamina, fortalecendo vias neurais de recompensa. 
                  Isso cria loops positivos que facilitam a formação de hábitos saudáveis!
                </p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>🧠</span>
                  <span>Sistema de recompensa neural ativado</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 h-12"
          >
            Ir para Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengesScreen;