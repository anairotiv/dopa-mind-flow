import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIAssistant = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        onClick={() => navigate('/ai-chat')}
        className="
          h-14 w-14 rounded-full shadow-lg gradient-dopamind text-white
          hover:scale-110 transition-all duration-300 float glow-effect
          group
        "
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 pulse-gentle" />
        </div>
        
        <div className="
          absolute bottom-16 right-0 bg-background border border-border rounded-lg p-3 shadow-lg
          opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none
          min-w-[200px] text-sm text-foreground
        ">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">🤖</span>
            <span className="font-medium">Mindy</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Clique para conversar comigo!
          </p>
          
          {/* Tooltip arrow */}
          <div className="
            absolute bottom-[-6px] right-4 w-3 h-3 bg-background border-r border-b border-border
            transform rotate-45
          " />
        </div>
      </Button>
    </div>
  );
};

export default AIAssistant;