
import { useMemo } from "react";
import { useCampaign } from "@/contexts/CampaignContext";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  totalSteps: number;
  className?: string;
};

const ProgressBar = ({ totalSteps, className }: ProgressBarProps) => {
  const { campaignState } = useCampaign();
  
  const progressPercentage = useMemo(() => {
    return Math.round((campaignState.step / totalSteps) * 100);
  }, [campaignState.step, totalSteps]);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Campaign Setup: Step {campaignState.step} of {totalSteps}</span>
        <span>{progressPercentage}% Complete</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default ProgressBar;
