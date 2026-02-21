import React from 'react';
import { motion } from 'motion/react';
import { 
  Share2, Award, ChevronRight, Users, 
  Star, Shield, Zap, ArrowLeft, ArrowUpRight, 
  ArrowDownLeft, MoreHorizontal, MessageSquare
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';

// Reusing badge component
const Badge = ({ icon: Icon, bgClass, textClass, label, glow = false }: { icon: any, bgClass: string, textClass: string, label: string, glow?: boolean }) => (
  <div className="flex flex-col items-center gap-2 min-w-[84px] group cursor-pointer">
    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-1 border-2 border-white/10 transition-all group-hover:scale-110 relative ${bgClass} ${glow ? 'shadow-[0_0_20px_rgba(163,230,53,0.3)]' : ''}`}>
      <Icon className={`w-8 h-8 ${textClass}`} strokeWidth={1.5} />
    </div>
    <span className="text-[10px] font-bold text-neutral-400 text-center w-20 leading-tight uppercase tracking-wide group-hover:text-white transition-colors">{label}</span>
  </div>
);

const TransactionItem = ({ title, date, amount, type }: { title: string, date: string, amount: string, type: 'credit' | 'debit' }) => (
  <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition-colors px-2 -mx-2 rounded-xl">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${type === 'credit' ? 'bg-lime-900/20 text-lime-400' : 'bg-red-900/20 text-red-400'}`}>
        {type === 'credit' ? <Award size={18} /> : <Zap size={18} />}
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

const ActionButton = ({ icon: Icon, label, variant = 'primary', onClick }: { icon: any, label: string, variant?: 'primary' | 'secondary', onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-transform active:scale-95 ${
      variant === 'primary' 
        ? 'bg-lime-400 text-black shadow-[0_4px_20px_rgba(163,230,53,0.3)]' 
        : 'bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700'
    }`}
  >
    <Icon size={20} />
    {label}
  </button>
);

export default function UserProfile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const location = useLocation();
  const avatarFromState = location.state?.avatar;

  // Mock data for the user being viewed
  const user = {
    name: username || 'Sarah Jenkins',
    handle: `@${(username || 'sarah').toLowerCase()}`,
    trustScore: 98,
    level: 'Trust Keeper',
    joined: 'May 2024',
    avatar: avatarFromState || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop'
  };

  return (
    <div className="bg-black min-h-screen pb-32 font-sans selection:bg-lime-400 selection:text-black">
      {/* Header / Cover */}
      <div className="h-48 bg-gradient-to-b from-neutral-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent" />
        
        {/* Navigation Header */}
        <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-20">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5 text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3 text-white/80">
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
              <Share2 size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-20 max-w-md mx-auto relative z-10">
        {/* Profile Card */}
        <div className="bg-neutral-900 rounded-[2.5rem] p-6 shadow-2xl mb-6 text-center relative border border-neutral-800">
          <div className="w-28 h-28 rounded-full p-1 bg-neutral-900 mx-auto -mt-20 mb-4 relative">
             <div className="w-full h-full rounded-full overflow-hidden border-4 border-neutral-800">
               <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
             </div>
             <div className="absolute bottom-1 right-1 w-7 h-7 bg-lime-400 border-4 border-neutral-900 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)] flex items-center justify-center">
                <Shield size={12} className="text-black" />
             </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-0 flex items-center justify-center gap-2">
            {user.name} 
          </h1>
          <p className="text-neutral-500 text-sm mb-6 font-medium">{user.handle} • Joined {user.joined}</p>
          
          <div className="flex justify-center gap-3 mb-8">
            <span className="bg-lime-400 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)] border border-lime-300">
              {user.trustScore}% Trust Score
            </span>
            <span className="bg-neutral-800 text-white px-4 py-1.5 rounded-full text-xs font-bold border border-neutral-700 flex items-center gap-2">
              <Shield size={12} className="text-blue-400 fill-blue-400" />
              {user.level}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
             <ActionButton 
               icon={ArrowUpRight} 
               label="Vouch" 
               variant="primary" 
               onClick={() => navigate('/app/vouch')} 
             />
             <ActionButton 
               icon={ArrowDownLeft} 
               label="Request" 
               variant="secondary" 
               onClick={() => navigate('/app/request')} 
             />
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Earned Badges</h2>
            <ChevronRight className="text-neutral-600" size={20} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
            <Badge icon={Star} bgClass="bg-yellow-400/20" textClass="text-yellow-400" label="Top Rated" glow />
            <Badge icon={Users} bgClass="bg-blue-400/20" textClass="text-blue-400" label="Connector" />
            <Badge icon={Zap} bgClass="bg-purple-400/20" textClass="text-purple-400" label="Speedy" />
            <Badge icon={MessageSquare} bgClass="bg-pink-400/20" textClass="text-pink-400" label="Responsive" />
          </div>
        </div>

        {/* Public Activity */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
          <div className="bg-neutral-900 rounded-[2rem] p-6 border border-neutral-800">
            <TransactionItem 
              title="Vouched for Alex" 
              date="2 hours ago" 
              amount="+5 Trust" 
              type="credit" 
            />
            <TransactionItem 
              title="Repaid Micro-Loan" 
              date="Yesterday" 
              amount="$50.00" 
              type="credit" 
            />
            <TransactionItem 
              title="Borrowed for Supplies" 
              date="Feb 18" 
              amount="$120.00" 
              type="debit" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
