import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Wallet, CreditCard, User, Shield, 
  Bell, Lock, LogOut, ChevronRight, Plus, Smartphone,
  RefreshCw, Settings as SettingsIcon
} from 'lucide-react';
import { useNavigate } from 'react-router';

const SettingItem = ({ icon: Icon, label, value, onClick, color = "text-white" }: { icon: any, label: string, value?: string, onClick?: () => void, color?: string }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-2xl mb-3 hover:bg-neutral-800 transition-colors group"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <span className="font-bold text-white text-sm">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-neutral-500 text-xs font-medium">{value}</span>}
      <ChevronRight size={16} className="text-neutral-600" />
    </div>
  </button>
);

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 px-2 mt-6">{title}</h2>
);

export default function Settings() {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [cardConnected, setCardConnected] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans selection:bg-lime-400 selection:text-black">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-neutral-900 rounded-[2rem] border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-[40px] translate-x-10 -translate-y-10 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full border-2 border-lime-400 p-1 relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&fit=crop" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover" 
            />
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-black border-2 border-neutral-900">
              <RefreshCw size={12} />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Alex</h2>
            <p className="text-xs text-neutral-400">Trust Keeper • Level 4</p>
            <button className="text-xs text-lime-400 font-bold mt-1 hover:underline">Edit Profile</button>
          </div>
        </div>

        <SectionHeader title="Finance & Wallets" />
        <SettingItem 
          icon={Wallet} 
          label="Connect Crypto Wallet" 
          value={walletConnected ? "0x71...92F" : "Not Connected"} 
          color="text-orange-400"
          onClick={() => setWalletConnected(!walletConnected)}
        />
        <SettingItem 
          icon={CreditCard} 
          label="Personal Card" 
          value={cardConnected ? "Visa •••• 4242" : "Add Card"} 
          color="text-cyan-400"
        />
        <SettingItem 
          icon={Plus} 
          label="Top Up Account" 
          color="text-lime-400"
        />

        <SectionHeader title="Account Security" />
        <SettingItem 
          icon={Lock} 
          label="Security & Privacy" 
          color="text-purple-400"
        />
        <SettingItem 
          icon={Smartphone} 
          label="Two-Factor Auth" 
          value="Enabled"
          color="text-pink-400"
        />
        <SettingItem 
          icon={Shield} 
          label="Identity Verification" 
          value="Verified"
          color="text-green-400"
        />

        <SectionHeader title="App Preferences" />
        <SettingItem 
          icon={Bell} 
          label="Notifications" 
          color="text-yellow-400"
        />
        
        <button className="w-full py-4 mt-8 rounded-xl border border-red-900/50 text-red-500 font-bold text-sm hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2">
          <LogOut size={16} />
          Log Out
        </button>

        <p className="text-center text-[10px] text-neutral-600 mt-8">
          Version 1.0.4 • Build 2026.02.21
        </p>
      </motion.div>
    </div>
  );
}
