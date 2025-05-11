
import { useCampaign } from "@/contexts/CampaignContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const CALL_TO_ACTIONS = [
  "Shop Now", "Learn More", "Sign Up", "Book Now", "Contact Us", 
  "Download", "Get Offer", "Subscribe", "Apply Now", "Get Quote"
];

// Ad preview templates based on platform and campaign type
const AdPreview = () => {
  const { campaignState } = useCampaign();
  const { platform, campaignType, adCreative } = campaignState;
  
  if (platform === 'google') {
    switch (campaignType) {
      case 'search':
        return (
          <div className="border rounded-md p-4 bg-white">
            <div className="text-sm text-gray-500 mb-1">Ad • www.example.com</div>
            <div className="text-lg font-medium text-blue-600 mb-1">{adCreative.headline || "Your Compelling Headline Here"}</div>
            <div className="text-sm">{adCreative.description || "Your ad description goes here. Make it persuasive and add a call to action."}</div>
          </div>
        );
      case 'display':
        return (
          <div className="border rounded-md overflow-hidden bg-white">
            <div className="h-32 bg-gray-100 flex items-center justify-center">
              {adCreative.imageUrl ? (
                <img src={adCreative.imageUrl} alt="Ad Preview" className="max-h-full" />
              ) : (
                <span className="text-gray-400">Image Preview</span>
              )}
            </div>
            <div className="p-3">
              <div className="text-lg font-medium mb-1">{adCreative.headline || "Your Headline"}</div>
              <div className="text-sm">{adCreative.description || "Ad description"}</div>
              <Button variant="link" className="text-blue-600 p-0 mt-1">{adCreative.callToAction || "Learn More"}</Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="border rounded-md p-4 bg-white">
            <p className="text-center text-gray-500">Ad preview will appear based on your selections</p>
          </div>
        );
    }
  } else { // Meta
    switch (campaignType) {
      case 'image':
        return (
          <div className="border rounded-md overflow-hidden bg-white">
            <div className="bg-meta-blue text-white text-xs p-2">Facebook Feed</div>
            <div className="p-2">
              <div className="text-sm font-medium">Your Page</div>
              <div className="text-xs text-gray-500">Sponsored</div>
            </div>
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {adCreative.imageUrl ? (
                <img src={adCreative.imageUrl} alt="Ad Preview" className="max-h-full" />
              ) : (
                <span className="text-gray-400">Image Preview</span>
              )}
            </div>
            <div className="p-3">
              <div className="text-sm">{adCreative.description || "Your ad description goes here."}</div>
              <div className="text-lg font-medium mt-2">{adCreative.headline || "Your Headline"}</div>
              <Button 
                className="mt-2 w-full bg-meta-blue hover:bg-meta-dark"
              >
                {adCreative.callToAction || "Learn More"}
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="border rounded-md p-4 bg-white">
            <p className="text-center text-gray-500">Ad preview will appear based on your selections</p>
          </div>
        );
    }
  }
};

const AdCreation = () => {
  const { campaignState, updateAdCreative, setStep } = useCampaign();
  const { platform, campaignType } = campaignState;
  
  const handleContinue = () => {
    if (
      campaignState.adCreative.headline &&
      campaignState.adCreative.description
    ) {
      setStep(6);
    }
  };

  const isGoogleSearch = platform === 'google' && campaignType === 'search';
  const needsImage = !isGoogleSearch;

  return (
    <div className="space-y-6 relative">
      <BackButton />
      <h2 className="text-2xl font-bold">Create Your Ad</h2>
      <p className="text-muted-foreground">
        Craft the creative elements for your {platform === 'google' ? 'Google' : 'Meta'} {campaignType} ad
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad Headline</label>
            <Input 
              placeholder="Enter compelling headline"
              value={campaignState.adCreative.headline || ''}
              onChange={(e) => updateAdCreative({ headline: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isGoogleSearch ? 'Max 30 characters' : 'Max 40 characters'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Ad Description</label>
            <Textarea 
              placeholder="Enter your ad description"
              value={campaignState.adCreative.description || ''}
              onChange={(e) => updateAdCreative({ description: e.target.value })}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isGoogleSearch ? 'Max 90 characters' : 'Max 125 characters'}
            </p>
          </div>
          
          {!isGoogleSearch && (
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                placeholder="Enter image URL"
                value={campaignState.adCreative.imageUrl || ''}
                onChange={(e) => updateAdCreative({ imageUrl: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 1200x628 pixels
              </p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Call to Action</label>
            <Select
              value={campaignState.adCreative.callToAction || ''}
              onValueChange={(value) => updateAdCreative({ callToAction: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a CTA" />
              </SelectTrigger>
              <SelectContent>
                {CALL_TO_ACTIONS.map((cta) => (
                  <SelectItem key={cta} value={cta}>{cta}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Ad Preview</h3>
          <Card>
            <CardContent className="p-4">
              <AdPreview />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue}
          disabled={!campaignState.adCreative.headline || !campaignState.adCreative.description || (needsImage && !campaignState.adCreative.imageUrl)}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AdCreation;
