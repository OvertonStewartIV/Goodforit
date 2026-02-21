import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, ChevronDown, Check, Info } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ExchangeSettings() {
  const navigate = useNavigate();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [amount, setAmount] = useState('100');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');

  const rate = 0.000034; // mock rate
  const fee = 1.5; // percent

  const convertedAmount = (parseFloat(amount) * rate).toFixed(6);
  const feeAmount = (parseFloat(amount) * (fee / 100)).toFixed(2);
  const finalAmount = (parseFloat(convertedAmount) * (1 - fee/100)).toFixed(6);

  const CurrencyOption = ({ value, label, icon }: { value: string, label: string, icon: string }) => (
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className="font-bold text-stone-700">{value}</span>
      <span className="text-stone-400 text-xs uppercase">{label}</span>
    </div>
  );

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">Exchange & Settings</h1>
      </header>

      {/* Exchange Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 mb-8 relative overflow-hidden">
        <h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-6">Quick Convert</h2>
        
        {/* From Input */}
        <div className="relative mb-2">
          <label className="text-xs text-stone-400 font-bold ml-1 mb-1 block">From</label>
          <div className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl border border-stone-100 focus-within:ring-2 focus-within:ring-sky-500 transition-all">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold text-stone-900 outline-none w-full"
              placeholder="0.00"
            />
            <div className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm hover:border-sky-300 transition-colors">
              <span className="font-bold text-stone-700">{fromCurrency}</span>
              <ChevronDown size={14} className="text-stone-400" />
            </div>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center -my-3 relative z-10">
          <div className="bg-stone-100 p-2 rounded-full border-4 border-white shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition-colors">
            <RefreshCw size={20} className="text-stone-500" />
          </div>
        </div>

        {/* To Input */}
        <div className="relative mt-2 mb-6">
          <label className="text-xs text-stone-400 font-bold ml-1 mb-1 block">To (Estimated)</label>
          <div className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <span className="text-2xl font-bold text-stone-900">{convertedAmount}</span>
            <div className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm hover:border-sky-300 transition-colors">
              <span className="font-bold text-stone-700">{toCurrency}</span>
              <ChevronDown size={14} className="text-stone-400" />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 text-sm space-y-2">
          <div className="flex justify-between text-sky-800">
            <span>Rate</span>
            <span className="font-mono font-bold">1 {fromCurrency} ≈ {rate} {toCurrency}</span>
          </div>
          <div className="flex justify-between text-sky-800">
            <span>Network Fee ({fee}%)</span>
            <span className="font-mono font-bold">${feeAmount}</span>
          </div>
          <div className="h-px bg-sky-200/50 my-2" />
          <div className="flex justify-between font-bold text-sky-900">
            <span>You Receive</span>
            <span>{finalAmount} {toCurrency}</span>
          </div>
        </div>

        <button className="w-full bg-sky-600 text-white py-4 rounded-xl font-bold mt-6 hover:bg-sky-700 shadow-lg shadow-sky-200 active:scale-95 transition-all">
          Convert Now
        </button>
      </div>

      {/* Default Currency Setting */}
      <div className="space-y-4">
        <h3 className="font-bold text-stone-800 px-1">Display Currency</h3>
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {['USD', 'EUR', 'BTC'].map((curr) => (
            <div 
              key={curr}
              onClick={() => setDefaultCurrency(curr)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-stone-50 transition-colors"
            >
              <span className="font-medium text-stone-700">{curr}</span>
              {defaultCurrency === curr && (
                <div className="bg-emerald-500 text-white p-1 rounded-full">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 px-2 flex gap-1 items-center">
          <Info size={12} /> This sets how your balances are displayed throughout the app.
        </p>
      </div>
    </div>
  );
}
