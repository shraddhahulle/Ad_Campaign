import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Users, MousePointer, Target, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with updated design */}
      <section className="bg-blue-50 py-16 md:py-24 h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Master Digital Ad Campaigns
                <span className="text-blue-600 block mt-2">Without Real Spend</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-md">
                Learn, practice, and perfect your Google and Meta advertising strategies
                in a risk-free simulation environment.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link to="/campaign">
                  <Button size="lg" className="group">
                    Start Simulation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="#how-it-works">
                  <Button variant="outline" size="lg">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white p-8 rounded-lg shadow-xl relative">
                <img 
                  src="/lovable-uploads/74c8d268-057c-4df1-960a-5ce5cc0e7219.png" 
                  alt="Google Ads and Meta Ads comparison" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Use Our Simulator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk-Free Learning</h3>
              <p className="text-gray-600">Practice campaign creation and optimization without spending real money.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Realistic Scenarios</h3>
              <p className="text-gray-600">Experience real-world campaign behavior with simulated clicks and conversions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-gray-600">Track performance metrics and learn to make data-driven optimization decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced with more details */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
                <span className="absolute text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose Platform</h3>
              <p className="text-gray-600">Select between Google Ads or Meta Ads platforms, each with unique targeting capabilities and ad formats.</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-primary" />
                <span className="absolute text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Set Objectives</h3>
              <p className="text-gray-600">Define campaign goals like awareness, consideration, or conversion and specify your target audience demographics.</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer className="h-8 w-8 text-primary" />
                <span className="absolute text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Create Ads</h3>
              <p className="text-gray-600">Design compelling ad content with headlines, descriptions and images. Set budget and bidding strategies for optimal performance.</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <span className="absolute text-primary font-bold">4</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Analyze Results</h3>
              <p className="text-gray-600">View detailed performance metrics, audience insights, and optimization recommendations to improve your campaign.</p>
            </div>
          </div>
          
          {/* Campaign Results Preview */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">See Your Campaign Results</h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-primary" />
                  Real-time Performance Metrics
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center border-b pb-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                    <span>Track impressions, clicks, and conversion rates</span>
                  </li>
                  <li className="flex items-center border-b pb-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                    <span>Monitor cost metrics like CPC, CPA and ROAS</span>
                  </li>
                  <li className="flex items-center border-b pb-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                    <span>View daily performance trends and growth</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                    <span>Receive AI-powered optimization suggestions</span>
                  </li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-8 mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Audience Insights
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center border-b pb-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                    <span>Demographic breakdown of your audience</span>
                  </li>
                  <li className="flex items-center border-b pb-2">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 mr-3"></div>
                    <span>Geographic performance data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mr-3"></div>
                    <span>User behavior patterns throughout the day</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <div className="bg-slate-50 rounded-lg p-5">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h4 className="font-medium">Campaign Performance</h4>
                      <p className="text-sm text-gray-500">Last 7 days</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-green-600">+24.8%</span>
                      <span className="text-sm text-gray-500">vs. previous week</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Clicks</span>
                      <span className="font-medium">3,642</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: '75%'}}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-3">
                      <span>Conversions</span>
                      <span className="font-medium">217</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{width: '60%'}}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-3">
                      <span>CTR</span>
                      <span className="font-medium">5.4%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4">
                    <div className="flex-1 text-center border-r pr-2">
                      <div className="text-lg font-bold">$2.15</div>
                      <div className="text-xs text-gray-500">Avg CPC</div>
                    </div>
                    <div className="flex-1 text-center border-r px-2">
                      <div className="text-lg font-bold">$28.40</div>
                      <div className="text-xs text-gray-500">Avg CPA</div>
                    </div>
                    <div className="flex-1 text-center pl-2">
                      <div className="text-lg font-bold">4.2x</div>
                      <div className="text-xs text-gray-500">ROAS</div>
                    </div>
                  </div>
                </div>
                
                {/* Device breakdown */}
                <div className="mt-4 bg-white border rounded-lg shadow-sm p-4">
                  <h5 className="text-sm font-medium mb-3">Device Breakdown</h5>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Mobile</span>
                        <span>58%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '58%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Desktop</span>
                        <span>32%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                        <div className="bg-green-500 h-full rounded-full" style={{width: '32%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Tablet</span>
                        <span>10%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                        <div className="bg-yellow-500 h-full rounded-full" style={{width: '10%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/campaign">
              <Button size="lg">
                Start Your First Campaign
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Ad Campaign Simulator. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
