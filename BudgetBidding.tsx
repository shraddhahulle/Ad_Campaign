
import { useCampaign } from "@/contexts/CampaignContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import BackButton from "@/components/BackButton";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const getGoogleBidStrategies = (objective: string) => {
  switch (objective) {
    case 'sales':
    case 'leads':
      return [
        { id: 'target_cpa', name: 'Target CPA', description: 'Set a target cost per acquisition' },
        { id: 'max_conversions', name: 'Maximize Conversions', description: 'Get the most conversions within your budget' },
        { id: 'target_roas', name: 'Target ROAS', description: 'Set a target return on ad spend' }
      ];
    case 'traffic':
      return [
        { id: 'max_clicks', name: 'Maximize Clicks', description: 'Get the most clicks within your budget' },
        { id: 'manual_cpc', name: 'Manual CPC', description: 'Set bids manually for each click' }
      ];
    case 'consideration':
    case 'awareness':
      return [
        { id: 'target_impression_share', name: 'Target Impression Share', description: 'Set a target percentage of auctions to show ads' },
        { id: 'viewable_cpm', name: 'Viewable CPM', description: 'Pay for impressions that are viewable' }
      ];
    default:
      return [
        { id: 'max_conversions', name: 'Maximize Conversions', description: 'Get the most conversions within your budget' },
        { id: 'manual_cpc', name: 'Manual CPC', description: 'Set bids manually for each click' },
        { id: 'target_cpa', name: 'Target CPA', description: 'Set a target cost per acquisition' }
      ];
  }
};

const getMetaBidStrategies = (objective: string) => {
  switch (objective) {
    case 'conversions':
    case 'leads':
      return [
        { id: 'lowest_cost_with_bid_cap', name: 'Lowest Cost with Bid Cap', description: 'Get the most results while controlling your cost per result' },
        { id: 'cost_cap', name: 'Cost Cap', description: 'Control your cost per result' },
        { id: 'roas_goal', name: 'ROAS Goal', description: 'Control your return on ad spend' }
      ];
    case 'traffic':
      return [
        { id: 'lowest_cost', name: 'Lowest Cost', description: 'Get the most results within your budget' },
        { id: 'bid_cap', name: 'Bid Cap', description: 'Control your max cost per click' }
      ];
    case 'awareness':
    case 'engagement':
      return [
        { id: 'lowest_cost', name: 'Lowest Cost', description: 'Get the most results within your budget' },
        { id: 'reach_and_frequency', name: 'Reach and Frequency', description: 'Control how many people see your ad and how often' }
      ];
    default:
      return [
        { id: 'lowest_cost', name: 'Lowest Cost', description: 'Get the most results within your budget' },
        { id: 'bid_cap', name: 'Bid Cap', description: 'Control your max cost per click' },
        { id: 'cost_cap', name: 'Cost Cap', description: 'Control your cost per result' }
      ];
  }
};

// Generate simulated forecast data
const generateForecastData = (budget: number, bidStrategy: string) => {
  const baseClicks = budget * 10;
  const baseImpressions = budget * 500;
  const baseConversions = budget * 1.2;
  
  let modifier = 1;
  if (bidStrategy.includes('max') || bidStrategy.includes('lowest')) modifier = 1.2;
  if (bidStrategy.includes('manual') || bidStrategy.includes('cap')) modifier = 0.9;
  if (bidStrategy.includes('cpa') || bidStrategy.includes('roas')) modifier = 1.1;
  
  return [
    { day: 'Day 1', clicks: Math.floor(baseClicks/7 * modifier * 0.8), impressions: Math.floor(baseImpressions/7 * 0.7), conversions: Math.floor(baseConversions/7 * 0.6) },
    { day: 'Day 2', clicks: Math.floor(baseClicks/7 * modifier * 0.9), impressions: Math.floor(baseImpressions/7 * 0.8), conversions: Math.floor(baseConversions/7 * 0.8) },
    { day: 'Day 3', clicks: Math.floor(baseClicks/7 * modifier * 1.0), impressions: Math.floor(baseImpressions/7 * 0.9), conversions: Math.floor(baseConversions/7 * 0.9) },
    { day: 'Day 4', clicks: Math.floor(baseClicks/7 * modifier * 1.1), impressions: Math.floor(baseImpressions/7 * 1.0), conversions: Math.floor(baseConversions/7 * 1.0) },
    { day: 'Day 5', clicks: Math.floor(baseClicks/7 * modifier * 1.1), impressions: Math.floor(baseImpressions/7 * 1.1), conversions: Math.floor(baseConversions/7 * 1.1) },
    { day: 'Day 6', clicks: Math.floor(baseClicks/7 * modifier * 1.0), impressions: Math.floor(baseImpressions/7 * 1.2), conversions: Math.floor(baseConversions/7 * 1.2) },
    { day: 'Day 7', clicks: Math.floor(baseClicks/7 * modifier * 0.9), impressions: Math.floor(baseImpressions/7 * 1.1), conversions: Math.floor(baseConversions/7 * 1.1) }
  ];
};

const BudgetBidding = () => {
  const { campaignState, updateBudget, setStep } = useCampaign();
  
  const bidStrategies = campaignState.platform === 'google' 
    ? getGoogleBidStrategies(campaignState.objective || '')
    : getMetaBidStrategies(campaignState.objective || '');
  
  const forecastData = generateForecastData(
    campaignState.budget.amount,
    campaignState.budget.bidStrategy
  );
  
  const handleContinue = () => {
    if (
      campaignState.budget.amount > 0 &&
      campaignState.budget.bidStrategy
    ) {
      setStep(7);
    }
  };

  return (
    <div className="space-y-6 relative">
      <BackButton />
      <h2 className="text-2xl font-bold">Set Budget & Bidding</h2>
      <p className="text-muted-foreground">
        Configure your campaign budget and bidding strategy
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Budget Amount ($)</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number"
                    min={1}
                    step={1}
                    value={campaignState.budget.amount}
                    onChange={(e) => updateBudget({ amount: Number(e.target.value) })}
                  />
                  <span>per day</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Budget Allocation</label>
                <Slider
                  defaultValue={[campaignState.budget.amount]}
                  max={100}
                  step={5}
                  value={[campaignState.budget.amount]}
                  onValueChange={(value) => updateBudget({ amount: value[0] })}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$5</span>
                  <span>$50</span>
                  <span>$100</span>
                </div>
              </div>
              
              <RadioGroup 
                value={campaignState.budget.type}
                onValueChange={(value: 'daily' | 'lifetime') => updateBudget({ type: value })}
                className="mt-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily Budget</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lifetime" id="lifetime" />
                  <Label htmlFor="lifetime">Lifetime Budget</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bidding Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={campaignState.budget.bidStrategy}
                onValueChange={(value) => updateBudget({ bidStrategy: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a bidding strategy" />
                </SelectTrigger>
                <SelectContent>
                  {bidStrategies.map((strategy) => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {campaignState.budget.bidStrategy && (
                <p className="text-sm text-muted-foreground mt-2">
                  {bidStrategies.find(s => s.id === campaignState.budget.bidStrategy)?.description}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Forecast</h3>
          
          <Card>
            <CardHeader>
              <CardTitle>Estimated Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clicks">
                <TabsList className="mb-4">
                  <TabsTrigger value="clicks">Clicks</TabsTrigger>
                  <TabsTrigger value="impressions">Impressions</TabsTrigger>
                  <TabsTrigger value="conversions">Conversions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="clicks">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={forecastData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="clicks" stroke="#4285F4" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="impressions">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={forecastData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="impressions" fill="#1877F2" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="conversions">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={forecastData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="conversions" stroke="#0F9D58" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-secondary p-3 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Est. Daily Clicks</p>
                  <p className="text-xl font-bold">{Math.round(forecastData.reduce((sum, day) => sum + day.clicks, 0) / 7)}</p>
                </div>
                <div className="bg-secondary p-3 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Est. Weekly Impressions</p>
                  <p className="text-xl font-bold">{forecastData.reduce((sum, day) => sum + day.impressions, 0).toLocaleString()}</p>
                </div>
                <div className="bg-secondary p-3 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Est. Conversions</p>
                  <p className="text-xl font-bold">{forecastData.reduce((sum, day) => sum + day.conversions, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue}
          disabled={!campaignState.budget.amount || !campaignState.budget.bidStrategy}
          size="lg"
        >
          Run Simulation
        </Button>
      </div>
    </div>
  );
};

export default BudgetBidding;
