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
type PhaseType = 'fundamentals' | 'psychology' | 'ads' | 'funnels' | 'landingPage' | 'testing' | 'voice' | 'clientComm' | 'advanced' | 'ethics';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'fundamentals': 'A. Fundamentals & Principles',
    'psychology': 'B. Consumer Psychology & Persuasion',
    'ads': 'C. Ads-Specific Copywriting',
    'funnels': 'D. Funnels & Email Copy',
    'landingPage': 'E. Landing Page Copy',
    'testing': 'F. Testing & Optimization',
    'voice': 'G. Voice, Tone & Audience Fit',
    'clientComm': 'H. Client Communication & Real-Life Scenarios',
    'advanced': 'I. Advanced Strategy & Persuasion',
    'ethics': 'J. Ethics & Compliance'
  };
  return titles[phase] || 'CopywritingAssessment';
};

// Define question sets for each phase
const questionSets = {
  fundamentals: [
    { id: 'fund_1', type: 'written' as const, question: 'What’s the difference between copywriting and content writing?' },
    { id: 'fund_2', type: 'written' as const, question: 'Why is clarity more important than cleverness in sales copy?' },
    { id: 'fund_3', type: 'written' as const, question: 'Define a “unique selling proposition” (USP) and why it matters.' },
    { id: 'fund_4', type: 'written' as const, question: 'What role does a headline play in copywriting?' },
    { id: 'fund_5', type: 'written' as const, question: 'Why is specificity more persuasive than general claims?' }
  ],
  psychology: [
    { id: 'psy_1', type: 'written' as const, question: 'What are the AIDA and PAS frameworks in copywriting?' },
    { id: 'psy_2', type: 'written' as const, question: 'Why is social proof effective in landing pages?' },
    { id: 'psy_3', type: 'written' as const, question: 'Explain the concept of “loss aversion” and how it applies to sales copy.' },
    { id: 'psy_4', type: 'written' as const, question: 'How do scarcity and urgency increase conversions?' },
    { id: 'psy_5', type: 'written' as const, question: 'What’s the difference between a benefit and a feature?' }
  ],
  ads: [
    { id: 'ads_1', type: 'written' as const, question: 'Why must Facebook ads have concise, scannable copy?' },
    { id: 'ads_2', type: 'written' as const, question: 'How do you write copy that passes Meta’s ad policies?' },
    { id: 'ads_3', type: 'written' as const, question: 'What’s the role of a hook in ad copy?' },
    { id: 'ads_4', type: 'written' as const, question: 'Give an example of a weak CTA and rewrite it into a strong one.' },
    { id: 'ads_5', type: 'written' as const, question: 'Why should ad copy differ from organic social content?' }
  ],
  funnels: [
    { id: 'funnel_1', type: 'written' as const, question: 'What’s the purpose of a lead magnet funnel?' },
    { id: 'funnel_2', type: 'written' as const, question: 'How do you write a subject line that gets emails opened?' },
    { id: 'funnel_3', type: 'written' as const, question: 'Why should a funnel landing page usually have only one CTA?' },
    { id: 'funnel_4', type: 'written' as const, question: 'What’s the role of storytelling in email nurture sequences?' },
    { id: 'funnel_5', type: 'written' as const, question: 'How do you prevent emails from going into spam?' }
  ],
  landingPage: [
    { id: 'lp_1', type: 'written' as const, question: 'Why is “above the fold” content critical in landing pages?' },
    { id: 'lp_2', type: 'written' as const, question: 'How do you structure a landing page for maximum conversions?' },
    { id: 'lp_3', type: 'written' as const, question: 'What’s the importance of testimonials on sales pages?' },
    { id: 'lp_4', type: 'written' as const, question: 'Why should long-form sales pages still include multiple CTAs?' },
    { id: 'lp_5', type: 'written' as const, question: 'What makes a guarantee statement credible?' }
  ],
  testing: [
    { id: 'test_1', type: 'written' as const, question: 'What’s A/B testing in copywriting?' },
    { id: 'test_2', type: 'written' as const, question: 'How would you test different headlines on a landing page?' },
    { id: 'test_3', type: 'written' as const, question: 'What’s the importance of measuring CTR (click-through rate)?' },
    { id: 'test_4', type: 'written' as const, question: 'Which metric shows if your sales copy is actually profitable?' },
    { id: 'test_5', type: 'written' as const, question: 'Why should copy be continuously optimized even after launch?' }
  ],
  voice: [
    { id: 'voice_1', type: 'written' as const, question: 'How do you adjust tone for B2B vs. B2C sales copy?' },
    { id: 'voice_2', type: 'written' as const, question: 'Why is writing to “one person” more powerful than writing to “everyone”?' },
    { id: 'voice_3', type: 'written' as const, question: 'A client wants a playful brand voice. How would you capture that?' },
    { id: 'voice_4', type: 'written' as const, question: 'What’s the role of empathy in persuasive writing?' },
    { id: 'voice_5', type: 'written' as const, question: 'How do you research the “voice of customer” before writing?' }
  ],
  clientComm: [
    { id: 'client_1', type: 'written' as const, question: 'A client insists on keyword stuffing for SEO. How do you respond?' },
    { id: 'client_2', type: 'written' as const, question: 'A client says your copy “doesn’t sound exciting enough.” What do you ask next?' },
    { id: 'client_3', type: 'written' as const, question: 'The client provides almost no information. What’s your process to extract insights?' },
    { id: 'client_4', type: 'written' as const, question: 'How do you handle a client who keeps rewriting your copy?' },
    { id: 'client_5', type: 'written' as const, question: 'A product is boring (e.g., insurance). How do you still make copy compelling?' }
  ],
  advanced: [
    { id: 'adv_1', type: 'written' as const, question: 'What’s risk-reversal in copywriting? Give an example.' },
    { id: 'adv_2', type: 'written' as const, question: 'Why are objections important to address in copy?' },
    { id: 'adv_3', type: 'written' as const, question: 'How do you use sensory language to create impact?' },
    { id: 'adv_4', type: 'written' as const, question: 'Why do long-form pages often outperform short ones for high-ticket offers?' },
    { id: 'adv_5', type: 'written' as const, question: 'How do you weave a story into sales copy without losing clarity?' }
  ],
  ethics: [
    { id: 'ethics_1', type: 'written' as const, question: 'Why must copy avoid false claims?' },
    { id: 'ethics_2', type: 'written' as const, question: 'How do you write compliant copy in health/finance industries?' },
    { id: 'ethics_3', type: 'written' as const, question: 'What’s the danger of manipulative vs. persuasive copy?' },
    { id: 'ethics_4', type: 'written' as const, question: 'A client requests a “clickbait headline.” What’s your professional stance?' },
    { id: 'ethics_5', type: 'written' as const, question: 'How do you balance persuasive urgency with honesty?' }
  ]
};

const CopywritingAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('fundamentals');

  const phaseSequence: PhaseType[] = ['fundamentals', 'psychology', 'ads', 'funnels', 'landingPage', 'testing', 'voice', 'clientComm', 'advanced', 'ethics'];
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
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestionSet.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentPhaseIndex < phaseSequence.length - 1) {
      setPhase(phaseSequence[currentPhaseIndex + 1]);
      setCurrentQuestion(0);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentPhaseIndex > 0) {
      const previousPhase = phaseSequence[currentPhaseIndex - 1];
      setPhase(previousPhase);
      setCurrentQuestion(questionSets[previousPhase].length - 1);
    }
  };

  const currentQ = currentQuestionSet[currentQuestion];
  const currentAnswer = answers[currentQ.id] || '';
  const isAnswered = currentAnswer.trim().length > 0;

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

export default CopywritingAssessment;