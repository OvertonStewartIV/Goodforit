import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Share2, Award, QrCode, CreditCard, ChevronRight, Copy, Users, Star, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';

const Badge = ({ icon: Icon, bgClass, textClass, label, glow = false }: { icon: any, bgClass: string, textClass: string, label: string, glow?: boolean }) => (
  <div className="flex flex-col items-center gap-2 min-w-[84px] group cursor-pointer">
    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-1 border-2 border-white/10 transition-all group-hover:scale-110 relative ${bgClass} ${glow ? 'shadow-[0_0_20px_rgba(163,230,53,0.3)]' : ''}`}>
      <Icon className={`w-8 h-8 ${textClass}`} strokeWidth={1.5} />
    </div>
    <span className="text-[10px] font-bold text-neutral-400 text-center w-20 leading-tight uppercase tracking-wide group-hover:text-white transition-colors">{label}</span>
  </div>
);

const HistoryItem = ({ title, date, amount, type }: { title: string, date: string, amount: string, type: 'credit' | 'debit' }) => (
  <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition-colors px-2 -mx-2 rounded-xl">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${type === 'credit' ? 'bg-lime-900/20 text-lime-400' : 'bg-red-900/20 text-red-400'}`}>
        {type === 'credit' ? <Award size={18} /> : <CreditCard size={18} />}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-neutral-500">{date}</p>
      </div>
    </div>
    <span className={`font-bold ${type === 'credit' ? 'text-lime-400' : 'text-white'}`}>
      {type === 'credit' ? '+' : '-'}{amount}
    </span>
  </div>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: 'Alex',
    trustScore: 94,
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

  return (
    <div className="bg-black min-h-screen pb-32 font-sans selection:bg-lime-400 selection:text-black">
      {/* Header / Cover */}
      <div className="h-48 bg-gradient-to-b from-neutral-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-900 via-transparent to-transparent" />
        <div className="absolute top-6 right-6 flex gap-4 text-white/80">
          <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => navigate('/app/settings')}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-20 max-w-md mx-auto relative z-10">
        {/* Profile Card */}
        <div className="bg-neutral-900 rounded-[2.5rem] p-6 shadow-2xl mb-8 text-center relative border border-neutral-800">
          <div className="w-28 h-28 rounded-full p-1 bg-neutral-900 mx-auto -mt-20 mb-4 relative">
             <div className="w-full h-full rounded-full overflow-hidden border-4 border-neutral-800">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
             </div>
             <div className="absolute bottom-1 right-1 w-7 h-7 bg-lime-400 border-4 border-neutral-900 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
            {user.name} 
            <Shield size={16} className="text-lime-400 fill-lime-400/20" />
          </h1>
          <p className="text-neutral-500 text-sm mb-6 font-medium">Community Builder • Member since 2023</p>
          
          <div className="flex justify-center gap-3 mb-8">
            <span className="bg-lime-400 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)] border border-lime-300">
              {user.trustScore}% Trust Score
            </span>
            <span className="bg-neutral-800 text-white px-4 py-1.5 rounded-full text-xs font-bold border border-neutral-700 flex items-center gap-2">
              <Zap size={12} className="text-yellow-400 fill-yellow-400" />
              Top Contributor
            </span>
          </div>

          {/* Wallet / QR */}
          <div className="bg-black rounded-2xl p-4 border border-neutral-800 flex items-center justify-between gap-4 group cursor-pointer hover:border-lime-400/30 transition-colors">
            <div className="text-left">
              <p className="text-[10px] text-neutral-500 font-bold mb-1 uppercase tracking-wider">Wallet Address</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-bold text-lime-400 font-mono tracking-wide group-hover:text-lime-300 transition-colors">
                  0x71C...92F
                </code>
                <Copy size={14} className="text-neutral-500 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl group-hover:scale-105 transition-transform">
              <QrCode size={24} className="text-black" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Impact Badges</h2>
            <ChevronRight className="text-neutral-600" size={20} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2">
            <Badge icon={Star} bgClass="bg-yellow-400/20" textClass="text-yellow-400" label="Early Adopter" glow />
            <Badge icon={Users} bgClass="bg-lime-400/20" textClass="text-lime-400" label="Community Pillar" glow />
            <Badge icon={Shield} bgClass="bg-cyan-400/20" textClass="text-cyan-400" label="Trusted Lender" />
            <Badge icon={Share2} bgClass="bg-purple-400/20" textClass="text-purple-400" label="Top Sharer" />
            <Badge icon={Zap} bgClass="bg-orange-400/20" textClass="text-orange-400" label="Fast Funder" />
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Statement History</h2>
          <div className="bg-neutral-900 rounded-[2rem] p-6 border border-neutral-800">
            <HistoryItem 
              title="Community Garden Help" 
              date="Today, 2:30 PM" 
              amount="350 CR" 
              type="credit" 
            />
            <HistoryItem 
              title="Tutoring Session" 
              date="Yesterday, 4:00 PM" 
              amount="200 CR" 
              type="credit" 
            />
            <HistoryItem 
              title="Micro-Loan Repayment" 
              date="Feb 18, 2026" 
              amount="150 CR" 
              type="debit" 
            />
             <HistoryItem 
              title="Grocery Delivery" 
              date="Feb 15, 2026" 
              amount="120 CR" 
              type="credit" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
