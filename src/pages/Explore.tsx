import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, BookOpen, Play, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Content {
  id: string;
  title: string;
  type: "article" | "video" | "exercise";
  category: "neuroscience" | "productivity" | "mindfulness" | "focus";
  duration: string;
  rating: number;
  description: string;
  isRecommended?: boolean;
}

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todos", icon: "🌟" },
    { id: "neuroscience", label: "Neurociência", icon: "🧠" },
    { id: "productivity", label: "Produtividade", icon: "⚡" },
    { id: "mindfulness", label: "Mindfulness", icon: "🧘" },
    { id: "focus", label: "Foco", icon: "🎯" }
  ];

  const contents: Content[] = [
    {
      id: "1",
      title: "Como a dopamina influencia seu foco",
      type: "article",
      category: "neuroscience",
      duration: "5 min leitura",
      rating: 4.8,
      description: "Entenda como seu cérebro funciona e use isso a seu favor para manter a concentração.",
      isRecommended: true
    },
    {
      id: "2",
      title: "Respiração 4-7-8 para ansiedade",
      type: "exercise",
      category: "mindfulness",
      duration: "3 min prática",
      rating: 4.9,
      description: "Técnica simples e eficaz para reduzir o estresse e melhorar o foco instantaneamente.",
      isRecommended: true
    },
    {
      id: "3",
      title: "Técnica Pomodoro: Guia Completo",
      type: "video",
      category: "productivity",
      duration: "8 min vídeo",
      rating: 4.7,
      description: "Aprenda a implementar a técnica Pomodoro de forma eficiente em sua rotina."
    },
    {
      id: "4",
      title: "Neuroplasticidade e hábitos",
      type: "article",
      category: "neuroscience",
      duration: "7 min leitura",
      rating: 4.6,
      description: "Como seu cérebro se adapta e forma novos hábitos. Ciência aplicada ao dia a dia."
    },
    {
      id: "5",
      title: "Meditação para iniciantes",
      type: "video",
      category: "mindfulness",
      duration: "10 min vídeo",
      rating: 4.8,
      description: "Sessão guiada de meditação para quem está começando na prática."
    },
    {
      id: "6",
      title: "Flow State: O estado de fluxo",
      type: "article",
      category: "focus",
      duration: "6 min leitura",
      rating: 4.9,
      description: "Como entrar e manter o estado de máxima concentração e produtividade."
    },
    {
      id: "7",
      title: "Exercício de atenção plena",
      type: "exercise",
      category: "mindfulness",
      duration: "5 min prática",
      rating: 4.5,
      description: "Pratique a atenção plena com este exercício simples e transformador."
    },
    {
      id: "8",
      title: "Gerenciamento de tempo digital",
      type: "video",
      category: "productivity",
      duration: "12 min vídeo",
      rating: 4.4,
      description: "Estratégias para usar a tecnologia de forma consciente e produtiva."
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return <BookOpen className="w-4 h-4" />;
      case "video": return <Play className="w-4 h-4" />;
      case "exercise": return <span className="text-sm">🧘</span>;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article": return "text-blue-600 bg-blue-100";
      case "video": return "text-red-600 bg-red-100";
      case "exercise": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "neuroscience": return "text-purple-600 bg-purple-100";
      case "productivity": return "text-orange-600 bg-orange-100";
      case "mindfulness": return "text-green-600 bg-green-100";
      case "focus": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || content.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedContents = contents.filter(content => content.isRecommended);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Explorar Conteúdos</h1>
              <p className="text-sm text-muted-foreground">Aprenda sobre neurociência e produtividade</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos, vídeos, exercícios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* AI Recommendations */}
        {recommendedContents.length > 0 && searchQuery === "" && selectedCategory === "all" && (
          <Card className="dopamind-card p-6 mb-8 gradient-focus text-white">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-full">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-shadow">
                  🤖 Recomendações Personalizadas da Mindy
                </h3>
                <p className="text-white/90">
                  Com base no seu perfil e atividades recentes, aqui estão os conteúdos ideais para você:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContents.map((content) => (
                <div
                  key={content.id}
                  className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-white/20`}>
                      {getTypeIcon(content.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{content.title}</h4>
                      <p className="text-white/80 text-sm mb-2">{content.description}</p>
                      <div className="flex items-center gap-3 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {content.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-300" />
                          {content.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <Card
              key={content.id}
              className="dopamind-card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-full ${getTypeColor(content.type)}`}>
                  {getTypeIcon(content.type)}
                </div>
                {content.isRecommended && (
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Recomendado</span>
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {content.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {content.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(content.category)}`}>
                    {categories.find(c => c.id === content.category)?.icon}
                    {categories.find(c => c.id === content.category)?.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {content.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    {content.rating}
                  </span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-primary hover:bg-primary/90" size="sm">
                {content.type === "video" && "▶️ Assistir"}
                {content.type === "article" && "📖 Ler"}
                {content.type === "exercise" && "🧘 Praticar"}
              </Button>
            </Card>
          ))}
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum conteúdo encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar sua busca ou selecionar uma categoria diferente
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="dopamind-card p-6 mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Ações Rápidas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">🎯</span>
              <span className="text-xs">Teste de Foco</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">🧘</span>
              <span className="text-xs">Meditação 5min</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">📚</span>
              <span className="text-xs">Quiz Neurociência</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">⚡</span>
              <span className="text-xs">Boost de Energia</span>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Explore;