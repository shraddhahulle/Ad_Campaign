
import { useState, useEffect } from "react";
import { useCampaign } from "@/contexts/CampaignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import BackButton from "@/components/BackButton";
import { CalendarDays, TrendingUp, TrendingDown, User, Users, MousePointerClick } from "lucide-react";

// Generate daily performance data with fluctuations to simulate real campaign data
const generateDailyData = (metrics: any) => {
  const daysData = [];
  const totalDays = 7;
  
  let totalImpressions = metrics.impressions;
  let totalClicks = metrics.clicks;
  let totalConversions = metrics.conversions;
  
  // Track cumulative metrics to show growth
  let cumulativeImpressions = 0;
  let cumulativeClicks = 0;
  let cumulativeConversions = 0;
  let cumulativeSpend = 0;
  
  for (let i = 0; i < totalDays; i++) {
    // Create gradually increasing metrics with some randomness
    const dayFactor = (i + 1) / totalDays;
    const randomFactor = 0.8 + Math.random() * 0.4; // Between 0.8 and 1.2
    
    const dayImpressions = Math.floor((totalImpressions / totalDays) * dayFactor * randomFactor);
    const dayClicks = Math.floor((totalClicks / totalDays) * dayFactor * randomFactor);
    const dayConversions = Math.floor((totalConversions / totalDays) * dayFactor * randomFactor);
    const daySpend = (metrics.spend / totalDays);
    
    cumulativeImpressions += dayImpressions;
    cumulativeClicks += dayClicks;
    cumulativeConversions += dayConversions;
    cumulativeSpend += daySpend;
    
    const dayCtr = dayImpressions > 0 ? (dayClicks / dayImpressions) * 100 : 0;
    const dayCpc = dayClicks > 0 ? daySpend / dayClicks : 0;
    
    // Generate hourly data for this day to show in the user activity visualization
    const hourlyData = [];
    for (let h = 0; h < 24; h++) {
      // More activity during business hours (8am-8pm)
      const hourFactor = (h >= 8 && h <= 20) ? 0.7 + Math.random() * 0.6 : 0.1 + Math.random() * 0.3;
      const hourlyClicks = Math.floor(dayClicks * hourFactor / 12);
      const hourlyConversions = Math.floor(hourlyClicks * (dayConversions / dayClicks) * randomFactor);
      
      hourlyData.push({
        hour: h,
        clicks: hourlyClicks,
        conversions: hourlyConversions
      });
    }
    
    // Find peak hour
    const peakHour = hourlyData.reduce((max, item) => 
      item.clicks > max.clicks ? item : max, { hour: 0, clicks: 0, conversions: 0 });
    
    daysData.push({
      day: `Day ${i + 1}`,
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      impressions: dayImpressions,
      clicks: dayClicks,
      conversions: dayConversions,
      ctr: dayCtr.toFixed(2),
      cpc: dayCpc.toFixed(2),
      spend: daySpend.toFixed(2),
      cumulativeImpressions,
      cumulativeClicks,
      cumulativeConversions,
      cumulativeSpend: cumulativeSpend.toFixed(2),
      peakHour: `${peakHour.hour}:00`,
      peakClicks: peakHour.clicks,
      hourlyData
    });
  }
  
  return daysData;
};

// Generate optimization recommendations
const generateRecommendations = (metrics: any, campaignState: any) => {
  const recommendations = [];
  
  // Based on CTR
  if (metrics.ctr < 2) {
    recommendations.push({
      type: 'Creative',
      description: 'Your click-through rate is below average. Try new ad headlines and imagery to improve engagement.',
      impact: 'High'
    });
  }
  
  // Based on CPA
  if (metrics.cpa > 30) {
    recommendations.push({
      type: 'Targeting',
      description: 'Your cost per acquisition is high. Consider refining your audience targeting to reach more relevant users.',
      impact: 'Medium'
    });
  }
  
  // Based on budget spend
  recommendations.push({
    type: 'Budget',
    description: `Increasing your daily budget by 20% could result in approximately ${Math.floor(metrics.conversions * 0.2)} more conversions per week.`,
    impact: 'Medium'
  });
  
  // Based on platform
  if (campaignState.platform === 'google') {
    recommendations.push({
      type: 'Keywords',
      description: 'Add negative keywords to exclude irrelevant search queries and improve campaign efficiency.',
      impact: 'High'
    });
  } else {
    recommendations.push({
      type: 'Placement',
      description: 'Your ads are performing better on Instagram than Facebook. Consider reallocating budget to Instagram placements.',
      impact: 'Medium'
    });
  }
  
  return recommendations;
};

// Optimization suggestions component
const OptimizationCard = ({ recommendation }: { recommendation: any }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">{recommendation.type}</h4>
          <span className={`text-sm font-medium ${getImpactColor(recommendation.impact)}`}>
            {recommendation.impact} Impact
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
        <Button variant="link" className="text-primary p-0 mt-2">Apply This Change</Button>
      </CardContent>
    </Card>
  );
};

const COLORS = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#1877F2'];

const MetricsOverview = ({ metrics }: { metrics: any }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">Impressions</div>
        <div className="text-2xl font-bold">{metrics.impressions.toLocaleString()}</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">Clicks</div>
        <div className="text-2xl font-bold">{metrics.clicks.toLocaleString()}</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">CTR</div>
        <div className="text-2xl font-bold">{(metrics.ctr * 100).toFixed(2)}%</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">Conversions</div>
        <div className="text-2xl font-bold">{metrics.conversions}</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">CPC</div>
        <div className="text-2xl font-bold">${metrics.cpc.toFixed(2)}</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">CPA</div>
        <div className="text-2xl font-bold">${metrics.cpa.toFixed(2)}</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">ROAS</div>
        <div className="text-2xl font-bold">{metrics.roas.toFixed(2)}x</div>
      </Card>
      <Card className="metric-card">
        <div className="text-sm text-muted-foreground">Spend</div>
        <div className="text-2xl font-bold">${metrics.spend.toFixed(2)}</div>
      </Card>
    </div>
  );
};

// New component to visualize user activity
const UserActivitySimulation = ({ dailyData, selectedDay }: { dailyData: any[], selectedDay: number }) => {
  const dayData = dailyData[selectedDay] || dailyData[dailyData.length - 1];
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MousePointerClick className="mr-2" />
          User Activity Simulation - {dayData.date}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span>Peak activity at <strong>{dayData.peakHour}</strong> with {dayData.peakClicks} clicks</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className={`h-5 w-5 mr-2 ${selectedDay > 0 && dailyData[selectedDay].conversions > dailyData[selectedDay-1].conversions ? 'text-green-500' : 'text-red-500'}`} />
            <span>
              {selectedDay > 0 
                ? `${dailyData[selectedDay].conversions > dailyData[selectedDay-1].conversions ? '+' : ''}${dailyData[selectedDay].conversions - dailyData[selectedDay-1].conversions} conversions vs previous day`
                : `${dayData.conversions} conversions`}
            </span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={dayData.hourlyData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4285F4" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F9D58" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0F9D58" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="hour" 
              tickFormatter={(hour) => `${hour}:00`}
              ticks={[0, 6, 12, 18, 23]}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, name === 'clicks' ? 'Clicks' : 'Conversions']}
              labelFormatter={(hour) => `${hour}:00`} 
            />
            <Legend />
            <Area type="monotone" dataKey="clicks" stroke="#4285F4" fillOpacity={1} fill="url(#colorClicks)" />
            <Area type="monotone" dataKey="conversions" stroke="#0F9D58" fillOpacity={1} fill="url(#colorConversions)" />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-50 p-3 rounded-lg flex flex-col">
            <div className="text-sm text-muted-foreground">Total Clicks Today</div>
            <div className="text-xl font-bold">{dayData.clicks.toLocaleString()}</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg flex flex-col">
            <div className="text-sm text-muted-foreground">Total Conversions Today</div>
            <div className="text-xl font-bold">{dayData.conversions.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// New component to show campaign growth over time
const CampaignGrowth = ({ dailyData }: { dailyData: any[] }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2" />
          Campaign Growth Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={dailyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="cumulativeClicks" 
              name="Total Clicks" 
              stroke="#4285F4" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="cumulativeConversions" 
              name="Total Conversions" 
              stroke="#0F9D58" 
              strokeWidth={2}
              dot={{ r: 4 }} 
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">ROI Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(dailyData[dailyData.length - 1].cumulativeConversions * 50).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Estimated Revenue</div>
              <div className="flex items-center mt-1">
                <span className="text-sm mr-2">From ${dailyData[dailyData.length - 1].cumulativeSpend} spent</span>
                <span className="text-sm font-medium text-green-600">
                  ({Math.round((dailyData[dailyData.length - 1].cumulativeConversions * 50 / Number(dailyData[dailyData.length - 1].cumulativeSpend)) * 100)}% ROI)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Acquisition Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(Number(dailyData[dailyData.length - 1].cumulativeSpend) / dailyData[dailyData.length - 1].cumulativeConversions).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Average Cost Per Conversion</div>
              <Progress 
                className="h-2 mt-3" 
                value={Math.min((Number(dailyData[dailyData.length - 1].cumulativeSpend) / dailyData[dailyData.length - 1].cumulativeConversions) / 30 * 100, 100)} 
              />
              <div className="text-xs text-muted-foreground mt-1">Target: $30.00</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

const CampaignResults = () => {
  const { campaignState, simulatePerformance, resetCampaign } = useCampaign();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [daily, setDaily] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showSimulating, setShowSimulating] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(6); // Default to last day
  
  const pieData = [
    { name: 'Desktop', value: Math.floor(campaignState.metrics.conversions * 0.45) },
    { name: 'Mobile', value: Math.floor(campaignState.metrics.conversions * 0.35) },
    { name: 'Tablet', value: Math.floor(campaignState.metrics.conversions * 0.20) }
  ];
  
  // Run simulation on component mount
  useEffect(() => {
    simulatePerformance();
    
    // Simulate loading
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 10;
        return newProgress;
      });
    }, 200);
    
    // Set "complete" after progress is done
    setTimeout(() => {
      setLoading(false);
      setShowSimulating(false);
      
      // Generate daily data and recommendations based on simulation
      setDaily(generateDailyData(campaignState.metrics));
      setRecommendations(generateRecommendations(campaignState.metrics, campaignState));
    }, 2500);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleReset = () => {
    resetCampaign();
  };

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
  };

  if (showSimulating) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Simulating Campaign Performance</h2>
        <div className="w-1/2 mb-4">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-muted-foreground">
          {loading ? 'Processing campaign data...' : 'Simulation complete!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <BackButton />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Campaign Performance Results</h2>
          <p className="text-muted-foreground">
            {campaignState.platform === 'google' ? 'Google' : 'Meta'} Ads simulation results
          </p>
        </div>
        
        <Button onClick={handleReset} variant="outline">
          Start New Campaign
        </Button>
      </div>
      
      <MetricsOverview metrics={campaignState.metrics} />
      
      {daily.length > 0 && (
        <UserActivitySimulation dailyData={daily} selectedDay={selectedDayIndex} />
      )}
      
      {daily.length > 0 && (
        <div className="bg-slate-50 p-4 rounded-lg mb-6">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Select Day to View Detailed Performance
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {daily.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDaySelect(index)}
                className={`px-3 py-2 rounded-md text-sm whitespace-nowrap ${
                  selectedDayIndex === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white border hover:bg-slate-100'
                }`}
              >
                {day.date}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {daily.length > 0 && (
        <CampaignGrowth dailyData={daily} />
      )}
      
      <Tabs defaultValue="performance" className="mt-8">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={daily}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#4285F4" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#0F9D58" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={daily}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cpc" fill="#1877F2" name="CPC ($)" />
                    <Bar dataKey="spend" fill="#DB4437" name="Spend ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Click-Through Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={daily}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ctr" stroke="#F4B400" activeDot={{ r: 8 }} name="CTR (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-6 pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversions by Device</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} conversions`, 'Value']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-sm font-medium mb-2">Age Distribution</h3>
                <div className="space-y-2">
                  {['18-24', '25-34', '35-44', '45-54', '55-64', '65+'].map((age) => {
                    const percent = Math.floor(Math.random() * 30) + 5;
                    return (
                      <div key={age} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{age}</span>
                          <span>{percent}%</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                      </div>
                    );
                  })}
                </div>
                
                <h3 className="text-sm font-medium mt-6 mb-2">Gender Distribution</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-md">
                    <div className="text-2xl font-bold">48%</div>
                    <div className="text-sm text-muted-foreground">Male</div>
                  </div>
                  <div className="text-center p-4 border rounded-md">
                    <div className="text-2xl font-bold">52%</div>
                    <div className="text-sm text-muted-foreground">Female</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: 'California', value: Math.floor(campaignState.metrics.conversions * 0.25) },
                    { name: 'New York', value: Math.floor(campaignState.metrics.conversions * 0.20) },
                    { name: 'Texas', value: Math.floor(campaignState.metrics.conversions * 0.15) },
                    { name: 'Florida', value: Math.floor(campaignState.metrics.conversions * 0.12) },
                    { name: 'Illinois', value: Math.floor(campaignState.metrics.conversions * 0.10) }
                  ]}
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4285F4" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="optimization" className="space-y-6 pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Recommendations</h3>
              {recommendations.map((rec, index) => (
                <OptimizationCard key={index} recommendation={rec} />
              ))}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-sm font-medium mb-2">Ad Performance</h3>
                  <div className="space-y-4 mb-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Click-Through Rate</span>
                        <span className="font-medium">{(campaignState.metrics.ctr * 100).toFixed(2)}%</span>
                      </div>
                      <Progress 
                        value={Math.min(campaignState.metrics.ctr * 100 * 5, 100)} 
                        className="h-2" 
                      />
                      <div className="text-xs text-muted-foreground">Industry average: 2.0%</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Conversion Rate</span>
                        <span className="font-medium">
                          {(campaignState.metrics.conversions / campaignState.metrics.clicks * 100).toFixed(2)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min((campaignState.metrics.conversions / campaignState.metrics.clicks * 100) * 10, 100)} 
                        className="h-2" 
                      />
                      <div className="text-xs text-muted-foreground">Industry average: 3.0%</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>ROAS</span>
                        <span className="font-medium">{campaignState.metrics.roas.toFixed(2)}x</span>
                      </div>
                      <Progress 
                        value={Math.min(campaignState.metrics.roas * 20, 100)} 
                        className="h-2" 
                      />
                      <div className="text-xs text-muted-foreground">Industry average: 4.0x</div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium mb-2">Optimization Score</h3>
                  <div className="flex items-center">
                    <div className="w-full mr-4">
                      <Progress value={78} className="h-4" />
                    </div>
                    <span className="font-bold text-xl">78%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Implementing the recommendations will increase your optimization score
                  </p>
                  
                  <Button className="w-full mt-6">Apply All Recommendations</Button>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3">1</div>
                    <p>Review performance data and optimization recommendations</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3">2</div>
                    <p>Apply recommended optimizations to improve campaign efficiency</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3">3</div>
                    <p>Launch your campaign on {campaignState.platform === 'google' ? 'Google' : 'Meta'} Ads</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3">4</div>
                    <p>Monitor performance and continue optimizing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-8">
        <Button onClick={handleReset} size="lg">
          Start New Campaign
        </Button>
      </div>
    </div>
  );
};

export default CampaignResults;
