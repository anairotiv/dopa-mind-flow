import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Briefcase, GamepadIcon, Plus } from "lucide-react";

interface RoutineItem {
  id: string;
  title: string;
  time: string;
  category: "study" | "work" | "leisure";
  completed: boolean;
  duration: string;
}

const routineItems: RoutineItem[] = [
  {
    id: "1",
    title: "Revisar material de matemática",
    time: "09:00",
    category: "study",
    completed: true,
    duration: "45 min",
  },
  {
    id: "2",
    title: "Reunião de projeto",
    time: "14:00", 
    category: "work",
    completed: false,
    duration: "1h",
  },
  {
    id: "3",
    title: "Leitura relaxante",
    time: "19:00",
    category: "leisure", 
    completed: false,
    duration: "30 min",
  },
];

const RoutineSummary = () => {
  const completedTasks = routineItems.filter(item => item.completed).length;
  const totalTasks = routineItems.length;
  const nextTask = routineItems.find(item => !item.completed);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "study": return <BookOpen className="w-4 h-4" />;
      case "work": return <Briefcase className="w-4 h-4" />;
      case "leisure": return <GamepadIcon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "study": return "text-primary bg-primary/10";
      case "work": return "text-secondary bg-secondary/10";
      case "leisure": return "text-accent bg-accent/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "study": return "Estudo";
      case "work": return "Trabalho";
      case "leisure": return "Lazer";
      default: return category;
    }
  };

  return (
    <Card className="dopamind-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Resumo da Rotina
            </h2>
            <p className="text-sm text-muted-foreground">
              Acompanhe seu progresso diário
            </p>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {completedTasks}
            </div>
            <div className="text-xs text-muted-foreground">
              Concluídas
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {totalTasks - completedTasks}
            </div>
            <div className="text-xs text-muted-foreground">
              Pendentes
            </div>
          </div>
          
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </div>
            <div className="text-xs text-primary/70">
              Progresso
            </div>
          </div>
        </div>

        {/* Next Task */}
        {nextTask && (
          <div className="p-4 gradient-focus text-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium text-sm">Próxima tarefa</span>
            </div>
            <h3 className="font-semibold text-white">{nextTask.title}</h3>
            <div className="flex items-center gap-3 mt-2 text-sm text-white/80">
              <span>{nextTask.time}</span>
              <span>•</span>
              <span>{nextTask.duration}</span>
            </div>
          </div>
        )}

        {/* Today's Timeline */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-foreground">Hoje</h3>
          <div className="space-y-2">
            {routineItems.map((item) => (
              <div
                key={item.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                  ${item.completed 
                    ? 'bg-muted/20 border-border opacity-75' 
                    : 'bg-background border-border hover:border-primary/30'
                  }
                `}
              >
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full
                  ${getCategoryColor(item.category)}
                `}>
                  {getCategoryIcon(item.category)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium ${
                    item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.time}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span>{getCategoryLabel(item.category)}</span>
                  </div>
                </div>
                
                {item.completed && (
                  <div className="text-accent">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🤖</span>
            <span className="text-sm font-medium text-secondary">Sugestão da Mindy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Melhor horário para foco: <span className="font-medium text-foreground">14h-16h</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RoutineSummary;