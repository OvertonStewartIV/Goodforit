import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, ShieldCheck, Calendar, Percent, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';

export default function LoanDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state || {
    amount: "$500",
    provider: "Community Fund A",
    interest: "0%",
    terms: "3 months",
    avatar: "https://images.unsplash.com/photo-1707844915582-e3ccbf2ef2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    description: "This micro-loan is backed by the local community trust to support emergency expenses and small business needs.",
    repaymentSchedule: "Monthly",
    totalRepayment: "$500"
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-lime-400 selection:text-black pb-24">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Loan Details</h1>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Main Card */}
        <div className="bg-neutral-900 rounded-[2.5rem] p-6 border border-neutral-800 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-lime-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           
           <div className="flex flex-col items-center text-center mb-6 relative z-10">
             <div className="w-20 h-20 rounded-full p-1 bg-neutral-900 mb-4 border border-neutral-800">
               <img src={data.avatar} alt={data.provider} className="w-full h-full rounded-full object-cover" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-1">{data.amount}</h2>
             <p className="text-neutral-400 text-sm flex items-center gap-1">
               Provided by <span className="text-white font-bold">{data.provider}</span>
               <ShieldCheck size={14} className="text-lime-400" />
             </p>
           </div>

           <div className="grid grid-cols-2 gap-3 mb-6">
             <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
               <div className="flex justify-center text-lime-400 mb-2"><Percent size={20} /></div>
               <p className="text-xs text-neutral-500 uppercase font-bold mb-1">Interest</p>
               <p className="text-xl font-bold text-white">{data.interest}</p>
             </div>
             <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
               <div className="flex justify-center text-cyan-400 mb-2"><Calendar size={20} /></div>
               <p className="text-xs text-neutral-500 uppercase font-bold mb-1">Duration</p>
               <p className="text-xl font-bold text-white">{data.terms}</p>
             </div>
           </div>

           <div className="bg-neutral-800/50 p-4 rounded-2xl border border-white/5 mb-6">
             <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
               <Info size={16} className="text-neutral-400" />
               About this Fund
             </h3>
             <p className="text-neutral-400 text-sm leading-relaxed">
               {data.description || "A community-backed fund designed to help members bridge short-term gaps with flexible repayment options and low interest rates."}
             </p>
           </div>

           <div className="space-y-3">
             <div className="flex justify-between items-center text-sm p-3 border-b border-neutral-800">
               <span className="text-neutral-400">Repayment Schedule</span>
               <span className="text-white font-bold">{data.repaymentSchedule || "Monthly"}</span>
             </div>
             <div className="flex justify-between items-center text-sm p-3 border-b border-neutral-800">
               <span className="text-neutral-400">Total Repayment</span>
               <span className="text-lime-400 font-bold">{data.totalRepayment || data.amount}</span>
             </div>
              <div className="flex justify-between items-center text-sm p-3">
               <span className="text-neutral-400">Trust Score Req.</span>
               <span className="text-white font-bold flex items-center gap-1">
                 90+ <ShieldCheck size={14} className="text-lime-400" />
               </span>
             </div>
           </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 flex items-center justify-center gap-2">
          Accept Offer & Get Funds
          <CheckCircle2 size={20} />
        </button>

        <p className="text-center text-xs text-neutral-500 px-8">
          By accepting, you agree to the community repayment terms and smart contract execution.
        </p>
      </motion.div>
    </div>
  );
}
