import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Users, ShieldCheck, ArrowUpRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';

const IncomeItem = ({ name, amount, date, type }: { name: string, amount: string, date: string, type: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400">
        <ArrowUpRight size={20} />
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{name}</h4>
        <p className="text-xs text-neutral-500">{type} • {date}</p>
      </div>
    </div>
    <span className="font-bold text-lime-400">+{amount}</span>
  </div>
);

export default function TrustIncome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Trust Income</h1>
      </header>

      {/* Main Stats */}
      <div className="mb-8">
        <span className="text-neutral-500 text-sm font-medium mb-1 block">Total Vouched Value</span>
        <h1 className="text-5xl font-bold tracking-tighter text-white mb-6">
          $96,450<span className="text-xl text-neutral-500">.00</span>
        </h1>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-900 p-4 rounded-[1.5rem] border border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center mb-3">
              <TrendingUp size={16} />
            </div>
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Growth</p>
            <p className="text-xl font-bold text-white">+12.5%</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-[1.5rem] border border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-blue-400/20 text-blue-400 flex items-center justify-center mb-3">
              <Users size={16} />
            </div>
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Vouchers</p>
            <p className="text-xl font-bold text-white">42 Peers</p>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-neutral-900 rounded-[2rem] p-6 mb-8 border border-neutral-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">Income Analysis</h3>
          <select className="bg-black text-xs text-neutral-400 border border-neutral-800 rounded-lg px-2 py-1 outline-none">
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
        
        {/* Simple Bar Chart Visualization */}
        <div className="flex items-end justify-between h-32 gap-2">
          {[40, 65, 45, 80, 55, 90].map((h, i) => (
            <div key={i} className="w-full bg-neutral-800 rounded-t-lg relative group">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-full absolute bottom-0 bg-lime-400 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-neutral-500 font-medium">
          <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
        </div>
      </div>

      {/* Recent Income List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white text-lg">Recent Vouches</h3>
          <button className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400">
            <Filter size={14} />
          </button>
        </div>
        
        <div className="bg-neutral-900 rounded-[2rem] p-4 border border-neutral-800">
          <IncomeItem 
            name="Sarah Jenkins" 
            amount="$5,000" 
            date="Feb 18, 2026" 
            type="Community Vouch" 
          />
          <IncomeItem 
            name="Highland DAO" 
            amount="$2,500" 
            date="Feb 15, 2026" 
            type="Liquidity Pool" 
          />
          <IncomeItem 
            name="Marcus Thorne" 
            amount="$1,200" 
            date="Feb 10, 2026" 
            type="Direct Vouch" 
          />
          <IncomeItem 
            name="Trust Reward" 
            amount="$500" 
            date="Feb 01, 2026" 
            type="System Bonus" 
          />
        </div>
      </div>
    </div>
  );
}
