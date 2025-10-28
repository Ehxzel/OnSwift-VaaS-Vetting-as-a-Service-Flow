import {
  ArrowRight,
  Clock,
  CheckCircle,
  Target,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentOverviewProps {
  niche: string;
  onStartAssessment: () => void;
  onBack: () => void;
}

const nicheData: Record<
  string,
  {
    title: string;
    description: string;
    tools: string[];
    expectations: string[];
    deliverables: string[];
  }
> = {
  "backend-dev": {
    title: "Backend Development",
    description:
      "As a Backend Developer at OnSwift, you'll architect and build robust server-side systems, APIs, and databases that power scalable applications and ensure data integrity.",
    tools: [
      "Node.js, Python, or Java",
      "SQL and NoSQL databases",
      "REST and GraphQL APIs",
      "Cloud platforms (AWS, Azure, GCP)",
    ],
    expectations: [
      "Design scalable system architectures",
      "Implement secure authentication and authorization",
      "Optimize database queries and performance",
      "Write comprehensive API documentation",
    ],
    deliverables: [
      "RESTful and GraphQL APIs",
      "Database schemas and migrations",
      "Server infrastructure and deployment",
      "Integration with third-party services",
    ],
  },

  // 'brand-identity': {
  //   title: 'Brand Identity',
  //   description: 'As a Brand Identity Designer at OnSwift, you\'ll create stunning visual communications that capture attention and convey messages effectively across digital and print media.',
  //   tools: ['Adobe Creative Suite (Photoshop, Illustrator, InDesign)', 'Figma or Sketch', 'Typography systems', 'Color theory mastery'],
  //   expectations: ['Create original, innovative designs', 'Meet tight deadlines consistently', 'Collaborate effectively with clients', 'Maintain brand consistency across projects'],
  //   deliverables: ['Logo designs and brand assets', 'Marketing materials and advertisements', 'Digital graphics for social media', 'Print-ready design files']
  // },
  contentwriting: {
    title: "Content Writing",
    description:
      "As a Content Writer at OnSwift, you'll craft clear, engaging, and SEO-friendly content that helps brands connect with their audiences across digital platforms.",
    tools: [
      "SEO and keyword tools",
      "Content management systems",
      "Grammar and readability apps",
      "Editorial planning tools",
    ],
    expectations: [
      "Write audience-focused, on-brand content",
      "Apply SEO best practices",
      "Collaborate with editors and strategists",
      "Deliver polished work on time",
    ],
    deliverables: [
      "Blog posts and web articles",
      "Marketing and landing page copy",
      "Email newsletters",
      "Case studies and brand stories",
    ],
  },

  copywriting: {
    title: "Copywriting",
    description:
      "As a Copywriter at OnSwift, you'll craft compelling content that drives action, builds brands, and connects with target audiences across various platforms and industries.",
    tools: [
      "Content management systems",
      "SEO tools (SEMrush, Ahrefs)",
      "Analytics platforms",
      "Grammar and style checkers",
    ],
    expectations: [
      "Write engaging, persuasive copy",
      "Understand target audience psychology",
      "Optimize content for search engines",
      "Maintain consistent brand voice",
    ],
    deliverables: [
      "Website copy and landing pages",
      "Email marketing campaigns",
      "Blog articles and content",
      "Sales materials and brochures",
    ],
  },
  "frontend-dev": {
    title: "Front-End Development",
    description:
      "As a Front-End Developer at OnSwift, you'll build modern, responsive web applications that deliver exceptional user experiences and performance.",
    tools: [
      "React, Vue, or Angular",
      "TypeScript/JavaScript ES6+",
      "CSS frameworks (Tailwind, Bootstrap)",
      "Build tools (Vite, Webpack)",
    ],
    expectations: [
      "Write clean, maintainable code",
      "Ensure cross-browser compatibility",
      "Optimize for performance and accessibility",
      "Collaborate with design teams",
    ],
    deliverables: [
      "Responsive web applications",
      "Interactive user interfaces",
      "Performance-optimized code",
      "Cross-platform compatibility",
    ],
  },

  //   'contentwriting': {
  //   title: 'Content Writing',
  //   description:
  //     "As a Content Writer at OnSwift, you'll craft engaging, informative, and SEO-optimized written content that helps brands connect with their audiences and achieve measurable results. You'll translate complex ideas into clear, relatable stories across digital platforms.",
  //   tools: [
  //     'SEO and keyword research tools (e.g., Ahrefs, SEMrush, Google Keyword Planner)',
  //     'Content management systems (e.g., WordPress, Webflow)',
  //     'Grammar and readability tools (e.g., Grammarly, Hemingway)',
  //     'Editorial calendars and collaboration platforms (e.g., Notion, Trello, Google Docs)',
  //   ],
  //   expectations: [
  //     'Develop well-structured, audience-focused content aligned with brand tone and messaging',
  //     'Implement SEO best practices to improve visibility and engagement',
  //     'Collaborate with editors, designers, and strategists to deliver cohesive campaigns',
  //     'Meet deadlines while maintaining accuracy and creativity',
  //   ],
  //   deliverables: [
  //     'Blog posts and website articles',
  //     'Landing page and marketing copy',
  //     'Newsletters and email sequences',
  //     'Case studies and brand storytelling pieces',
  //   ],
  // },

  "graphics-design": {
    title: "Graphic Design",
    description:
      "As a Graphic Designer at OnSwift, you'll craft visually compelling designs that communicate ideas clearly and strengthen brand presence across digital and print platforms.",
    tools: [
      "Adobe Creative Suite or Figma",
      "Typography and color systems",
      "Layout and composition tools",
      "Design collaboration platforms",
    ],
    expectations: [
      "Create high-quality, original visuals",
      "Balance creativity with brand consistency",
      "Collaborate with clients and creative teams",
      "Deliver projects on time and to spec",
    ],
    deliverables: [
      "Brand and marketing assets",
      "Social media and digital graphics",
      "Presentation and print materials",
      "Campaign visuals and ad creatives",
    ],
  },

  "product-design": {
    title: "Product Designer",
    description:
      "As a Product Designer at OnSwift, you'll create intuitive, user-centered digital experiences by combining research, strategy, and visual design to solve complex problems.",
    tools: [
      "Figma, Sketch, or Adobe XD",
      "Prototyping tools (Framer, ProtoPie)",
      "User research platforms",
      "Design systems and component libraries",
    ],
    expectations: [
      "Conduct user research and testing",
      "Create wireframes and high-fidelity mockups",
      "Collaborate with developers and stakeholders",
      "Iterate based on feedback and data",
    ],
    deliverables: [
      "User flows and journey maps",
      "Interactive prototypes",
      "Design systems and style guides",
      "Responsive UI/UX designs",
    ],
  },

  "social-media-mgnt": {
    title: "Social Media Management",
    description:
      "As a Social Media Manager at OnSwift, you'll develop and execute social media strategies that build brand awareness, engage communities, and drive measurable results.",
    tools: [
      "Social media management platforms (Hootsuite, Buffer)",
      "Analytics tools (Meta Business Suite, Google Analytics)",
      "Content creation tools (Canva, CapCut)",
      "Scheduling and automation software",
    ],
    expectations: [
      "Develop content calendars and strategies",
      "Monitor trends and engagement metrics",
      "Respond to comments and messages promptly",
      "Analyze performance and optimize campaigns",
    ],
    deliverables: [
      "Content calendars and posting schedules",
      "Engaging social media posts and stories",
      "Performance reports and insights",
      "Community management and growth",
    ],
  },

  "video-editing": {
    title: "Video Editing",
    description:
      "As a Video Editor at OnSwift, you'll transform raw footage into polished, engaging videos that tell compelling stories and captivate audiences across platforms.",
    tools: [
      "Adobe Premiere Pro or Final Cut Pro",
      "After Effects for motion graphics",
      "Color grading software (DaVinci Resolve)",
      "Audio editing tools (Audition, Audacity)",
    ],
    expectations: [
      "Edit videos with attention to pacing and flow",
      "Add professional transitions and effects",
      "Ensure color consistency and audio quality",
      "Adapt content for different platforms",
    ],
    deliverables: [
      "Promotional and marketing videos",
      "Social media content and reels",
      "YouTube videos and tutorials",
      "Corporate presentations and testimonials",
    ],
  },

  "virtual-assistant": {
    title: "Virtual Assistant",
    description:
      "As a Virtual Assistant at OnSwift, you'll provide remote administrative, technical, and creative support to help clients manage their business operations efficiently.",
    tools: [
      "Project management tools (Asana, Trello)",
      "Communication platforms (Slack, Zoom)",
      "Calendar and scheduling software",
      "Cloud storage solutions",
    ],
    expectations: [
      "Manage multiple tasks and priorities",
      "Communicate proactively and clearly",
      "Maintain confidentiality and professionalism",
      "Adapt to varying client needs",
    ],
    deliverables: [
      "Calendar and email management",
      "Data entry and document preparation",
      "Travel arrangements and bookings",
      "Customer service and support",
    ],
  },
};

const AssessmentOverview = ({
  niche,
  onStartAssessment,
  onBack,
}: AssessmentOverviewProps) => {
  const nicheInfo = nicheData[niche] || nicheData["graphics-design"];

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
          <Card
            className="animate-fade-up shadow-professional"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                Assessment Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">
                  Technical Assessment (60 minutes)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">
                  Communication Evaluation (30 minutes)
                </span>
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
          <Card
            className="animate-fade-up shadow-subtle"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Required Tools
              </CardTitle>
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
          <Card
            className="animate-fade-up shadow-subtle"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Expectations
              </CardTitle>
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
          <Card
            className="animate-fade-up shadow-subtle"
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Key Deliverables
              </CardTitle>
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
        <Card
          className="bg-gradient-accent text-accent-foreground animate-fade-up shadow-professional"
          style={{ animationDelay: "0.5s" }}
        >
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Showcase Your Expertise?
            </h2>
            <p className="text-accent-foreground/90 mb-6 leading-relaxed max-w-2xl mx-auto">
              You're about to begin a comprehensive assessment designed by
              industry experts. Show us your skills, creativity, and
              professional approach. Good luck!
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
