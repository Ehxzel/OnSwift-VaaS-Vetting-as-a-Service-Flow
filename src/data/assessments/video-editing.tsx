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
type PhaseType = 'fundamentals' | 'software' | 'storytelling' | 'clientManagement' | 'advanced';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'fundamentals': '1. Fundamentals & Theory',
    'software': '2. Software Knowledge',
    'storytelling': '3. Storytelling & Creativity',
    'clientManagement': '4. Practical Client Management',
    'advanced': '5. Advanced & Practical Scenarios'
  };
  return titles[phase] || 'VideoEditingAssessment';
};

// Define question sets for each phase
const questionSets = {
  fundamentals: [
    { id: 'fund_1', type: 'written' as const, question: 'What’s the difference between a jump cut and a match cut?' },
    { id: 'fund_2', type: 'written' as const, question: 'Explain the 180-degree rule and why it matters.' },
    { id: 'fund_3', type: 'written' as const, question: 'What is B-roll, and how do you decide when to use it?' },
    { id: 'fund_4', type: 'written' as const, question: 'Describe the difference between a montage and a sequence.' },
    { id: 'fund_5', type: 'written' as const, question: 'How do pacing and rhythm affect storytelling in video editing?' },
    { id: 'fund_6', type: 'written' as const, question: 'What’s the role of continuity editing?' },
    { id: 'fund_7', type: 'written' as const, question: 'What is color grading vs. color correction?' },
    { id: 'fund_8', type: 'written' as const, question: 'Define keyframing in the context of animation/editing.' },
    { id: 'fund_9', type: 'written' as const, question: 'What is the rule of thirds and how does it apply in video editing?' },
    { id: 'fund_10', type: 'written' as const, question: 'When should you use cross dissolve vs. a hard cut?' }
  ],
  software: [
    { id: 'soft_1', type: 'written' as const, question: 'Which editing software do you prefer (Premiere Pro, Final Cut, DaVinci Resolve, CapCut Pro, etc.) and why?' },
    { id: 'soft_2', type: 'written' as const, question: 'How do you organize footage in your editing timeline for efficiency?' },
    { id: 'soft_3', type: 'written' as const, question: 'Explain how to use proxies for high-resolution footage.' },
    { id: 'soft_4', type: 'written' as const, question: 'What’s the difference between H.264 and ProRes formats?' },
    { id: 'soft_5', type: 'written' as const, question: 'How do you handle audio syncing in post-production?' },
    { id: 'soft_6', type: 'written' as const, question: 'What is a nested sequence (Premiere Pro) or compound clip (Final Cut)?' },
    { id: 'soft_7', type: 'written' as const, question: 'How do you export a video optimized for YouTube vs. Instagram?' },
    { id: 'soft_8', type: 'written' as const, question: 'What’s the importance of frame rates (24fps, 30fps, 60fps)?' },
    { id: 'soft_9', type: 'written' as const, question: 'Explain how you’d edit vertical video differently from widescreen.' },
    { id: 'soft_10', type: 'written' as const, question: 'How do you use LUTs in your workflow?' }
  ],
  storytelling: [
    { id: 'story_1', type: 'written' as const, question: 'How do you approach editing a client’s 2-hour raw footage into a 3-minute highlight reel?' },
    { id: 'story_2', type: 'written' as const, question: 'What makes a strong hook in the first 5 seconds of a video?' },
    { id: 'story_3', type: 'written' as const, question: 'How would you edit differently for TikTok vs. LinkedIn?' },
    { id: 'story_4', type: 'written' as const, question: 'Describe how you’d create emotional impact in a testimonial video.' },
    { id: 'story_5', type: 'written' as const, question: 'What’s your strategy for editing event highlight videos?' },
    { id: 'story_6', type: 'written' as const, question: 'How do you use sound effects or music to drive narrative?' },
    { id: 'story_7', type: 'written' as const, question: 'Give an example of when you broke editing “rules” for creative effect.' },
    { id: 'story_8', type: 'written' as const, question: 'How do you balance fast cuts vs. long takes in storytelling?' },
    { id: 'story_9', type: 'written' as const, question: 'When is silence more powerful than background music in editing?' },
    { id: 'story_10', type: 'written' as const, question: 'How do you adapt editing style for corporate clients vs. lifestyle influencers?' }
  ],
  clientManagement: [
    { id: 'client_1', type: 'written' as const, question: 'A client says, “This feels boring” — what steps do you take to fix it?' },
    { id: 'client_2', type: 'written' as const, question: 'A client requests 20 rounds of edits. How do you set boundaries?' },
    { id: 'client_3', type: 'written' as const, question: 'A startup wants a promo video but has low-quality footage. What do you do?' },
    { id: 'client_4', type: 'written' as const, question: 'How do you explain to a client why certain footage can’t be fixed in post?' },
    { id: 'client_5', type: 'written' as const, question: 'How do you manage deadlines when given 50GB of footage and 3 days to deliver?' },
    { id: 'client_6', type: 'written' as const, question: 'How do you collaborate with a scriptwriter or motion graphics artist?' },
    { id: 'client_7', type: 'written' as const, question: 'How would you handle brand guideline requests (fonts, colors, tone)?' },
    { id: 'client_8', type: 'written' as const, question: 'How do you ensure copyright-safe use of music, fonts, and stock footage?' },
    { id: 'client_9', type: 'written' as const, question: 'How do you price differently for ads vs. long-form content?' },
    { id: 'client_10', type: 'written' as const, question: 'A client insists on vertical video for YouTube. How do you handle the conversation?' }
  ],
  advanced: [
    { id: 'adv_1', type: 'written' as const, question: 'Edit a 30-second ad from raw footage (practical test).' },
    { id: 'adv_2', type: 'written' as const, question: 'Sync a music beat drop with cuts in a highlight reel.' },
    { id: 'adv_3', type: 'written' as const, question: 'Remove background noise from a 2-minute interview clip.' },
    { id: 'adv_4', type: 'written' as const, question: 'Color-correct a shot with mixed lighting (daylight + tungsten).' },
    { id: 'adv_5', type: 'written' as const, question: 'Stabilize shaky footage without losing too much resolution.' },
    { id: 'adv_6', type: 'written' as const, question: 'Create subtitles for a social media video in SRT format.' },
    { id: 'adv_7', type: 'written' as const, question: 'Show how you’d cut a 10-minute YouTube vlog into a punchy 1-minute IG reel.' },
    { id: 'adv_8', type: 'written' as const, question: 'Add motion graphics for lower-thirds and transitions.' },
    { id: 'adv_9', type: 'written' as const, question: 'Demonstrate how you’d apply a cinematic LUT to different shots for consistency.' },
    { id: 'adv_10', type: 'written' as const, question: 'Export the same video in 3 formats: 4K (YouTube), 1080p (Facebook), 9:16 vertical (TikTok/Instagram).' }
  ]
};

const VideoEditingAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('fundamentals');

  // Define the sequence of phases
  const phaseSequence: PhaseType[] = ['fundamentals', 'software', 'storytelling', 'clientManagement', 'advanced'];
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

export default VideoEditingAssessment;