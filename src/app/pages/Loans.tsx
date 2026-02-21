import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Users, Info, ArrowRight, Calculator, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';

const LoanCalculator = () => {
  const [amount, setAmount] = useState(500);
  const [months, setMonths] = useState(6);
  const interestRate = 0.05; // 5% fixed for demo

  const totalRepayment = amount * (1 + interestRate);
  const monthlyPayment = totalRepayment / months;

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-[2rem] shadow-xl mb-8 border border-neutral-800">
      <div className="flex items-center gap-2 mb-6 text-lime-400">
         <Calculator size={20} />
         <h2 className="font-bold tracking-wide text-sm uppercase">Quick Loan Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-neutral-400">I need</span>
            <span className="text-xl text-white">${amount}</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="2000" 
            step="50" 
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full accent-lime-400 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-neutral-400">Repay over</span>
            <span className="text-xl text-white">{months} months</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="24" 
            step="1" 
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
            className="w-full accent-lime-400 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
          <div>
            <p className="text-xs text-neutral-500 mb-1">Monthly Payment</p>
            <p className="text-2xl font-bold text-white">${monthlyPayment.toFixed(0)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500 mb-1">Total Repayment (5% fee)</p>
            <p className="text-xl font-bold text-lime-400">${totalRepayment.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoanOffer = ({ id, amount, terms, provider, interest, avatar, popular = false }: { id: string, amount: string, terms: string, provider: string, interest: string, avatar: string, popular?: boolean }) => {
  const navigate = useNavigate();
  
  const handleDetails = () => {
    navigate(`/app/loans/${id}`, { 
      state: { 
        id, amount, terms, provider, interest, avatar, popular 
      } 
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={handleDetails}
      className={`p-5 rounded-[2rem] border mb-3 relative overflow-hidden cursor-pointer group transition-all ${popular ? 'bg-lime-400 text-black border-lime-400' : 'bg-neutral-900 text-white border-neutral-800 hover:border-lime-400/50'}`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
          POPULAR
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3 items-center">
          <img src={avatar} alt={provider} className={`w-12 h-12 rounded-full object-cover border-2 ${popular ? 'border-black/20' : 'border-white/20'}`} />
          <div>
            <h3 className="text-2xl font-bold leading-none mb-1">{amount}</h3>
            <p className={`text-xs ${popular ? 'text-black/70' : 'text-neutral-400'}`}>{provider}</p>
          </div>
        </div>
        <div className={`text-right ${popular ? 'text-black' : 'text-lime-400'}`}>
          <span className="text-lg font-bold">{interest}</span>
          <p className="text-[10px] opacity-70">APR</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pl-14">
        <span className={`text-xs px-2 py-1 rounded-md font-bold ${popular ? 'bg-black/10 text-black' : 'bg-neutral-800 text-neutral-400'}`}>
          {terms} repayment
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleDetails();
          }}
          className={`p-2 rounded-full transition-transform group-hover:translate-x-1 ${popular ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default function Loans() {
  const [user, setUser] = React.useState({
    name: 'Alex',
    trustScore: 94, // Matches Dashboard
    level: 'Trust Keeper',
    country: 'NG'
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(prev => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  const percentage = user.trustScore;

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 max-w-md mx-auto space-y-8 font-sans">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Get Funds</h1>
        <p className="text-neutral-400 text-sm">Your {user.trustScore}% Trust Score unlocks these rates.</p>
      </header>

      {/* Trust Score Gauge */}
      <div className="bg-neutral-900 p-6 rounded-[2.5rem] shadow-sm border border-neutral-800 relative overflow-hidden text-center mb-6">
        <div className="absolute top-6 right-6 text-neutral-500">
          <Info size={20} />
        </div>
        
        <h2 className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-8">Trust Score</h2>
        
        <div className="relative w-48 h-24 mx-auto mb-4 overflow-hidden">
          <div className="w-full h-48 rounded-full border-[16px] border-neutral-800 border-b-0 absolute top-0 left-0" />
          <motion.div 
            initial={{ rotate: -180 }}
            animate={{ rotate: -180 + (180 * percentage / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full rounded-t-full border-[16px] border-lime-400 border-b-0 absolute top-0 left-0 origin-bottom"
            style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }} 
          />
        </div>
        
        <div className="-mt-10 mb-6">
          <span className="text-6xl font-bold text-white block tracking-tight">{user.trustScore}%</span>
          <span className="text-lime-400 text-sm font-bold uppercase tracking-wide">Excellent</span>
        </div>
        
        <div className="flex justify-center gap-4 text-xs text-neutral-400 border-t border-neutral-800 pt-6">
          <div className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-white" /> Vouched
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-lime-400" /> Top 5%
          </div>
        </div>
      </div>

      <LoanCalculator />

      {/* Offers */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Available Peer Micro-Loans</h2>
          <button className="text-lime-400 text-sm font-medium">See All</button>
        </div>
        
        <LoanOffer 
          id="fund-a"
          amount="$500" 
          provider="Community Fund A" 
          interest="0%" 
          terms="3 months" 
          avatar="https://images.unsplash.com/photo-1707844915582-e3ccbf2ef2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
          popular 
        />
        <LoanOffer 
          id="elena-r"
          amount="$1,200" 
          provider="Elena R. (Neighbor)" 
          interest="2.5%" 
          terms="12 months" 
          avatar="https://images.unsplash.com/photo-1541802802036-1d572ba70147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
        />
        <LoanOffer 
          id="marcus-t"
          amount="$250" 
          provider="Marcus T. (Verified Peer)" 
          interest="0%" 
          terms="1 month" 
          avatar="https://images.unsplash.com/photo-1748640857973-93524ef0fe7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
        />
      </div>

      {/* Lending Groups */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Your Lending Circles</h2>
        </div>
        
        <div className="bg-neutral-900 rounded-[2rem] p-5 text-white shadow-lg border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-900/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-bold text-lg">Highland Park Mutual Aid</h3>
            <Users className="text-neutral-500" />
          </div>
          <p className="text-neutral-400 text-sm mb-5 relative z-10">Next contribution due in 5 days.</p>
          <div className="flex -space-x-3 relative z-10">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-neutral-800 border-4 border-neutral-900 flex items-center justify-center text-xs font-bold text-neutral-300">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-lime-400 text-black border-4 border-neutral-900 flex items-center justify-center text-xs font-bold">
              +4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
