import { ArrowRight, Clock, CheckCircle, Target, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentOverviewProps {
  niche: string;
  onStartAssessment: () => void;
  onBack: () => void;
}

const nicheData: Record<string, {
  title: string;
  description: string;
  tools: string[];
  expectations: string[];
  deliverables: string[];
}> = {
  'graphics-design': {
    title: 'Graphics Design',
    description: 'As a Graphics Designer at OnSwift, you\'ll create stunning visual communications that capture attention and convey messages effectively across digital and print media.',
    tools: ['Adobe Creative Suite (Photoshop, Illustrator, InDesign)', 'Figma or Sketch', 'Typography systems', 'Color theory mastery'],
    expectations: ['Create original, innovative designs', 'Meet tight deadlines consistently', 'Collaborate effectively with clients', 'Maintain brand consistency across projects'],
    deliverables: ['Logo designs and brand assets', 'Marketing materials and advertisements', 'Digital graphics for social media', 'Print-ready design files']
  },
  'copywriting': {
    title: 'Copywriting',
    description: 'As a Copywriter at OnSwift, you\'ll craft compelling content that drives action, builds brands, and connects with target audiences across various platforms and industries.',
    tools: ['Content management systems', 'SEO tools (SEMrush, Ahrefs)', 'Analytics platforms', 'Grammar and style checkers'],
    expectations: ['Write engaging, persuasive copy', 'Understand target audience psychology', 'Optimize content for search engines', 'Maintain consistent brand voice'],
    deliverables: ['Website copy and landing pages', 'Email marketing campaigns', 'Blog articles and content', 'Sales materials and brochures']
  },
  'frontend-dev': {
    title: 'Front-End Development',
    description: 'As a Front-End Developer at OnSwift, you\'ll build modern, responsive web applications that deliver exceptional user experiences and performance.',
    tools: ['React, Vue, or Angular', 'TypeScript/JavaScript ES6+', 'CSS frameworks (Tailwind, Bootstrap)', 'Build tools (Vite, Webpack)'],
    expectations: ['Write clean, maintainable code', 'Ensure cross-browser compatibility', 'Optimize for performance and accessibility', 'Collaborate with design teams'],
    deliverables: ['Responsive web applications', 'Interactive user interfaces', 'Performance-optimized code', 'Cross-platform compatibility']
  }
};

const AssessmentOverview = ({ niche, onStartAssessment, onBack }: AssessmentOverviewProps) => {
  const nicheInfo = nicheData[niche] || nicheData['graphics-design'];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <Button variant="ghost" onClick={onBack}>
            ← Back to Selection
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              {nicheInfo.title} Assessment
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive evaluation of your skills and expertise
            </p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Niche Description */}
          <Card className="animate-fade-up shadow-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                Your Role at OnSwift
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {nicheInfo.description}
              </p>
            </CardContent>
          </Card>

          {/* Assessment Structure */}
          <Card className="animate-fade-up shadow-professional" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                Assessment Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Technical Assessment (60 minutes)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Communication Evaluation (30 minutes)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Portfolio Review & Discussion</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Tools & Technologies */}
          <Card className="animate-fade-up shadow-subtle" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-primary">Required Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {nicheInfo.tools.map((tool, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tool}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Expectations */}
          <Card className="animate-fade-up shadow-subtle" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-primary">Expectations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {nicheInfo.expectations.map((expectation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Star className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{expectation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card className="animate-fade-up shadow-subtle" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-primary">Key Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {nicheInfo.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Users className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Success Message & CTA */}
        <Card className="bg-gradient-accent text-accent-foreground animate-fade-up shadow-professional" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Showcase Your Expertise? 🚀
            </h2>
            <p className="text-accent-foreground/90 mb-6 leading-relaxed max-w-2xl mx-auto">
              You're about to begin a comprehensive assessment designed by industry experts. 
              Show us your skills, creativity, and professional approach. Good luck!
            </p>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={onStartAssessment}
              className="bg-white text-accent hover:bg-white/90 px-8"
            >
              Start Assessment Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentOverview;