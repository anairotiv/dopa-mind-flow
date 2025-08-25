import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Camera, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    routine: "",
    habits: []
  });

  const routineTypes = [
    { id: "student", label: "📚 Estudante", description: "Foco em estudos e aprendizado" },
    { id: "freelancer", label: "💻 Freelancer", description: "Projetos independentes e flexibilidade" },
    { id: "gamer", label: "🎮 Gamer", description: "Equilibrando diversão e produtividade" },
    { id: "professional", label: "💼 Profissional", description: "Rotina corporativa estruturada" }
  ];

  const digitalHabits = [
    "Uso muito redes sociais",
    "Trabalho no computador o dia todo",
    "Tenho dificuldade de concentração",
    "Gosto de multitasking",
    "Procrastino frequentemente",
    "Sou viciado em notificações"
  ];

  const handleHabitToggle = (habit: string) => {
    setProfile(prev => ({
      ...prev,
      habits: prev.habits.includes(habit) 
        ? prev.habits.filter(h => h !== habit)
        : [...prev.habits, habit]
    }));
  };

  const handleContinue = () => {
    // Here we would save the profile data
    navigate('/mood-first');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-dopamind bg-clip-text text-transparent mb-2">
            Vamos nos conhecer!
          </h1>
          <p className="text-muted-foreground">
            Personalize sua experiência para resultados melhores
          </p>
        </div>

        <div className="space-y-6">
          {/* Avatar & Basic Info */}
          <Card className="dopamind-card p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Adicione uma foto (opcional)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Nome
                </label>
                <Input
                  placeholder="Como posso te chamar?"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Idade
                </label>
                <Input
                  placeholder="Ex: 25"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          {/* Routine Type */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Qual seu estilo de rotina?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {routineTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setProfile(prev => ({ ...prev, routine: type.id }))}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${profile.routine === type.id 
                      ? 'border-primary bg-primary/5 glow-effect' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="font-medium text-foreground mb-1">
                    {type.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Digital Habits */}
          <Card className="dopamind-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Conte sobre seus hábitos digitais
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Selecione o que se aplica a você (pode escolher vários)
            </p>
            <div className="space-y-2">
              {digitalHabits.map((habit) => (
                <button
                  key={habit}
                  onClick={() => handleHabitToggle(habit)}
                  className={`
                    w-full p-3 rounded-lg border text-left transition-all duration-200
                    ${profile.habits.includes(habit)
                      ? 'border-primary bg-primary/10 text-foreground font-medium' 
                      : 'border-border hover:border-primary/50 text-foreground'
                    }
                  `}
                >
                  <span className="mr-3">
                    {profile.habits.includes(habit) ? '✅' : '⚪'}
                  </span>
                  {habit}
                </button>
              ))}
            </div>
          </Card>

          {/* AI Analysis Preview */}
          <Card className="dopamind-card p-6 gradient-focus text-white">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-semibold mb-2">
                  Mindy está analisando seu perfil...
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Com base nas suas respostas, já posso sugerir algumas estratégias personalizadas para melhorar seu foco e produtividade.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>⚡</span>
                  <span>Análise em tempo real</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            disabled={!profile.name || !profile.routine}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 h-12"
          >
            Continuar para Humor
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;