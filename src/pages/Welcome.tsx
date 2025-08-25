import { Button } from "@/components/ui/button";
import { Brain, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen gradient-dopamind flex items-center justify-center relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-accent-glow rounded-full pulse-gentle"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/70 rounded-full float"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-accent rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/50 rounded-full pulse-gentle"></div>
      </div>

      <div className="text-center text-white z-10 px-6 max-w-md">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          <div className="relative inline-block">
            <Brain className="w-24 h-24 mx-auto mb-4 pulse-gentle" />
            <Zap className="w-8 h-8 text-accent absolute top-2 -right-2 animate-bounce" />
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -left-2 animate-pulse" />
            
            {/* Dopamine flow effect */}
            <div className="absolute -inset-4">
              <div className="w-1 h-1 bg-accent rounded-full absolute top-8 left-8 animate-ping"></div>
              <div className="w-1 h-1 bg-accent rounded-full absolute top-12 left-12 animate-ping delay-75"></div>
              <div className="w-1 h-1 bg-accent rounded-full absolute top-16 left-16 animate-ping delay-150"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-shadow">
            Dopamind
          </h1>
          <p className="text-white/80 text-sm">Powered by Vitória • Focused on You</p>
        </div>

        {/* Impact phrase */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold text-shadow leading-tight">
            Organize sua mente,<br />
            domine seu foco.
          </h2>
          <p className="text-white/80 text-lg">
            Transforme distrações em produtividade com inteligência artificial personalizada
          </p>
        </div>

        {/* Action button */}
        <Button onClick={() => navigate('/profile')} size="lg" className="
            bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 
            backdrop-blur-sm text-lg px-8 py-4 h-auto rounded-2xl
            transition-all duration-300 hover:scale-105 hover:shadow-2xl
            group
          ">
          <span className="mr-3">🚀</span>
          Entrar no Dopamind
          <Sparkles className="ml-3 w-5 h-5 group-hover:animate-spin" />
        </Button>

        {/* Subtitle */}
        <p className="text-white/60 text-sm mt-6">
          Sua jornada para um foco extraordinário começa agora
        </p>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 float">
        🧠
      </div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 pulse-gentle">
        ⚡
      </div>
    </div>;
};
export default Welcome;