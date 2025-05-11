
import { useCampaign } from "@/contexts/CampaignContext";
import ProgressBar from "@/components/ProgressBar";
import PlatformSelection from "@/components/steps/PlatformSelection";
import ObjectiveSelection from "@/components/steps/ObjectiveSelection";
import CampaignTypeSelection from "@/components/steps/CampaignTypeSelection";
import TargetingSetup from "@/components/steps/TargetingSetup";
import AdCreation from "@/components/steps/AdCreation";
import BudgetBidding from "@/components/steps/BudgetBidding";
import CampaignResults from "@/components/steps/CampaignResults";

const CampaignSimulation = () => {
  const { campaignState } = useCampaign();
  const totalSteps = 7;

  const renderStep = () => {
    switch (campaignState.step) {
      case 1:
        return <PlatformSelection />;
      case 2:
        return <ObjectiveSelection />;
      case 3:
        return <CampaignTypeSelection />;
      case 4:
        return <TargetingSetup />;
      case 5:
        return <AdCreation />;
      case 6:
        return <BudgetBidding />;
      case 7:
        return <CampaignResults />;
      default:
        return <PlatformSelection />;
    }
  };
  
  return (
    <div className="container mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
      {campaignState.step < 7 && (
        <ProgressBar totalSteps={totalSteps} className="mb-8" />
      )}
      {renderStep()}
    </div>
  );
};

export default CampaignSimulation;
