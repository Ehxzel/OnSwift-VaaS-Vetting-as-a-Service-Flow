import { useState } from "react";
import { ArrowRight, Palette, PenTool, Code, Headphones, Smartphone, Video, Users, FileText, Brush, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Niche {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const niches: Niche[] = [
  {
    id: 'backend-dev',
    title: 'Back-End Dev',
    description: 'Scalable server architecture and API development',
    icon: Code,
    skills: ['Node.js/Python', 'Databases', 'Cloud Services'],
    color: 'from-orange-500 to-red-600'
  },

  // {
  //   id: 'brand-identity',
  //   title: 'Brand Identity',
  //   description: 'Complete brand systems and visual identity',
  //   icon: Brush,
  //   skills: ['Logo Design', 'Brand Guidelines', 'Creative Direction'],
  //   color: 'from-amber-500 to-orange-600'
  // },

  {
    id: 'copywriting',
    title: 'Copywriting',
    description: 'Persuasive writing that drives action and engagement',
    icon: PenTool,
    skills: ['Content Strategy', 'SEO Writing', 'Brand Voice'],
    color: 'from-blue-500 to-cyan-600'
  },

  {
    id: 'frontend-dev',
    title: 'Front-End Dev',
    description: 'Modern web interfaces and user experiences',
    icon: Monitor,
    skills: ['React/Vue', 'TypeScript', 'CSS/Tailwind'],
    color: 'from-emerald-500 to-teal-600'
  },

  {
    id: 'contentwriting',
    title: 'Content Writing',
    description: 'Professional content creation and thought leadership',
    icon: FileText,
    skills: ['Research', 'Publishing', 'Industry Expertise'],
    color: 'from-indigo-500 to-purple-600'
  },

  {
    id: 'graphics-design',
    title: 'Graphics Design',
    description: 'Visual communication through creative design solutions',
    icon: Palette,
    skills: ['Adobe Creative Suite', 'Typography', 'Branding'],
    color: 'from-pink-500 to-rose-600'
  },
  
  {
    id: 'product-design',
    title: 'Product design',
    description: 'User-centered design and interface optimization',
    icon: Smartphone,
    skills: ['Figma/Sketch', 'User Research', 'Prototyping'],
    color: 'from-cyan-500 to-blue-600'
  },

  {
    id: 'social-media-mgnt',
    title: 'Social Media Mgnt.',
    description: 'Strategic social presence and community engagement',
    icon: Users,
    skills: ['Content Planning', 'Analytics', 'Community Building'],
    color: 'from-pink-500 to-fuchsia-600'
  },
  
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video production and post-production',
    icon: Video,
    skills: ['Adobe Premiere', 'Motion Graphics', 'Color Grading'],
    color: 'from-red-500 to-pink-600'
  },

  {
    id: 'virtual-assistant',
    title: 'Virtual Assistant',
    description: 'Professional administrative and operational support',
    icon: Headphones,
    skills: ['Project Management', 'Communication', 'Organization'],
    color: 'from-violet-500 to-purple-600'
  },
  
];

interface NicheSelectionProps {
  userName: string;
  onNicheSelect: (niche: string) => void;
  onBack: () => void;
}

const NicheSelection = ({ userName, onNicheSelect, onBack }: NicheSelectionProps) => {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-up relative">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute top-0 left-0 sm:top-6 sm:left-6"
          >
            ← Back
          </Button>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 pt-12 sm:pt-0">
            Welcome {userName}! 👋
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            Let's find your perfect niche at OnSwift. Select the specialization that best matches your expertise and passion.
          </p>
        </div>

        {/* Niche Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 max-w-7xl mx-auto">
          {niches.map((niche, index) => (
            <div key={niche.id} className="flex flex-col">
              <Card
                className={`cursor-pointer transition-smooth hover:shadow-professional animate-fade-up border-2 flex-1 ${
                  selectedNiche === niche.id 
                    ? 'border-accent shadow-professional' 
                    : 'border-transparent hover:border-accent/30'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedNiche(niche.id)}
              >
                <CardContent className="p-4 sm:p-5 lg:p-6 text-center h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${niche.color} flex items-center justify-center shadow-medium`}>
                    <niche.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-base sm:text-lg text-primary mb-2 flex-shrink-0">
                    {niche.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed flex-grow">
                    {niche.description}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center mb-3 sm:mb-4 flex-shrink-0">
                    {niche.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-accent-subtle text-accent text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Continue Button - appears below selected card */}
              {selectedNiche === niche.id && (
                <div className="animate-fade-up mt-3 sm:mt-4">
                  <Button
                    variant="professional"
                    size="lg"
                    onClick={() => onNicheSelect(selectedNiche)}
                    className="w-full px-4 text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Continue with {niche.title}</span>
                    <span className="sm:hidden">Continue</span>
                    <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NicheSelection;