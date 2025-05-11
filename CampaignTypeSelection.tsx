
import { useCampaign } from "@/contexts/CampaignContext";
import StepCard from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

const getCampaignTypes = (platform: string, objective: string) => {
  if (platform === 'google') {
    switch (objective) {
      case 'sales':
      case 'leads':
        return [
          { id: 'search', title: 'Search Campaign', description: 'Text ads in Google search results' },
          { id: 'display', title: 'Display Campaign', description: 'Visual ads across Google Display Network' },
          { id: 'shopping', title: 'Shopping Campaign', description: 'Product listings in Google search' }
        ];
      case 'traffic':
      case 'consideration':
        return [
          { id: 'search', title: 'Search Campaign', description: 'Text ads in Google search results' },
          { id: 'display', title: 'Display Campaign', description: 'Visual ads across Google Display Network' },
          { id: 'video', title: 'Video Campaign', description: 'Video ads on YouTube' }
        ];
      case 'awareness':
        return [
          { id: 'display', title: 'Display Campaign', description: 'Visual ads across Google Display Network' },
          { id: 'video', title: 'Video Campaign', description: 'Video ads on YouTube' }
        ];
      case 'app':
        return [
          { id: 'app', title: 'App Campaign', description: 'Promote your app across Google networks' }
        ];
      default:
        return [
          { id: 'search', title: 'Search Campaign', description: 'Text ads in Google search results' },
          { id: 'display', title: 'Display Campaign', description: 'Visual ads across Google Display Network' },
          { id: 'video', title: 'Video Campaign', description: 'Video ads on YouTube' },
          { id: 'shopping', title: 'Shopping Campaign', description: 'Product listings in Google search' }
        ];
    }
  } else { // Meta
    switch (objective) {
      case 'conversions':
      case 'leads':
        return [
          { id: 'image', title: 'Image Ad', description: 'Single image ads in feed' },
          { id: 'carousel', title: 'Carousel Ad', description: 'Multiple images or videos in a single ad' },
          { id: 'collection', title: 'Collection Ad', description: 'Feature products from catalog' }
        ];
      case 'traffic':
        return [
          { id: 'image', title: 'Image Ad', description: 'Single image ads in feed' },
          { id: 'video', title: 'Video Ad', description: 'Video ads in feed and stories' },
          { id: 'carousel', title: 'Carousel Ad', description: 'Multiple images or videos in a single ad' }
        ];
      case 'awareness':
      case 'engagement':
        return [
          { id: 'image', title: 'Image Ad', description: 'Single image ads in feed' },
          { id: 'video', title: 'Video Ad', description: 'Video ads in feed and stories' },
          { id: 'slideshow', title: 'Slideshow Ad', description: 'Lightweight video ads from images' }
        ];
      case 'app':
        return [
          { id: 'app', title: 'App Ad', description: 'Promote app installs and engagement' }
        ];
      default:
        return [
          { id: 'image', title: 'Image Ad', description: 'Single image ads in feed' },
          { id: 'video', title: 'Video Ad', description: 'Video ads in feed and stories' },
          { id: 'carousel', title: 'Carousel Ad', description: 'Multiple images or videos in a single ad' },
          { id: 'collection', title: 'Collection Ad', description: 'Feature products from catalog' }
        ];
    }
  }
};

const CampaignTypeSelection = () => {
  const { campaignState, setCampaignType, setStep } = useCampaign();
  
  const campaignTypes = getCampaignTypes(campaignState.platform || '', campaignState.objective || '');
  
  const handleCampaignTypeSelect = (type: string) => {
    setCampaignType(type);
  };
  
  const handleContinue = () => {
    if (campaignState.campaignType) {
      setStep(4);
    }
  };

  return (
    <div className="space-y-6 relative">
      <BackButton />
      <h2 className="text-2xl font-bold">Select Campaign Type</h2>
      <p className="text-muted-foreground">
        Choose the format that best fits your objective
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {campaignTypes.map((type) => (
          <StepCard
            key={type.id}
            title={type.title}
            description={type.description}
            selected={campaignState.campaignType === type.id}
            onClick={() => handleCampaignTypeSelect(type.id)}
          />
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue}
          disabled={!campaignState.campaignType}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CampaignTypeSelection;
