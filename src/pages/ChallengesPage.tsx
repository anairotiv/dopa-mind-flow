import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Trophy, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  category: "digital" | "mindful" | "physical" | "productivity";
  completed?: boolean;
}

const ChallengesPage = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Pausa Digital",
      description: "Fique 15 minutos longe do celular",
      icon: "📱",
      duration: "15 min",
      difficulty: "easy",
      points: 10,
      category: "digital",
      completed: true
    },
    {
      id: "2",
      title: "Respiração Consciente",
      description: "10 respirações profundas e mindful",
      icon: "🫁",
      duration: "5 min",
      difficulty: "easy",
      points: 5,
      category: "mindful",
      completed: true
    },
    {
      id: "3",
      title: "Organizar Mesa",
      description: "Limpe e organize seu espaço de trabalho",
      icon: "🗂️",
      duration: "10 min",
      difficulty: "medium",
      points: 15,
      category: "productivity"
    },
    {
      id: "4",
      title: "Caminhada Energizante",
      description: "5 minutos de caminhada ao ar livre",
      icon: "🚶",
      duration: "5 min",
      difficulty: "easy",
      points: 10,
      category: "physical"
    },
    {
      id: "5",
      title: "Zero Notificações",
      description: "1 hora sem verificar notificações",
      icon: "🔕",
      duration: "60 min",
      difficulty: "hard",
      points: 30,
      category: "digital"
    },
    {
      id: "6",
      title: "Meditação Express",
      description: "10 minutos de meditação guiada",
      icon: "🧘",
      duration: "10 min",
      difficulty: "medium",
      points: 20,
      category: "mindful"
    }
  ]);

  const [userStats, setUserStats] = useState({
    totalPoints: 175,
    completedToday: 2,
    streak: 5,
    level: 3
  });

  const toggleChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, completed: !challenge.completed }
        : challenge
    ));
  };

  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return { color: "text-green-600 bg-green-100", label: "Fácil" };
      case "medium":
        return { color: "text-yellow-600 bg-yellow-100", label: "Médio" };
      case "hard":
        return { color: "text-red-600 bg-red-100", label: "Difícil" };
      default:
        return { color: "text-gray-600 bg-gray-100", label: "Normal" };
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "digital":
        return { color: "text-blue-600 bg-blue-100", label: "Digital" };
      case "mindful":
        return { color: "text-purple-600 bg-purple-100", label: "Mindfulness" };
      case "physical":
        return { color: "text-green-600 bg-green-100", label: "Físico" };
      case "productivity":
        return { color: "text-orange-600 bg-orange-100", label: "Produtividade" };
      default:
        return { color: "text-gray-600 bg-gray-100", label: "Geral" };
    }
  };

  const completedChallenges = challenges.filter(c => c.completed);
  const completedPoints = completedChallenges.reduce((total, c) => total + c.points, 0);

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
                <h1 className="text-xl font-bold text-foreground">Desafios e Gamificação</h1>
                <p className="text-sm text-muted-foreground">Micro-desafios para grandes mudanças</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Stats */}
          <Card className="dopamind-card p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold text-foreground">
                Nível {userStats.level}
              </h3>
              <p className="text-sm text-muted-foreground">
                Conquistador Digital
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Pontos Totais</span>
                </div>
                <span className="font-bold text-primary">{userStats.totalPoints}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Hoje</span>
                </div>
                <span className="font-bold text-accent">{userStats.completedToday}/6</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Sequência</span>
                </div>
                <span className="font-bold text-secondary">{userStats.streak} dias</span>
              </div>
            </div>

            {/* Progress to next level */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Progresso</span>
                <span className="text-sm text-muted-foreground">175/250 XP</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 gradient-energy rounded-full transition-all duration-500"
                  style={{ width: '70%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                75 XP para o próximo nível
              </p>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="dopamind-card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Conquistas Recentes
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xs font-medium text-yellow-700">Sequência de 5 dias</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-xs font-medium text-blue-700">Detox Digital</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl mb-1">🧘</div>
                <div className="text-xs font-medium text-purple-700">Mestre Zen</div>
              </div>
            </div>

            {/* Daily completion celebration */}
            {completedChallenges.length === challenges.length && (
              <div className="mt-4 p-4 gradient-dopamind text-white rounded-lg text-center bounce-in">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-semibold">Parabéns! Todos os desafios concluídos!</p>
                <p className="text-white/80 text-sm">+50 pontos de bônus • Continue assim amanhã!</p>
              </div>
            )}
          </Card>

          {/* Today's Challenges */}
          <Card className="dopamind-card p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Desafios de Hoje
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((challenge) => {
                const difficultyInfo = getDifficultyInfo(challenge.difficulty);
                const categoryInfo = getCategoryInfo(challenge.category);
                
                return (
                  <div
                    key={challenge.id}
                    className={`
                      group p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer
                      ${challenge.completed 
                        ? 'border-accent bg-accent/5 glow-effect' 
                        : 'border-border hover:border-primary/50 hover:shadow-lg'
                      }
                    `}
                    onClick={() => toggleChallenge(challenge.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`
                          text-3xl p-2 rounded-full transition-transform duration-200
                          ${challenge.completed ? 'bg-accent/20 scale-110' : 'bg-muted/50 group-hover:scale-105'}
                        `}>
                          {challenge.completed ? '✅' : challenge.icon}
                        </div>
                        <div>
                          <h4 className={`font-semibold text-lg ${
                            challenge.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}>
                            {challenge.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-bold">{challenge.points}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo.color}`}>
                          {difficultyInfo.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                          {categoryInfo.label}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        ⏱️ {challenge.duration}
                      </div>
                    </div>

                    {challenge.completed && (
                      <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                        <p className="text-xs text-accent font-medium">
                          ✨ Desafio concluído! +{challenge.points} pontos
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* AI Suggestion */}
          <Card className="dopamind-card p-6 lg:col-span-3 gradient-focus text-white">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🤖</div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-shadow">
                  Sugestão Personalizada da Mindy
                </h3>
                <p className="text-white/90 mb-3">
                  Com base no seu humor atual (😊 Feliz) e nível de energia (75%), recomendo começar com 
                  <strong> "Pausa Digital"</strong> seguido de <strong>"Respiração Consciente"</strong>. 
                  Isso vai potencializar seu foco para as próximas tarefas!
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>🎯 Eficácia prevista: 95%</span>
                  <span>⏰ Tempo total: 20 min</span>
                  <span>⭐ Pontos possíveis: 15</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ChallengesPage;