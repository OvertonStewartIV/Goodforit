import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, ArrowDownLeft, Calendar, FileText, CheckCircle2, User, ChevronRight, X 
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from "sonner";

export default function Draft() {
  const navigate = useNavigate();
  const [type, setType] = useState<'vouch' | 'request'>('request');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('0');
  const [date, setDate] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showUserSelect, setShowUserSelect] = useState(false);

  // Mock Users
  const USERS = [
    { id: '1', name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', trust: 98 },
    { id: '2', name: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', trust: 94 },
    { id: '3', name: 'David C.', avatar: 'https://images.unsplash.com/photo-1730597842283-943c7986ee2c?w=100&h=100&fit=crop', trust: 89 },
  ];

  // Calculate Repayment
  const principal = Number(amount) || 0;
  const interestRate = Number(interest) || 0;
  const repaymentAmount = principal + (principal * (interestRate / 100));

  const handleSend = () => {
    if (!amount || !selectedUser || !date) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success(type === 'request' ? "Request Sent!" : "Vouch Offer Sent!");
    navigate('/app/home');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <X size={20} />
        </button>
        <h1 className="text-xl font-bold">New Transaction</h1>
        <div className="w-10" />
      </header>

      {/* Type Toggle */}
      <div className="flex bg-neutral-900 p-1 rounded-2xl border border-neutral-800 mb-8">
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

      <div className="space-y-6 max-w-md mx-auto">
        
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
                  <p className="text-xs text-lime-400 font-bold">{USERS.find(u => u.id === selectedUser)?.trust} Trust Score</p>
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
                className="overflow-hidden mt-2 space-y-2 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-2"
              >
                {USERS.map(user => (
                  <button
                    key={user.id}
                    onClick={() => { setSelectedUser(user.id); setShowUserSelect(false); }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <img src={user.avatar} className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-bold text-white flex-1 text-left">{user.name}</span>
                    <span className="text-xs text-lime-400 font-bold">{user.trust} TS</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Amount Input */}
        <div>
          <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">$</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 pl-8 text-2xl font-bold text-white placeholder-neutral-700 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">Interest</label>
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
            <label className="text-xs font-bold text-neutral-500 uppercase mb-2 block">Repayment</label>
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

        {/* Contract Preview */}
        <div className="pt-4">
           <div className="bg-[#111] rounded-3xl border border-neutral-800 p-6 relative overflow-hidden">
             {/* Decorative Receipt Edge */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400" />
             
             <div className="flex items-center gap-2 mb-4 text-lime-400">
               <FileText size={18} />
               <span className="text-xs font-bold uppercase tracking-wider">Smart Contract Draft</span>
             </div>

             <div className="space-y-4 text-sm text-neutral-300">
               <p>
                 <strong className="text-white">{type === 'request' ? 'I, Alex,' : `I, ${USERS.find(u => u.id === selectedUser)?.name || 'Recipient'},`}</strong> promise to pay 
                 <strong className="text-white"> {type === 'request' ? (USERS.find(u => u.id === selectedUser)?.name || 'Lender') : 'Alex'}</strong> the sum of 
                 <strong className="text-white text-lg mx-1">${repaymentAmount.toFixed(2)}</strong> 
                 (Principal + {interest}% Interest).
               </p>
               <div className="flex items-center gap-2 py-3 border-y border-neutral-800">
                 <Calendar size={16} className="text-neutral-500" />
                 <span>Due Date: <span className="text-white font-bold">{date || 'Select a date'}</span></span>
               </div>
               <div className="flex items-center gap-2 text-xs text-neutral-500">
                 <CheckCircle2 size={14} className="text-lime-400" />
                 <span>Verified by Community Trust Protocol</span>
               </div>
             </div>
           </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSend}
          className="w-full bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 flex items-center justify-center gap-2"
        >
          {type === 'request' ? 'Send Request' : 'Send Vouch Offer'} <ArrowUpRight size={20} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}