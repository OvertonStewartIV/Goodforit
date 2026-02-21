import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Filter, Search, MoreHorizontal, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Matchmaking() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const users = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      amount: '$1,200',
      purpose: 'Education',
      trust: '98%',
      match: 'High',
      matchReason: 'Same funding purpose, similar repayment style',
      desc: 'Seeking tuition assistance for nursing degree.',
      risk: 'low',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop'
    },
    {
      id: 2,
      name: 'Michael Chen',
      amount: '0.5 BTC',
      purpose: 'Business',
      trust: '85%',
      match: 'Medium',
      matchReason: 'Matches your risk profile',
      desc: 'Expanding local bakery inventory.',
      risk: 'medium',
      avatar: 'https://images.unsplash.com/photo-1748640857973-93524ef0fe7d?w=200&fit=crop'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      amount: '$300',
      purpose: 'Emergency',
      trust: '92%',
      match: 'Good',
      matchReason: 'High community trust score',
      desc: 'Car repair needed for work commute.',
      risk: 'low',
      avatar: 'https://images.unsplash.com/photo-1610896011062-1df767af9f6a?w=200&fit=crop'
    },
    {
      id: 4,
      name: 'David Kim',
      amount: '2 ETH',
      purpose: 'Project',
      trust: '76%',
      match: 'Fair',
      matchReason: 'Active in similar communities',
      desc: 'Community garden funding.',
      risk: 'high',
      avatar: 'https://images.unsplash.com/photo-1730597842283-943c7986ee2c?w=200&fit=crop'
    },
  ];

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6 sticky top-0 bg-stone-50 z-20 py-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900 flex-1">Smart Matchmaking</h1>
        <button className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-200">
          <Search size={20} />
        </button>
      </header>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4 sticky top-14 bg-stone-50 z-10">
        {['All', 'High Match', 'Crypto', 'Cash', 'Low Risk'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filter === f 
                ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200' 
                : 'bg-white text-stone-600 border-stone-200 hover:border-sky-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 relative group transition-all hover:shadow-md hover:border-sky-200">
            {/* AI Match Insight */}
            {user.matchReason && (
              <div className="mb-4 bg-gradient-to-r from-emerald-50 to-sky-50 text-stone-700 px-3 py-2 rounded-xl text-xs border border-emerald-100 flex items-start gap-2">
                <div className="bg-white p-1 rounded-full shadow-sm text-emerald-600 mt-0.5">
                  <Sparkles size={12} fill="currentColor" />
                </div>
                <div>
                   <span className="font-bold block text-stone-900 mb-0.5">AI Match: {user.match} Fit</span>
                   <span className="text-stone-500 leading-tight block">{user.matchReason}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">{user.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    user.risk === 'low' ? 'text-emerald-600' : user.risk === 'medium' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {user.trust} Trust Score
                  </span>
                </div>
              </div>
              <button className="text-stone-300 hover:text-stone-600 p-1">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <p className="text-stone-600 text-xs mb-4 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">
              "{user.desc}"
            </p>

            <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-2">
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Amount</p>
                <p className="font-bold text-stone-900 text-lg">{user.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Purpose</p>
                <p className="font-bold text-sky-600 text-sm">{user.purpose}</p>
              </div>
            </div>

            <button className="w-full mt-4 py-3 bg-stone-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-stone-200 hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-center gap-2">
              Review & Connect <UserPlus size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
