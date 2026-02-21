import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, FileText, DollarSign, Calendar, ChevronRight, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function PendingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data fetching based on ID
  const loan = {
    id: id,
    title: id === '1' ? 'Community Garden Fund' : 'Loan from Elena',
    amount: id === '1' ? '$150.00' : '$300.00',
    totalOwed: id === '1' ? '$150.00' : '$315.00',
    dueDate: id === '1' ? 'Feb 24, 2026' : 'Mar 01, 2026',
    status: id === '1' ? 'owed' : 'active',
    interestRate: '0%',
    description: id === '1' ? 'Emergency repair funds for the shared greenhouse.' : 'Personal loan for new equipment.',
    lender: id === '1' ? 'Community Pool' : 'Elena R.',
    terms: [
      'Repayment must be made in full by the due date.',
      'Late fees of 5% apply after 3 days grace period.',
      'Trust score impact: -10 points for default.'
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Loan Details</h1>
      </header>

      <div className="space-y-6">
        {/* Main Status Card */}
        <div className={`p-6 rounded-[2.5rem] border relative overflow-hidden text-center ${loan.status === 'owed' ? 'bg-red-900/10 border-red-900/30' : 'bg-neutral-900 border-neutral-800'}`}>
           <div className="relative z-10">
             <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${loan.status === 'owed' ? 'bg-red-500 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
               {loan.status === 'owed' ? <AlertCircle size={32} /> : <Clock size={32} />}
             </div>
             <p className="text-sm font-bold opacity-70 mb-1 uppercase tracking-wider">{loan.status === 'owed' ? 'Payment Due' : 'Active Loan'}</p>
             <h2 className="text-4xl font-bold text-white mb-2">{loan.totalOwed}</h2>
             <p className="text-sm text-neutral-400">Due {loan.dueDate}</p>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Lender</p>
            <p className="font-bold text-white">{loan.lender}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
             <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Interest</p>
             <p className="font-bold text-lime-400">{loan.interestRate}</p>
          </div>
        </div>

        {/* Terms & Stipulations */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Terms & Stipulations</h3>
          <div className="bg-neutral-900 rounded-[2rem] p-6 border border-neutral-800 space-y-4">
            <div className="flex gap-3">
              <FileText className="text-neutral-500 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Contract Agreement</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                  {loan.description}
                </p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-400">
                  {loan.terms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="h-px bg-neutral-800 w-full" />
            
            <button className="flex items-center gap-2 text-lime-400 text-sm font-bold hover:text-lime-300 transition-colors">
              <Download size={16} />
              Download Smart Contract PDF
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="fixed bottom-6 left-6 right-6">
           <button className="w-full bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 flex items-center justify-center gap-2">
             Make Payment
             <ChevronRight size={20} />
           </button>
        </div>
      </div>
    </div>
  );
}
