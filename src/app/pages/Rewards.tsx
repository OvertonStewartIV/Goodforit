import React, { useState } from 'react';
import { ArrowLeft, Gift, Coins, TrendingUp, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Rewards() {
  const navigate = useNavigate();

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">Fees & Rewards</h1>
      </header>

      {/* Points Balance Card */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-xl text-white mb-8 relative overflow-hidden h-40 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <Coins size={24} className="text-amber-100" />
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">LEVEL 2 MEMBER</span>
        </div>
        <div>
          <p className="text-sm font-medium opacity-90 mb-1">Available Points</p>
          <p className="text-4xl font-bold tracking-tight">1,250</p>
        </div>
        {/* Decorative */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-50" />
      </div>

      {/* How It Works */}
      <div className="mb-8">
        <h3 className="font-bold text-stone-800 px-1 mb-3">Your Benefits</h3>
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-100 shadow-sm">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Reduced Fees</h4>
                <p className="text-xs text-stone-500">-50% on next 3 transfers</p>
              </div>
            </div>
            <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">Active</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <Gift size={18} />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Priority Support</h4>
                <p className="text-xs text-stone-500">24/7 access to help desk</p>
              </div>
            </div>
            <button className="text-stone-400 hover:text-indigo-600 transition-colors">
              <HelpCircle size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Fees Breakdown */}
      <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200 mb-8">
        <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
          Fee Structure <span className="text-[10px] font-normal text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">Transparent</span>
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center text-stone-600">
            <span>P2P Transfer (Cash)</span>
            <span className="font-mono font-bold">Free</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span>Crypto Exchange</span>
            <span className="font-mono font-bold">1.5%</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span>Instant Card Withdrawal</span>
            <span className="font-mono font-bold">1.0%</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span>Loan Origination</span>
            <span className="font-mono font-bold">2.0%</span>
          </div>
          <p className="text-xs text-stone-400 mt-4 pt-4 border-t border-stone-200">
            *Fees contribute directly to the community insurance fund.
          </p>
        </div>
      </div>

      {/* Earn Points */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg mb-1">Earn Points Back</h3>
            <p className="text-stone-400 text-xs mb-4 max-w-[200px]">
              Repay loans early or verify community members to earn rewards.
            </p>
            <button className="bg-white text-stone-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-stone-200 transition-colors shadow-sm">
              See Opportunities
            </button>
          </div>
          <div className="bg-white/10 p-3 rounded-full border border-white/20">
            <Gift size={24} className="text-amber-400" />
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
}
