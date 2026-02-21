import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, User, DollarSign, Calendar, Percent, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Request() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('5');
  const [duration, setDuration] = useState('3');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');

  const CATEGORIES = ["Business", "Education", "Emergency", "Dreams", "Travel"];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-lime-400 selection:text-black pb-24">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => step === 1 ? navigate(-1) : setStep(s => s - 1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Request Funds</h1>
      </header>

      {/* Step 1: Amount & Purpose */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">How much do you need?</h2>
            <p className="text-neutral-400 text-sm">Set your goal and tell your story.</p>
          </div>

          <div className="bg-neutral-900 p-8 rounded-[2rem] border border-neutral-800 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500 rounded-full blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <label className="text-neutral-500 text-xs font-bold uppercase mb-4 block">Amount Requested</label>
            <div className="flex items-center justify-center gap-1 text-6xl font-bold text-white mb-2">
              <span className="text-neutral-600 text-4xl align-top mt-2">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="bg-transparent w-48 text-center focus:outline-none placeholder:text-neutral-700"
              />
            </div>
          </div>

          <div>
             <label className="text-neutral-500 text-xs font-bold uppercase mb-2 block">What's this for?</label>
             <div className="grid grid-cols-3 gap-2 mb-4">
               {CATEGORIES.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setCategory(cat)}
                   className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                     category === cat 
                       ? 'bg-lime-400 text-black border-lime-400' 
                       : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
             
             <textarea 
               value={purpose}
               onChange={(e) => setPurpose(e.target.value)}
               className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-lime-400 placeholder:text-neutral-600 h-32"
               placeholder="Describe your need and how you plan to repay..."
             />
          </div>

          <button 
             onClick={() => setStep(2)}
             disabled={!amount || !category || !purpose}
             className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-4 ${
               amount && category && purpose
                 ? 'bg-lime-400 text-black hover:bg-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]'
                 : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
             }`}
           >
             Next: Set Terms
           </button>
        </motion.div>
      )}

      {/* Step 2: Terms */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
             <h2 className="text-2xl font-bold mb-1">Proposed Repayment</h2>
             <p className="text-neutral-400 text-sm">What terms are fair to you?</p>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 mb-3 text-lime-400">
                <Percent size={20} />
                <span className="text-xs font-bold uppercase">Interest (APR)</span>
              </div>
              <input 
                type="number" 
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="bg-transparent text-3xl font-bold text-white w-full focus:outline-none mb-1"
              />
              <span className="text-xs text-neutral-500">Proposed Rate</span>
            </div>

            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 mb-3 text-cyan-400">
                <Calendar size={20} />
                <span className="text-xs font-bold uppercase">Duration</span>
              </div>
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-transparent text-3xl font-bold text-white w-full focus:outline-none mb-1"
              />
              <span className="text-xs text-neutral-500">Months</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
              <span className="text-neutral-400 text-sm">Principal</span>
              <span className="text-white font-bold">${amount}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
              <span className="text-neutral-400 text-sm">Est. Interest</span>
              <span className="text-lime-400 font-bold">+${(parseFloat(amount || '0') * (parseFloat(interest || '0')/100)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-white font-bold text-lg">Total Repayment</span>
              <span className="text-white font-bold text-xl">
                ${(parseFloat(amount || '0') * (1 + (parseFloat(interest || '0')/100))).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-neutral-500 text-center pt-2">
              ≈ ${( (parseFloat(amount || '0') * (1 + (parseFloat(interest || '0')/100))) / parseFloat(duration || '1') ).toFixed(2)} / month
            </p>
          </div>

          <button className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-neutral-200 transition-all shadow-lg active:scale-95 mt-6 border-4 border-transparent hover:border-lime-400">
            Post Request to Board
          </button>
        </motion.div>
      )}
    </div>
  );
}
