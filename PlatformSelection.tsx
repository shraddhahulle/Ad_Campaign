
import { useCampaign } from "@/contexts/CampaignContext";
import StepCard from "@/components/StepCard";
import { Button } from "@/components/ui/button";

const PlatformSelection = () => {
  const { campaignState, setPlatform, setStep } = useCampaign();
  
  const handlePlatformSelect = (platform: 'google' | 'meta') => {
    setPlatform(platform);
  };
  
  const handleContinue = () => {
    if (campaignState.platform) {
      setStep(2);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select Advertising Platform</h2>
      <p className="text-muted-foreground">
        Choose the platform where you want to run your ad campaign
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <StepCard
          title="Google Ads"
          description="Text, display, video, shopping ads across Google networks"
          selected={campaignState.platform === 'google'}
          onClick={() => handlePlatformSelect('google')}
          className="border-b-4 border-b-google-blue"
        >
          <div className="h-40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <span className="w-8 h-8 rounded-full bg-google-blue"></span>
                <span className="w-8 h-8 rounded-full bg-google-red"></span>
                <span className="w-8 h-8 rounded-full bg-google-yellow"></span>
                <span className="w-8 h-8 rounded-full bg-google-green"></span>
              </div>
              <p className="text-center font-medium">Google's advertising platform reaches millions of users across Search, YouTube, and partner sites</p>
            </div>
          </div>
        </StepCard>
        
        <StepCard
          title="Meta Ads"
          description="Image, video, carousel ads on Facebook and Instagram"
          selected={campaignState.platform === 'meta'}
          onClick={() => handlePlatformSelect('meta')}
          className="border-b-4 border-b-meta-blue"
        >
          <div className="h-40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <span className="w-8 h-8 rounded-full bg-meta-blue"></span>
                <span className="w-8 h-8 rounded-full bg-meta-dark"></span>
                <span className="w-8 h-8 rounded-full bg-meta-blue opacity-70"></span>
              </div>
              <p className="text-center font-medium">Target specific demographics and interests across Facebook, Instagram, and Messenger</p>
            </div>
          </div>
        </StepCard>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue}
          disabled={!campaignState.platform}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PlatformSelection;
