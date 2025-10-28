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
type PhaseType = 'core' | 'databases' | 'auth' | 'performance' | 'apis' | 'cloud' | 'advanced' | 'testing' | 'scenarios' | 'softSkills';

// Function to get phase title
const getPhaseTitle = (phase: PhaseType) => {
  const titles = {
    'core': '1. Core Backend Fundamentals',
    'databases': '2. Databases & Data Modeling',
    'auth': '3. Authentication & Security',
    'performance': '4. Performance & Scalability',
    'apis': '5. APIs & Communication',
    'cloud': '6. Cloud & Deployment',
    'advanced': '7. Advanced Backend Patterns',
    'testing': '8. Testing & Debugging',
    'scenarios': '9. Real-World Application Scenarios',
    'softSkills': '10. Soft Skills & Client Management'
  };
  return titles[phase] || 'BackendAssessment';
};

// Define question sets for each phase
const questionSets = {
  core: [
    { id: 'core_1', type: 'written' as const, question: 'Explain the difference between a monolithic and microservices architecture.' },
    { id: 'core_2', type: 'written' as const, question: 'How do APIs enable frontend-backend communication?' },
    { id: 'core_3', type: 'written' as const, question: 'What is the difference between REST and GraphQL APIs?' },
    { id: 'core_4', type: 'written' as const, question: 'Can you explain the concept of middleware in backend frameworks?' },
    { id: 'core_5', type: 'written' as const, question: 'How would you handle environment variables securely in a project?' }
  ],
  databases: [
    { id: 'db_1', type: 'written' as const, question: 'Difference between SQL and NoSQL databases?' },
    { id: 'db_2', type: 'written' as const, question: 'Give an example use case for each.' },
    { id: 'db_3', type: 'written' as const, question: 'How would you design a schema for an e-commerce product catalog?' },
    { id: 'db_4', type: 'written' as const, question: 'Explain the concept of database normalization.' },
    { id: 'db_5', type: 'written' as const, question: 'What’s an index in a database, and when should you use one?' },
    { id: 'db_6', type: 'written' as const, question: 'How do you handle relationships in MongoDB vs. PostgreSQL?' }
  ],
  auth: [
    { id: 'auth_1', type: 'written' as const, question: 'Difference between session-based and token-based authentication?' },
    { id: 'auth_2', type: 'written' as const, question: 'How does OAuth2 work?' },
    { id: 'auth_3', type: 'written' as const, question: 'Explain the concept of JWT and its risks.' },
    { id: 'auth_4', type: 'written' as const, question: 'What’s the role of hashing and salting passwords?' },
    { id: 'auth_5', type: 'written' as const, question: 'How do you prevent SQL Injection attacks?' }
  ],
  performance: [
    { id: 'perf_1', type: 'written' as const, question: 'What is caching, and where would you apply it in backend systems?' },
    { id: 'perf_2', type: 'written' as const, question: 'Explain horizontal vs. vertical scaling with an example.' },
    { id: 'perf_3', type: 'written' as const, question: 'How would you optimize a slow-running query?' },
    { id: 'perf_4', type: 'written' as const, question: 'What is load balancing, and why is it important?' },
    { id: 'perf_5', type: 'written' as const, question: 'Difference between synchronous and asynchronous processing in backend apps?' }
  ],
  apis: [
    { id: 'api_1', type: 'written' as const, question: 'What is an API rate limit and why is it important?' },
    { id: 'api_2', type: 'written' as const, question: 'Difference between PUT, PATCH, and POST in REST?' },
    { id: 'api_3', type: 'written' as const, question: 'How do you handle API versioning?' },
    { id: 'api_4', type: 'written' as const, question: 'What are webhooks, and how are they different from APIs?' },
    { id: 'api_5', type: 'written' as const, question: 'How do you ensure backward compatibility in APIs?' }
  ],
  cloud: [
    { id: 'cloud_1', type: 'written' as const, question: 'Difference between serverless functions and traditional backend servers?' },
    { id: 'cloud_2', type: 'written' as const, question: 'What is Docker, and why is it used in backend development?' },
    { id: 'cloud_3', type: 'written' as const, question: 'Explain the concept of CI/CD in backend projects.' },
    { id: 'cloud_4', type: 'written' as const, question: 'How would you set up a staging environment for a backend application?' },
    { id: 'cloud_5', type: 'written' as const, question: 'Difference between AWS Lambda and EC2?' }
  ],
  advanced: [
    { id: 'adv_1', type: 'written' as const, question: 'What is the Repository pattern and why is it used?' },
    { id: 'adv_2', type: 'written' as const, question: 'Explain the difference between message queues (e.g., RabbitMQ, Kafka) and APIs.' },
    { id: 'adv_3', type: 'written' as const, question: 'What’s eventual consistency, and where is it acceptable?' },
    { id: 'adv_4', type: 'written' as const, question: 'How do you implement rate-limiting in an API?' },
    { id: 'adv_5', type: 'written' as const, question: 'What is a distributed transaction, and how is it handled?' }
  ],
  testing: [
    { id: 'test_1', type: 'written' as const, question: 'How do you test API endpoints?' },
    { id: 'test_2', type: 'written' as const, question: 'Difference between unit tests, integration tests, and end-to-end tests?' },
    { id: 'test_3', type: 'written' as const, question: 'How would you debug a memory leak in a backend service?' },
    { id: 'test_4', type: 'written' as const, question: 'What tools do you use for load testing backend systems?' },
    { id: 'test_5', type: 'written' as const, question: 'How do you mock external APIs for testing purposes?' }
  ],
  scenarios: [
    { id: 'scen_1', type: 'written' as const, question: 'A client’s e-commerce site crashes during Black Friday due to traffic. How would you fix and prevent this in the future?' },
    { id: 'scen_2', type: 'written' as const, question: 'A user reports they can access another user’s data. Walk me through your investigation.' },
    { id: 'scen_3', type: 'written' as const, question: 'How do you handle file uploads and storage at scale?' },
    { id: 'scen_4', type: 'written' as const, question: 'If a mobile app keeps sending repeated requests to your API, how would you safeguard performance?' },
    { id: 'scen_5', type: 'written' as const, question: 'A payment system must never lose transactions—what’s your design approach?' }
  ],
  softSkills: [
    { id: 'soft_1', type: 'written' as const, question: 'How do you explain backend timelines and limitations to a non-technical client?' },
    { id: 'soft_2', type: 'written' as const, question: 'When collaborating with frontend developers, what’s the biggest source of friction and how do you solve it?' },
    { id: 'soft_3', type: 'written' as const, question: 'How do you prioritize bug fixes vs. new feature development when both are urgent?' },
    { id: 'soft_4', type: 'written' as const, question: 'Describe a time when backend infrastructure changes saved money for a client.' },
    { id: 'soft_5', type: 'written' as const, question: 'If a client insists on using a technology you know is not scalable, how do you handle it?' }
  ]
};

const BackendAssessment = ({ niche, onComplete, onBack }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [phase, setPhase] = useState<PhaseType>('core');

  const phaseSequence: PhaseType[] = ['core', 'databases', 'auth', 'performance', 'apis', 'cloud', 'advanced', 'testing', 'scenarios', 'softSkills'];
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
              // Logic for multiple-choice if needed
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

export default BackendAssessment;