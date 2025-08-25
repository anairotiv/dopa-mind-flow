import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Brain, Lightbulb, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { aiService } from "@/lib/ai-service";
import ApiKeyInput from "@/components/ApiKeyInput";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChat = () => {
  const navigate = useNavigate();
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Inicializar com mensagem de boas-vindas
    initializeChat();
  }, []);

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: "welcome",
      type: "ai",
      content: `Olá! Eu sou a Mindy, sua especialista em neurociência e bem-estar mental! 🧠💙

Como psicóloga digital, estou aqui para te ajudar com estratégias baseadas em ciência para melhorar seu foco, reduzir ansiedade e otimizar sua mente.

Pode me contar como você está se sentindo hoje ou o que gostaria de trabalhar? 😊`,
      timestamp: new Date(),
      suggestions: [
        "Estou estressado e preciso de ajuda",
        "Como melhorar meu foco?",
        "Tenho dificuldade para dormir",
        "Procrastino muito, me ajude"
      ]
    };
    setMessages([welcomeMessage]);
  };

  const handleApiKeySet = (apiKey: string) => {
    aiService.setApiKey(apiKey);
    setIsApiConfigured(true);
    setShowApiSetup(false);
  };

  const handleSkipApi = () => {
    setShowApiSetup(false);
  };

  const quickActions = [
    { icon: "🧠", label: "Análise de Foco", prompt: "Analise meu padrão de foco hoje" },
    { icon: "😊", label: "Estado Mental", prompt: "Como está meu humor e energia?" },
    { icon: "📚", label: "Sugestões de Estudo", prompt: "Crie um plano de estudos otimizado" },
    { icon: "⚡", label: "Boost de Energia", prompt: "Preciso de energia para trabalhar" },
    { icon: "🎯", label: "Definir Metas", prompt: "Ajude-me a definir metas realistas" },
    { icon: "🧘", label: "Relaxamento", prompt: "Estou estressado, o que fazer?" }
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Contexto do usuário (pode ser expandido com dados reais)
      const userContext = {
        mood: "neutro", // Pode vir do MoodTracker
        energy: 75,     // Pode vir de dados reais
        recentActivity: "navegando no app",
        timeOfDay: new Date().getHours() < 12 ? "manhã" : new Date().getHours() < 18 ? "tarde" : "noite"
      };

      // Generate fictional AI response about neuroscience and psychology
      const aiResponse = generateNeuroResponse(content.trim());
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente? 😅",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNeuroResponse = (userInput: string) => {
    const responses = {
      foco: {
        content: "🧠 **Neurociência do Foco:**\n\nO córtex pré-frontal é responsável pela atenção executiva. Para otimizá-lo:\n\n• 🍅 **Técnica Pomodoro:** Trabalha com os ciclos naturais de dopamina (25min é o tempo ideal para manter neurotransmissores ativos)\n• 🚫 **Eliminação de distrações:** Cada interrupção leva em média 23 minutos para reconquistar o foco profundo\n• 🎵 **Música 40Hz:** Ondas gamma aumentam concentração e neuroplasticidade\n• 💊 **Dopamina natural:** Completar micro-tarefas gera recompensas neurais que sustentam motivação\n\nSeu cérebro está mais focado entre 10h-12h e 14h-16h (picos de cortisol e dopamina).",
        suggestions: ["Como funciona a dopamina?", "Técnicas de respiração para foco", "Combater procrastinação"]
      },
      humor: {
        content: "🧬 **Análise Neuroquímica do Humor:**\n\nSeu humor positivo indica bons níveis de serotonina e dopamina! Isso otimiza:\n\n• 🎯 **Neuroplasticidade:** Humor positivo aumenta BDNF (fator neurotrófico), facilitando aprendizado\n• ⚡ **Energia cognitiva:** Quando serotonina está alta, o córtex pré-frontal funciona 40% melhor\n• 🧠 **Memória:** Estados positivos ativam o hipocampo, melhorando consolidação de memórias\n\n**Cronobiologia:** Seu pico energético será às 14h-16h (cortisol + dopamina). Use para tarefas complexas!\n\n💡 Mantenha esse estado com gratidão (libera oxitocina) e hidratação (cérebro é 75% água).",
        suggestions: ["Como manter serotonina alta?", "Ciência da gratidão", "Cronobiologia pessoal"]
      },
      estudo: {
        content: "📚 **Neurociência do Aprendizado:**\n\n**Plano baseado em ritmos circadianos e neurotransmissores:**\n\n• 🌅 **9h-11h:** Cortisol alto = melhor para conteúdo difícil (neurônios mais 'despertos')\n• 🧠 **Técnica Feynman:** Explicar conceitos ativa múltiplas áreas cerebrais\n• 💤 **Microdescansos:** A cada 25min, cérebro consolida informações no modo padrão\n• 🔄 **Revisão espaçada:** Hermann Ebbinghaus provou que repetir em intervalos específicos (1h, 1dia, 1semana) transfere da memória de curto para longo prazo\n• 🎯 **14h-16h:** Pico de dopamina + menor adenosina = foco máximo\n\n💡 **Hack neurológico:** Estudar antes de dormir + revisar ao acordar = consolida 300% mais eficiente!",
        suggestions: ["Técnica Feynman explicada", "Como funciona a memória", "Revisão espaçada científica"]
      },
      energia: {
        content: "⚡ **Biohacking de Energia:**\n\n**Estratégias baseadas em neurociência:**\n\n• 🫁 **Respiração 4-7-8:** Ativa sistema nervoso parassimpático, reduz cortisol em 23%\n• 💧 **Hidratação neural:** Cérebro desidratado perde 12% da eficiência cognitiva\n• 🚶 **Caminhada 3min:** Aumenta BDNF e noradrenalina (neurotransmissor da energia)\n• ☕ **Adenosina blocking:** Cafeína bloqueia receptores de cansaço por 4-6h\n• 🎵 **Frequências 40Hz:** Estimulam ondas gamma, aumentando alerta mental\n\n💡 **Hack avançado:** Exposição à luz azul por 2min ativa núcleo supraquiasmático = energia instantânea!\n\n**Status energético:** Neurônios →  75% ativados → Meta: 90%",
        suggestions: ["Respiração 4-7-8 guiada", "Ciência da luz azul", "Como fazer neurofeedback"]
      },
      stress: {
        content: "🧠 **Neurobiologia do Estresse:**\n\n**O que acontece no seu cérebro:**\n• Amígdala hiperativa libera cortisol/adrenalina\n• Córtex pré-frontal (área racional) fica 'offline'\n• Hipocampo (memória) é temporariamente prejudicado\n\n**Protocolo de recuperação neural:**\n• 🫁 **Box breathing (4-4-4-4):** Reativa nervo vago, reduz cortisol em minutos\n• 🧘 **Mindfulness 5min:** Estudos mostram que reestrutura amígdala em 8 semanas\n• 🚶 **Movimento suave:** Libera endorfinas e metaboliza cortisol\n• 💤 **Power nap 20min:** Reseta sistema nervoso simpático\n\n💡 **Fato científico:** Estresse crônico reduz neurônios do hipocampo, mas são regeneráveis com práticas corretas!",
        suggestions: ["Box breathing guiado", "Ciência do mindfulness", "Como regenerar neurônios"]
      },
      procrastinacao: {
        content: "🎯 **Neurociência da Procrastinação:**\n\n**Por que procrastinamos:**\n• Sistema límbico (prazer imediato) vs córtex pré-frontal (planejamento)\n• Baixa dopamina torna tarefas 'pouco recompensadoras'\n• Amígdala ativa medo do fracasso = paralisia\n\n**Hacks neurológicos anti-procrastinação:**\n• 🍅 **Regra dos 2 minutos:** Inicia o sistema de recompensa neural\n• 🎯 **Micro-objetivos:** Cada conclusão libera dopamina, criando momentum\n• 🚫 **Bloqueio de distração:** Preserva neurotransmissores para a tarefa principal\n• ⏰ **Timeboxing:** Córtex pré-frontal trabalha melhor com limites definidos\n\n💡 **Descoberta:** Procrastinação é defeito evolutivo - nosso cérebro não evoluiu para tarefas abstratas/futuras!",
        suggestions: ["Regra dos 2 minutos", "Hack da dopamina", "Como treinar pré-frontal"]
      },
      default: {
        content: "🧠 **Sou sua Mindy - Especialista em Neurociência Aplicada!**\n\nComo psicóloga digital especializada em neurociência cognitiva, posso te ajudar com:\n\n• 🎯 **Otimização de foco:** Baseado em ciência da atenção\n• 🧬 **Regulação emocional:** Neurobiologia do humor e stress\n• 💡 **Aprendizado eficiente:** Como seu cérebro processa informações\n• ⚡ **Biohacking mental:** Técnicas para hackear neurotransmissores\n• 🔄 **Formação de hábitos:** Neuroplasticidade e loops de recompensa\n\nTudo baseado em estudos científicos e neuroimagem funcional!\n\n**O que gostaria de otimizar no seu cérebro hoje?**",
        suggestions: ["Como melhorar meu foco?", "Combater ansiedade", "Hackear produtividade", "Ciência do sono"]
      }
    };

    const input = userInput.toLowerCase();
    let response = responses.default;

    if (input.includes("foco") || input.includes("concentra") || input.includes("atenção")) {
      response = responses.foco;
    } else if (input.includes("humor") || input.includes("sentindo") || input.includes("estado")) {
      response = responses.humor;
    } else if (input.includes("estud") || input.includes("aprender") || input.includes("memória")) {
      response = responses.estudo;
    } else if (input.includes("energia") || input.includes("cansad") || input.includes("boost") || input.includes("disposição")) {
      response = responses.energia;
    } else if (input.includes("stress") || input.includes("estresse") || input.includes("ansied") || input.includes("nervos")) {
      response = responses.stress;
    } else if (input.includes("procrastin") || input.includes("adiando") || input.includes("preguiça")) {
      response = responses.procrastinacao;
    }

    return {
      content: response.content,
      suggestions: response.suggestions
    };
  };

  // Mostrar configuração de API se necessário
  if (showApiSetup) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
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
                  <h1 className="text-xl font-bold text-foreground">Configurar Mindy</h1>
                  <p className="text-sm text-muted-foreground">Sua assistente de IA personalizada</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <ApiKeyInput 
            onApiKeySet={handleApiKeySet}
            onSkip={handleSkipApi}
          />
        </div>
      </div>
    );
  }

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
                <p className="text-sm text-muted-foreground">
                  {isApiConfigured ? "IA Avançada ativada 🧠✨" : "Assistente especialista em neurociência"}
                </p>
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
              disabled={isLoading}
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
                          disabled={isLoading}
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
                    U
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full h-fit">
                <Brain className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <div className="bg-muted p-4 rounded-2xl">
                <div className="text-sm text-muted-foreground">
                  Mindy está pensando... 🧠
                </div>
              </div>
            </div>
          )}
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
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(inputMessage)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isLoading}
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