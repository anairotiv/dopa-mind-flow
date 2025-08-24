import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Brain, Lightbulb, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Olá! Eu sou a Mindy, sua assistente de produtividade e bem-estar! 😊 Como posso te ajudar hoje? Vejo que você está com uma energia boa!",
      timestamp: new Date(),
      suggestions: [
        "Como melhorar meu foco?",
        "Sugestões para hoje",
        "Analisar meu humor",
        "Criar nova rotina"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");

  const quickActions = [
    { icon: "🧠", label: "Análise de Foco", prompt: "Analise meu padrão de foco hoje" },
    { icon: "😊", label: "Estado Mental", prompt: "Como está meu humor e energia?" },
    { icon: "📚", label: "Sugestões de Estudo", prompt: "Crie um plano de estudos otimizado" },
    { icon: "⚡", label: "Boost de Energia", prompt: "Preciso de energia para trabalhar" },
    { icon: "🎯", label: "Definir Metas", prompt: "Ajude-me a definir metas realistas" },
    { icon: "🧘", label: "Relaxamento", prompt: "Estou estressado, o que fazer?" }
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): Message => {
    const responses = {
      foco: {
        content: "Com base nos seus dados, você tem 3h15min de foco hoje! 🎯 Para melhorar ainda mais, recomendo:\n\n• 🍅 Técnica Pomodoro: 25min foco + 5min pausa\n• 📱 Modo avião durante estudos\n• 🎵 Música instrumental para concentração\n\nQuer que eu configure um timer Pomodoro para você?",
        suggestions: ["Configurar Pomodoro", "Mais dicas de foco", "Analisar distrações"]
      },
      humor: {
        content: "Vejo que você está com humor positivo (😊) e energia em 75%! Isso é ótimo! 🌟\n\nPara manter essa energia:\n• ☀️ Aproveite para tarefas importantes\n• 💧 Hidrate-se bem\n• 🚶 Faça pausas ativas\n\nSeu melhor horário de foco será entre 14h-16h hoje!",
        suggestions: ["Ver cronograma ideal", "Exercícios de energia", "Definir prioridades"]
      },
      estudo: {
        content: "Vou criar um plano personalizado para você! 📚✨\n\n**Plano de Estudo Otimizado:**\n• 🌅 9h-11h: Conteúdo mais difícil (energia alta)\n• ☕ 11h-11h15: Pausa\n• 📖 11h15-12h30: Revisão ativa\n• 🍽️ 12h30-14h: Almoço e descanso\n• 🎯 14h-16h: Foco intenso (pico de energia)\n• 🧘 16h-16h15: Meditação\n\nQuer que eu configure esses horários na sua agenda?",
        suggestions: ["Adicionar à agenda", "Ajustar horários", "Técnicas de memorização"]
      },
      energia: {
        content: "Vamos dar aquele boost! ⚡💪\n\n**Estratégias imediatas:**\n• 🫁 5 respirações profundas (agora mesmo!)\n• 💧 1 copo de água\n• 🎵 Música energizante por 2 minutos\n• 🚶 Caminhada de 3 minutos\n• ☕ Chá verde ou café (se necessário)\n\n**Energia atual: 75% → Meta: 90%**\n\nVamos começar?",
        suggestions: ["Iniciar respiração", "Playlist energizante", "Exercícios rápidos"]
      },
      default: {
        content: "Entendi! Com base no seu perfil e humor atual, aqui estão minhas sugestões personalizadas:\n\n• 🎯 Foque nas tarefas importantes entre 14h-16h\n• 🧘 Faça uma pausa de 10 minutos a cada hora\n• 📱 Tente uma pausa digital de 15 minutos\n• 💧 Mantenha-se hidratado\n\nO que gostaria de explorar primeiro?",
        suggestions: ["Otimizar rotina", "Melhorar concentração", "Gerenciar energia", "Reduzir estresse"]
      }
    };

    const input = userInput.toLowerCase();
    let response = responses.default;

    if (input.includes("foco") || input.includes("concentra")) {
      response = responses.foco;
    } else if (input.includes("humor") || input.includes("energia") || input.includes("sentindo")) {
      response = responses.humor;
    } else if (input.includes("estud") || input.includes("aprender")) {
      response = responses.estudo;
    } else if (input.includes("energia") || input.includes("cansad") || input.includes("boost")) {
      response = responses.energia;
    }

    return {
      id: Date.now().toString(),
      type: "ai",
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Conversar com Mindy</h1>
                <p className="text-sm text-muted-foreground">Sua assistente de IA personalizada</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="h-16 flex-col text-xs"
              onClick={() => handleSendMessage(action.prompt)}
            >
              <span className="text-lg mb-1">{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "ai" && (
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full h-fit">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground ml-12"
                    : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">
                  {message.content}
                </div>
                
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      Sugestões rápidas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleSendMessage(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              
              {message.type === "user" && (
                <div className="flex-shrink-0 p-2 bg-primary rounded-full h-fit">
                  <div className="w-5 h-5 text-primary-foreground text-xs font-bold flex items-center justify-center">
                    J
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-background border-t border-border/50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              placeholder="Digite sua mensagem para Mindy..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;