import React from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock, ChevronRight, Zap, Star, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TIERS, TierLevel } from '../components/TierSystem';

// Mock Data
const USER_STATS = {
  currentTier: 2 as TierLevel,
  settledTransactions: 12,
  averageRating: 4.6,
  totalReviews: 8,
  onTimePayment: 100, // percentage
};

const REVIEWS = [
  { id: 1, user: "Sarah J.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop", rating: 5, comment: "Paid back 2 days early! Super reliable.", date: "2 days ago" },
  { id: 2, user: "Mike T.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&fit=crop", rating: 4, comment: "Smooth transaction, good communication.", date: "1 week ago" },
  { id: 3, user: "Elena R.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&fit=crop", rating: 5, comment: "Trusted community member for sure.", date: "2 weeks ago" },
  { id: 4, user: "David K.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop", rating: 5, comment: "Always a pleasure doing business.", date: "3 weeks ago" },
  { id: 5, user: "Jessica W.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&fit=crop", rating: 4, comment: "Great borrower, very transparent.", date: "1 month ago" },
  { id: 6, user: "Tom H.", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&fit=crop", rating: 5, comment: "Fast repayment, no issues.", date: "2 months ago" },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          size={14} 
          className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-700'}`} 
        />
      ))}
    </div>
  );
};

export default function TierStatus() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Community Standing</h1>
        <div className="w-10" />
      </header>

      {/* Current Status Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-neutral-900 border-2 border-lime-400 mx-auto flex items-center justify-center mb-4 relative shadow-[0_0_30px_rgba(163,230,53,0.2)]">
          <ShieldCheck size={48} className="text-lime-400" />
          <div className="absolute -bottom-2 px-3 py-1 bg-lime-400 text-black text-xs font-bold rounded-full border border-black uppercase tracking-wider">
            Tier {USER_STATS.currentTier}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Trusted Member</h2>
        <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm">
          <StarRating rating={Math.round(USER_STATS.averageRating)} />
          <span className="font-bold text-white">{USER_STATS.averageRating}</span>
          <span>({USER_STATS.totalReviews} reviews)</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800 text-center">
          <p className="text-xs text-neutral-500 uppercase font-bold mb-1">Settled Deals</p>
          <p className="text-2xl font-bold text-white">{USER_STATS.settledTransactions}</p>
        </div>
        <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800 text-center">
          <p className="text-xs text-neutral-500 uppercase font-bold mb-1">On-Time Rate</p>
          <p className="text-2xl font-bold text-lime-400">{USER_STATS.onTimePayment}%</p>
        </div>
      </div>

      {/* All Tiers Roadmap */}
      <div className="mb-10">
        <h3 className="font-bold text-lg text-white mb-4">Tier Roadmap</h3>
        <div className="space-y-4 relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-neutral-800 -z-10" />
            
            {Object.values(TIERS).map((tier) => {
                const isUnlocked = tier.level <= USER_STATS.currentTier;
                const isNext = tier.level === USER_STATS.currentTier + 1;
                const isLocked = tier.level > USER_STATS.currentTier + 1;

                return (
                    <div key={tier.level} className={`relative pl-12 transition-all duration-300`}>
                        {/* Status Icon */}
                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-black ${
                            isUnlocked 
                            ? 'border-lime-400 text-lime-400' 
                            : isNext 
                                ? 'border-yellow-400 text-yellow-400 animate-pulse' 
                                : 'border-neutral-800 text-neutral-600'
                        }`}>
                            {isUnlocked ? <CheckCircle2 size={16} /> : isNext ? <Zap size={16} className="fill-yellow-400" /> : <Lock size={14} />}
                        </div>

                        <div className={`p-4 rounded-2xl border ${
                            tier.level === USER_STATS.currentTier 
                            ? 'bg-lime-900/10 border-lime-500/50 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                            : 'bg-neutral-900 border-neutral-800'
                        } ${isLocked ? 'opacity-50 blur-[1px] hover:blur-0 hover:opacity-100' : 'opacity-100'} transition-all`}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className={`font-bold text-base ${tier.color} flex items-center gap-2`}>
                                        {tier.name}
                                        {tier.level === USER_STATS.currentTier && <span className="text-[10px] bg-lime-400 text-black px-1.5 py-0.5 rounded font-bold uppercase">Current</span>}
                                    </h4>
                                    <p className="text-xs text-neutral-400">Tier {tier.level}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-white">${tier.limit.toLocaleString()}</span>
                                    <span className="text-[10px] text-neutral-500 uppercase">Limit</span>
                                </div>
                            </div>

                            {/* Requirements List */}
                            <div className="space-y-2 mt-3 pt-3 border-t border-white/5">
                                {tier.requirements.map((req, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? 'bg-lime-400' : 'bg-neutral-700'}`} />
                                        <span className={isUnlocked ? 'text-neutral-400' : ''}>{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* All Reviews Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-white">All Feedback ({REVIEWS.length})</h3>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
             <Star size={12} className="text-yellow-400 fill-yellow-400" />
             <span className="text-white font-bold">4.6</span> Average
          </div>
        </div>
        
        <div className="space-y-3">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full object-cover border border-neutral-700" />
                  <div>
                    <p className="text-sm font-bold text-white">{review.user}</p>
                    <p className="text-[10px] text-neutral-500">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-sm text-neutral-300 pl-11 italic">"{review.comment}"</p>
            </div>
          ))}
          <button className="w-full py-3 text-xs font-bold text-neutral-500 hover:text-white transition-colors border-t border-neutral-800 mt-2">
              Show more reviews
          </button>
        </div>
      </div>
    </div>
  );
}
