import React from 'react';
import { ShieldCheck, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export type TierLevel = 1 | 2 | 3;

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
    requirements: ["Verified Email", "Phone Number"],
    color: "text-neutral-400"
  },
  2: {
    level: 2,
    name: "Trust Keeper",
    limit: 5000,
    requirements: ["3 Successful Repayments", "Verified ID", "No Disputes (60d)"],
    color: "text-lime-400"
  },
  3: {
    level: 3,
    name: "Community Pillar",
    limit: 25000,
    requirements: ["10+ Successful Repayments", "5 Active Vouchers", "Trust Score > 95"],
    color: "text-purple-400"
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
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full rounded-full ${isOverLimit ? 'bg-red-500' : 'bg-lime-400'}`}
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
