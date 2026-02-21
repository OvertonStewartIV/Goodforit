import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, FileText, Calendar, DollarSign, Wallet, ShieldCheck, 
  Lock, AlertTriangle, MessageSquare, X, RefreshCw 
} from 'lucide-react';
import { toast } from 'sonner';

// Mock Transaction Data
const MOCK_CONTRACT = {
  id: 'tx-12345',
  type: 'loan', // or 'vouch'
  status: 'pending', // pending, active, completed, dispute
  lender: {
    name: 'Sarah J.',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    tier: 3,
    trust: 98
  },
  borrower: {
    name: 'Alex M.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    tier: 2,
    trust: 94
  },
  terms: {
    amount: 500,
    currency: 'USD',
    interestRate: 5,
    repaymentDate: '2026-03-21',
    collateral: 'none',
    stipulations: ['Grace period of 7 days', 'Early payoff allowed']
  }
};

export default function ContractDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [changeRequest, setChangeRequest] = useState('');
  
  // State for editable fields
  const [editedAmount, setEditedAmount] = useState(MOCK_CONTRACT.terms.amount);
  const [editedInterest, setEditedInterest] = useState(MOCK_CONTRACT.terms.interestRate);

  const handleSendChangeRequest = () => {
    toast.success("Change request sent to Lender");
    setIsEditing(false);
  };

  const handleAccept = () => {
    toast.success("Contract Accepted! Funds are being transferred.");
    navigate('/app/home');
  };

  const totalRepayment = editedAmount + (editedAmount * (editedInterest / 100));

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-lime-400 selection:text-black">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Smart Contract Details</h1>
        <div className="w-10" />
      </header>

      {/* Status Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
        <div>
          <h3 className="text-yellow-500 font-bold text-sm">Action Required</h3>
          <p className="text-xs text-neutral-400 mt-1">
            Review the terms below. You can accept, decline, or request changes before the contract is executed.
          </p>
        </div>
      </div>

      {/* Contract Card */}
      <div className="bg-[#111] rounded-3xl border border-neutral-800 overflow-hidden relative mb-8">
        <div className="h-2 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400" />
        
        <div className="p-6">
          {/* Header Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <FileText className="text-lime-400" size={20} />
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Smart Contract #{id?.slice(-4)}</span>
            </div>
            <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-white font-mono uppercase">Pending</span>
          </div>

          {/* Participants */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="text-center z-10">
              <img src={MOCK_CONTRACT.lender.avatar} className="w-12 h-12 rounded-full border-2 border-neutral-800 mx-auto mb-2" />
              <p className="text-xs font-bold text-neutral-400">Lender</p>
              <p className="text-sm font-bold text-white">{MOCK_CONTRACT.lender.name}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <ShieldCheck size={10} className="text-purple-400" />
                <span className="text-[10px] text-purple-400 font-bold uppercase">Tier {MOCK_CONTRACT.lender.tier}</span>
              </div>
            </div>

            {/* Connection Line */}
            <div className="absolute top-6 left-0 right-0 h-[1px] bg-neutral-800 -z-0" />
            <div className="bg-neutral-900 px-2 z-10 text-neutral-500 text-xs font-mono">
              Creates
            </div>

            <div className="text-center z-10">
              <img src={MOCK_CONTRACT.borrower.avatar} className="w-12 h-12 rounded-full border-2 border-neutral-800 mx-auto mb-2" />
              <p className="text-xs font-bold text-neutral-400">Borrower</p>
              <p className="text-sm font-bold text-white">{MOCK_CONTRACT.borrower.name}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <ShieldCheck size={10} className="text-lime-400" />
                <span className="text-[10px] text-lime-400 font-bold uppercase">Tier {MOCK_CONTRACT.borrower.tier}</span>
              </div>
            </div>
          </div>

          {/* Terms Grid - Editable Mode vs View Mode */}
          <div className="space-y-4">
            {isEditing ? (
              <div className="bg-neutral-900/50 p-4 rounded-xl border border-dashed border-lime-400/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-lime-400">Proposed Changes</h3>
                  <button onClick={() => setIsEditing(false)} className="text-neutral-500 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Amount</label>
                    <div className="flex gap-2">
                       <div className="flex-1 p-2 bg-neutral-800 rounded text-neutral-500 text-sm line-through decoration-red-500 decoration-2">
                         ${MOCK_CONTRACT.terms.amount}
                       </div>
                       <input 
                         type="number" 
                         value={editedAmount}
                         onChange={(e) => setEditedAmount(Number(e.target.value))}
                         className="flex-1 p-2 bg-neutral-900 border border-lime-400 rounded text-white text-sm font-bold focus:outline-none"
                       />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Interest Rate (%)</label>
                    <div className="flex gap-2">
                       <div className="flex-1 p-2 bg-neutral-800 rounded text-neutral-500 text-sm line-through decoration-red-500 decoration-2">
                         {MOCK_CONTRACT.terms.interestRate}%
                       </div>
                       <input 
                         type="number" 
                         value={editedInterest}
                         onChange={(e) => setEditedInterest(Number(e.target.value))}
                         className="flex-1 p-2 bg-neutral-900 border border-lime-400 rounded text-white text-sm font-bold focus:outline-none"
                       />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Reason for Change</label>
                    <textarea 
                      value={changeRequest}
                      onChange={(e) => setChangeRequest(e.target.value)}
                      placeholder="e.g. Can we lower the interest rate?"
                      className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white text-sm focus:border-lime-400 focus:outline-none h-20 resize-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6">
                <div>
                  <p className="text-xs text-neutral-500 uppercase mb-1">Principal</p>
                  <p className="text-xl font-bold text-white">${MOCK_CONTRACT.terms.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase mb-1">Total Repayment</p>
                  <p className="text-xl font-bold text-lime-400">${totalRepayment.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase mb-1">Interest</p>
                  <p className="text-sm font-bold text-white">{MOCK_CONTRACT.terms.interestRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase mb-1">Due Date</p>
                  <p className="text-sm font-bold text-white">{MOCK_CONTRACT.terms.repaymentDate}</p>
                </div>
              </div>
            )}

            {/* Stipulations List */}
            <div className="pt-4 border-t border-neutral-800">
              <p className="text-xs text-neutral-500 uppercase mb-2">Stipulations</p>
              <ul className="space-y-2">
                {MOCK_CONTRACT.terms.stipulations.map((stip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                    <CheckCircle2 size={16} className="text-lime-400 mt-0.5 shrink-0" />
                    <span>{stip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collateral */}
            <div className="bg-neutral-900 rounded-xl p-3 flex items-center gap-3 border border-neutral-800 mt-2">
               <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-lime-400">
                 {MOCK_CONTRACT.terms.collateral === 'none' ? <Lock size={16} /> : <Wallet size={16} />}
               </div>
               <div>
                 <p className="text-xs font-bold text-white uppercase">Collateral: {MOCK_CONTRACT.terms.collateral}</p>
                 <p className="text-[10px] text-neutral-500">
                   {MOCK_CONTRACT.terms.collateral === 'none' ? 'Reputation at stake' : 'Assets locked in contract'}
                 </p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent space-y-3">
        {isEditing ? (
          <button 
            onClick={handleSendChangeRequest}
            className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Send Change Request <RefreshCw size={20} />
          </button>
        ) : (
          <>
            <button 
              onClick={handleAccept}
              className="w-full bg-lime-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 flex items-center justify-center gap-2"
            >
              Accept Contract <CheckCircle2 size={20} />
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full bg-neutral-900 border border-neutral-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Request Changes <MessageSquare size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
