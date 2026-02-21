import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, MapPin, Search, Plus, TrendingUp, Users, Sparkles, Filter, ChevronDown, CheckCircle2 } from 'lucide-react';

const PITCHES = [
  {
    id: 1,
    user: "Maria Gonzalez",
    role: "Local Baker • 0.2 miles away",
    avatar: "https://images.unsplash.com/photo-1610896011062-1df767af9f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    verified: true,
    title: "Expanding 'Mama's Conchas' to Downtown",
    description: "I've been selling homemade conchas from my kitchen for 3 years. I found a perfect small storefront downtown, but I need help with the deposit and first month's rent. This isn't just a bakery, it's a gathering place for our morning stories.",
    image: "https://images.unsplash.com/photo-1764173039506-c5cc7b8ec14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    goal: 2500,
    raised: 1850,
    backers: 42,
    category: "Business",
    tags: ["Food", "Local", "Woman-Owned"],
    endorsedBy: ["Alex M.", "Sarah J."]
  },
  {
    id: 2,
    user: "David Chen",
    role: "Nursing Student • 1.5 miles away",
    avatar: "https://images.unsplash.com/photo-1730597842283-943c7986ee2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    verified: true,
    title: "Final Semester Tuition Assistance",
    description: "I'm one semester away from my nursing degree at City College. My financial aid fell short this term due to a paperwork error. Once I graduate, I plan to work at the local community clinic to give back.",
    image: "https://images.unsplash.com/photo-1748640857973-93524ef0fe7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    goal: 1200,
    raised: 450,
    backers: 15,
    category: "Education",
    tags: ["Healthcare", "Tuition", "Future"],
    endorsedBy: []
  },
  {
    id: 3,
    user: "Green Thumbs Group",
    role: "Non-Profit • Highland Park",
    avatar: "https://images.unsplash.com/photo-1707844915582-e3ccbf2ef2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    verified: true,
    title: "New Tools for the Spring Harvest",
    description: "Our communal tools at the Highland Park garden are rusting and breaking. We need a new set of rakes, shovels, and a wheelbarrow to keep the garden thriving for everyone who relies on this fresh produce.",
    image: "https://images.unsplash.com/photo-1555861498-e22ab75245d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    goal: 500,
    raised: 500,
    backers: 28,
    category: "Community",
    tags: ["Environment", "Public Space", "Food"],
    endorsedBy: ["Mayor's Office"]
  }
];

const CATEGORIES = ["All", "Business", "Education", "Community", "Emergency", "Dreams"];

export default function CommunityFeed() {
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<'board' | 'activity'>('board');

  const filteredPitches = filter === "All" ? PITCHES : PITCHES.filter(p => p.category === filter);

  return (
    <div className="bg-black min-h-screen pb-24 font-sans selection:bg-lime-400 selection:text-black">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-30 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Community Board</h1>
              <p className="text-xs text-neutral-400 font-medium">Invest in people, not just loans.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-neutral-800 rounded-full text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 bg-lime-400 text-black rounded-full shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:bg-lime-300 transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 border-b border-neutral-800 mb-4">
            <button 
              onClick={() => setActiveTab('board')}
              className={`pb-2 text-sm font-bold transition-colors relative ${
                activeTab === 'board' ? 'text-lime-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Open Pitches
              {activeTab === 'board' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
            <button 
              onClick={() => setActiveTab('activity')}
              className={`pb-2 text-sm font-bold transition-colors relative ${
                activeTab === 'activity' ? 'text-lime-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Recent Activity
              {activeTab === 'activity' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filter === cat 
                    ? 'bg-lime-400 text-black border-lime-400' 
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-md mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredPitches.map((pitch) => (
            <motion.div
              key={pitch.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 rounded-[2rem] overflow-hidden shadow-sm border border-neutral-800 group hover:border-neutral-700 transition-all"
            >
              {/* User Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={pitch.avatar} alt={pitch.user} className="w-10 h-10 rounded-full object-cover border-2 border-neutral-800" />
                    {pitch.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-lime-400 text-black rounded-full p-0.5 border-2 border-neutral-900">
                        <CheckCircle2 size={10} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">{pitch.user}</h3>
                    <p className="text-xs text-neutral-500">{pitch.role}</p>
                  </div>
                </div>
                {pitch.endorsedBy.length > 0 && (
                  <div className="flex -space-x-2">
                    {pitch.endorsedBy.slice(0, 3).map((name, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[8px] font-bold text-neutral-400" title={`Endorsed by ${name}`}>
                        {name[0]}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[8px] font-bold text-neutral-400">
                      +
                    </div>
                  </div>
                )}
              </div>

              {/* Pitch Image */}
              <div className="relative h-48 bg-neutral-800">
                <img src={pitch.image} alt={pitch.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                  {pitch.category}
                </div>
              </div>

              {/* Pitch Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-white mb-2 leading-tight">{pitch.title}</h2>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed line-clamp-3">
                  {pitch.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pitch.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-white">${pitch.raised.toLocaleString()} raised</span>
                    <span className="text-neutral-500">of ${pitch.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(pitch.raised / pitch.goal) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        pitch.raised >= pitch.goal ? 'bg-lime-400' : 'bg-lime-400'
                      }`} 
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-neutral-500 font-medium">
                    <span>{pitch.backers} backers</span>
                    <span>{Math.round((pitch.raised / pitch.goal) * 100)}% Funded</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-[1fr_auto] gap-3 mt-4">
                  <button className="bg-lime-400 text-black py-3 px-4 rounded-xl font-bold text-sm hover:bg-lime-300 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.2)] active:scale-95 flex items-center justify-center gap-2">
                    <Sparkles size={16} /> Fund this Dream
                  </button>
                  <button className="bg-transparent border border-neutral-700 text-white p-3 rounded-xl hover:bg-neutral-800 transition-colors">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Action Button (Alternative placement) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-lime-400 text-black rounded-full shadow-[0_0_20px_rgba(163,230,53,0.4)] flex items-center justify-center z-40 border-4 border-black"
      >
        <Plus size={28} />
      </motion.button>
    </div>
  );
}
