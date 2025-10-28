import { useState, useEffect } from "react";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: string;
  type: 'multiple-choice' | 'written';
  question: string;
  options?: string[];
  // correctAnswer?: string;
}

interface AssessmentProps {
  niche: string;
  onComplete: () => void;
  onBack: () => void;
}

// Define all possible phases
type PhaseType = 'fundamentals' | 'history' | 'technical' | 'strategy' | 'communication' | 'cultural' | 'industry' | 'advanced' | 'testing' | 'process';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'fundamentals': 'Fundamentals & Principles (Conceptual Clarity)',
    'history': 'History & Context',
    'technical': 'Technical Knowledge',
    'strategy': 'Strategy & Brand Alignment',
    'communication': 'Client Communication & Management',
    'cultural': 'Cultural Sensitivity & Global Design',
    'industry': 'Industry-Specific Applications',
    'advanced': 'Advanced Design Scenarios',
    'testing': 'Testing & Validation',
    'process': 'Process & Workflow'
  };
  return titles[phase] || 'GraphicsDesignAssessment';
};

// Define question sets for each phase
const questionSets = {
  fundamentals: [
    {
      id: 'fund_1',
      type: 'written' as const,
      question: 'What are the five core principles of effective logo design?'
    },
    {
      id: 'fund_2',
      type: 'written' as const,
      question: 'Which is more important for a logo: originality or recognizability? Explain.'
    },
    {
      id: 'fund_3',
      type: 'written' as const,
      question: 'How do you define the difference between a logo and a symbol?'
    },
    {
      id: 'fund_4',
      type: 'written' as const,
      question: 'Why is scalability critical in logo design?'
    },
    {
      id: 'fund_5',
      type: 'written' as const,
      question: 'What\'s the difference between a monogram and a wordmark logo?'
    }
  ],
  history: [
    {
      id: 'hist_1',
      type: 'written' as const,
      question: 'Who designed the original Nike logo and what was unique about its creation?'
    },
    {
      id: 'hist_2',
      type: 'written' as const,
      question: 'Why is the FedEx logo considered an example of great design?'
    },
    {
      id: 'hist_3',
      type: 'written' as const,
      question: 'How have minimalist design trends changed logo design in the last decade?'
    },
    {
      id: 'hist_4',
      type: 'written' as const,
      question: 'Give an example of a global rebrand that failed and why.'
    },
    {
      id: 'hist_5',
      type: 'written' as const,
      question: 'Which logos in history have stood unchanged the longest, and what does that suggest about their design?'
    }
  ],
  technical: [
    {
      id: 'tech_1',
      type: 'written' as const,
      question: 'Why is vector format (.AI, .SVG) non-negotiable for logo design?'
    },
    {
      id: 'tech_2',
      type: 'written' as const,
      question: 'What\'s the difference between raster and vector graphics?'
    },
    {
      id: 'tech_3',
      type: 'written' as const,
      question: 'When should you use Pantone colors vs CMYK vs RGB?'
    },
    {
      id: 'tech_4',
      type: 'written' as const,
      question: 'What are responsive logos and why are they important?'
    },
    {
      id: 'tech_5',
      type: 'written' as const,
      question: 'Explain how kerning affects logo readability.'
    }
  ],
  strategy: [
    {
      id: 'strat_1',
      type: 'written' as const,
      question: 'How do you ensure a logo reflects a company\'s mission/values?'
    },
    {
      id: 'strat_2',
      type: 'written' as const,
      question: 'A luxury jewelry brand approaches you. What visual cues (colors, typography, styles) do you explore?'
    },
    {
      id: 'strat_3',
      type: 'written' as const,
      question: 'What\'s the danger of designing logos based only on client preferences?'
    },
    {
      id: 'strat_4',
      type: 'written' as const,
      question: 'How would you design a logo differently for a startup vs. a 50-year-old company rebrand?'
    },
    {
      id: 'strat_5',
      type: 'written' as const,
      question: 'What\'s the difference between brand identity and brand image?'
    }
  ],
  communication: [
    {
      id: 'comm_1',
      type: 'written' as const,
      question: 'A client says, “Just copy this competitor\'s logo but change the name.” How do you respond?'
    },
    {
      id: 'comm_2',
      type: 'written' as const,
      question: 'A client rejects all your concepts, but their feedback is vague (“It just doesn\'t pop”). What do you do next?'
    },
    {
      id: 'comm_3',
      type: 'written' as const,
      question: 'How do you present a logo to a client to maximize buy-in?'
    },
    {
      id: 'comm_4',
      type: 'written' as const,
      question: 'What\'s your policy if a client keeps asking for endless revisions?',
      // options: [
      //   'After showing them your portfolio',
      //   'During the initial consultation before any work begins',
      //   'After completing the first design concepts',
      //   'When they ask about it'
      // ],
      // correctAnswer: 'During the initial consultation before any work begins'

      // id: 'comm_4',
      // type: 'multiple-choice' as const,
      // question: 'What\'s your policy if a client keeps asking for endless revisions?',
      // // options: [
      // //   'After showing them your portfolio',     This is what multiple choice questions look like in temrs of pattern.
      // //   'During the initial consultation before any work begins',
      // //   'After completing the first design concepts',
      // //   'When they ask about it'
      // // ],
      // // correctAnswer: 'During the initial consultation before any work begins'
    },
    {
      id: 'comm_5',
      type: 'written' as const,
      question: 'How would you explain to a non-designer why simplicity is stronger than complexity?'
    }
  ],
  cultural: [
    {
      id: 'cul_1',
      type: 'written' as const,
      question: 'Why must logos be tested across cultures before approval?'
    },
    {
      id: 'cul_2',
      type: 'written' as const,
      question: 'A brand expansion to the Middle East wants to keep their logo. What considerations might you raise?'
    },
    {
      id: 'cul_3',
      type: 'written' as const,
      question: 'Give an example of a logo that unintentionally carried offensive meaning in another culture.'
    },
    {
      id: 'cul_4',
      type: 'written' as const,
      question: 'How do color meanings vary across cultures (e.g., red in China vs. Western countries)?'
    },
    {
      id: 'cul_5',
      type: 'written' as const,
      question: 'If a client insists on using an animal symbol, how would you research its meaning globally?'
    },
  ],
  industry: [
    {
      id: 'ind_1',
      type: 'written' as const,
      question: 'What makes a healthcare logo trustworthy?'
    },
    {
      id: 'ind_2',
      type: 'written' as const,
      question: 'How should a tech startup\'s logo differ from a non-profit organization\'s?'
    },
    {
      id: 'ind_3',
      type: 'written' as const,
      question: 'What design elements make a food & beverage logo appetizing?'
    },
    {
      id: 'ind_4',
      type: 'written' as const,
      question: 'Why do financial institutions lean toward certain colors and shapes?'
    },
    {
      id: 'ind_5',
      type: 'written' as const,
      question: 'What makes fashion and luxury brand logos distinct?'
    },
  ],
  advanced: [
    {
      id: 'adv_1',
      type: 'written' as const,
      question: 'Explain how negative space can add hidden meaning to a logo.'
    },
    {
      id: 'adv_2',
      type: 'written' as const,
      question: 'What\'s the difference between an emblem and a combination mark?'
    },
    {
      id: 'adv_3',
      type: 'written' as const,
      question: 'What’s the role of motion/animated logos in modern branding?'
    },
    {
      id: 'adv_4',
      type: 'written' as const,
      question: 'How would you adapt a logo for use in an app icon?'
    },
    {
      id: 'adv_5',
      type: 'written' as const,
      question: 'When is a logotype-only (wordmark) approach best?'
    },
  ],
  testing: [
    {
      id: 'tes_1',
      type: 'written' as const,
      question: 'How do you test if a logo works at small sizes?'
    },
    {
      id: 'tes_2',
      type: 'written' as const,
      question: 'What’s the importance of black-and-white versions of a logo?'
    },
    {
      id: 'tes_3',
      type: 'written' as const,
      question: 'How do you check contrast for accessibility compliance?'
    },
    {
      id: 'tes_4',
      type: 'written' as const,
      question: 'Describe how you’d run an A/B test for logo concepts.'
    },
    {
      id: 'tes_5',
      type: 'written' as const,
      question: 'How do you measure whether a logo is memorable?'
    },
  ],
  process: [
    {
      id: 'pro_1',
      type: 'written' as const,
      question: 'Walk me through your logo design process from client brief to delivery.'
    },
    {
      id: 'pro_2',
      type: 'written' as const,
      question: 'How many initial concepts should you provide to a client?'
    },
    {
      id: 'pro_3',
      type: 'written' as const,
      question: 'What deliverables should always be included in a brand identity package?'
    },
    {
      id: 'pro_4',
      type: 'written' as const,
      question: 'How do you organize and name your design files for client handover?'
    },
    {
      id: 'pro_5',
      type: 'written' as const,
      question: 'What\'s your system for ensuring brand consistency across all touchpoints after logo delivery?'
    },
  ]
};

// const Assessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
const GraphicsDesignAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [phase, setPhase] = useState<PhaseType>('fundamentals');

  // Define the sequence of phases (customize as needed)
  const phaseSequence: PhaseType[] = ['fundamentals', 'history', 'technical', 'strategy', 'communication', 'cultural', 'industry', 'advanced', 'testing', 'process'];
  const currentPhaseIndex = phaseSequence.indexOf(phase);
  const currentQuestionSet = questionSets[phase];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestionSet.length - 1) {
      // Move to next question in current phase
      setCurrentQuestion(prev => prev + 1);
    } else if (currentPhaseIndex < phaseSequence.length - 1) {
      // Move to next phase
      setPhase(phaseSequence[currentPhaseIndex + 1]);
      setCurrentQuestion(0);
    } else {
      // Complete the assessment
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Move to previous question in current phase
      setCurrentQuestion(prev => prev - 1);
    } else if (currentPhaseIndex > 0) {
      // Go back to previous phase
      const previousPhase = phaseSequence[currentPhaseIndex - 1];
      setPhase(previousPhase);
      setCurrentQuestion(questionSets[previousPhase].length - 1);
    }
    // If we're at the first question of the first phase, stay there
  };

  const currentQ = currentQuestionSet[currentQuestion];
  const currentAnswer = answers[currentQ.id] || '';
  const isAnswered = currentAnswer.trim().length > 0;

  // Calculate overall progress
  const totalQuestions = phaseSequence.reduce((sum, phaseKey) => sum + questionSets[phaseKey].length, 0);
  const completedQuestions = phaseSequence.slice(0, currentPhaseIndex).reduce((sum, phaseKey) => sum + questionSets[phaseKey].length, 0) + currentQuestion + 1;
  const overallProgress = (completedQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {getPhaseTitle(phase)}
            </h1>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {currentQuestionSet.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Phase {currentPhaseIndex + 1} of {phaseSequence.length} • Overall Progress: {completedQuestions} of {totalQuestions}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="font-mono font-medium text-gray-900">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          
          {/* Phase indicators */}
          {/* <div className="flex justify-between mt-3 text-xs">
            {phaseSequence.map((phaseKey, index) => (
              <div 
                key={phaseKey}
                className={`text-center ${
                  index === currentPhaseIndex 
                    ? 'font-medium text-blue-600' 
                    : index < currentPhaseIndex 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                }`}
              >
                <div className="truncate max-w-24">
                  {getPhaseTitle(phaseKey).split(' ')[0]}
                </div>
                <div className="text-xs mt-1">
                  ({questionSets[phaseKey].length}q)
                </div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {currentQ.type === 'multiple-choice' ? (
              <RadioGroup 
                value={currentAnswer} 
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
              >
                                                                  Incase we need to add multiple choice questions.
                <div className="space-y-4">
                  {currentQ.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem 
                        value={option} 
                        id={`option-${index}`}
                        className="text-blue-600"
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="text-base cursor-pointer leading-relaxed hover:text-gray-900 transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <Textarea
                placeholder="Type your detailed response here..."
                value={currentAnswer}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                className="min-h-32 resize-none"
                rows={6}
              />
            )} */}
            {currentQ.type === 'written' ? (
              <Textarea
              placeholder="Type your detailed response here..."
              value={currentAnswer}
              onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
              className="min-h-32 resize-none"
              rows={6}
            />
            ) : (
              <div>
                <p>Bonus Question Mate.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0 && currentPhaseIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button 
            onClick={handleNext}
            disabled={!isAnswered}
            className="min-w-32 bg-purple-600 hover:bg-purple-700 text-white"
          >
            {currentQuestion === currentQuestionSet.length - 1 && currentPhaseIndex === phaseSequence.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GraphicsDesignAssessment;
// export default Assessment;