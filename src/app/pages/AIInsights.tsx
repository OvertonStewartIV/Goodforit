import React, { useState } from 'react';
import { ArrowLeft, BrainCircuit, Lightbulb, PieChart, Info } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AIInsights() {
  const navigate = useNavigate();
  const [profileExpanded, setProfileExpanded] = useState(false);

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">AI Profiling & Insights</h1>
      </header>

      {/* Intro Card */}
      <div className="bg-indigo-600 rounded-3xl p-6 shadow-lg shadow-indigo-200 mb-8 relative overflow-hidden text-white">
        <div className="relative z-10">
          <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
            <BrainCircuit size={24} className="text-indigo-200" /> Smart Profiling
          </h2>
          <p className="text-indigo-100 text-sm leading-relaxed mb-4 opacity-90">
            Our AI analyzes patterns to predict fund usage and build trust profiles, helping you lend with confidence.
          </p>
          <div className="flex gap-2 text-xs font-mono opacity-75">
            <span>Accuracy: 94%</span> • <span>Privacy: High</span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Profiling Example */}
      <div className="mb-8">
        <h3 className="font-bold text-stone-800 px-1 mb-3">Live Analysis Example</h3>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-400">
              JD
            </div>
            <div>
              <h4 className="font-bold text-stone-900">John Doe's Request</h4>
              <p className="text-xs text-stone-500">$500 • "Materials"</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-stone-700">
              <span className="flex items-center gap-2"><PieChart size={14} className="text-sky-500" /> Business Investment</span>
              <span className="text-sky-600">85%</span>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full w-[85%] rounded-full" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">
              Based on purchase history of "lumber" and "tools", this loan is likely for construction/repair work.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 whitespace-nowrap">
              Low Risk
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100 whitespace-nowrap">
              Consistent Payer
            </span>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 whitespace-nowrap">
              Education Focus
            </span>
          </div>
        </div>
      </div>

      {/* Onboarding Questions */}
      <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200">
        <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-500" /> Improve Your Profile
        </h3>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Answer a few questions to help our AI match you with better opportunities beyond just your location.
        </p>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm transition-all hover:border-sky-300 cursor-pointer">
            <p className="font-bold text-stone-800 text-sm mb-2">What is your primary goal?</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">Business</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">Education</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">Emergency</span>
            </div>
          </div>
          
          <button className="w-full py-3 text-sky-600 text-sm font-bold hover:bg-sky-50 rounded-xl transition-colors">
            View All Questions
          </button>
        </div>
      </div>
    </div>
  );
}
