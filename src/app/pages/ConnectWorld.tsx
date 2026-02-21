import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Globe, MapPin, Heart, ArrowRight, ArrowUpRight, X, Search, Users, ExternalLink, 
  Zap, ShieldCheck, Sparkles, MessageCircle, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router';

// --- DATA: LOCATIONS (MAP VIEW) ---
const LOCATIONS = [
  {
    id: 'lagos',
    name: 'Lagos Tech Hub',
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=600&auto=format&fit=crop',
    donations: '$12,450',
    members: '1.2k',
    description: 'Supporting young developers with hardware grants and internet access.'
  },
  {
    id: 'berlin',
    name: 'Berlin Creatives',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=600&auto=format&fit=crop',
    donations: '€8,200',
    members: '850',
    description: 'A mutual aid fund for freelance artists and musicians in Kreuzberg.'
  },
  {
    id: 'highland',
    name: 'Highland Park Mutual',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1761530053730-57e9238796c3?q=80&w=600&auto=format&fit=crop',
    donations: '$45,100',
    members: '3.4k',
    description: 'Community garden and emergency food stipend program.'
  },
  {
    id: 'rio',
    name: 'Rio Community Trust',
    country: 'Brazil',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop',
    donations: 'R$92k',
    members: '2.1k',
    description: 'Local infrastructure improvements managed by residents.'
  }
];

// --- DATA: PROJECTS ---
const NEARBY_PROJECTS = [
  {
    id: 1,
    title: "Urban Garden Initiative",
    location: "0.4 miles away • Highland Park",
    description: "Transforming vacant lots into community gardens to provide fresh produce for local families.",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Green", "Food Security"],
    members: 124,
    yield: "12% Social Yield",
    verified: true
  },
  {
    id: 2,
    title: "Tech for Teens",
    location: "1.2 miles away • Community Center",
    description: "Providing laptops and coding classes to underrepresented youth in our neighborhood.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Education", "Tech"],
    members: 85,
    yield: "Mentorship Credits",
    verified: true
  }
];

const GLOBAL_PROJECTS = [
  {
    id: 3,
    title: "Clean Ocean Alliance",
    location: "Worldwide • Coastal Regions",
    description: "Funding plastic removal technologies and supporting coastal cleanup crews globally.",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Environment", "Global"],
    members: 12500,
    yield: "Carbon Credits",
    verified: true
  },
  {
    id: 4,
    title: "Micro-Grid Solar",
    location: "Emerging Markets • Rural Areas",
    description: "Building decentralized solar power grids for off-grid communities.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Energy", "Infrastructure"],
    members: 3400,
    yield: "5% APR",
    verified: true
  }
];

// --- DATA: PEOPLE ---
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

export default function ConnectWorld() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'feed' | 'map'>('feed');
  const [activeFeedSection, setActiveFeedSection] = useState<'projects' | 'people'>('projects');
  const [projectTab, setProjectTab] = useState<'nearby' | 'global'>('nearby');
  
  // Map State
  const [selectedLoc, setSelectedLoc] = useState<typeof LOCATIONS[0] | null>(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans pb-24">
      
      {/* Background Animation Effect (Only visible in Map mode or subtly in feed) */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${viewMode === 'map' ? 'opacity-30' : 'opacity-10'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime-900/10 rounded-full blur-[80px]" />
      </div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay pointer-events-none"></div>

      {/* Sticky Header */}
      <div className="relative z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900 sticky top-0 px-6 py-4">
        <header className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <h1 className="text-xl font-bold">World & Impact</h1>

          <button 
             onClick={() => setViewMode(viewMode === 'feed' ? 'map' : 'feed')}
             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
               viewMode === 'map' 
                 ? 'bg-lime-400 text-black border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.5)]' 
                 : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
             }`}
          >
            <Globe size={20} className={viewMode === 'map' ? 'animate-spin-slow' : ''} />
          </button>
        </header>

        {/* View Toggle (Feed vs Map) */}
        {/* If in Feed mode, show the Project/People toggle. If in Map mode, maybe show region filter? For now, we only need tabs in Feed mode. */}
        <AnimatePresence>
          {viewMode === 'feed' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex p-1 bg-neutral-900 rounded-2xl border border-neutral-800 mb-2">
                <button 
                  onClick={() => setActiveFeedSection('projects')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeFeedSection === 'projects' 
                      ? 'bg-lime-400 text-black shadow-lg' 
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <Zap size={16} /> Projects
                </button>
                <button 
                  onClick={() => setActiveFeedSection('people')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeFeedSection === 'people' 
                      ? 'bg-lime-400 text-black shadow-lg' 
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <Users size={16} /> People
                </button>
              </div>

               {/* Sub Tabs for Projects */}
               {activeFeedSection === 'projects' && (
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mb-2">
                    <button 
                      onClick={() => setProjectTab('nearby')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                        projectTab === 'nearby'
                          ? 'bg-white text-black border-white' 
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      Nearby
                    </button>
                    <button 
                      onClick={() => setProjectTab('global')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                        projectTab === 'global'
                          ? 'bg-white text-black border-white' 
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      Global
                    </button>
                  </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 p-6 pt-2">
        <AnimatePresence mode="wait">
          
          {/* FEED MODE */}
          {viewMode === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
               {/* PROJECTS LIST */}
               {activeFeedSection === 'projects' && (projectTab === 'nearby' ? NEARBY_PROJECTS : GLOBAL_PROJECTS).map((project) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={project.id}
                  className="group relative bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all"
                >
                  <div className="h-48 relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.verified && (
                      <div className="absolute top-4 right-4 bg-lime-400 text-black p-1.5 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                        <ShieldCheck size={16} />
                      </div>
                    )}
                  </div>
                  <div className="p-6 relative -mt-6 bg-neutral-900 rounded-t-[2rem]">
                    <h2 className="text-xl font-bold text-white mb-1">{project.title}</h2>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium mb-4">
                      <MapPin size={12} className="text-lime-400" />
                      {project.location}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-black/50 p-3 rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-bold uppercase mb-1">
                          <Users size={12} /> Backers
                        </div>
                        <span className="text-white font-bold">{project.members.toLocaleString()}</span>
                      </div>
                      <div className="bg-lime-400/10 p-3 rounded-2xl border border-lime-400/20">
                        <div className="flex items-center gap-2 text-lime-400 text-[10px] font-bold uppercase mb-1">
                          <Zap size={12} /> Incentive
                        </div>
                        <span className="text-lime-400 font-bold">{project.yield}</span>
                      </div>
                    </div>
                    <button className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm hover:bg-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                      View Project <ArrowUpRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* PEOPLE LIST */}
              {activeFeedSection === 'people' && PITCHES.map((pitch) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={pitch.id}
                  className="bg-neutral-900 rounded-[2rem] overflow-hidden shadow-sm border border-neutral-800 group hover:border-neutral-700 transition-all"
                >
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
                  </div>
                  <div className="relative h-48 bg-neutral-800">
                    <img src={pitch.image} alt={pitch.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                      {pitch.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-white mb-2 leading-tight">{pitch.title}</h2>
                    <p className="text-sm text-neutral-400 mb-4 leading-relaxed line-clamp-3">
                      {pitch.description}
                    </p>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white">${pitch.raised.toLocaleString()} raised</span>
                        <span className="text-neutral-500">of ${pitch.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${(pitch.raised / pitch.goal) * 100}%` }}
                          className="h-full rounded-full bg-lime-400" 
                        />
                      </div>
                    </div>
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
            </motion.div>
          )}

          {/* MAP MODE */}
          {viewMode === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Global Trust Map</h2>
                <p className="text-neutral-400 text-sm">Discover active communities worldwide.</p>
              </div>

              <div className="grid gap-6">
                {LOCATIONS.map((loc, i) => (
                  <motion.div
                    key={loc.id}
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                    onClick={() => setSelectedLoc(loc)}
                    className="group relative h-64 rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 shadow-2xl"
                  >
                    <div className="absolute inset-0">
                      <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-center gap-1 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <MapPin size={12} /> {loc.country}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">{loc.name}</h3>
                          <p className="text-white/60 text-xs line-clamp-1">{loc.description}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-lime-400 group-hover:text-black transition-colors">
                          <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* MAP DETAIL MODAL */}
      <AnimatePresence>
        {selectedLoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLoc(null)}
            className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/80 backdrop-blur-sm p-4 sm:p-0"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] w-full max-w-md rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative"
            >
               <div className="h-48 relative">
                 <img src={selectedLoc.image} alt={selectedLoc.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]" />
                 
                 <button 
                   onClick={(e) => { e.stopPropagation(); setSelectedLoc(null); }}
                   className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors"
                 >
                   <X size={16} />
                 </button>
               </div>

               <div className="p-8 -mt-12 relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-400/20">
                      Verified Community
                    </span>
                 </div>
                 
                 <h2 className="text-3xl font-bold text-white mb-2">{selectedLoc.name}</h2>
                 <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                   {selectedLoc.description}
                 </p>

                 <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-neutral-900/50 p-4 rounded-2xl border border-white/5">
                     <p className="text-xs text-neutral-500 uppercase font-bold mb-1">Total Impact</p>
                     <p className="text-xl font-bold text-white">{selectedLoc.donations}</p>
                   </div>
                   <div className="bg-neutral-900/50 p-4 rounded-2xl border border-white/5">
                     <p className="text-xs text-neutral-500 uppercase font-bold mb-1">Members</p>
                     <p className="text-xl font-bold text-white flex items-center gap-2">
                       {selectedLoc.members} <Users size={16} className="text-neutral-500" />
                     </p>
                   </div>
                 </div>

                 <div className="flex gap-4">
                   <button className="flex-1 bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
                     Donate <Heart size={20} className="fill-black/20" />
                   </button>
                   <button className="px-6 py-4 rounded-xl font-bold text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors flex items-center justify-center">
                     <ExternalLink size={20} />
                   </button>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}