interface AIResponse {
  content: string;
  suggestions?: string[];
}

interface UserContext {
  mood: string;
  energy: number;
  recentActivity: string;
  timeOfDay: string;
}

export class AIService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateResponse(userMessage: string, context?: UserContext): Promise<AIResponse> {
    // If API key is available, use advanced AI
    if (this.apiKey) {
      return this.generateAdvancedResponse(userMessage, context);
    }
    
    // Fallback to enhanced rule-based responses
    return this.generateEnhancedResponse(userMessage, context);
  }

  private async generateAdvancedResponse(userMessage: string, context?: UserContext): Promise<AIResponse> {
    const systemPrompt = `Você é Mindy, uma assistente especializada em psicologia, neurociência e produtividade. 

SUAS CARACTERÍSTICAS:
- Especialista em neurociência aplicada ao foco e produtividade
- Conhecimento profundo em psicologia cognitiva e comportamental
- Abordagem empática e científica
- Respostas práticas baseadas em evidências

CONTEXTO DO USUÁRIO:
${context ? `
- Humor atual: ${context.mood}
- Nível de energia: ${context.energy}%
- Atividade recente: ${context.recentActivity}
- Horário: ${context.timeOfDay}
` : 'Contexto não disponível'}

DIRETRIZES:
1. Seja empática e acolhedora
2. Use emojis moderadamente para humanizar
3. Ofereça soluções práticas baseadas em neurociência
4. Mantenha respostas entre 100-200 palavras
5. Sempre inclua uma pergunta ou sugestão de ação
6. Use linguagem acessível, não técnica demais

Responda como Mindy ajudaria com essa situação específica.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        return {
          content: data.choices[0].message.content,
          suggestions: this.generateSuggestions(userMessage)
        };
      }
    } catch (error) {
      console.error('Erro na API:', error);
    }

    // Fallback para resposta rule-based se API falhar
    return this.generateEnhancedResponse(userMessage, context);
  }

  private generateEnhancedResponse(userMessage: string, context?: UserContext): AIResponse {
    const message = userMessage.toLowerCase();
    
    // Banco de conhecimento baseado em neurociência
    const responses = {
      stress: {
        content: `Entendo que você está se sentindo estressado 😔. Do ponto de vista neurológico, o estresse crônico prejudica o córtex pré-frontal, nossa "central de comando" para foco e tomada de decisões.

**Estratégias neurocientíficas:**
• 🫁 **Respiração 4-7-8**: Ativa o sistema nervoso parassimpático
• 🚶 **Caminhada de 10 min**: Libera BDNF (fator neurotrófico)
• 🧘 **Mindfulness**: Reduz cortisol e fortalece a atenção
• 💧 **Hidratação**: Cérebro é 75% água - mesmo 2% de desidratação afeta o foco

O que você gostaria de experimentar primeiro?`,
        suggestions: ["Guiar respiração 4-7-8", "Exercícios de mindfulness", "Plano anti-estresse", "Entender meu estresse"]
      },
      
      foco: {
        content: `Vamos otimizar seu foco com base na neurociência! 🧠✨

Seu cérebro tem ciclos naturais de atenção. O córtex pré-frontal funciona melhor em "blocos" de foco intenso seguidos de pausas restauradoras.

**Protocolo neurocientífico:**
• ⏱️ **25-45 min de foco**: Baseado nos ritmos ultradianos
• 🔄 **5-15 min de pausa**: Permite consolidação neural
• ☕ **Cafeína estratégica**: 90-120 min após acordar (evita crash de adenosina)
• 🎵 **Música instrumental**: Ativa ondas alfa (8-12 Hz)

${context ? `Com sua energia em ${context.energy}%, recomendo ${context.energy > 70 ? 'sessões de 45 min' : 'blocos de 25 min'}.` : ''}

Qual aspecto do foco você quer melhorar?`,
        suggestions: ["Configurar Pomodoro", "Playlist de foco", "Eliminar distrações", "Medir meu foco"]
      },

      ansiedade: {
        content: `A ansiedade é uma resposta natural, mas podemos "reprogramar" como seu cérebro a processa 💙

**Base neurocientífica:**
A amígdala (centro do medo) está hiperativada, enquanto o córtex pré-frontal (razão) está suprimido. Precisamos reequilibrar isso.

**Técnicas comprovadas:**
• 🧠 **5-4-3-2-1**: 5 coisas que vê, 4 que toca, 3 que escuta...
• ❄️ **Água fria no rosto**: Ativa reflexo de mergulho, reduz frequência cardíaca
• 📝 **Journaling**: Externaliza pensamentos, reduz atividade da amígdala
• 🤗 **Auto-abraço**: Libera oxitocina naturalmente

A ansiedade está relacionada a alguma situação específica?`,
        suggestions: ["Técnica 5-4-3-2-1", "Exercício de respiração", "Journaling guiado", "Estratégias para situação específica"]
      },

      sono: {
        content: `O sono é fundamental para consolidação da memória e regulação emocional! 😴✨

**Neurociência do sono:**
Durante o sono, seu cérebro "limpa" toxinas através do sistema glinfático e consolida aprendizados do dia.

**Protocolo de higiene do sono:**
• 🌅 **Luz solar matinal**: Sincroniza ritmo circadiano
• 📱 **Telas off 1h antes**: Luz azul suprime melatonina
• 🌡️ **Quarto 18-20°C**: Temperatura ideal para sono profundo
• 🧘 **Rotina de relaxamento**: Sinaliza ao cérebro que é hora de dormir

${context ? `Considerando que são ${context.timeOfDay}, ` : ''}que aspecto do sono você gostaria de melhorar?`,
        suggestions: ["Rotina noturna", "Melhorar qualidade do sono", "Lidar com insônia", "Horários ideais"]
      },

      procrastinacao: {
        content: `A procrastinação é uma resposta emocional, não uma falha de caráter! 🎯

**O que acontece no cérebro:**
O sistema límbico (emocional) "sequestra" o córtex pré-frontal (racional) quando uma tarefa parece ameaçadora ou desagradável.

**Estratégias neurocientíficas:**
• ⚡ **Regra dos 2 minutos**: Engana a amígdala, cria momentum
• 🍅 **Técnica Pomodoro**: Divide tarefas em "doses" gerenciáveis
• 🎉 **Recompensas imediatas**: Hack do sistema de dopamina
• 🔄 **Implementação de intenções**: "Quando X, então farei Y"

Qual tarefa você está evitando? Vamos quebrá-la em micro-passos!`,
        suggestions: ["Quebrar tarefa em micro-passos", "Configurar recompensas", "Eliminar bloqueios mentais", "Técnica dos 2 minutos"]
      },

      default: {
        content: `Olá! Sou a Mindy, sua especialista em neurociência aplicada e bem-estar mental! 🧠💙

Como psicóloga digital, estou aqui para te ajudar com:
• 🎯 **Foco e produtividade** baseados em neurociência
• 😌 **Gestão de estresse e ansiedade**
• 🧘 **Técnicas de mindfulness e autorregulação**
• ⚡ **Otimização de energia mental**
• 💤 **Melhoria da qualidade do sono**

${context ? `Vejo que você está com humor ${context.mood} e energia em ${context.energy}%. ` : ''}

Como posso te ajudar hoje? Pode me contar o que está acontecendo na sua mente! 😊`,
        suggestions: ["Melhorar meu foco", "Reduzir ansiedade", "Aumentar energia", "Organizar pensamentos"]
      }
    };

    // Detecção inteligente de intenção
    if (message.includes('stress') || message.includes('estress') || message.includes('preocup') || message.includes('tensão')) {
      return responses.stress;
    }
    if (message.includes('foco') || message.includes('concentra') || message.includes('distração') || message.includes('atenção')) {
      return responses.foco;
    }
    if (message.includes('ansied') || message.includes('nervos') || message.includes('medo') || message.includes('preocup')) {
      return responses.ansiedade;
    }
    if (message.includes('sono') || message.includes('dormir') || message.includes('insônia') || message.includes('cansaço')) {
      return responses.sono;
    }
    if (message.includes('procrastin') || message.includes('adiar') || message.includes('evit') || message.includes('preguiça')) {
      return responses.procrastinacao;
    }

    return responses.default;
  }

  private generateSuggestions(message: string): string[] {
    const baseSuggestions = [
      "Exercícios para ansiedade",
      "Técnicas de foco",
      "Estratégias de sono",
      "Gerenciar estresse"
    ];
    
    return baseSuggestions;
  }
}

export const aiService = new AIService();