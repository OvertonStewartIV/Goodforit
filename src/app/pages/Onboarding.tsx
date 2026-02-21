import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, User, Globe, Wallet, CreditCard, 
  BrainCircuit, CheckCircle2, ChevronRight, Upload, Camera, HeartHandshake
} from 'lucide-react';

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN', cryptoFriendly: true },
  { code: 'PH', name: 'Philippines', currency: 'PHP', cryptoFriendly: true },
  { code: 'US', name: 'United States', currency: 'USD', cryptoFriendly: true },
  { code: 'KE', name: 'Kenya', currency: 'KES', cryptoFriendly: true },
  { code: 'VN', name: 'Vietnam', currency: 'VND', cryptoFriendly: true },
  { code: 'MA', name: 'Morocco', currency: 'MAD', cryptoFriendly: false },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '', // 'lend', 'borrow', 'both'
    name: '',
    email: '',
    country: 'NG',
    fundingFocus: 'Business',
    avatar: null as string | null,
    currencyDisplay: 'Local',
    currencyUsage: 'Crypto',
    wantCard: false,
    financialGoal: '',
    repaymentFreq: 'Weekly',
    riskLevel: 'Medium',
    agreedToTerms: false,
    agreedToRisk: false,
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    if (localStorage.getItem('hasOnboarded')) {
      navigate('/app/home');
    }
  }, [navigate]);

  const finishOnboarding = () => {
    localStorage.setItem('hasOnboarded', 'true');
    // Save user profile for dashboard to pick up
    localStorage.setItem('userProfile', JSON.stringify({
      name: formData.name,
      trustScore: 85, // Start at 85
      level: 'Newcomer',
      country: formData.country
    }));
    navigate('/app/home');
  };

  // Progress Bar
  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white relative overflow-hidden selection:bg-lime-400 selection:text-black">
      {/* Background Blobs - Darker and subtler */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header / Progress */}
      <div className="px-6 pt-8 pb-4 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center text-black font-bold text-lg">G</div>
            <span className="font-bold text-lg tracking-tight">Good For It</span>
          </div>
          <span className="text-xs font-bold text-neutral-500">Step {step} of 5</span>
        </div>
        <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-lime-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 py-4 z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME & ROLE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center py-4">
                <h1 className="text-3xl font-bold mb-3">Your People Deserve to Know You're <span className="text-lime-400">Good For It</span> 💯</h1>
                <p className="text-neutral-400">Turn your community trust into real credit. No FICO score needed.</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => { updateForm('role', 'lend'); handleNext(); }}
                  className="w-full p-6 bg-neutral-900 border border-neutral-800 rounded-[2rem] hover:border-lime-500 hover:shadow-[0_0_20px_rgba(163,230,53,0.1)] transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-800 text-lime-400 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">I want to Vouch & Lend</h3>
                    <p className="text-sm text-neutral-500">Earn trust badges by backing your circle.</p>
                  </div>
                </button>

                <button 
                  onClick={() => { updateForm('role', 'borrow'); handleNext(); }}
                  className="w-full p-6 bg-neutral-900 border border-neutral-800 rounded-[2rem] hover:border-white hover:shadow-md transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">I need Funds</h3>
                    <p className="text-sm text-neutral-500">Build your "Good For It" score.</p>
                  </div>
                </button>

                <button 
                  onClick={() => { updateForm('role', 'both'); handleNext(); }}
                  className="w-full p-6 bg-neutral-900 border border-neutral-800 rounded-[2rem] hover:border-neutral-500 hover:shadow-md transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                    <HeartHandshake size={24} /> 
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">I'm Community</h3>
                    <p className="text-sm text-neutral-500">Full participation in your circle.</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: BASIC PROFILE */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
                <p className="text-neutral-400 text-sm">Let the community know who you are.</p>
              </div>

              {/* Avatar Upload */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-neutral-900 border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-neutral-500 cursor-pointer hover:bg-neutral-800 hover:border-neutral-500 transition-colors">
                  <Camera size={24} />
                  <span className="text-[10px] font-bold mt-1">Upload Photo</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:border-lime-400 focus:outline-none text-white placeholder:text-neutral-600"
                    placeholder="e.g. Maria Gonzalez"
                    value={formData.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Country</label>
                  <div className="relative">
                    <select 
                      className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:border-lime-400 focus:outline-none appearance-none text-white"
                      value={formData.country}
                      onChange={(e) => updateForm('country', e.target.value)}
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code} className="bg-neutral-900">{c.name} ({c.currency})</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="rotate-90 text-neutral-500" size={16} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Primary Funding Interest</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Business', 'Education', 'Emergency', 'Community'].map(type => (
                      <button
                        key={type}
                        onClick={() => updateForm('fundingFocus', type)}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          formData.fundingFocus === type 
                            ? 'bg-lime-400 text-black border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]' 
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CURRENCY PREFERENCES */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Money Your Way</h2>
                <p className="text-neutral-400 text-sm">How do you want to handle funds?</p>
              </div>

              <div className="bg-neutral-900 p-4 rounded-[2rem] border border-neutral-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Show Balances In</label>
                  <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                    {['Local', 'USD', 'Crypto'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => updateForm('currencyDisplay', opt)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                          formData.currencyDisplay === opt ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">I mainly use</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateForm('currencyUsage', 'Cash')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formData.currencyUsage === 'Cash' ? 'bg-lime-900/20 border-lime-500/50' : 'border-neutral-800 bg-neutral-950'
                      }`}
                    >
                      <div className={`font-bold ${formData.currencyUsage === 'Cash' ? 'text-lime-400' : 'text-white'}`}>Cash / Mobile</div>
                      <div className="text-xs text-neutral-500">M-Pesa, CashApp, Bank</div>
                    </button>
                    <button
                      onClick={() => updateForm('currencyUsage', 'Crypto')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formData.currencyUsage === 'Crypto' ? 'bg-lime-900/20 border-lime-500/50' : 'border-neutral-800 bg-neutral-950'
                      }`}
                    >
                      <div className={`font-bold ${formData.currencyUsage === 'Crypto' ? 'text-lime-400' : 'text-white'}`}>Crypto</div>
                      <div className="text-xs text-neutral-500">USDT, USDC, BTC</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Offer */}
              <div className="bg-gradient-to-br from-neutral-800 to-black rounded-[2rem] p-5 text-white relative overflow-hidden group cursor-pointer border border-neutral-700" onClick={() => updateForm('wantCard', !formData.wantCard)}>
                <div className="absolute top-0 right-0 p-3">
                  <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-colors ${formData.wantCard ? 'bg-lime-400 border-lime-400 text-black' : 'bg-transparent'}`}>
                    {formData.wantCard && <CheckCircle2 size={16} />}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="text-lime-400" />
                  <span className="font-bold text-lg">GFI Trust Card</span>
                </div>
                <p className="text-neutral-400 text-sm mb-2">Show your 94% Trust Score to the world.</p>
                <div className="text-xs font-bold bg-white/10 self-start inline-block px-2 py-1 rounded">
                  Get a free physical card
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AI PROFILING */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="inline-block p-3 bg-lime-400/10 rounded-full mb-3 text-lime-400">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Build Your Reputation</h2>
                <p className="text-neutral-400 text-sm">We'll help you show you're Good For It.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">What is your main financial goal?</label>
                  <textarea 
                    className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:border-lime-400 focus:outline-none text-white text-sm"
                    rows={3}
                    placeholder="e.g. I want to expand my small bakery business and need equipment..."
                    value={formData.financialGoal}
                    onChange={(e) => updateForm('financialGoal', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Preferred Repayment Schedule</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {['Weekly', 'Bi-Weekly', 'Monthly'].map(freq => (
                      <button
                        key={freq}
                        onClick={() => updateForm('repaymentFreq', freq)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold border whitespace-nowrap ${
                          formData.repaymentFreq === freq
                            ? 'bg-lime-400 text-black border-lime-400'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Risk Comfort Level</label>
                  <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                    <input 
                      type="range" 
                      min="1" 
                      max="3" 
                      step="1" 
                      className="w-full accent-lime-400 mb-2"
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        updateForm('riskLevel', val === 1 ? 'Low' : val === 2 ? 'Medium' : 'High');
                      }}
                    />
                    <div className="flex justify-between text-xs font-bold text-neutral-500">
                      <span className={formData.riskLevel === 'Low' ? 'text-lime-400' : ''}>Conservative</span>
                      <span className={formData.riskLevel === 'Medium' ? 'text-lime-400' : ''}>Balanced</span>
                      <span className={formData.riskLevel === 'High' ? 'text-lime-400' : ''}>Aggressive</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    * This helps us suggest appropriate loan terms and partners.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SAFETY & AGREEMENT */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* AI Analysis Result */}
              <div className="bg-neutral-900 text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden border border-neutral-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500 rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-sm">
                    <ShieldCheck size={24} className="text-lime-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">You're Good For It!</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      Your starting Trust Score is <span className="text-white font-bold">85%</span>. Connect with friends to boost it to <span className="text-white font-bold">94%</span>.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[10px] font-bold bg-lime-400/10 px-2 py-1 rounded text-lime-400 border border-lime-400/20">
                         {formData.riskLevel} Vibe
                       </span>
                       <span className="text-[10px] font-bold bg-lime-400/10 px-2 py-1 rounded text-lime-400 border border-lime-400/20">
                         {formData.repaymentFreq} Payback
                       </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-2">
                <h2 className="text-2xl font-bold mb-2">Safety First</h2>
                <p className="text-neutral-400 text-sm">Review and agree to continue.</p>
              </div>

              <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      id="terms"
                      className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-lime-400 focus:ring-lime-400 accent-lime-400"
                      checked={formData.agreedToTerms}
                      onChange={(e) => updateForm('agreedToTerms', e.target.checked)}
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-neutral-400">
                    I agree to the <span className="text-white font-bold underline cursor-pointer">Terms of Service</span> and Anti-Scam Policy. I understand my identity will be verified (KYC).
                  </label>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      id="risk"
                      className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-lime-400 focus:ring-lime-400 accent-lime-400"
                      checked={formData.agreedToRisk}
                      onChange={(e) => updateForm('agreedToRisk', e.target.checked)}
                    />
                  </div>
                  <label htmlFor="risk" className="text-sm text-neutral-400">
                    I understand that P2P lending carries risks. I will only lend what I can afford to lose.
                  </label>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer / Navigation */}
      <div className="p-6 bg-neutral-900 border-t border-neutral-800 z-20">
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-6 py-4 rounded-xl font-bold text-neutral-400 hover:bg-neutral-800 transition-colors"
            >
              Back
            </button>
          )}
          
          <button 
            onClick={step === 5 ? finishOnboarding : handleNext}
            disabled={step === 5 && (!formData.agreedToTerms || !formData.agreedToRisk)}
            className={`flex-1 py-4 rounded-xl font-bold text-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
              step === 5 && (!formData.agreedToTerms || !formData.agreedToRisk)
                ? 'bg-neutral-700 cursor-not-allowed shadow-none text-neutral-400'
                : 'bg-lime-400 hover:bg-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]'
            }`}
          >
            {step === 5 ? 'Get Started' : 'Continue'}
            {step < 5 && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
