import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroIllustration from "@/assets/hero-illustration.jpg";
import onswiftlogo from "@/assets/onswift-logo-white.png"

interface LandingProps {
  onContinue: (name: string, email: string) => void;
}

const Landing = ({ onContinue }: LandingProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onContinue(name.trim(), email.trim());
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* Left Content */}
                
            <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-up">
            
            <img
                src={onswiftlogo}
                alt="OnSwift"
                className="w-40 sm:w-40 mb-6"
              />

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">OnSwift</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Join our elite freelancer network. Complete our professional assessment to unlock premium opportunities.
              </p>
              
              {/* Features */}
              <div className="grid gap-3 sm:gap-4 mb-8 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Professional behavioral assessment</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Technical competency validation</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Access to premium client projects</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
                <img 
                  src={heroIllustration} 
                  alt="Professional freelancer working on projects" 
                  className="w-full h-auto rounded-3xl shadow-3xl animate-fade-up"
                  style={{ animationDelay: '0.3s' }}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative -mt-4 sm:-mt-8 px-4 sm:px-6 pb-16">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-professional border">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">
                Start Your Assessment
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="professional" 
                size="lg" 
                className="w-full mt-6"
                disabled={!name.trim() || !email.trim()}
              >
                Continue to Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            By continuing, you agree to our assessment terms and privacy policy. {/*We need Privacy policirs for this app/ r for all apps connected to OnSwift*/}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;