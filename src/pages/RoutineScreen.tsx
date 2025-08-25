import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Target, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoutineScreen = () => {
  const navigate = useNavigate();
  const [routineItems, setRoutineItems] = useState([
    { id: 1, time: "09:00", task: "Revisar anotações", duration: "30min", completed: false },
    { id: 2, time: "10:00", task: "Sessão de foco profundo", duration: "90min", completed: false },
    { id: 3, time: "12:00", task: "Pausa para almoço", duration: "60min", completed: false },
    { id: 4, time: "14:00", task: "Reunião de projeto", duration: "45min", completed: false },
    { id: 5, time: "16:00", task: "Revisão e planejamento", duration: "30min", completed: false }
  ]);

  const toggleComplete = (id: number) => {
    setRoutineItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleContinue = () => {
    navigate('/challenges-screen');
  };

  const completedTasks = routineItems.filter(item => item.completed).length;
  const totalTasks = routineItems.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-dopamind bg-clip-text text-transparent mb-2">
            Resumo da Rotina
          </h1>
          <p className="text-muted-foreground">
            Organize seu dia para máxima produtividade
          </p>
        </div>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="dopamind-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Progresso do Dia
              </h3>
              <span className="text-2xl">🎯</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tarefas concluídas</span>
                <span className="font-medium text-foreground">{completedTasks}/{totalTasks}</span>
              </div>
              
              <div className="w-full bg-border rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 glow-effect"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                {progressPercentage.toFixed(0)}% concluído
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="dopamind-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Timeline do Dia
              </h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-4">
              {routineItems.map((item, index) => (
                <div key={item.id} className="relative">
                  {/* Timeline line */}
                  {index < routineItems.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-8 bg-border" />
                  )}
                  
                  <div 
                    className={`
                      flex items-center gap-4 p-4 rounded-lg border transition-all duration-200
                      ${item.completed 
                        ? 'border-accent/50 bg-accent/5' 
                        : 'border-border hover:border-primary/50 cursor-pointer'
                      }
                    `}
                    onClick={() => toggleComplete(item.id)}
                  >
                    {/* Time indicator */}
                    <div className={`
                      w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium
                      ${item.completed 
                        ? 'border-accent bg-accent text-accent-foreground' 
                        : 'border-primary text-primary'
                      }
                    `}>
                      {item.completed ? '✓' : item.time.slice(0, 2)}
                    </div>

                    {/* Task info */}
                    <div className="flex-1">
                      <div className={`
                        font-medium transition-all duration-200
                        ${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}
                      `}>
                        {item.task}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.time} • {item.duration}
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className={`
                      w-3 h-3 rounded-full transition-all duration-200
                      ${item.completed ? 'bg-accent' : 'bg-border'}
                    `} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Optimization */}
          <Card className="dopamind-card p-6 gradient-focus text-white">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  🤖 Otimização Neural
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Seu cronograma está alinhado com seus picos de energia circadianos! 
                  O período 14h-16h é ideal para tarefas que exigem foco intenso.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>🧠</span>
                  <span>Baseado em cronobiologia e neurociência cognitiva</span>
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
            Ver Desafios do Dia
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutineScreen;