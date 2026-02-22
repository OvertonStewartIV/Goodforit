import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Map as MapIcon, Info, Users, 
  TrendingUp, Home, Briefcase, GraduationCap, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ImpactMap() {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = React.useState<number | null>(null);

  // Simulated zones for the map
  const zones = [
    { id: 1, name: "Downtown Arts", score: 82, trend: "+4%", topNeed: "Small Biz", x: 20, y: 30 },
    { id: 2, name: "West Heights", score: 45, trend: "+12%", topNeed: "Housing", x: 60, y: 40 },
    { id: 3, name: "River Market", score: 68, trend: "+2%", topNeed: "Education", x: 40, y: 70 },
    { id: 4, name: "East Village", score: 32, trend: "+15%", topNeed: "Emergency", x: 80, y: 20 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Inclusive Growth Map</h1>
          <p className="text-neutral-500 text-xs">Based on Mastercard IGS Data</p>
        </div>
      </header>

      {/* Main Map Visualization Area */}
      <div className="relative w-full aspect-square bg-neutral-900/50 rounded-[2.5rem] mb-6 overflow-hidden border border-neutral-800 shadow-2xl">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1717700299581-c2fc3fad4ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGNpdHklMjBtYXAlMjBhYnN0cmFjdCUyMHZpc3VhbGl6YXRpb24lMjBkYXRhfGVufDF8fHx8MTc3MTczMDM1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
             className="w-full h-full object-cover filter grayscale contrast-125"
             alt="City Map"
           />
           <div className="absolute inset-0 bg-lime-900/20 mix-blend-overlay"></div>
        </div>

        {/* Zones */}
        {zones.map((zone) => (
          <motion.button
            key={zone.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: zone.id * 0.1 }}
            onClick={() => setActiveZone(zone.id)}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all ${
              activeZone === zone.id 
                ? 'bg-lime-400 text-black border-white scale-110 z-20' 
                : 'bg-black/60 text-white border-white/20 hover:bg-black/80 hover:scale-105 z-10'
            }`}
          >
            <div className="text-center">
              <span className="text-xs font-bold block">{zone.score}</span>
              <span className="text-[8px] font-bold opacity-70">IGS</span>
            </div>
          </motion.button>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <span className="text-neutral-300">High Growth</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
            <span className="text-neutral-300">Needs Support</span>
          </div>
        </div>
      </div>

      {/* Zone Details */}
      {activeZone ? (
        <motion.div
          key="details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 mb-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{zones.find(z => z.id === activeZone)?.name}</h2>
              <p className="text-lime-400 text-sm font-bold flex items-center gap-1">
                <TrendingUp size={14} />
                {zones.find(z => z.id === activeZone)?.trend} Growth Rate
              </p>
            </div>
            <div className="bg-neutral-800 px-3 py-1 rounded-full text-xs font-bold text-neutral-300 border border-neutral-700">
              Census Tract #{1000 + activeZone}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
              <Briefcase className="mx-auto mb-2 text-blue-400" size={20} />
              <div className="text-lg font-bold">Low</div>
              <div className="text-[10px] text-neutral-500 uppercase font-bold">Prosperity</div>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
               <Users className="mx-auto mb-2 text-lime-400" size={20} />
               <div className="text-lg font-bold">High</div>
               <div className="text-[10px] text-neutral-500 uppercase font-bold">Inclusion</div>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
               <Home className="mx-auto mb-2 text-purple-400" size={20} />
               <div className="text-lg font-bold">Med</div>
               <div className="text-[10px] text-neutral-500 uppercase font-bold">Housing</div>
            </div>
          </div>

          <div className="space-y-3">
             <h3 className="text-sm font-bold text-neutral-400 uppercase">Recommended Actions</h3>
             <button className="w-full p-4 bg-lime-400 text-black rounded-xl font-bold flex items-center justify-between group hover:bg-lime-300 transition-colors">
               <span>Fund a Small Business here</span>
               <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
             </button>
             <button className="w-full p-4 bg-neutral-800 text-white rounded-xl font-bold flex items-center justify-between group hover:bg-neutral-700 transition-colors">
               <span>Support Housing Grant</span>
               <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
             </button>
          </div>

        </motion.div>
      ) : (
        <div className="text-center py-10 text-neutral-500">
          <MapIcon size={48} className="mx-auto mb-4 opacity-20" />
          <p>Tap a zone on the map to see Inclusive Growth metrics.</p>
        </div>
      )}
      
      {/* Info Card */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 flex gap-4 items-start">
        <Info className="text-neutral-400 shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-sm text-white mb-1">What is IGS?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The Inclusive Growth Score (IGS) measures a community's potential for economic growth that benefits everyone. Higher scores mean better access to jobs, housing, and capital.
          </p>
        </div>
      </div>
    </div>
  );
}