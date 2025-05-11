
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCampaign } from "@/contexts/CampaignContext";

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className = "" }: BackButtonProps) => {
  const { campaignState, setStep } = useCampaign();
  
  const handleBack = () => {
    if (campaignState.step > 1) {
      setStep(campaignState.step - 1);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={`rounded-full p-2 h-8 w-8 absolute top-4 left-4 ${className}`}
      onClick={handleBack}
      disabled={campaignState.step <= 1}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
};

export default BackButton;
