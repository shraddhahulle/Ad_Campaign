
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Platform = 'google' | 'meta' | null;
export type ObjectiveType = string | null;
export type CampaignType = string | null;

export type TargetingOptions = {
  location: string[];
  demographics: {
    age: string[];
    gender: string[];
  };
  interests: string[];
  keywords?: string[]; // Google specific
  behaviors?: string[]; // Meta specific
};

export type AdCreative = {
  headline?: string;
  description?: string;
  imageUrl?: string;
  callToAction?: string;
};

export type Budget = {
  amount: number;
  type: 'daily' | 'lifetime';
  bidStrategy: string;
};

export type PerformanceMetrics = {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpc: number;
  cpa: number;
  roas: number;
  spend: number;
};

export type CampaignState = {
  step: number;
  platform: Platform;
  objective: ObjectiveType;
  campaignType: CampaignType;
  targeting: TargetingOptions;
  adCreative: AdCreative;
  budget: Budget;
  metrics: PerformanceMetrics;
};

export type CampaignContextType = {
  campaignState: CampaignState;
  setStep: (step: number) => void;
  setPlatform: (platform: Platform) => void;
  setObjective: (objective: ObjectiveType) => void;
  setCampaignType: (campaignType: CampaignType) => void;
  updateTargeting: (targeting: Partial<TargetingOptions>) => void;
  updateAdCreative: (adCreative: Partial<AdCreative>) => void;
  updateBudget: (budget: Partial<Budget>) => void;
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  resetCampaign: () => void;
  simulatePerformance: () => void;
};

const defaultState: CampaignState = {
  step: 1,
  platform: null,
  objective: null,
  campaignType: null,
  targeting: {
    location: [],
    demographics: {
      age: [],
      gender: []
    },
    interests: []
  },
  adCreative: {
    headline: '',
    description: '',
    imageUrl: '',
    callToAction: ''
  },
  budget: {
    amount: 10,
    type: 'daily',
    bidStrategy: ''
  },
  metrics: {
    impressions: 0,
    clicks: 0,
    ctr: 0,
    conversions: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
    spend: 0
  }
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaignState, setCampaignState] = useState<CampaignState>(defaultState);

  const setStep = (step: number) => {
    setCampaignState(prev => ({ ...prev, step }));
  };

  const setPlatform = (platform: Platform) => {
    setCampaignState(prev => ({ ...prev, platform }));
  };

  const setObjective = (objective: ObjectiveType) => {
    setCampaignState(prev => ({ ...prev, objective }));
  };

  const setCampaignType = (campaignType: CampaignType) => {
    setCampaignState(prev => ({ ...prev, campaignType }));
  };

  const updateTargeting = (targeting: Partial<TargetingOptions>) => {
    setCampaignState(prev => ({
      ...prev,
      targeting: { ...prev.targeting, ...targeting }
    }));
  };

  const updateAdCreative = (adCreative: Partial<AdCreative>) => {
    setCampaignState(prev => ({
      ...prev,
      adCreative: { ...prev.adCreative, ...adCreative }
    }));
  };

  const updateBudget = (budget: Partial<Budget>) => {
    setCampaignState(prev => ({
      ...prev,
      budget: { ...prev.budget, ...budget }
    }));
  };

  const updateMetrics = (metrics: Partial<PerformanceMetrics>) => {
    setCampaignState(prev => ({
      ...prev,
      metrics: { ...prev.metrics, ...metrics }
    }));
  };

  const resetCampaign = () => {
    setCampaignState(defaultState);
  };

  // Simulates campaign performance based on settings
  const simulatePerformance = () => {
    const { budget, targeting, objective } = campaignState;
    
    // Starting point for metrics
    let baseImpressions = budget.amount * 100;
    let baseCtr = 0.02; // 2%
    let baseConversionRate = 0.03; // 3%
    
    // Adjust based on targeting
    if (targeting.location.length > 0) baseImpressions *= 0.9;
    if (targeting.demographics.age.length > 0) baseCtr *= 1.2;
    if (targeting.interests.length > 0) baseConversionRate *= 1.3;
    
    // Adjust based on objective
    if (objective === 'conversions' || objective === 'leads') {
      baseConversionRate *= 1.5;
    } else if (objective === 'traffic' || objective === 'awareness') {
      baseImpressions *= 1.5;
    }

    // Calculate metrics
    const impressions = Math.floor(baseImpressions);
    const clicks = Math.floor(impressions * baseCtr);
    const conversions = Math.floor(clicks * baseConversionRate);
    const ctr = clicks / impressions || 0;
    const cpc = budget.amount / clicks || 0;
    const cpa = conversions > 0 ? budget.amount / conversions : 0;
    const roas = conversions * 50 / budget.amount; // Assuming $50 value per conversion
    
    updateMetrics({
      impressions,
      clicks,
      ctr,
      conversions,
      cpc,
      cpa,
      roas,
      spend: budget.amount
    });
  };

  return (
    <CampaignContext.Provider value={{
      campaignState,
      setStep,
      setPlatform,
      setObjective,
      setCampaignType,
      updateTargeting,
      updateAdCreative,
      updateBudget,
      updateMetrics,
      resetCampaign,
      simulatePerformance
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
