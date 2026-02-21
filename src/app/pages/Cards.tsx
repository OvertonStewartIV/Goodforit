import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Smartphone, Globe } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Cards() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('virtual');

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">Cards & Banking</h1>
      </header>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-xl text-white mb-8 relative overflow-hidden h-48 flex flex-col justify-between transform transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start">
          <Wallet size={24} className="text-white/80" />
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">DEBIT</span>
        </div>
        <div>
          <p className="font-mono text-xl tracking-widest mb-2 opacity-90">•••• •••• •••• 4242</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase opacity-75 mb-1">Card Holder</p>
              <p className="font-bold text-sm tracking-wide">ALEX MORGAN</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold opacity-75">EXP 12/28</span>
              <div className="w-8 h-5 bg-white/20 rounded-md" />
            </div>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Options */}
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-stone-800 mb-4 px-1">Choose Your Card Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setSelectedCard('virtual')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                selectedCard === 'virtual' 
                  ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100' 
                  : 'border-stone-200 bg-white hover:border-indigo-200'
              }`}
            >
              <Smartphone className={`mb-3 ${selectedCard === 'virtual' ? 'text-indigo-600' : 'text-stone-400'}`} size={24} />
              <h4 className={`font-bold text-sm mb-1 ${selectedCard === 'virtual' ? 'text-indigo-900' : 'text-stone-700'}`}>Virtual Card</h4>
              <p className="text-[10px] text-stone-500 leading-tight">Instant activation for online use.</p>
            </button>
            <button 
              onClick={() => setSelectedCard('physical')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                selectedCard === 'physical' 
                  ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100' 
                  : 'border-stone-200 bg-white hover:border-indigo-200'
              }`}
            >
              <CreditCard className={`mb-3 ${selectedCard === 'physical' ? 'text-indigo-600' : 'text-stone-400'}`} size={24} />
              <h4 className={`font-bold text-sm mb-1 ${selectedCard === 'physical' ? 'text-indigo-900' : 'text-stone-700'}`}>Physical Card</h4>
              <p className="text-[10px] text-stone-500 leading-tight">Mailed to you in 5-7 days.</p>
            </button>
          </div>
        </div>

        {/* Region Info */}
        <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex gap-4 items-start">
          <Globe className="text-sky-600 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-sky-900 text-sm mb-1">Global Access • El Salvador</h4>
            <p className="text-sky-800 text-xs leading-relaxed mb-2">
              Crypto spending is widely accepted in your region. We recommend enabling auto-conversion for seamless payments.
            </p>
            <button className="text-[10px] font-bold text-white bg-sky-600 px-3 py-1.5 rounded-lg hover:bg-sky-700 transition-colors shadow-sm">
              Enable Crypto Spending
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-stone-100 rounded-2xl p-5 border border-stone-200">
          <h4 className="font-bold text-stone-700 text-sm mb-2">Why get a card?</h4>
          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              Spend your loan funds anywhere Visa is accepted
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              No bank account required
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              Earn 1% cash back on community purchases
            </li>
          </ul>
        </div>

        <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-stone-800 active:scale-95 transition-all shadow-lg">
          Request {selectedCard === 'virtual' ? 'Virtual' : 'Physical'} Card
        </button>
      </div>
    </div>
  );
}
