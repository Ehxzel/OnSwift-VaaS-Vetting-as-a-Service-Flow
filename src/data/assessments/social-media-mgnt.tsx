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
type PhaseType = 'fundamentals' | 'strategy' | 'contentCreation' | 'scheduling' | 'engagement' | 'analytics' | 'paidAds' | 'platformSpecific' | 'clientComm' | 'trends';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'fundamentals': 'A. Fundamentals & Principles',
    'strategy': 'B. Strategy & Planning',
    'contentCreation': 'C. Content Creation & Curation',
    'scheduling': 'D. Scheduling & Tools',
    'engagement': 'E. Engagement & Community Building',
    'analytics': 'F. Analytics & Performance',
    'paidAds': 'G. Paid Ads & Campaigns',
    'platformSpecific': 'H. Platform-Specific Knowledge',
    'clientComm': 'I. Client Communication & Scenarios',
    'trends': 'J. Trends, Crisis & Professionalism'
  };
  return titles[phase] || 'SocialMediaAssessment';
};

// Define question sets for each phase
const questionSets = {
  fundamentals: [
    { id: 'fund_1', type: 'written' as const, question: 'What’s the main difference between social media management and social media marketing?' },
    { id: 'fund_2', type: 'written' as const, question: 'Why is consistency important in social media management?' },
    { id: 'fund_3', type: 'written' as const, question: 'What’s a content calendar and why is it crucial?' },
    { id: 'fund_4', type: 'written' as const, question: 'What’s the role of a social media manager vs. a content creator?' },
    { id: 'fund_5', type: 'written' as const, question: 'How do you decide which platforms a brand should focus on?' }
  ],
  strategy: [
    { id: 'strat_1', type: 'written' as const, question: 'What’s the first step in creating a social media strategy?' },
    { id: 'strat_2', type: 'written' as const, question: 'How do you define KPIs (key performance indicators) for social media?' },
    { id: 'strat_3', type: 'written' as const, question: 'Why is audience research critical before launching a campaign?' },
    { id: 'strat_4', type: 'written' as const, question: 'What’s the difference between organic and paid growth?' },
    { id: 'strat_5', type: 'written' as const, question: 'How do you balance brand voice across multiple platforms?' }
  ],
  contentCreation: [
    { id: 'content_1', type: 'written' as const, question: 'What’s the ideal ratio of promotional vs. value-based content?' },
    { id: 'content_2', type: 'written' as const, question: 'How do you repurpose a blog post into social content?' },
    { id: 'content_3', type: 'written' as const, question: 'Why should content be native to each platform?' },
    { id: 'content_4', type: 'written' as const, question: 'What are trending formats in 2025 (e.g., short-form video, carousels)?' },
    { id: 'content_5', type: 'written' as const, question: 'How do you ensure graphics/videos align with brand guidelines?' }
  ],
  scheduling: [
    { id: 'sched_1', type: 'written' as const, question: 'What tools do you use for scheduling posts?' },
    { id: 'sched_2', type: 'written' as const, question: 'What’s the best posting frequency for Instagram vs. LinkedIn?' },
    { id: 'sched_3', type: 'written' as const, question: 'How do you handle scheduling across different time zones?' },
    { id: 'sched_4', type: 'written' as const, question: 'Why is it risky to automate all social media engagement?' },
    { id: 'sched_5', type: 'written' as const, question: 'What’s the importance of real-time monitoring in social management?' }
  ],
  engagement: [
    { id: 'eng_1', type: 'written' as const, question: 'How do you increase engagement organically?' },
    { id: 'eng_2', type: 'written' as const, question: 'What’s the difference between reach and impressions?' },
    { id: 'eng_3', type: 'written' as const, question: 'How do you handle trolls or negative comments?' },
    { id: 'eng_4', type: 'written' as const, question: 'Why should you respond to comments quickly?' },
    { id: 'eng_5', type: 'written' as const, question: 'What’s the importance of building relationships, not just followers?' }
  ],
  analytics: [
    { id: 'anal_1', type: 'written' as const, question: 'What’s the difference between vanity metrics and actionable metrics?' },
    { id: 'anal_2', type: 'written' as const, question: 'How do you measure ROI on social media?' },
    { id: 'anal_3', type: 'written' as const, question: 'Which metrics matter most for brand awareness campaigns?' },
    { id: 'anal_4', type: 'written' as const, question: 'How do you track conversions from social media?' },
    { id: 'anal_5', type: 'written' as const, question: 'Why should you create monthly reports for clients?' }
  ],
  paidAds: [
    { id: 'paid_1', type: 'written' as const, question: 'What’s the difference between boosting a post and running an ad campaign?' },
    { id: 'paid_2', type: 'written' as const, question: 'How do you set a target audience for paid ads?' },
    { id: 'paid_3', type: 'written' as const, question: 'What’s retargeting and why is it powerful?' },
    { id: 'paid_4', type: 'written' as const, question: 'Why should ad creatives be tested before scaling budget?' },
    { id: 'paid_5', type: 'written' as const, question: 'How do you balance organic and paid content in strategy?' }
  ],
  platformSpecific: [
    { id: 'plat_1', type: 'written' as const, question: 'What makes TikTok content different from Instagram?' },
    { id: 'plat_2', type: 'written' as const, question: 'Why do LinkedIn posts need a different tone than Facebook?' },
    { id: 'plat_3', type: 'written' as const, question: 'How do you adapt content for Twitter/X?' },
    { id: 'plat_4', type: 'written' as const, question: 'What’s the role of hashtags in Instagram growth?' },
    { id: 'plat_5', type: 'written' as const, question: 'What makes Pinterest unique compared to other platforms?' }
  ],
  clientComm: [
    { id: 'client_1', type: 'written' as const, question: 'A client says, “We just want more followers.” How do you respond?' },
    { id: 'client_2', type: 'written' as const, question: 'A client insists on posting memes that don’t fit their brand voice. What do you do?' },
    { id: 'client_3', type: 'written' as const, question: 'How do you handle a client who wants to post 5 times a day?' },
    { id: 'client_4', type: 'written' as const, question: 'A campaign performs poorly. How do you explain it to a client?' },
    { id: 'client_5', type: 'written' as const, question: 'What’s your process for getting client approvals on content?' }
  ],
  trends: [
    { id: 'trends_1', type: 'written' as const, question: 'Why must brands avoid jumping on every trending topic?' },
    { id: 'trends_2', type: 'written' as const, question: 'Give an example of a social media crisis and how you’d manage it.' },
    { id: 'trends_3', type: 'written' as const, question: 'What’s the risk of ignoring cultural sensitivity in content?' },
    { id: 'trends_4', type: 'written' as const, question: 'How do you keep up with algorithm changes?' },
    { id: 'trends_5', type: 'written' as const, question: 'What’s your philosophy on automation vs. human touch in community management?' }
  ]
};

const SocialMediaMgntAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('fundamentals');

  const phaseSequence: PhaseType[] = ['fundamentals', 'strategy', 'contentCreation', 'scheduling', 'engagement', 'analytics', 'paidAds', 'platformSpecific', 'clientComm', 'trends'];
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

export default SocialMediaMgntAssessment;