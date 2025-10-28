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
type PhaseType = 'fundamentals' | 'websiteCopy' | 'blogWriting' | 'seoFundamentals' | 'seoAdvanced' | 'readability' | 'storytelling' | 'analytics' | 'clientComm' | 'ethics';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'fundamentals': 'A. Fundamentals & Principles',
    'websiteCopy': 'B. Website Copywriting',
    'blogWriting': 'C. Blog Writing & Long-Form Content',
    'seoFundamentals': 'D. SEO Writing Fundamentals',
    'seoAdvanced': 'E. Advanced SEO Strategy',
    'readability': 'F. Readability & UX Writing',
    'storytelling': 'G. Storytelling & Engagement',
    'analytics': 'H. Analytics & Performance',
    'clientComm': 'I. Client Communication & Scenarios',
    'ethics': 'J. Ethics & Professionalism'
  };
  return titles[phase] || 'ContentWritingAssessment';
};

// Define question sets for each phase
const questionSets = {
  fundamentals: [
    { id: 'fund_1', type: 'written' as const, question: 'What’s the main difference between copywriting and content writing?' },
    { id: 'fund_2', type: 'written' as const, question: 'Why is clarity more important than word count?' },
    { id: 'fund_3', type: 'written' as const, question: 'How does website copy differ from blog articles?' },
    { id: 'fund_4', type: 'written' as const, question: 'Why is formatting important in online writing?' },
    { id: 'fund_5', type: 'written' as const, question: 'What’s the difference between editing and proofreading?' }
  ],
  websiteCopy: [
    { id: 'web_1', type: 'written' as const, question: 'What makes a homepage headline effective?' },
    { id: 'web_2', type: 'written' as const, question: 'Why is brevity crucial in website copy?' },
    { id: 'web_3', type: 'written' as const, question: 'What’s the purpose of a value proposition on a homepage?' },
    { id: 'web_4', type: 'written' as const, question: 'Why should CTAs be clear and specific on websites?' },
    { id: 'web_5', type: 'written' as const, question: 'What’s the difference between “About Us” copy and sales copy?' }
  ],
  blogWriting: [
    { id: 'blog_1', type: 'written' as const, question: 'Why is keyword research important for blog writing?' },
    { id: 'blog_2', type: 'written' as const, question: 'How do you structure a blog post for readability?' },
    { id: 'blog_3', type: 'written' as const, question: 'What’s the ideal length for a blog post?' },
    { id: 'blog_4', type: 'written' as const, question: 'Why should blogs include internal and external links?' },
    { id: 'blog_5', type: 'written' as const, question: 'What makes a headline click-worthy without being clickbait?' }
  ],
  seoFundamentals: [
    { id: 'seo_1', type: 'written' as const, question: 'What is the difference between short-tail and long-tail keywords?' },
    { id: 'seo_2', type: 'written' as const, question: 'How do meta titles and descriptions influence SEO?' },
    { id: 'seo_3', type: 'written' as const, question: 'Why is keyword stuffing harmful?' },
    { id: 'seo_4', type: 'written' as const, question: 'How do you optimize images for SEO?' },
    { id: 'seo_5', type: 'written' as const, question: 'What’s the role of backlinks in SEO writing?' }
  ],
  seoAdvanced: [
    { id: 'seoadv_1', type: 'written' as const, question: 'What’s search intent and why is it important?' },
    { id: 'seoadv_2', type: 'written' as const, question: 'Explain the difference between on-page and off-page SEO.' },
    { id: 'seoadv_3', type: 'written' as const, question: 'Why should blogs be updated over time?' },
    { id: 'seoadv_4', type: 'written' as const, question: 'How do you optimize for voice search?' },
    { id: 'seoadv_5', type: 'written' as const, question: 'What are LSI (latent semantic indexing) keywords?' }
  ],
  readability: [
    { id: 'read_1', type: 'written' as const, question: 'Why is scannability important in online writing?' },
    { id: 'read_2', type: 'written' as const, question: 'What’s the F-pattern in reading, and how does it affect website copy?' },
    { id: 'read_3', type: 'written' as const, question: 'How do bullet points improve readability?' },
    { id: 'read_4', type: 'written' as const, question: 'Why should web copy avoid jargon (unless industry-specific)?' },
    { id: 'read_5', type: 'written' as const, question: 'What’s the recommended grade level for general web content readability?' }
  ],
  storytelling: [
    { id: 'story_1', type: 'written' as const, question: 'Why does storytelling matter in content writing?' },
    { id: 'story_2', type: 'written' as const, question: 'How do you use case studies/testimonials in content writing?' },
    { id: 'story_3', type: 'written' as const, question: 'What’s the difference between educational and promotional content?' },
    { id: 'story_4', type: 'written' as const, question: 'Why should content balance information and engagement?' },
    { id: 'story_5', type: 'written' as const, question: 'How do you create an effective opening hook for a blog?' }
  ],
  analytics: [
    { id: 'anal_1', type: 'written' as const, question: 'How do you measure if blog content is performing well?' },
    { id: 'anal_2', type: 'written' as const, question: 'Why is bounce rate important for website content?' },
    { id: 'anal_3', type: 'written' as const, question: 'What’s the difference between CTR and conversion rate in content?' },
    { id: 'anal_4', type: 'written' as const, question: 'How do you measure engagement in blog content?' },
    { id: 'anal_5', type: 'written' as const, question: 'What tools would you use to track SEO performance?' }
  ],
  clientComm: [
    { id: 'client_1', type: 'written' as const, question: 'A client says, “Just make the article 2,000 words.” What questions should you ask before writing?' },
    { id: 'client_2', type: 'written' as const, question: 'The client gives you a topic with no brief. How do you structure your research?' },
    { id: 'client_3', type: 'written' as const, question: 'The client insists on using a keyword 30 times in 800 words. How do you handle it?' },
    { id: 'client_4', type: 'written' as const, question: 'How do you adapt writing tone for a law firm vs. a fashion blog?' },
    { id: 'client_5', type: 'written' as const, question: 'A client wants immediate SEO results from one blog post. How do you explain reality?' }
  ],
  ethics: [
    { id: 'ethics_1', type: 'written' as const, question: 'Why is plagiarism unacceptable in content writing?' },
    { id: 'ethics_2', type: 'written' as const, question: 'How do you ensure originality in your content?' },
    { id: 'ethics_3', type: 'written' as const, question: 'What’s your stance on using AI tools in writing?' },
    { id: 'ethics_4', type: 'written' as const, question: 'How do you cite sources in blog articles?' },
    { id: 'ethics_5', type: 'written' as const, question: 'Why should SEO writing prioritize humans before algorithms?' }
  ]
};

const ContentWritingAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('fundamentals');

  const phaseSequence: PhaseType[] = ['fundamentals', 'websiteCopy', 'blogWriting', 'seoFundamentals', 'seoAdvanced', 'readability', 'storytelling', 'analytics', 'clientComm', 'ethics'];
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

export default ContentWritingAssessment;