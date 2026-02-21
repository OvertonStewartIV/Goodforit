import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, ArrowDownLeft, Calendar, FileText, CheckCircle2, User, ChevronRight, X, Lock, ShieldCheck, Wallet, RefreshCcw, DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from "sonner";
import { TierLimitCard, TIERS, TierLevel } from '../components/TierSystem';

export default function Draft() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'vouch' | 'request'>('request');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [interest, setInterest] = useState('0');
  const [date, setDate] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [collateralType, setCollateralType] = useState<string>('none');
  const [stipulations, setStipulations] = useState<string[]>([]);
  const [newStipulation, setNewStipulation] = useState('');

  // Mock Users
  const USERS = [
    { id: '1', name: 'Keisha J.', avatar: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=100&h=100&fit=crop', trust: 98, tier: 3 },
    { id: '2', name: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', trust: 94, tier: 2 },
    { id: '3', name: 'Wei C.', avatar: 'https://images.unsplash.com/photo-1633177188754-980c2a6b6266?w=100&h=100&fit=crop', trust: 89, tier: 1 },
  ];

  // Calculate Repayment
  const principal = Number(amount) || 0;
  const interestRate = Number(interest) || 0;
  const repaymentAmount = principal + (principal * (interestRate / 100));

  const handleNext = () => {
    if (step === 1) {
      if (!amount || !selectedUser || !date) {
        toast.error("Please fill in all basic terms");
        return;
      }
      if (Number(amount) > TIERS[2].limit) { // Assuming current user is Tier 2 for demo
        toast.error("Amount exceeds your tier limit");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSend = () => {
    toast.success("Smart Contract Created & Sent!");
    navigate('/app/home');
  };

  const addStipulation = () => {
    if (newStipulation.trim()) {
      setStipulations([...stipulations, newStipulation.trim()]);
      setNewStipulation('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center justify-between mb-6">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          {step > 1 ? <ArrowDownLeft className="rotate-90" size={20} /> : <X size={20} />}
        </button>
        <h1 className="text-xl font-bold">
          {step === 3 ? 'Review Contract' : 'New Smart Contract'}
        </h1>
        <div className="w-10 text-right text-sm font-bold text-neutral-500">{step}/3</div>
      </header>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-lime-400' : 'bg-neutral-800'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 max-w-md mx-auto"
          >
            {/* Type Toggle */}
            <div className="flex bg-neutral-900 p-1 rounded-2xl border border-neutral-800">
              <button 
                onClick={() => setType('request')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  type === 'request' 
                    ? 'bg-lime-400 text-black shadow-lg' 
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                <ArrowDownLeft size={16} strokeWidth={2.5} /> Request
              </button>
              <button 
                onClick={() => setType('vouch')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  type === 'vouch' 
                    ? 'bg-lime-400 text-black shadow-lg' 
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                <ArrowUpRight size={16} strokeWidth={2.5} /> Vouch
              </button>
            </div>

            {/* Tier Limit Card */}
            <TierLimitCard currentLevel={2} amount={Number(amount)} />

            {/* User Selector */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">
                {type === 'request' ? 'Requesting From' : 'Vouching For'}
              </label>
              <button 
                onClick={() => setShowUserSelect(!showUserSelect)}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  selectedUser ? 'bg-neutral-900 border-lime-400' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {selectedUser ? (
                  <div className="flex items-center gap-3">
                    <img 
                      src={USERS.find(u => u.id === selectedUser)?.avatar} 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover border border-neutral-700" 
                    />
                    <div className="text-left">
                      <p className="font-bold text-white">{USERS.find(u => u.id === selectedUser)?.name}</p>
                      <div className="flex items-center gap-2 text-xs text-lime-400 font-bold">
                        <ShieldCheck size={12} />
                        <span>Tier {USERS.find(u => u.id === selectedUser)?.tier}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <span className="font-medium">Select a friend...</span>
                  </div>
                )}
                <ChevronRight size={20} className="text-neutral-500" />
              </button>
              
              <AnimatePresence>
                {showUserSelect && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2 space-y-2 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-2 z-10 relative"
                  >
                    {USERS.map(user => (
                      <button
                        key={user.id}
                        onClick={() => { setSelectedUser(user.id); setShowUserSelect(false); }}
                        className="w-full flex items-center gap-3 p-2 hover:bg-neutral-800 rounded-xl transition-colors"
                      >
                        <img src={user.avatar} className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-bold text-white flex-1 text-left">{user.name}</span>
                        <div className="text-xs text-neutral-500 flex items-center gap-1">
                           <ShieldCheck size={12} /> Tier {user.tier}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">Amount ({currency})</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 pl-8 text-2xl font-bold text-white placeholder-neutral-700 focus:outline-none focus:border-lime-400 transition-colors"
                />
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-800 text-white text-xs font-bold py-1 px-2 rounded-lg border-none focus:ring-0"
                >
                  <option value="USD">USD</option>
                  <option value="USDC">USDC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
            </div>

            {/* Terms Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">Interest Rate</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 pr-8 text-lg font-bold text-white focus:outline-none focus:border-lime-400 transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">%</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">Repayment Due</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 max-w-md mx-auto"
          >
            {/* Collateral Selection */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase mb-4 block">Select Collateral</label>
              <div className="grid gap-3">
                {[
                  { id: 'none', label: 'No Collateral', icon: Lock, desc: 'Trust-based only' },
                  { id: 'cash', label: 'Cash Balance', icon: DollarSign, desc: 'Lock funds ($240.00 avail)' },
                  { id: 'crypto', label: 'Crypto Assets', icon: Wallet, desc: 'ETH/BTC (Connect Wallet)' },
                  { id: 'community', label: 'Community Pledge', icon: ShieldCheck, desc: 'Vouches from Tier 3 users' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCollateralType(item.id)}
                    className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all text-left ${
                      collateralType === item.id 
                        ? 'bg-lime-400/10 border-lime-400 text-lime-400' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      collateralType === item.id ? 'bg-lime-400 text-black' : 'bg-neutral-800 text-white'
                    }`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${collateralType === item.id ? 'text-white' : 'text-white'}`}>{item.label}</h4>
                      <p className="text-xs opacity-70">{item.desc}</p>
                    </div>
                    {collateralType === item.id && <CheckCircle2 className="ml-auto" size={20} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Stipulations */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase mb-4 block">Custom Stipulations</label>
              <div className="space-y-3">
                {stipulations.map((stip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-sm text-white">• {stip}</span>
                    <button 
                      onClick={() => setStipulations(stipulations.filter((_, i) => i !== index))}
                      className="text-neutral-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newStipulation}
                    onChange={(e) => setNewStipulation(e.target.value)}
                    placeholder="e.g. Grace period of 7 days..."
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-lime-400 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && addStipulation()}
                  />
                  <button 
                    onClick={addStipulation}
                    className="bg-neutral-800 text-white px-4 rounded-xl font-bold hover:bg-neutral-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                   {["Grace Period (7 days)", "Early Payoff Allowed", "Mediation Required"].map(tag => (
                     <button 
                       key={tag} 
                       onClick={() => !stipulations.includes(tag) && setStipulations([...stipulations, tag])}
                       className="text-xs bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1 whitespace-nowrap hover:border-lime-400 transition-colors"
                     >
                       + {tag}
                     </button>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 max-w-md mx-auto"
          >
             <div className="bg-[#111] rounded-3xl border border-neutral-800 p-6 relative overflow-hidden">
               {/* Decorative Receipt Edge */}
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400" />
               
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <div className="flex items-center gap-2 mb-1 text-lime-400">
                     <FileText size={18} />
                     <span className="text-xs font-bold uppercase tracking-wider">Smart Contract Draft</span>
                   </div>
                   <h2 className="text-2xl font-bold text-white">${repaymentAmount.toFixed(2)} {currency}</h2>
                   <p className="text-xs text-neutral-500">Total Repayment Amount</p>
                 </div>
                 <div className="text-right">
                   <div className="bg-neutral-900 rounded-lg px-2 py-1 inline-block border border-neutral-800">
                     <span className="text-xs font-mono text-lime-400">#DRAFT</span>
                   </div>
                 </div>
               </div>
  
               <div className="space-y-4 text-sm text-neutral-300 border-t border-dashed border-neutral-800 pt-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase">Principal</p>
                      <p className="text-white font-bold">${principal.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase">Interest</p>
                      <p className="text-lime-400 font-bold">{interest}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase">Lender</p>
                      <div className="flex items-center gap-1">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-4 h-4 rounded-full" />
                        <span className="text-white font-bold">You (Tier 2)</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase">Borrower</p>
                      <div className="flex items-center gap-1">
                         {selectedUser ? (
                           <>
                             <img src={USERS.find(u => u.id === selectedUser)?.avatar} className="w-4 h-4 rounded-full" />
                             <span className="text-white font-bold">{USERS.find(u => u.id === selectedUser)?.name}</span>
                           </>
                         ) : <span className="text-white">Pending...</span>}
                      </div>
                    </div>
                 </div>

                 {stipulations.length > 0 && (
                   <div className="pt-2">
                     <p className="text-xs text-neutral-500 uppercase mb-1">Stipulations</p>
                     <ul className="list-disc list-inside space-y-1">
                       {stipulations.map((s, i) => (
                         <li key={i} className="text-xs text-white">{s}</li>
                       ))}
                     </ul>
                   </div>
                 )}

                 <div className="bg-neutral-900 rounded-xl p-3 flex items-center gap-3 border border-neutral-800 mt-2">
                   <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-lime-400">
                     {collateralType === 'none' ? <Lock size={16} /> : <Wallet size={16} />}
                   </div>
                   <div>
                     <p className="text-xs font-bold text-white uppercase">Collateral: {collateralType}</p>
                     <p className="text-[10px] text-neutral-500">
                       {collateralType === 'none' ? 'Reputation at stake' : 'Assets locked in contract'}
                     </p>
                   </div>
                 </div>

                 <div className="flex items-center gap-2 py-3 border-t border-neutral-800 text-lime-400 text-xs font-bold justify-center">
                   <CheckCircle2 size={14} />
                   <span>Verified by Community Trust Protocol</span>
                 </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent">
        <button 
          onClick={step === 3 ? handleSend : handleNext}
          className="w-full mb-20 bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 flex items-center justify-center gap-2"
        >
          {step === 3 ? (
            <>Send Smart Contract <ArrowUpRight size={20} strokeWidth={2.5} /></>
          ) : (
            <>Next Step <ChevronRight size={20} strokeWidth={2.5} /></>
          )}
        </button>
      </div>
    </div>
  );
}
