import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, DollarSign, Wallet, CheckCircle2, ArrowDown, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from "sonner";

export default function TopUp() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('100');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  // Helper to get current balance
  const getCurrentBalance = () => {
    const currentProfile = localStorage.getItem('userProfile');
    if (currentProfile) {
      try {
        const userData = JSON.parse(currentProfile);
        return Number(userData.balance) || 94;
      } catch (e) {
        return 94;
      }
    }
    return 94;
  };

  const handleTransaction = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const currentBalance = getCurrentBalance();
    const txAmount = Number(amount);

    if (activeTab === 'withdraw' && txAmount > currentBalance) {
      toast.error("Insufficient funds for withdrawal");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      // Update balance
      const currentProfile = localStorage.getItem('userProfile');
      let userData = { balance: 94 };
      if (currentProfile) {
        try {
          userData = JSON.parse(currentProfile);
        } catch (e) {}
      }

      const newBalance = activeTab === 'deposit' 
        ? (Number(userData.balance) || 94) + txAmount 
        : (Number(userData.balance) || 94) - txAmount;

      const updatedProfile = {
        ...userData,
        balance: newBalance
      };

      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setLoading(false);
      toast.success(activeTab === 'deposit' ? "Deposit successful!" : "Withdrawal successful!");
      navigate(-1); 
    }, 1500);
  };

  const PresetButton = ({ value }: { value: string }) => (
    <button 
      onClick={() => setAmount(value)}
      className={`px-4 py-3 rounded-xl border font-bold transition-all ${
        amount === value 
          ? 'bg-lime-400 border-lime-400 text-black' 
          : 'bg-neutral-900 border-neutral-800 text-white hover:border-lime-400/50'
      }`}
    >
      ${value}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Wallet & Balance</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      <div className="max-w-md mx-auto">
        
        {/* Toggle Switch */}
        <div className="flex bg-neutral-900 p-1 rounded-2xl mb-8 border border-neutral-800">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'deposit' 
                ? 'bg-lime-400 text-black shadow-lg' 
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <ArrowDown size={16} strokeWidth={3} /> Deposit
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'withdraw' 
                ? 'bg-white text-black shadow-lg' 
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <ArrowUp size={16} strokeWidth={3} /> Withdraw
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-8 text-center relative">
          <p className="text-neutral-500 text-sm font-bold uppercase mb-4">
            {activeTab === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
          </p>
          <div className="relative inline-block">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-bold text-neutral-500">$</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-6xl font-bold text-white w-full text-center outline-none border-b-2 border-neutral-800 focus:border-lime-400 pb-2 pl-8 transition-colors placeholder-neutral-700"
              placeholder="0"
            />
          </div>
          {activeTab === 'withdraw' && (
            <p className="text-xs text-neutral-500 mt-2">
              Available: ${getCurrentBalance().toLocaleString()}
            </p>
          )}
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-3 mb-10">
          <PresetButton value="20" />
          <PresetButton value="50" />
          <PresetButton value="100" />
          <PresetButton value="200" />
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-neutral-500 uppercase mb-4">
            {activeTab === 'deposit' ? 'From' : 'To'}
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => setSelectedMethod('card')}
              className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                selectedMethod === 'card' 
                  ? activeTab === 'deposit' ? 'bg-neutral-800 border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.1)]' : 'bg-neutral-800 border-white shadow-lg'
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                <CreditCard size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-white text-sm">Debit Card</p>
                <p className="text-xs text-neutral-500">**** 4242</p>
              </div>
              {selectedMethod === 'card' && (
                <CheckCircle2 className={activeTab === 'deposit' ? "text-lime-400" : "text-white"} size={20} />
              )}
            </button>

            <button 
              onClick={() => setSelectedMethod('crypto')}
              className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                selectedMethod === 'crypto' 
                  ? activeTab === 'deposit' ? 'bg-neutral-800 border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.1)]' : 'bg-neutral-800 border-white shadow-lg'
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                <Wallet size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-white text-sm">Crypto Wallet</p>
                <p className="text-xs text-neutral-500">0x...8a92</p>
              </div>
              {selectedMethod === 'crypto' && (
                <CheckCircle2 className={activeTab === 'deposit' ? "text-lime-400" : "text-white"} size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleTransaction}
          disabled={loading || !amount || (activeTab === 'withdraw' && Number(amount) > getCurrentBalance())}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            activeTab === 'deposit' 
              ? 'bg-lime-400 text-black hover:bg-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]' 
              : 'bg-white text-black hover:bg-neutral-200 shadow-lg'
          }`}
        >
          {loading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
            />
          ) : (
            <>
              {activeTab === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdrawal'}
              <DollarSign size={20} strokeWidth={2.5} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}