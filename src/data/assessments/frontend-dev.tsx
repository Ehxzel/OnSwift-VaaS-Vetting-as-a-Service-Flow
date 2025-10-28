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
type PhaseType = 'html' | 'css' | 'javascript' | 'frameworks' | 'performance';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'html': '1. Core HTML (Structure & Semantics)',
    'css': '2. CSS (Styling, Layout & Architecture)',
    'javascript': '3. JavaScript (Core & DOM Manipulation)',
    'frameworks': '4. Frameworks & Libraries (React, Vue, Angular, etc.)',
    'performance': '5. Performance, Accessibility & Testing'
  };
  return titles[phase] || 'FrontendAssessment';
};

// Define question sets for each phase
const questionSets = {
  html: [
    { id: 'html_1', type: 'written' as const, question: 'What is the difference between <section>, <article>, <div>, and <span>?' },
    { id: 'html_2', type: 'written' as const, question: 'Why is semantic HTML important for accessibility and SEO?' },
    { id: 'html_3', type: 'written' as const, question: 'What are the roles of alt attributes in images, and what makes a good alt text?' },
    { id: 'html_4', type: 'written' as const, question: 'What’s the difference between <link> and <script> tags in terms of placement and purpose?' },
    { id: 'html_5', type: 'written' as const, question: 'How would you create a form that is both accessible and responsive?' },
    { id: 'html_6', type: 'written' as const, question: 'Explain the difference between block-level and inline elements with examples.' },
    { id: 'html_7', type: 'written' as const, question: 'How do data-* attributes work, and when should you use them?' },
    { id: 'html_8', type: 'written' as const, question: 'What’s the difference between <button> and <input type="button">?' },
    { id: 'html_9', type: 'written' as const, question: 'Why should you use <label> with form elements?' },
    { id: 'html_10', type: 'written' as const, question: 'Explain the difference between relative, absolute, and fixed paths for linking assets.' }
  ],
  css: [
    { id: 'css_1', type: 'written' as const, question: 'What’s the difference between relative, absolute, fixed, and sticky positioning?' },
    { id: 'css_2', type: 'written' as const, question: 'Explain the difference between Flexbox and CSS Grid. When would you use one over the other?' },
    { id: 'css_3', type: 'written' as const, question: 'How do media queries work? Provide an example for making text responsive.' },
    { id: 'css_4', type: 'written' as const, question: 'What is the difference between inline, inline-block, and block in CSS?' },
    { id: 'css_5', type: 'written' as const, question: 'How do CSS pseudo-classes (:hover, :nth-child) differ from pseudo-elements (::before, ::after)?' },
    { id: 'css_6', type: 'written' as const, question: 'What is the difference between em, rem, %, px, and vw/vh units?' },
    { id: 'css_7', type: 'written' as const, question: 'How would you implement a responsive navigation bar without JavaScript?' },
    { id: 'css_8', type: 'written' as const, question: 'What’s the difference between z-index and stacking context?' },
    { id: 'css_9', type: 'written' as const, question: 'What are CSS variables (--var) and why are they useful?' },
    { id: 'css_10', type: 'written' as const, question: 'What’s the difference between SCSS, LESS, and vanilla CSS?' }
  ],
  javascript: [
    { id: 'js_1', type: 'written' as const, question: 'What’s the difference between == and === in JavaScript?' },
    { id: 'js_2', type: 'written' as const, question: 'Explain the concept of closures with a practical example.' },
    { id: 'js_3', type: 'written' as const, question: 'What is event delegation, and why is it important in frontend development?' },
    { id: 'js_4', type: 'written' as const, question: 'What’s the difference between var, let, and const?' },
    { id: 'js_5', type: 'written' as const, question: 'How would you debounce a function in JavaScript?' },
    { id: 'js_6', type: 'written' as const, question: 'Explain how the event loop works in JavaScript.' },
    { id: 'js_7', type: 'written' as const, question: 'What’s the difference between synchronous and asynchronous code?' },
    { id: 'js_8', type: 'written' as const, question: 'What are Promises, and how do they improve async handling?' },
    { id: 'js_9', type: 'written' as const, question: 'Explain how localStorage, sessionStorage, and cookies differ.' },
    { id: 'js_10', type: 'written' as const, question: 'What’s the difference between for…in, for…of, and forEach?' }
  ],
  frameworks: [
    { id: 'frame_1', type: 'written' as const, question: 'Explain the concept of “virtual DOM” in React.' },
    { id: 'frame_2', type: 'written' as const, question: 'What’s the difference between controlled and uncontrolled components in React?' },
    { id: 'frame_3', type: 'written' as const, question: 'How does two-way data binding differ between Angular and React?' },
    { id: 'frame_4', type: 'written' as const, question: 'What’s the difference between props and state in React?' },
    { id: 'frame_5', type: 'written' as const, question: 'Explain how React hooks (useState, useEffect) work.' },
    { id: 'frame_6', type: 'written' as const, question: 'What is hydration in React and when does it matter?' },
    { id: 'frame_7', type: 'written' as const, question: 'How do Vue’s reactivity and watchers work?' },
    { id: 'frame_8', type: 'written' as const, question: 'What’s the difference between Single Page Applications (SPAs) and Multi Page Applications (MPAs)?' },
    { id: 'frame_9', type: 'written' as const, question: 'Why would you use a framework instead of plain JavaScript?' },
    { id: 'frame_10', type: 'written' as const, question: 'Explain what tree-shaking is in bundlers like Webpack or Vite.' }
  ],
  performance: [
    { id: 'perf_1', type: 'written' as const, question: 'How would you optimize the performance of a webpage? (name 3 methods)' },
    { id: 'perf_2', type: 'written' as const, question: 'What’s lazy loading, and how is it implemented in images?' },
    { id: 'perf_3', type: 'written' as const, question: 'How do ARIA roles help in accessibility? Give examples.' },
    { id: 'perf_4', type: 'written' as const, question: 'What are Core Web Vitals (LCP, FID, CLS)? Why do they matter?' },
    { id: 'perf_5', type: 'written' as const, question: 'How would you debug a slow-rendering React component?' },
    { id: 'perf_6', type: 'written' as const, question: 'How do you test frontend components for correctness and usability?' },
    { id: 'perf_7', type: 'written' as const, question: 'What’s the difference between unit testing, integration testing, and end-to-end testing in frontend?' },
    { id: 'perf_8', type: 'written' as const, question: 'How do you detect and fix a memory leak in a frontend app?' },
    { id: 'perf_9', type: 'written' as const, question: 'What is cross-browser compatibility, and how would you ensure it?' },
    { id: 'perf_10', type: 'written' as const, question: 'Explain progressive enhancement vs graceful degradation in frontend design.' }
  ]
};

const FrontendAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('html');

  const phaseSequence: PhaseType[] = ['html', 'css', 'javascript', 'frameworks', 'performance'];
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

export default FrontendAssessment;