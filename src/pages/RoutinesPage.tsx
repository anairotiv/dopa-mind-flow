import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Clock, Brain, Zap, CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  time: string;
  duration: number;
  category: "study" | "work" | "leisure" | "break";
  completed: boolean;
  priority: "low" | "medium" | "high";
}

const RoutinesPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Revisar material de matemática",
      time: "09:00",
      duration: 45,
      category: "study",
      completed: true,
      priority: "high"
    },
    {
      id: "2",
      title: "Pausa cognitiva - Respiração",
      time: "09:45",
      duration: 10,
      category: "break",
      completed: true,
      priority: "medium"
    },
    {
      id: "3",
      title: "Reunião de projeto",
      time: "14:00",
      duration: 60,
      category: "work",
      completed: false,
      priority: "high"
    },
    {
      id: "4",
      title: "Pausa cognitiva - Caminhada",
      time: "15:00",
      duration: 15,
      category: "break",
      completed: false,
      priority: "medium"
    },
    {
      id: "5",
      title: "Leitura relaxante",
      time: "19:00",
      duration: 30,
      category: "leisure",
      completed: false,
      priority: "low"
    }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    duration: 30,
    category: "study" as Task["category"],
    priority: "medium" as Task["priority"]
  });

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "study":
        return { icon: "📚", color: "text-primary bg-primary/10", label: "Estudo" };
      case "work":
        return { icon: "💼", color: "text-secondary bg-secondary/10", label: "Trabalho" };
      case "leisure":
        return { icon: "🎮", color: "text-accent bg-accent/10", label: "Lazer" };
      case "break":
        return { icon: "☕", color: "text-yellow-600 bg-yellow-100", label: "Pausa" };
      default:
        return { icon: "📋", color: "text-muted-foreground bg-muted", label: "Tarefa" };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

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
                <h1 className="text-xl font-bold text-foreground">Minhas Rotinas</h1>
                <p className="text-sm text-muted-foreground">Planejamento inteligente com IA</p>
              </div>
            </div>
            <Button
              onClick={() => setIsAddingTask(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Tarefa
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Progresso de Hoje
            </h3>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {progressPercent}%
              </div>
              <p className="text-sm text-muted-foreground">
                {completedTasks} de {totalTasks} tarefas concluídas
              </p>
            </div>

            <div className="w-full bg-muted rounded-full h-3 mb-6">
              <div 
                className="h-3 gradient-energy rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-foreground">{completedTasks}</div>
                <div className="text-xs text-muted-foreground">Feitas</div>
              </div>
              <div className="p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-foreground">{totalTasks - completedTasks}</div>
                <div className="text-xs text-muted-foreground">Pendentes</div>
              </div>
              <div className="p-2 bg-accent/10 rounded-lg">
                <div className="text-lg font-bold text-accent">4h</div>
                <div className="text-xs text-accent/70">Tempo total</div>
              </div>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card className="dopamind-card p-6 gradient-focus text-white lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Brain className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3 text-shadow">
                  🤖 Sugestões Inteligentes da Mindy
                </h3>
                <div className="space-y-3 text-sm text-white/90">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span><strong>Melhor horário para foco:</strong> 14h-16h (energia alta prevista)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span><strong>Pausa recomendada:</strong> 10 min após cada 45 min de estudo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-purple-300" />
                    <span><strong>Técnica sugerida:</strong> Pomodoro para tarefas de alta concentração</span>
                  </div>
                </div>
                <Button 
                  className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                  size="sm"
                >
                  Aplicar sugestões automaticamente
                </Button>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="dopamind-card p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Agenda de Hoje
            </h3>

            <div className="space-y-3">
              {tasks.sort((a, b) => a.time.localeCompare(b.time)).map((task) => {
                const categoryInfo = getCategoryInfo(task.category);
                return (
                  <div
                    key={task.id}
                    className={`
                      flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all duration-200
                      ${getPriorityColor(task.priority)}
                      ${task.completed 
                        ? 'bg-muted/20 opacity-75' 
                        : 'bg-background hover:bg-muted/30'
                      }
                    `}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-8 w-8 rounded-full"
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-accent" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </Button>

                    <div className="text-lg font-medium text-foreground w-16">
                      {task.time}
                    </div>

                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${categoryInfo.color}`}>
                      <span className="text-lg">{categoryInfo.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${
                        task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{task.duration} min</span>
                        <span>•</span>
                        <span>{categoryInfo.label}</span>
                        <span>•</span>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${task.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                          ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${task.priority === 'low' ? 'bg-green-100 text-green-700' : ''}
                        `}>
                          {task.priority === 'high' && 'Alta'}
                          {task.priority === 'medium' && 'Média'}
                          {task.priority === 'low' && 'Baixa'}
                        </span>
                      </div>
                    </div>

                    {task.category === 'break' && (
                      <div className="text-xl">
                        🧘
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Pomodoro Timer */}
          <Card className="dopamind-card p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Timer Pomodoro
              </h3>
              
              <div className="text-4xl font-bold text-primary mb-4">
                25:00
              </div>
              
              <div className="flex justify-center gap-2 mb-4">
                <Button size="sm" variant="outline">
                  ⏸️ Pausar
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  ▶️ Iniciar
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Sessão de foco • 1 de 4
              </p>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="dopamind-card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Estatísticas Rápidas
            </h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-xl font-bold text-primary">3h</div>
                <div className="text-xs text-primary/70">Foco hoje</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-xl font-bold text-secondary">12</div>
                <div className="text-xs text-secondary/70">Pausas</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-xl font-bold text-accent">8</div>
                <div className="text-xs text-accent/70">Pomodoros</div>
              </div>
              <div className="text-center p-3 bg-yellow-100 rounded-lg">
                <div className="text-xl font-bold text-yellow-600">92%</div>
                <div className="text-xs text-yellow-600/70">Eficiência</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RoutinesPage;