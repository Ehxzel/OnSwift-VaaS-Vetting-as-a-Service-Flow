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
}

interface AssessmentProps {
  niche: string;
  onComplete: () => void;
  onBack: () => void;
}

// Define all possible phases
type PhaseType = 'fundamentals' | 'technical' | 'strategy' | 'research' | 'systems' | 'team' | 'creative' | 'ethics' | 'future' | 'caseStudies';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'fundamentals': '1. Fundamentals & Thinking',
    'technical': '2. Technical Execution',
    'strategy': '3. Product Strategy & Business',
    'research': '4. User Research & Insights',
    'systems': '5. Systems & Scalability',
    'team': '6. Team & Collaboration',
    'creative': '7. Creative Thinking & Innovation',
    'ethics': '8. Ethics & Accessibility',
    'future': '9. Future & Growth',
    'caseStudies': '10. Case Studies & Reflection'
  };
  return titles[phase] || 'ProductDesignAssessment';
};

// Define question sets for each phase
const questionSets = {
  fundamentals: [
    { id: 'fund_1', type: 'written' as const, question: 'Walk me through your end-to-end product design process.' },
    { id: 'fund_2', type: 'written' as const, question: 'What’s the difference between UX, UI, and Product Design — and where do you play strongest?' },
    { id: 'fund_3', type: 'written' as const, question: 'How do you define a “good” user experience?' },
    { id: 'fund_4', type: 'written' as const, question: 'How do you turn a vague idea into a validated concept?' },
    { id: 'fund_5', type: 'written' as const, question: 'Describe a time when your first design direction failed — what did you learn?' },
    { id: 'fund_6', type: 'written' as const, question: 'How do you balance user needs with business goals?' },
    { id: 'fund_7', type: 'written' as const, question: 'How do you prioritize which user problems to solve first?' },
    { id: 'fund_8', type: 'written' as const, question: 'What does “clarity in design” mean to you?' }
  ],
  technical: [
    { id: 'tech_1', type: 'written' as const, question: 'What tools do you use for wireframing, prototyping, and handoff — and why?' },
    { id: 'tech_2', type: 'written' as const, question: 'How do you maintain consistency across multiple platforms or devices?' },
    { id: 'tech_3', type: 'written' as const, question: 'How do you organize Figma files and component libraries in growing systems?' },
    { id: 'tech_4', type: 'written' as const, question: 'Explain auto-layout in Figma and its practical use.' },
    { id: 'tech_5', type: 'written' as const, question: 'How do you collaborate effectively with developers?' },
    { id: 'tech_6', type: 'written' as const, question: 'How do you test feasibility before handoff?' },
    { id: 'tech_7', type: 'written' as const, question: 'How do you incorporate accessibility (WCAG) standards in your design?' }
  ],
  strategy: [
    { id: 'strat_1', type: 'written' as const, question: 'How do you define success for a design project?' },
    { id: 'strat_2', type: 'written' as const, question: 'How do you measure the impact of your design on business metrics?' },
    { id: 'strat_3', type: 'written' as const, question: 'How do you connect user experience to revenue or retention?' },
    { id: 'strat_4', type: 'written' as const, question: 'How do you decide what features to design or remove?' },
    { id: 'strat_5', type: 'written' as const, question: 'Describe a time when design insights influenced product strategy.' },
    { id: 'strat_6', type: 'written' as const, question: 'How do you validate design decisions before shipping?' },
    { id: 'strat_7', type: 'written' as const, question: 'What’s the difference between being data-informed and data-driven?' }
  ],
  research: [
    { id: 'res_1', type: 'written' as const, question: 'What’s your process for conducting user research?' },
    { id: 'res_2', type: 'written' as const, question: 'How do you avoid bias when collecting user feedback?' },
    { id: 'res_3', type: 'written' as const, question: 'How do you translate research findings into actionable design decisions?' },
    { id: 'res_4', type: 'written' as const, question: 'What’s one surprising insight that completely changed your design direction?' },
    { id: 'res_5', type: 'written' as const, question: 'How do you prioritize user pain points after research?' },
    { id: 'res_6', type: 'written' as const, question: 'How do you communicate user insights to stakeholders?' }
  ],
  systems: [
    { id: 'sys_1', type: 'written' as const, question: 'What’s the purpose of a design system in a growing company?' },
    { id: 'sys_2', type: 'written' as const, question: 'How do you maintain visual consistency as a product scales?' },
    { id: 'sys_3', type: 'written' as const, question: 'How do you manage version control in shared design environments?' },
    { id: 'sys_4', type: 'written' as const, question: 'How do you measure the adoption and impact of a design system?' }
  ],
  team: [
    { id: 'team_1', type: 'written' as const, question: 'How do you handle conflicting feedback from stakeholders?' },
    { id: 'team_2', type: 'written' as const, question: 'How do you explain design decisions to non-designers?' },
    { id: 'team_3', type: 'written' as const, question: 'How do you advocate for design in an organization that doesn’t value it?' },
    { id: 'team_4', type: 'written' as const, question: 'Describe a time when collaboration improved the final product.' },
    { id: 'team_5', type: 'written' as const, question: 'How do you receive and give design critiques effectively?' }
  ],
  creative: [
    { id: 'creat_1', type: 'written' as const, question: 'How do you overcome creative blocks?' },
    { id: 'creat_2', type: 'written' as const, question: 'Describe a project where you innovated under tight constraints.' },
    { id: 'creat_3', type: 'written' as const, question: 'How do you balance creativity with usability?' },
    { id: 'creat_4', type: 'written' as const, question: 'How do you explore multiple directions without wasting time?' }
  ],
  ethics: [
    { id: 'eth_1', type: 'written' as const, question: 'How do you design for inclusivity and accessibility from the start?' },
    { id: 'eth_2', type: 'written' as const, question: 'What’s your stance on persuasive or “dark” design patterns?' },
    { id: 'eth_3', type: 'written' as const, question: 'How do you balance persuasive design with user wellbeing?' }
  ],
  future: [
    { id: 'fut_1', type: 'written' as const, question: 'How do you see AI changing the future of product design?' },
    { id: 'fut_2', type: 'written' as const, question: 'What design skills will matter most in the next five years?' },
    { id: 'fut_3', type: 'written' as const, question: 'How do you stay updated with emerging trends and tools?' }
  ],
  caseStudies: [
    { id: 'case_1', type: 'written' as const, question: 'Walk me through one of your most impactful design projects.' },
    { id: 'case_2', type: 'written' as const, question: 'What was the measurable outcome of your work?' },
    { id: 'case_3', type: 'written' as const, question: 'If you were to redo that project today, what would you change and why?' }
  ]
};

const ProductDesignAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('fundamentals');

  // Define the sequence of phases
  const phaseSequence: PhaseType[] = ['fundamentals', 'technical', 'strategy', 'research', 'systems', 'team', 'creative', 'ethics', 'future', 'caseStudies'];
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
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentQ.type === 'written' ? (
              <Textarea
                placeholder="Type your detailed response here..."
                value={currentAnswer}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                className="min-h-32 resize-none"
                rows={6}
              />
            ) : (
              // Placeholder for multiple-choice if ever needed
              <div>Multiple choice not implemented for this set.</div>
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

export default ProductDesignAssessment;