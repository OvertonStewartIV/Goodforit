import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert, BadgeCheck, XCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Safety() {
  const navigate = useNavigate();
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [minTransactions, setMinTransactions] = useState(false);

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">Safety & Anti-Scam</h1>
      </header>

      {/* Hero Section */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold text-rose-800 text-lg mb-2 flex items-center gap-2">
            <ShieldAlert size={24} /> Stop Scams
          </h2>
          <p className="text-rose-700 text-sm leading-relaxed mb-4">
            Protect your funds. Never send money outside the app. Always verify user reputation before lending.
          </p>
          <button className="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-colors">
            Read Safety Guide
          </button>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Filters & Toggles */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-100 mb-8 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-800 text-sm">Verified Users Only</h3>
            <p className="text-xs text-stone-500 mt-1">Hide unverified profiles from feed</p>
          </div>
          <button 
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${verifiedOnly ? 'bg-emerald-500' : 'bg-stone-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${verifiedOnly ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-800 text-sm">Trusted History Only</h3>
            <p className="text-xs text-stone-500 mt-1">Min. 5 completed transactions</p>
          </div>
          <button 
            onClick={() => setMinTransactions(!minTransactions)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${minTransactions ? 'bg-emerald-500' : 'bg-stone-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${minTransactions ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Reputation Summary */}
      <div className="mb-8">
        <h3 className="font-bold text-stone-800 px-1 mb-3">Your Trust Profile</h3>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-2xl border-4 border-emerald-50">
            98
          </div>
          <div>
            <h4 className="font-bold text-stone-900">Excellent Standing</h4>
            <p className="text-xs text-stone-500 mb-2">Based on 12 successful loans</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold border border-emerald-100 uppercase">
                Verified ID
              </span>
              <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded-lg text-[10px] font-bold border border-sky-100 uppercase">
                Top Lender
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warnings & Flags */}
      <div>
        <h3 className="font-bold text-stone-800 px-1 mb-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" /> Recent Warnings
        </h3>
        <div className="space-y-3">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 items-start">
            <XCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Suspicious Activity: @user123</h4>
              <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                This user has been flagged for requesting multiple loans simultaneously. Exercise caution.
              </p>
            </div>
          </div>
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 flex gap-3 items-start opacity-75">
            <Info className="text-stone-500 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-stone-700 text-sm">Platform Maintenance</h4>
              <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                Identity verification services will be down for 30 mins tonight at 2 AM EST.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
