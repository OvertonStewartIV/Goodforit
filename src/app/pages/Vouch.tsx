import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, User, DollarSign, Calendar, Percent, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Vouch() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('0');
  const [duration, setDuration] = useState('1');
  const [recipient, setRecipient] = useState<string | null>(null);

  const RECIPIENTS = [
    { name: "Sarah J.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", score: 98 },
    { name: "David C.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", score: 85 },
    { name: "Maria G.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", score: 92 },
  ];

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
        <h1 className="text-xl font-bold">Vouch & Lend</h1>
      </header>

      {/* Step 1: Select Recipient */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Who are you vouching for?</h2>
            <p className="text-neutral-400 text-sm">Select a friend or community member.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, @handle, or phone"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-lime-400 placeholder:text-neutral-600"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-500 uppercase">Recent</h3>
            {RECIPIENTS.map((user, i) => (
              <button 
                key={i}
                onClick={() => { setRecipient(user.name); setStep(2); }}
                className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between hover:border-lime-400/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="text-left">
                    <p className="font-bold text-lg">{user.name}</p>
                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                      <ShieldCheck size={12} className="text-lime-400" />
                      <span>{user.score}% Trust Score</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-neutral-700 flex items-center justify-center group-hover:bg-lime-400 group-hover:border-lime-400 group-hover:text-black transition-colors">
                  <CheckCircle2 size={16} className="opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Amount & Terms */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
             <h2 className="text-2xl font-bold mb-1">Set Terms for <span className="text-lime-400">{recipient}</span></h2>
             <p className="text-neutral-400 text-sm">Define the loan contract details.</p>
          </div>

          {/* Amount */}
          <div className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800 text-center">
            <label className="text-neutral-500 text-xs font-bold uppercase mb-2 block">Amount to Lend</label>
            <div className="flex items-center justify-center gap-1 text-5xl font-bold text-white mb-2">
              <span className="text-neutral-600">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="bg-transparent w-32 text-center focus:outline-none placeholder:text-neutral-700"
              />
            </div>
            <p className="text-xs text-neutral-500">Available Balance: $4,250.00</p>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 mb-2 text-lime-400">
                <Percent size={18} />
                <span className="text-xs font-bold uppercase">Interest</span>
              </div>
              <input 
                type="number" 
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="bg-transparent text-2xl font-bold text-white w-full focus:outline-none"
              />
              <span className="text-xs text-neutral-500">% APR</span>
            </div>

            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase">Duration</span>
              </div>
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-transparent text-2xl font-bold text-white w-full focus:outline-none"
              />
              <span className="text-xs text-neutral-500">Months</span>
            </div>
          </div>

          {/* Stipulations */}
          <div>
            <label className="text-neutral-500 text-xs font-bold uppercase mb-2 block">Stipulations (Optional)</label>
            <textarea 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-lime-400 placeholder:text-neutral-600"
              placeholder="e.g. Must provide weekly updates on business progress..."
              rows={3}
            />
          </div>

          {/* Summary */}
          {amount && (
            <div className="bg-lime-400/10 border border-lime-400/20 p-4 rounded-xl">
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-neutral-400">Total Repayment</span>
                 <span className="font-bold text-lime-400">
                   ${(parseFloat(amount || '0') * (1 + (parseFloat(interest || '0')/100))).toFixed(2)}
                 </span>
               </div>
               <p className="text-[10px] text-neutral-500 text-right">
                 Includes {interest}% interest over {duration} months
               </p>
            </div>
          )}

          <button className="w-full bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] mt-4 active:scale-95">
            Send Vouch Offer
          </button>
        </motion.div>
      )}
    </div>
  );
}
