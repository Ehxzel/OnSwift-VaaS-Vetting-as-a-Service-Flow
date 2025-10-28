import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
  completed: boolean;
  active: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
}

const ProgressTracker = ({ steps }: ProgressTrackerProps) => {
  return (
    <div className="w-full bg-card border-b border-border p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                  step.completed
                    ? 'bg-accent border-accent text-accent-foreground'
                    : step.active
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-muted border-muted text-muted-foreground'
                }`}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={`ml-3 text-sm font-medium transition-smooth ${
                  step.active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`ml-6 w-16 h-0.5 transition-smooth ${
                    step.completed ? 'bg-accent' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;