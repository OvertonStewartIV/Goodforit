import React, { useState } from 'react';
import { ArrowLeft, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Contract() {
  const navigate = useNavigate();
  const [useContract, setUseContract] = useState(true);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [duration, setDuration] = useState('3');
  const [interest, setInterest] = useState('5');

  const calculateTotal = () => {
    const p = parseFloat(amount) || 0;
    const r = parseFloat(interest) || 0;
    const t = parseFloat(duration) || 0; // assuming months for simplicity in this demo
    return (p * (1 + (r / 100) * (t / 12))).toFixed(2);
  };

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">Set Terms & Contracts</h1>
      </header>

      {/* Contract Toggle */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-stone-800">Enable Smart Contract</h3>
          <p className="text-xs text-stone-500">Secure this transaction with terms</p>
        </div>
        <button 
          onClick={() => setUseContract(!useContract)}
          className={`w-12 h-6 rounded-full p-1 transition-colors ${useContract ? 'bg-sky-600' : 'bg-stone-300'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${useContract ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      {useContract ? (
        <div className="space-y-6">
          {/* Main Inputs */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Amount & Currency</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-lg outline-none focus:ring-2 focus:ring-sky-500"
                />
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-24 p-3 bg-stone-50 rounded-xl border border-stone-200 font-bold text-stone-700 outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Duration (Months)</label>
                <input 
                  type="number" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Interest (%)</label>
                <input 
                  type="number" 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Repayment Schedule</label>
              <select className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 outline-none focus:ring-2 focus:ring-sky-500">
                <option>Monthly Installments</option>
                <option>One-time Lump Sum</option>
                <option>Weekly Micro-payments</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Custom Notes</label>
              <textarea 
                className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-sky-500 min-h-[80px]"
                placeholder="e.g. For business inventory purchase..."
              />
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-sky-900 mb-2 flex items-center gap-2">
                <FileText size={18} /> Contract Summary
              </h3>
              <p className="text-sky-800 text-sm leading-relaxed mb-4">
                You are sending <span className="font-bold">{currency} {amount || '0'}</span>. 
                They will repay <span className="font-bold">{currency} {calculateTotal()}</span> by <span className="font-bold">May 2026</span> (approx).
              </p>
              <div className="flex items-center gap-2 text-xs text-sky-700 font-medium bg-sky-100 p-2 rounded-lg w-fit">
                <CheckCircle2 size={14} /> Legally binding via smart contract
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-2xl border border-stone-200 border-dashed">
          <p className="text-stone-500">Standard peer-to-peer transfer selected.</p>
          <p className="text-sm text-stone-400 mt-2">No repayment terms will be enforced.</p>
        </div>
      )}

      <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold mt-8 hover:bg-stone-800 active:scale-95 transition-all shadow-lg">
        Review & Sign
      </button>
    </div>
  );
}
