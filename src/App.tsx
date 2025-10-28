// import { useState } from 'react';
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Landing from "./components/Landing";
// import NicheSelection from "./components/NicheSelection";
// import AssessmentOverview from "./components/AssessmentOverview";
// import assessments from "./data/assessments/assesment-index";
// // import GraphicsDesignAssessment from "./data/assessments/graphics-design";

// const queryClient = new QueryClient();

// // type AppState = 'landing' | 'niche-selection' | 'overview' | 'assessment' | 'results';
// type AppState = 'landing' | 'niche-selection' | 'overview' | 'assesment-index' | 'results';

// interface UserData {
//   name: string;
//   email: string;
//   niche?: string;
// }

// const App = () => {
//   const [currentState, setCurrentState] = useState<AppState>('landing');
//   const [userData, setUserData] = useState<UserData>({ name: '', email: '' });

//   const handleContinueFromLanding = (name: string, email: string) => {
//     setUserData({ name, email });
//     setCurrentState('niche-selection');
//   };

//   const handleNicheSelect = (niche: string) => {
//     setUserData(prev => ({ ...prev, niche }));
//     setCurrentState('overview');
//   };

//   const handleStartAssessment = () => {
//     setCurrentState('assesment-index');
//   };

//   const handleAssessmentComplete = () => {
//     setCurrentState('results');
//   };

//   const handleBack = () => {
//     switch (currentState) {
//       case 'niche-selection':
//         setCurrentState('landing');
//         break;
//       case 'overview':
//         setCurrentState('niche-selection');
//         break;
//       case 'assesment-index':
//         setCurrentState('overview');
//         break;
//       default:
//         break;
//     }
//   };

//   const renderCurrentView = () => {
//     switch (currentState) {
//       case 'landing':
//         return <Landing onContinue={handleContinueFromLanding} />;
      
//       case 'niche-selection':
//         return (
//           <NicheSelection 
//             userName={userData.name}
//             onNicheSelect={handleNicheSelect}
//             onBack={handleBack}
//           />
//         );
      
//       case 'overview':
//         return (
//           <AssessmentOverview
//             niche={userData.niche || ''}
//             onStartAssessment={handleStartAssessment}
//             onBack={handleBack}
//           />
//         );
      
//       case 'assesment-index':
//         return (
//           <assesment-index
//             niche={userData.niche || ''}
//             onComplete={handleAssessmentComplete}
//             onBack={handleBack}
//           />
//         );
      
//       case 'results':
//         return (
//           <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
//             <div className="text-center animate-fade-up">
//               <h1 className="text-4xl font-bold text-primary mb-4">
//                 Congratulations on completing the OnSwift Assesment!
//               </h1>
//               <p className="text-xl text-muted-foreground">
//                 We'll revert to you soonest 🎉.
//               </p>
//             </div>
//           </div>
//         );
      
//       default:
//         return <Landing onContinue={handleContinueFromLanding} />;
//     }
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         {renderCurrentView()}
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./components/Landing";
import NicheSelection from "./components/NicheSelection";
import AssessmentOverview from "./components/AssessmentOverview";
import assessments from "./data/assessments/assesment-index";

const queryClient = new QueryClient();

type AppState =
  | 'landing'
  | 'niche-selection'
  | 'overview'
  | keyof typeof assessments
  | 'results';

interface UserData {
  name: string;
  email: string;
  niche?: string;
}

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });

  const handleContinueFromLanding = (name: string, email: string) => {
    setUserData({ name, email });
    setCurrentState('niche-selection');
  };

  const handleNicheSelect = (niche: string) => {
    setUserData(prev => ({ ...prev, niche }));
    setCurrentState('overview');
  };

  const handleStartAssessment = () => {
    const key = userData.niche?.toLowerCase().replace(/\s+/g, '-') || '';
    if (assessments[key]) {
      setCurrentState(key as AppState);
    } else {
      console.warn(`⚠️ No assessment found for niche: ${key}`);
    }
  };

  const handleAssessmentComplete = () => setCurrentState('results');

  const handleBack = () => {
    if (currentState === 'niche-selection') setCurrentState('landing');
    else if (currentState === 'overview') setCurrentState('niche-selection');
    else if (assessments[currentState]) setCurrentState('overview');
  };

  const renderCurrentView = () => {
    // 1️⃣ Landing Page
    if (currentState === 'landing') {
      return <Landing onContinue={handleContinueFromLanding} />;
    }

    // 2️⃣ Niche Selection
    if (currentState === 'niche-selection') {
      return (
        <NicheSelection
          userName={userData.name}
          onNicheSelect={handleNicheSelect}
          onBack={handleBack}
        />
      );
    }

    // 3️⃣ Assessment Overview
    if (currentState === 'overview') {
      return (
        <AssessmentOverview
          niche={userData.niche || ''}
          onStartAssessment={handleStartAssessment}
          onBack={handleBack}
        />
      );
    }

    // 4️⃣ Dynamic Vetting Component (based on selected niche)
    if (assessments[currentState]) {
      const AssessmentComponent = assessments[currentState];
      return (
        <AssessmentComponent
          niche={userData.niche || ''}
          onComplete={handleAssessmentComplete}
          onBack={handleBack}
        />
      );
    }

    // 5️⃣ Results Page
    if (currentState === 'results') {
      return (
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
          <div className="text-center animate-fade-up">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Congratulations on completing the OnSwift Assessment!
            </h1>
            <p className="text-xl text-muted-foreground">
              We'll revert to you soonest 🎉
            </p>
          </div>
        </div>
      );
    }

    return <Landing onContinue={handleContinueFromLanding} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderCurrentView()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
