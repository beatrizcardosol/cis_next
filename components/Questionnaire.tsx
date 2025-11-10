import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Shield, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Monitor,
  Lock,
  Database,
  Settings,
  Zap
} from 'lucide-react';

interface QuestionnaireProps {
  onNavigate: (page: string) => void;
}

interface Control {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  questions: {
    id: string;
    text: string;
    helpText?: string;
  }[];
}

interface Answer {
  controlId: string;
  questionId: string;
  value: string;
}

export function Questionnaire({ onNavigate }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const maturityLevels = [
    { value: '0', label: 'Não Implementado', color: 'bg-red-100 text-red-800' },
    { value: '1', label: 'Parcialmente Implementado', color: 'bg-yellow-100 text-yellow-800' },
    { value: '2', label: 'Implementado', color: 'bg-blue-100 text-blue-800' },
    { value: '3', label: 'Automatizado', color: 'bg-green-100 text-green-800' }
  ];

  const cisControls: Control[] = [
    {
      id: 'inv',
      title: 'Inventário e Controle de Ativos',
      description: 'Identificar e gerenciar ativos de hardware e software',
      category: 'IG1',
      icon: Monitor,
      questions: [
        {
          id: 'inv1',
          text: 'A organização mantém um inventário atualizado de todos os dispositivos autorizados?',
          helpText: 'Inclui computadores, servidores, dispositivos móveis e IoT'
        },
        {
          id: 'inv2',
          text: 'Existe um processo para identificar dispositivos não autorizados na rede?',
          helpText: 'Processo automatizado ou manual de detecção'
        },
        {
          id: 'inv3',
          text: 'A organização gerencia um inventário de software autorizado?',
          helpText: 'Lista de aplicações aprovadas para uso corporativo'
        }
      ]
    },
    {
      id: 'access',
      title: 'Controle de Acesso',
      description: 'Gerenciar contas e privilégios de acesso',
      category: 'IG1',
      icon: Lock,
      questions: [
        {
          id: 'acc1',
          text: 'A organização possui políticas formais de controle de acesso?'
        },
        {
          id: 'acc2',
          text: 'Contas de usuário são revisadas regularmente?'
        },
        {
          id: 'acc3',
          text: 'Existe segregação de funções para atividades críticas?'
        }
      ]
    },
    {
      id: 'data',
      title: 'Proteção de Dados',
      description: 'Proteção de dados sensíveis e críticos',
      category: 'IG2',
      icon: Database,
      questions: [
        {
          id: 'data1',
          text: 'Dados sensíveis são classificados e rotulados adequadamente?'
        },
        {
          id: 'data2',
          text: 'Existe criptografia para dados em trânsito e em repouso?'
        },
        {
          id: 'data3',
          text: 'A organização possui backup regular dos dados críticos?'
        }
      ]
    },
    {
      id: 'config',
      title: 'Configuração Segura',
      description: 'Configuração segura de sistemas e aplicações',
      category: 'IG2',
      icon: Settings,
      questions: [
        {
          id: 'conf1',
          text: 'Existe um padrão de configuração segura para sistemas?'
        },
        {
          id: 'conf2',
          text: 'Configurações são validadas regularmente?'
        },
        {
          id: 'conf3',
          text: 'Vulnerabilidades são corrigidas dentro de prazos definidos?'
        }
      ]
    },
    {
      id: 'malware',
      title: 'Defesa contra Malware',
      description: 'Proteção contra códigos maliciosos',
      category: 'IG3',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: 'A organização possui soluções antimalware atualizadas?'
        },
        {
          id: 'mal2',
          text: 'Existe monitoramento proativo de ameaças?'
        },
        {
          id: 'mal3',
          text: 'Usuários recebem treinamento sobre segurança?'
        }
      ]
    }
  ];

  const getAnswerValue = (controlId: string, questionId: string): string => {
    const answer = answers.find(a => a.controlId === controlId && a.questionId === questionId);
    return answer?.value || '';
  };

  const setAnswer = (controlId: string, questionId: string, value: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => !(a.controlId === controlId && a.questionId === questionId));
      return [...filtered, { controlId, questionId, value }];
    });
  };

  const getControlProgress = (control: Control): number => {
    const answered = control.questions.filter(q => 
      getAnswerValue(control.id, q.id) !== ''
    ).length;
    return (answered / control.questions.length) * 100;
  };

  const getTotalProgress = (): number => {
    const totalQuestions = cisControls.reduce((sum, control) => sum + control.questions.length, 0);
    const answeredQuestions = answers.length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getControlStatus = (control: Control): 'complete' | 'partial' | 'empty' => {
    const progress = getControlProgress(control);
    if (progress === 100) return 'complete';
    if (progress > 0) return 'partial';
    return 'empty';
  };

  const handleSave = () => {
    // Simular salvamento
    alert('Progresso salvo com sucesso!');
  };

  const handleComplete = () => {
    const totalQuestions = cisControls.reduce((sum, control) => sum + control.questions.length, 0);
    if (answers.length === totalQuestions) {
      onNavigate('dashboard');
    } else {
      alert('Por favor, responda todas as perguntas antes de finalizar.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="figma:asset/7720c0e2e8e302af86006022857c2466cdff1b1b.png"
              alt="BlackBelt IT Solutions" 
              className="h-8 w-auto"
            />
            <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="border-l border-gray-300 pl-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Questionário de Maturidade CIS
              </h1>
              <p className="text-gray-600">
                Avalie o nível de implementação dos controles de segurança
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Progresso
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleComplete}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Finalizar Avaliação
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Barra de Progresso Global */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progresso Geral</h3>
              <span className="text-sm text-gray-600">{Math.round(getTotalProgress())}% concluído</span>
            </div>
            <Progress value={getTotalProgress()} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{answers.length} de {cisControls.reduce((sum, control) => sum + control.questions.length, 0)} perguntas respondidas</span>
              <span>{cisControls.filter(c => getControlStatus(c) === 'complete').length} de {cisControls.length} controles completos</span>
            </div>
          </CardContent>
        </Card>

        {/* Legenda */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Níveis de Maturidade:</h4>
            <div className="flex flex-wrap gap-3">
              {maturityLevels.map(level => (
                <Badge key={level.value} className={level.color}>
                  {level.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controles CIS */}
        <div className="space-y-4">
          <Accordion 
            type="multiple" 
            value={expandedItems}
            onValueChange={setExpandedItems}
            className="space-y-4"
          >
            {cisControls.map((control) => {
              const IconComponent = control.icon;
              const status = getControlStatus(control);
              const progress = getControlProgress(control);
              
              return (
                <AccordionItem key={control.id} value={control.id}>
                  <Card className={`transition-all ${
                    status === 'complete' ? 'border-green-200 bg-green-50' :
                    status === 'partial' ? 'border-yellow-200 bg-yellow-50' :
                    'border-gray-200'
                  }`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            status === 'complete' ? 'bg-green-100' :
                            status === 'partial' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              status === 'complete' ? 'text-green-600' :
                              status === 'partial' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{control.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {control.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{control.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{Math.round(progress)}%</p>
                            <Progress value={progress} className="w-20 h-2" />
                          </div>
                          {status === 'complete' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          {status === 'partial' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-6 pt-4 space-y-6">
                        {control.questions.map((question) => (
                          <div key={question.id} className="border-l-4 border-gray-200 pl-4">
                            <div className="flex items-start gap-2 mb-3">
                              <h4 className="font-medium text-gray-900 flex-1">
                                {question.text}
                              </h4>
                              {question.helpText && (
                                <div className="group relative">
                                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                  <div className="absolute bottom-6 right-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    {question.helpText}
                                  </div>
                                </div>
                              )}
                            </div>
                            <RadioGroup
                              value={getAnswerValue(control.id, question.id)}
                              onValueChange={(value) => setAnswer(control.id, question.id, value)}
                              className="grid grid-cols-2 md:grid-cols-4 gap-3"
                            >
                              {maturityLevels.map((level) => (
                                <div key={level.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={level.value} id={`${question.id}-${level.value}`} />
                                  <Label 
                                    htmlFor={`${question.id}-${level.value}`}
                                    className="text-sm cursor-pointer flex-1"
                                  >
                                    {level.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-center gap-4 mt-8 pb-8">
          <Button variant="outline" onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Salvar e Continuar Depois
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700" 
            onClick={handleComplete}
            size="lg"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Finalizar Avaliação
          </Button>
        </div>
      </div>
    </div>
  );
}