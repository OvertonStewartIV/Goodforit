import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, ArrowDownLeft, Plus, Search, 
  TrendingUp, ShieldCheck, Users, Grip, Bell,
  Bitcoin, Wallet, ChevronRight, Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';

// Reusable Components matching the design system
const ActionButton = ({ icon: Icon, label, variant = 'primary', to }: { icon: any, label: string, variant?: 'primary' | 'secondary' | 'white', to?: string }) => {
  const content = (
    <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-transform active:scale-95 ${
      variant === 'primary' ? 'bg-lime-400 text-black' : 
      variant === 'white' ? 'bg-white text-black' :
      'bg-neutral-800 text-white border border-neutral-700'
    }`}>
      <Icon size={28} strokeWidth={2} />
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="flex flex-col items-center gap-2 group">
        {content}
        <span className="text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">{label}</span>
      </Link>
    );
  }

  return (
    <button className="flex flex-col items-center gap-2 group">
      {content}
      <span className="text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
};

const AvatarItem = ({ src, name, isSearch = false, onClick }: { src?: string, name: string, isSearch?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 min-w-[64px] group"
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-transform group-active:scale-95 ${isSearch ? 'border-neutral-700 bg-transparent text-white group-hover:bg-neutral-800' : 'border-transparent'}`}>
      {isSearch ? (
        <Search size={24} />
      ) : (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      )}
    </div>
    <span className="text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">{name}</span>
  </button>
);

const TransactionItem = ({ icon: Icon, title, date, amount, value, isPositive, isContract, onClick }: { icon: any, title: string, date: string, amount: string, value: string, isPositive?: boolean, isContract?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center justify-between py-3 cursor-pointer hover:bg-white/5 px-2 -mx-2 rounded-xl transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white relative">
        <Icon size={20} />
        {isContract && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 rounded-full flex items-center justify-center text-black border border-black">
            <span className="text-[8px] font-bold">S</span>
          </div>
        )}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          {title}
          {isContract && <span className="text-[10px] bg-neutral-800 text-lime-400 px-1.5 py-0.5 rounded border border-neutral-700">CONTRACT</span>}
        </h4>
        <p className="text-xs text-neutral-500">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-bold text-sm ${isPositive ? 'text-lime-400' : 'text-white'}`}>{amount}</p>
      <p className="text-xs text-neutral-500">{value}</p>
    </div>
  </div>
);

const BlockCard = ({ label, value, trend, color, subValue, onClick }: { label: string, value: string, trend?: string, color: string, subValue?: string, onClick?: () => void }) => (
  <motion.button 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-5 rounded-[2rem] flex flex-col justify-between h-32 relative overflow-hidden w-full text-left ${color}`}
  >
    <div className="flex justify-between items-start w-full">
      <span className={`text-xs font-bold uppercase tracking-wider ${color.includes('bg-lime') || color.includes('bg-white') ? 'text-black/60' : 'text-white/60'}`}>{label}</span>
      {trend && <ArrowUpRight size={20} className={color.includes('bg-lime') || color.includes('bg-white') ? 'text-black' : 'text-white'} />}
    </div>
    <div>
      <h3 className={`text-2xl font-bold leading-none mb-1 ${color.includes('bg-lime') || color.includes('bg-white') ? 'text-black' : 'text-white'}`}>{value}</h3>
      {subValue && <p className={`text-xs font-medium ${color.includes('bg-lime') || color.includes('bg-white') ? 'text-black/60' : 'text-white/60'}`}>{subValue}</p>}
    </div>
    
    {/* Decorative pattern */}
    <div className="absolute -bottom-4 -right-4 opacity-10">
      <TrendingUp size={80} />
    </div>
  </motion.button>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: 'Alex',
    balance: 94, // Changed from trustScore for display, but effectively the same visual spot
    level: 'Trust Keeper',
    country: 'NG'
  });

  React.useEffect(() => {
    // Function to load user data
    const loadUserData = () => {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Ensure balance exists, default to 94 if not
          if (parsed.balance === undefined) {
             parsed.balance = 94;
          }
          setUser(prev => ({ ...prev, ...parsed }));
        } catch (e) {}
      } else {
        // Initialize default if not present
        const defaultUser = {
           name: 'Alex',
           balance: 94,
           level: 'Trust Keeper',
           country: 'NG'
        };
        localStorage.setItem('userProfile', JSON.stringify(defaultUser));
        setUser(defaultUser);
      }
    };

    loadUserData();

    // Add event listener for storage changes (though mostly works across tabs)
    // For same-tab updates, we might need a custom event or context, 
    // but re-mounting (navigation back) usually triggers this effect.
    window.addEventListener('storage', loadUserData);
    return () => window.removeEventListener('storage', loadUserData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-lime-400 selection:text-black">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pt-2">
        <span className="font-medium text-neutral-400">GFI Wallet</span>
        <button 
          onClick={() => navigate('/app/connect')}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 group"
        >
          <Globe size={20} className="group-hover:animate-spin-slow" />
        </button>
      </header>

      {/* Main Balance Area */}
      <div className="mb-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <span className="text-neutral-500 text-sm font-medium mb-1 block">Trust Balance • GFI</span>
          <h1 className="text-6xl font-bold tracking-tighter text-white mb-2">
            {user.balance}<span className="text-2xl text-neutral-500">.00</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-lime-400 bg-lime-400/10 py-1 px-3 rounded-full mx-auto w-fit">
            <TrendingUp size={14} />
            <span className="text-xs font-bold">+2.4% this week</span>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-10">
        <ActionButton icon={ArrowUpRight} label="Vouch" variant="primary" to="/app/vouch" />
        <ActionButton icon={ArrowDownLeft} label="Request" variant="primary" to="/app/request" />
        <ActionButton icon={Wallet} label="Wallet" variant="white" to="/app/topup" />
      </div>

      {/* Analytics Blocks */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">This month</h2>
          <button className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400">
            <Grip size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
             <BlockCard 
               label="Trust Income" 
               value="$96k" 
               trend="up" 
               color="bg-lime-400" 
               subValue="Total vouched value"
               onClick={() => navigate('/app/trust-income')}
             />
          </div>
          <BlockCard 
            label="Deals" 
            value="901" 
            trend="up" 
            color="bg-neutral-800" 
            subValue="Successful loans"
            onClick={() => navigate('/app/deals')}
          />
          <BlockCard 
            label="Pending" 
            value="242" 
            trend="up" 
            color="bg-[#ff5555]" 
            subValue="Active & Owed"
            onClick={() => navigate('/app/pending')}
          />
        </div>
      </div>

      {/* Recents */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-white">Recents</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <AvatarItem name="Search" isSearch onClick={() => navigate('/app/search')} />
          <AvatarItem name="Keisha" src="https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=100&h=100&fit=crop" onClick={() => navigate('/app/user/keisha', { state: { avatar: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=200&fit=crop" } })} />
          <AvatarItem name="Wei" src="https://images.unsplash.com/photo-1633177188754-980c2a6b6266?w=100&h=100&fit=crop" onClick={() => navigate('/app/user/wei', { state: { avatar: "https://images.unsplash.com/photo-1633177188754-980c2a6b6266?w=200&fit=crop" } })} />
          <AvatarItem name="Priya" src="https://images.unsplash.com/photo-1667382137969-a11fd256717d?w=100&h=100&fit=crop" onClick={() => navigate('/app/user/priya', { state: { avatar: "https://images.unsplash.com/photo-1667382137969-a11fd256717d?w=200&fit=crop" } })} />
          <AvatarItem name="Jamal" src="https://images.unsplash.com/photo-1570158268183-d296b2892211?w=100&h=100&fit=crop" onClick={() => navigate('/app/user/jamal', { state: { avatar: "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=200&fit=crop" } })} />
          <AvatarItem name="Maria" src="https://images.unsplash.com/photo-1644044671706-95314b2bbb9a?w=100&h=100&fit=crop" onClick={() => navigate('/app/user/maria', { state: { avatar: "https://images.unsplash.com/photo-1644044671706-95314b2bbb9a?w=200&fit=crop" } })} />
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-white">Transactions</h3>
        <div className="bg-neutral-900 rounded-[2rem] p-4">
          <TransactionItem 
            icon={Bitcoin} 
            title="Sell Bitcoin" 
            date="Jun 8, 08:02 AM" 
            amount="-0.00050 BTC" 
            value="31,33 USDT" 
          />
          <TransactionItem 
            icon={Wallet} 
            title="Loan Offer" 
            date="Jun 1, 08:02 AM" 
            amount="+500 USDC" 
            value="Pending" 
            isPositive
            isContract
            onClick={() => navigate('/app/contract/123')}
          />
          <TransactionItem 
            icon={ShieldCheck} 
            title="Vouch Reward" 
            date="May 28, 14:20 PM" 
            amount="+50 Credits" 
            value="Trust Building" 
            isPositive
          />
        </div>
      </div>
    </div>
  );
}
