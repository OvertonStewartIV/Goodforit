import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, FileText, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function Pending() {
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
        <h1 className="text-xl font-bold">Pending & Owed</h1>
      </header>

      <div className="space-y-6">
        {/* Urgent Alerts */}
        <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="text-red-500 font-bold text-sm mb-1">Action Required</h3>
            <p className="text-red-200/70 text-xs leading-relaxed">
              You have a payment of <span className="text-white font-bold">$150.00</span> due in 2 days to the Community Garden Fund.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Active Obligations</h2>
          <div className="space-y-3">
             <div onClick={() => navigate('/app/pending/1')} className="cursor-pointer">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between group active:scale-95 transition-transform hover:border-lime-400/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/5 bg-red-400/10 text-red-400">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Community Garden Fund</h3>
                    <p className="text-xs text-red-400 font-bold">Due: Feb 24, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">$150.00</p>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">owed</p>
                </div>
              </div>
            </div>

             <div onClick={() => navigate('/app/pending/2')} className="cursor-pointer">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between group active:scale-95 transition-transform hover:border-lime-400/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/5 bg-yellow-400/10 text-yellow-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Loan from Elena</h3>
                    <p className="text-xs text-neutral-500">Started: Mar 01, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">$300.00</p>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Pending Approval</h2>
          <div className="space-y-3">
            <div onClick={() => navigate('/app/pending/3')} className="cursor-pointer">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between group active:scale-95 transition-transform hover:border-lime-400/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/5 bg-yellow-400/10 text-yellow-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Request to Marcus</h3>
                    <p className="text-xs text-neutral-500">Started: Today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">$75.00</p>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">pending approval</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
