import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Brain, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  onSkip: () => void;
}

const ApiKeyInput = ({ onApiKeySet, onSkip }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async () => {
    if (!apiKey.trim()) return;
    
    setIsValidating(true);
    // Simular validação (você pode adicionar validação real da API aqui)
    setTimeout(() => {
      onApiKeySet(apiKey.trim());
      setIsValidating(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ativar IA Avançada 🧠✨
          </h2>
          <p className="text-muted-foreground">
            Para conversas mais inteligentes e personalizadas com Mindy
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Opcional:</strong> Com uma chave API, Mindy terá acesso a conhecimento avançado em neurociência e psicologia.
            Sem ela, ainda funciona com respostas inteligentes pré-programadas.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey" className="text-sm font-medium">
              Chave API OpenAI (opcional)
            </Label>
            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={!apiKey.trim() || isValidating}
                className="whitespace-nowrap"
              >
                {isValidating ? "Validando..." : "Ativar"}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Continuar sem IA avançada
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium text-sm mb-2">🎯 Com IA Avançada, Mindy pode:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Responder perguntas complexas sobre neurociência</li>
            <li>• Criar planos personalizados baseados no seu perfil</li>
            <li>• Adaptar estratégias ao seu humor e energia</li>
            <li>• Oferecer técnicas avançadas de psicologia cognitiva</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeyInput;