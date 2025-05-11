
import { CampaignProvider } from "@/contexts/CampaignContext";
import SimulationLayout from "@/components/SimulationLayout";
import CampaignSimulation from "@/components/CampaignSimulation";

const Index = () => {
  return (
    <CampaignProvider>
      <SimulationLayout>
        <CampaignSimulation />
      </SimulationLayout>
    </CampaignProvider>
  );
};

export default Index;
