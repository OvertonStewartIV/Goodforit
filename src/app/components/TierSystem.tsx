import React from 'react';
import { ShieldCheck, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export type TierLevel = 1 | 2 | 3 | 4 | 5;

interface TierInfo {
  level: TierLevel;
  name: string;
  limit: number;
  requirements: string[];
  color: string;
}

export const TIERS: Record<TierLevel, TierInfo> = {
  1: {
    level: 1,
    name: "Newcomer",
    limit: 500,
    requirements: ["Verified Identity"],
    color: "text-neutral-400"
  },
  2: {
    level: 2,
    name: "Trust Keeper",
    limit: 5000,
    requirements: ["4.0+ Star Rating", "5+ Settled Transactions"],
    color: "text-lime-400"
  },
  3: {
    level: 3,
    name: "Community Pillar",
    limit: 25000,
    requirements: ["4.8+ Star Rating", "20+ Settled Transactions", "98% On-Time Payment"],
    color: "text-purple-400"
  },
  4: {
    level: 4,
    name: "Protocol Guardian",
    limit: 100000,
    requirements: ["4.9+ Star Rating", "50+ Settled Transactions", "100% On-Time Payment"],
    color: "text-amber-400"
  },
  5: {
    level: 5,
    name: "Network Legend",
    limit: 500000,
    requirements: ["5.0 Star Rating", "100+ Settled Transactions", "Community Vouched (5x)"],
    color: "text-cyan-400"
  }
};

export const TierBadge = ({ level }: { level: TierLevel }) => {
  const tier = TIERS[level];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 ${tier.color} text-xs font-bold uppercase tracking-wider`}>
      <ShieldCheck size={12} />
      <span>Tier {level}</span>
    </div>
  );
};

export const TierLimitCard = ({ currentLevel, amount }: { currentLevel: TierLevel, amount: number }) => {
  const tier = TIERS[currentLevel];
  const isOverLimit = amount > tier.limit;
  const progress = Math.min((amount / tier.limit) * 100, 100);

  return (
    <div className="bg-neutral-900/50 rounded-xl p-4 border border-neutral-800 mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-bold ${tier.color}`}>{tier.name}</span>
            <TierBadge level={currentLevel} />
          </div>
          <p className="text-xs text-neutral-400">
            Max transaction limit: <span className="text-white font-bold">${tier.limit.toLocaleString()}</span>
          </p>
        </div>
        {isOverLimit ? (
          <AlertCircle className="text-red-500" size={20} />
        ) : (
          <Lock className="text-neutral-600" size={16} />
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden mb-2">
        <div 
          style={{ width: `${progress}%` }}
          className={`h-full rounded-full transition-all duration-500 ${isOverLimit ? 'bg-red-500' : 'bg-lime-400'}`}
        />
      </div>

      {isOverLimit && (
        <div className="flex items-center gap-2 text-xs text-red-500 font-medium mt-2">
          <AlertCircle size={12} />
          <span>Amount exceeds Tier {currentLevel} limit. Upgrade required.</span>
        </div>
      )}
    </div>
  );
};
