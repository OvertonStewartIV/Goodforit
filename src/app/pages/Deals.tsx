import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, FileText, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const DealItem = ({ title, date, amount, status, id }: { title: string, date: string, amount: string, status: 'completed' | 'active', id: string }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-3 flex items-center justify-between group active:scale-95 transition-transform cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/5 ${status === 'completed' ? 'bg-lime-400/10 text-lime-400' : 'bg-blue-400/10 text-blue-400'}`}>
        {status === 'completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
      </div>
      <div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-xs text-neutral-500">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-white">{amount}</p>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${status === 'completed' ? 'text-lime-400' : 'text-blue-400'}`}>
        {status}
      </p>
    </div>
  </div>
);

export default function Deals() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Your Deals</h1>
      </header>

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-white">$14.2k</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
             <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Success Rate</p>
             <p className="text-2xl font-bold text-lime-400">100%</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Finalized & Successful</h2>
          <div className="space-y-2">
            <DealItem title="Loan to Sarah J." date="Feb 14, 2026" amount="$500.00" status="completed" id="1" />
            <DealItem title="Borrowed from Marcus" date="Jan 20, 2026" amount="$200.00" status="completed" id="2" />
            <DealItem title="Community Pool A" date="Dec 15, 2025" amount="$1,000.00" status="completed" id="3" />
            <DealItem title="Micro-loan to Alex" date="Nov 02, 2025" amount="$50.00" status="completed" id="4" />
          </div>
        </div>
      </div>
    </div>
  );
}
