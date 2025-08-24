import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Brain, Clock, Target, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const navigate = useNavigate();

  const weeklyStats = [
    { day: "Seg", focus: 120, screen: 480, mood: 4 },
    { day: "Ter", focus: 95, screen: 520, mood: 3 },
    { day: "Qua", focus: 180, screen: 420, mood: 5 },
    { day: "Qui", focus: 210, screen: 380, mood: 4 },
    { day: "Sex", focus: 160, screen: 450, mood: 4 },
    { day: "Sáb", focus: 90, screen: 300, mood: 5 },
    { day: "Dom", focus: 75, screen: 360, mood: 4 }
  ];

  const achievements = [
    { icon: "🔥", title: "Sequência de Foco", description: "7 dias consecutivos", color: "bg-red-100 text-red-700" },
    { icon: "📱", title: "Detox Digital", description: "Menos de 4h tela/dia", color: "bg-blue-100 text-blue-700" },
    { icon: "🧘", title: "Mestre Zen", description: "50 sessões mindfulness", color: "bg-purple-100 text-purple-700" },
    { icon: "⚡", title: "Super Produtivo", description: "300 min foco em um dia", color: "bg-yellow-100 text-yellow-700" },
    { icon: "🎯", title: "Consistente", description: "30 dias usando o app", color: "bg-green-100 text-green-700" },
    { icon: "🌟", title: "Nível 5", description: "500 pontos acumulados", color: "bg-indigo-100 text-indigo-700" }
  ];

  const maxFocus = Math.max(...weeklyStats.map(d => d.focus));
  const maxScreen = Math.max(...weeklyStats.map(d => d.screen));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Estatísticas e Insights</h1>
              <p className="text-sm text-muted-foreground">Acompanhe sua evolução e progresso</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <Card className="dopamind-card p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Métricas Principais desta Semana
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">18h 30m</div>
                <div className="text-sm text-primary/70">Tempo de Foco</div>
                <div className="text-xs text-green-600 mt-1">+12% vs semana anterior</div>
              </div>
              
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <Brain className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">4.1/5</div>
                <div className="text-sm text-secondary/70">Humor Médio</div>
                <div className="text-xs text-green-600 mt-1">+0.3 vs semana anterior</div>
              </div>
              
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-accent">42/49</div>
                <div className="text-sm text-accent/70">Desafios Concluídos</div>
                <div className="text-xs text-green-600 mt-1">86% taxa de conclusão</div>
              </div>
              
              <div className="text-center p-4 bg-orange-100 rounded-lg">
                <div className="w-8 h-8 text-orange-600 mx-auto mb-2 text-2xl">📱</div>
                <div className="text-2xl font-bold text-orange-600">4h 15m</div>
                <div className="text-sm text-orange-600/70">Tempo de Tela</div>
                <div className="text-xs text-green-600 mt-1">-8% vs semana anterior</div>
              </div>
            </div>
          </Card>

          {/* Focus vs Screen Time Chart */}
          <Card className="dopamind-card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Foco vs Tempo de Tela (últimos 7 dias)
            </h3>
            
            <div className="space-y-4">
              {weeklyStats.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-8 text-sm font-medium text-foreground">
                    {day.day}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {/* Focus bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 w-12">Foco</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${(day.focus / maxFocus) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12">
                        {Math.floor(day.focus / 60)}h{day.focus % 60}m
                      </span>
                    </div>
                    
                    {/* Screen time bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 w-12">Tela</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${(day.screen / maxScreen) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12">
                        {Math.floor(day.screen / 60)}h{day.screen % 60}m
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-lg">
                    {day.mood === 5 && '😄'}
                    {day.mood === 4 && '😊'}
                    {day.mood === 3 && '😐'}
                    {day.mood === 2 && '😕'}
                    {day.mood === 1 && '😔'}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mood Evolution */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Evolução do Humor
            </h3>
            
            <div className="space-y-3">
              <div className="text-center p-4 gradient-dopamind text-white rounded-lg">
                <div className="text-3xl mb-2">😊</div>
                <div className="text-lg font-semibold">Humor Atual</div>
                <div className="text-white/80 text-sm">Feliz e produtivo</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="text-xl">📈</div>
                  <div className="text-xs text-green-700 font-medium">Tendência</div>
                  <div className="text-xs text-green-600">Positiva</div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="text-xl">🎯</div>
                  <div className="text-xs text-blue-700 font-medium">Estabilidade</div>
                  <div className="text-xs text-blue-600">Alta</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="dopamind-card p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Suas Conquistas
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-lg border-2 border-opacity-50 ${achievement.color} transition-all duration-200 hover:scale-105`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="font-semibold text-sm mb-1">{achievement.title}</div>
                  <div className="text-xs opacity-80">{achievement.description}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="dopamind-card p-6 lg:col-span-2 gradient-focus text-white">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-shadow">
                  🤖 Insights da Mindy
                </h3>
                <div className="space-y-3 text-sm text-white/90">
                  <div className="flex items-start gap-2">
                    <span className="text-green-300">✅</span>
                    <span><strong>Ponto forte:</strong> Você conseguiu reduzir 8% o tempo de tela esta semana!</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300">📊</span>
                    <span><strong>Padrão identificado:</strong> Seus melhores dias de foco são terça e quinta-feira.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-300">💡</span>
                    <span><strong>Sugestão:</strong> Agende tarefas importantes para quinta-feira das 14h-16h.</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Goals */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Metas de Progresso
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Foco Diário</span>
                  <span className="text-sm text-muted-foreground">3h / 4h</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 gradient-energy rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">75% da meta alcançada</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Humor Positivo</span>
                  <span className="text-sm text-muted-foreground">6 / 7 dias</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '86%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">86% da semana positiva</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Desafios</span>
                  <span className="text-sm text-muted-foreground">42 / 49</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: '86%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">7 desafios restantes</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Stats;