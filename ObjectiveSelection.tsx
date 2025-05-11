
import { useCampaign } from "@/contexts/CampaignContext";
import StepCard from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

const GoogleObjectives = [
  { id: 'sales', title: 'Sales', description: 'Drive online sales, purchases or sign-ups' },
  { id: 'leads', title: 'Leads', description: 'Get leads and other conversions by encouraging customers to take action' },
  { id: 'traffic', title: 'Website Traffic', description: 'Get more customers to visit your website' },
  { id: 'consideration', title: 'Product & Brand Consideration', description: 'Encourage customers to explore your products or services' },
  { id: 'awareness', title: 'Brand Awareness & Reach', description: 'Reach a broad audience and build awareness' },
  { id: 'app', title: 'App Promotion', description: 'Increase installs and engagement for your app' }
];

const MetaObjectives = [
  { id: 'conversions', title: 'Conversions', description: 'Drive valuable actions on your website or app' },
  { id: 'leads', title: 'Lead Generation', description: 'Collect lead information from interested people' },
  { id: 'traffic', title: 'Traffic', description: 'Send more people to a destination on or off Meta' },
  { id: 'awareness', title: 'Brand Awareness', description: 'Show ads to people most likely to remember them' },
  { id: 'app', title: 'App Installs', description: 'Get more people to install your app' },
  { id: 'engagement', title: 'Engagement', description: 'Get more page likes, event responses or post engagement' }
];

const ObjectiveSelection = () => {
  const { campaignState, setObjective, setStep } = useCampaign();
  
  const objectives = campaignState.platform === 'google' ? GoogleObjectives : MetaObjectives;
  
  const handleObjectiveSelect = (objective: string) => {
    setObjective(objective);
  };
  
  const handleContinue = () => {
    if (campaignState.objective) {
      setStep(3);
    }
  };

  return (
    <div className="space-y-6 relative">
      <BackButton />
      <h2 className="text-2xl font-bold">Select Campaign Objective</h2>
      <p className="text-muted-foreground">
        Choose what you want to achieve with your {campaignState.platform === 'google' ? 'Google' : 'Meta'} ads campaign
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {objectives.map((objective) => (
          <StepCard
            key={objective.id}
            title={objective.title}
            description={objective.description}
            selected={campaignState.objective === objective.id}
            onClick={() => handleObjectiveSelect(objective.id)}
            className="h-full"
          />
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue}
          disabled={!campaignState.objective}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ObjectiveSelection;
