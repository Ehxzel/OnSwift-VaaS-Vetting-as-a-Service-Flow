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
type PhaseType = 'general' | 'communication' | 'organization' | 'criticalThinking' | 'tech';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'general': 'A. General Competence & Tools',
    'communication': 'B. Communication & Writing',
    'organization': 'C. Organization & Productivity',
    'criticalThinking': 'D. Critical Thinking & Problem Solving',
    'tech': 'E. Tech & Specialized Knowledge'
  };
  return titles[phase] || 'VirtualAssistantAssessment';
};

// Define question sets for each phase
const questionSets = {
  general: [
    { id: 'gen_1', type: 'written' as const, question: 'What is the difference between scheduling a meeting in Google Calendar vs. Outlook?' },
    { id: 'gen_2', type: 'written' as const, question: 'Which tool would you use to manage multiple email inboxes for one client? Why?' },
    { id: 'gen_3', type: 'written' as const, question: 'How do you prioritize incoming tasks when everything seems urgent?' },
    { id: 'gen_4', type: 'written' as const, question: 'What’s the difference between a task management tool like Asana and Trello?' },
    { id: 'gen_5', type: 'written' as const, question: 'How do you handle file sharing securely with a client?' },
    { id: 'gen_6', type: 'written' as const, question: 'Name three AI tools that can help you save time as a VA.' },
    { id: 'gen_7', type: 'written' as const, question: 'How do you manage time zone differences when booking meetings for global clients?' },
    { id: 'gen_8', type: 'written' as const, question: 'What’s the best way to organize shared documents for quick access by a client?' },
    { id: 'gen_9', type: 'written' as const, question: 'How do you ensure you don’t miss deadlines? (Mention a tool or system).' },
    { id: 'gen_10', type: 'written' as const, question: 'If given access to a client’s social media, how do you maintain confidentiality?' }
  ],
  communication: [
    { id: 'comm_1', type: 'written' as const, question: 'Draft a polite email reminding a client’s partner about an overdue invoice.' },
    { id: 'comm_2', type: 'written' as const, question: 'How would you respond if a client’s customer is upset in an email?' },
    { id: 'comm_3', type: 'written' as const, question: 'Correct this poorly written sentence: "pls snd me d doc asap" (make it professional).' },
    { id: 'comm_4', type: 'written' as const, question: 'What’s the difference between formal, semi-formal, and casual emails? Give examples.' },
    { id: 'comm_5', type: 'written' as const, question: 'Write a sample Slack update to a client letting them know you’ve completed a task.' },
    { id: 'comm_6', type: 'written' as const, question: 'How do you handle language barriers with international clients?' },
    { id: 'comm_7', type: 'written' as const, question: 'Rewrite this short message professionally: "Sorry late. Will finish later."' },
    { id: 'comm_8', type: 'written' as const, question: 'How do you politely decline a request that’s outside your scope of work?' },
    { id: 'comm_9', type: 'written' as const, question: 'What is the importance of tone in client communications?' },
    { id: 'comm_10', type: 'written' as const, question: 'How would you summarize a 2-page document into a 5-sentence executive summary?' }
  ],
  organization: [
    { id: 'org_1', type: 'written' as const, question: 'How do you manage multiple clients without mixing up tasks?' },
    { id: 'org_2', type: 'written' as const, question: 'What’s your system for daily task tracking?' },
    { id: 'org_3', type: 'written' as const, question: 'If you’re working remotely, how do you set boundaries to stay productive?' },
    { id: 'org_4', type: 'written' as const, question: 'How do you handle repetitive tasks efficiently?' },
    { id: 'org_5', type: 'written' as const, question: 'What’s the difference between batch working and multitasking? Which is better and why?' },
    { id: 'org_6', type: 'written' as const, question: 'You’re assigned 5 tasks but only have time for 3. How do you decide what to do?' },
    { id: 'org_7', type: 'written' as const, question: 'Which productivity technique do you use? (Pomodoro, Eisenhower Matrix, etc.)' },
    { id: 'org_8', type: 'written' as const, question: 'How do you report progress to a client without overwhelming them?' },
    { id: 'org_9', type: 'written' as const, question: 'If two clients schedule meetings at the same time, what’s your process?' },
    { id: 'org_10', type: 'written' as const, question: 'How do you keep your personal and client files separate and secure?' }
  ],
  criticalThinking: [
    { id: 'crit_1', type: 'written' as const, question: 'A client gives you vague instructions: “Handle my calendar.” What’s your first step?' },
    { id: 'crit_2', type: 'written' as const, question: 'A client forgets to show up for an important meeting you scheduled. What do you do?' },
    { id: 'crit_3', type: 'written' as const, question: 'You’re asked to book a hotel for a client in a city you’ve never been to. How do you decide?' },
    { id: 'crit_4', type: 'written' as const, question: 'A client asks for help with a task you’ve never done before. What’s your response?' },
    { id: 'crit_5', type: 'written' as const, question: 'How would you handle discovering an error in a client’s published document?' },
    { id: 'crit_6', type: 'written' as const, question: 'What’s your process if you lose internet while working on an urgent task?' },
    { id: 'crit_7', type: 'written' as const, question: 'A client gives conflicting instructions. How do you resolve it?' },
    { id: 'crit_8', type: 'written' as const, question: 'A client accidentally shares sensitive personal data. What should you do?' },
    { id: 'crit_9', type: 'written' as const, question: 'A client expects you to be available 24/7. How do you set boundaries?' },
    { id: 'crit_10', type: 'written' as const, question: 'You notice the client is paying you late repeatedly. How do you address it?' }
  ],
  tech: [
    { id: 'tech_1', type: 'written' as const, question: 'What’s the difference between cloud storage (Google Drive) and local storage?' },
    { id: 'tech_2', type: 'written' as const, question: 'Which CRM (Customer Relationship Management) tools have you used?' },
    { id: 'tech_3', type: 'written' as const, question: 'How do you create a professional invoice for a client?' },
    { id: 'tech_4', type: 'written' as const, question: 'Which tools would you recommend for automating recurring tasks?' },
    { id: 'tech_5', type: 'written' as const, question: 'What’s the safest way to store client passwords?' },
    { id: 'tech_6', type: 'written' as const, question: 'How do you manage bulk email outreach without being flagged as spam?' },
    { id: 'tech_7', type: 'written' as const, question: 'What steps would you take to prepare a Zoom meeting for a client?' },
    { id: 'tech_8', type: 'written' as const, question: 'What’s the role of Zapier in streamlining client workflows?' },
    { id: 'tech_9', type: 'written' as const, question: 'How do you create a travel itinerary for a client?' },
    { id: 'tech_10', type: 'written' as const, question: 'What’s the difference between shared access and delegated access in Gmail?' }
  ]
};

const VirtualAssistantAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('general');

  const phaseSequence: PhaseType[] = ['general', 'communication', 'organization', 'criticalThinking', 'tech'];
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

export default VirtualAssistantAssessment;