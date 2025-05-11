
import { useState } from "react";
import { useCampaign } from "@/contexts/CampaignContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";

// Sample targeting data
const locations = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France"];
const ageGroups = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const genders = ["Male", "Female", "All"];
const interests = [
  "Technology", "Travel", "Fitness", "Fashion", "Food & Drink", 
  "Sports", "Home & Garden", "Business", "Entertainment", "Education"
];
const keywords = [
  "buy online", "best products", "discount", "shop now", "deals", 
  "free shipping", "new collection", "sale", "official store", "premium"
];
const behaviors = [
  "Frequent Traveler", "Digital Purchaser", "Mobile Device User", 
  "New Business Owner", "Recently Moved", "Engaged Shopper"
];

const TargetingSetup = () => {
  const { campaignState, updateTargeting, setStep } = useCampaign();
  const [selectedTab, setSelectedTab] = useState("location");

  const isGoogle = campaignState.platform === 'google';
  
  const handleLocationSelect = (location: string) => {
    const currentLocations = [...campaignState.targeting.location];
    if (currentLocations.includes(location)) {
      updateTargeting({
        location: currentLocations.filter((loc) => loc !== location)
      });
    } else {
      updateTargeting({
        location: [...currentLocations, location]
      });
    }
  };
  
  const handleAgeSelect = (age: string) => {
    const currentAges = [...campaignState.targeting.demographics.age];
    if (currentAges.includes(age)) {
      updateTargeting({
        demographics: {
          ...campaignState.targeting.demographics,
          age: currentAges.filter((a) => a !== age)
        }
      });
    } else {
      updateTargeting({
        demographics: {
          ...campaignState.targeting.demographics,
          age: [...currentAges, age]
        }
      });
    }
  };
  
  const handleGenderSelect = (gender: string) => {
    updateTargeting({
      demographics: {
        ...campaignState.targeting.demographics,
        gender: [gender]
      }
    });
  };
  
  const handleInterestSelect = (interest: string) => {
    const currentInterests = [...campaignState.targeting.interests];
    if (currentInterests.includes(interest)) {
      updateTargeting({
        interests: currentInterests.filter((int) => int !== interest)
      });
    } else {
      updateTargeting({
        interests: [...currentInterests, interest]
      });
    }
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const currentKeywords = campaignState.targeting.keywords || [];
    if (currentKeywords.includes(keyword)) {
      updateTargeting({
        keywords: currentKeywords.filter((kw) => kw !== keyword)
      });
    } else {
      updateTargeting({
        keywords: [...currentKeywords, keyword]
      });
    }
  };
  
  const handleBehaviorSelect = (behavior: string) => {
    const currentBehaviors = campaignState.targeting.behaviors || [];
    if (currentBehaviors.includes(behavior)) {
      updateTargeting({
        behaviors: currentBehaviors.filter((bh) => bh !== behavior)
      });
    } else {
      updateTargeting({
        behaviors: [...currentBehaviors, behavior]
      });
    }
  };
  
  const handleContinue = () => {
    // Basic validation
    if (
      campaignState.targeting.location.length > 0 &&
      campaignState.targeting.demographics.age.length > 0 &&
      campaignState.targeting.interests.length > 0
    ) {
      setStep(5);
    }
  };

  const isTabComplete = (tab: string) => {
    switch (tab) {
      case "location":
        return campaignState.targeting.location.length > 0;
      case "demographics":
        return campaignState.targeting.demographics.age.length > 0;
      case "interests":
        return campaignState.targeting.interests.length > 0;
      case "keywords":
        return isGoogle ? (campaignState.targeting.keywords?.length || 0) > 0 : true;
      case "behaviors":
        return !isGoogle ? (campaignState.targeting.behaviors?.length || 0) > 0 : true;
      default:
        return false;
    }
  };
  
  const isReadyToContinue = () => {
    return (
      isTabComplete("location") &&
      isTabComplete("demographics") &&
      isTabComplete("interests") &&
      (isGoogle ? isTabComplete("keywords") : isTabComplete("behaviors"))
    );
  };

  return (
    <div className="space-y-6 relative">
      <BackButton />
      <h2 className="text-2xl font-bold">Set Up Audience Targeting</h2>
      <p className="text-muted-foreground">
        Define who you want to reach with your {campaignState.platform === 'google' ? 'Google' : 'Meta'} ads
      </p>
      
      <Tabs defaultValue="location" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
          <TabsTrigger value="location" className="relative">
            Location
            {isTabComplete("location") && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full" />
            )}
          </TabsTrigger>
          <TabsTrigger value="demographics" className="relative">
            Demographics
            {isTabComplete("demographics") && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full" />
            )}
          </TabsTrigger>
          <TabsTrigger value="interests" className="relative">
            Interests
            {isTabComplete("interests") && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full" />
            )}
          </TabsTrigger>
          {isGoogle ? (
            <TabsTrigger value="keywords" className="relative">
              Keywords
              {isTabComplete("keywords") && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full" />
              )}
            </TabsTrigger>
          ) : (
            <TabsTrigger value="behaviors" className="relative">
              Behaviors
              {isTabComplete("behaviors") && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full" />
              )}
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`location-${location}`}
                      checked={campaignState.targeting.location.includes(location)}
                      onCheckedChange={() => handleLocationSelect(location)}
                    />
                    <Label htmlFor={`location-${location}`}>{location}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Age</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {ageGroups.map((age) => (
                      <div key={age} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`age-${age}`}
                          checked={campaignState.targeting.demographics.age.includes(age)}
                          onCheckedChange={() => handleAgeSelect(age)}
                        />
                        <Label htmlFor={`age-${age}`}>{age}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Gender</h3>
                  <div className="flex flex-wrap gap-4">
                    {genders.map((gender) => (
                      <div key={gender} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`gender-${gender}`}
                          checked={campaignState.targeting.demographics.gender.includes(gender)}
                          onCheckedChange={() => handleGenderSelect(gender)}
                        />
                        <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`interest-${interest}`}
                      checked={campaignState.targeting.interests.includes(interest)}
                      onCheckedChange={() => handleInterestSelect(interest)}
                    />
                    <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isGoogle && (
          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Select keywords that are relevant to your product or service. Users searching for these terms may see your ad.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {keywords.map((keyword) => (
                    <div key={keyword} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`keyword-${keyword}`}
                        checked={campaignState.targeting.keywords?.includes(keyword)}
                        onCheckedChange={() => handleKeywordSelect(keyword)}
                      />
                      <Label htmlFor={`keyword-${keyword}`}>{keyword}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {!isGoogle && (
          <TabsContent value="behaviors">
            <Card>
              <CardHeader>
                <CardTitle>Behaviors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Target users based on their actions and purchase behaviors.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {behaviors.map((behavior) => (
                    <div key={behavior} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`behavior-${behavior}`}
                        checked={campaignState.targeting.behaviors?.includes(behavior)}
                        onCheckedChange={() => handleBehaviorSelect(behavior)}
                      />
                      <Label htmlFor={`behavior-${behavior}`}>{behavior}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => {
          const tabs = ["location", "demographics", "interests"];
          if (isGoogle) tabs.push("keywords");
          else tabs.push("behaviors");
          
          const currentIndex = tabs.indexOf(selectedTab);
          if (currentIndex > 0) {
            setSelectedTab(tabs[currentIndex - 1]);
          }
        }}>
          Previous Tab
        </Button>
        <Button 
          onClick={() => {
            const tabs = ["location", "demographics", "interests"];
            if (isGoogle) tabs.push("keywords");
            else tabs.push("behaviors");
            
            const currentIndex = tabs.indexOf(selectedTab);
            if (currentIndex < tabs.length - 1) {
              setSelectedTab(tabs[currentIndex + 1]);
            } else if (isReadyToContinue()) {
              handleContinue();
            }
          }}
        >
          {selectedTab === (isGoogle ? "keywords" : "behaviors") && isReadyToContinue() ? "Continue to Next Step" : "Next Tab"}
        </Button>
      </div>
    </div>
  );
};

export default TargetingSetup;
