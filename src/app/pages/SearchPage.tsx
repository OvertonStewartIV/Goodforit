import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, User, ShieldCheck, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';

const SearchResult = ({ name, handle, score, verified = false }: { name: string, handle: string, score: number, verified?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-2xl mb-3 active:scale-95 transition-transform cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
        <User size={20} className="text-neutral-400" />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <h3 className="font-bold text-white">{name}</h3>
          {verified && <ShieldCheck size={14} className="text-lime-400" />}
        </div>
        <p className="text-xs text-neutral-500">@{handle}</p>
      </div>
    </div>
    <div className="text-right">
      <span className="text-lime-400 font-bold text-lg">{score}%</span>
      <p className="text-[10px] text-neutral-500 uppercase">Trust</p>
    </div>
  </motion.div>
);

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Search Community</h1>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, handle, or trust score..." 
          autoFocus
          className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
          <Filter size={18} />
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 px-2">
          {query ? 'Results' : 'Recent Searches'}
        </h2>
        
        <SearchResult name="Sarah Jenkins" handle="sarah_j" score={98} verified />
        <SearchResult name="Marcus Thorne" handle="m_thorne" score={85} />
        <SearchResult name="Elena Rodriguez" handle="elena_r" score={92} verified />
        <SearchResult name="David Kim" handle="dkim_99" score={78} />
        <SearchResult name="Jessica Wu" handle="jess_wu" score={95} verified />
      </div>
    </div>
  );
}
