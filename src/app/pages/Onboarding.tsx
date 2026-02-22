import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, User, Globe, Wallet, CreditCard, 
  BrainCircuit, CheckCircle2, ChevronRight, Upload, Camera, HeartHandshake,
  Landmark, Smartphone, ScanFace, Building2, Briefcase, GraduationCap, Users
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
  const totalSteps = 6;
  
  const [formData, setFormData] = useState({
    // Step 1
    role: '', 
    // Step 2
    name: '',
    email: '',
    phone: '',
    country: 'NG',
    idType: '',
    // Step 3
    incomeSource: '',
    financialGoal: '',
    problem: [],
    partners: [],
    metrics: [],
    // Step 4
    cardChoice: '', // 'connect' or 'issue'
    cardType: 'physical', // 'physical' or 'virtual'
    // Step 5
    fundingFocus: 'Business',
    repaymentFreq: 'Weekly',
    riskLevel: 'Medium',
    // Step 6
    agreedToTerms: false,
    agreedToRisk: false,
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (key: string, item: string) => {
    setFormData(prev => {
      // @ts-ignore
      const current = prev[key] || [];
      if (current.includes(item)) {
        return { ...prev, [key]: current.filter((i: string) => i !== item) };
      } else {
        return { ...prev, [key]: [...current, item] };
      }
    });
  };

  React.useEffect(() => {
    // Check if already onboarded
    // if (localStorage.getItem('hasOnboarded')) {
    //   navigate('/app/home');
    // }
  }, [navigate]);

  const finishOnboarding = () => {
    localStorage.setItem('hasOnboarded', 'true');
    localStorage.setItem('userProfile', JSON.stringify({
      name: formData.name,
      trustScore: 85,
      impactScore: 12, // New metric
      level: 'Community Member',
      country: formData.country,
      cardType: formData.cardChoice === 'issue' ? 'GFI Impact' : 'Connected Bank'
    }));
    navigate('/app/home');
  };

  // Progress Bar
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white relative overflow-hidden selection:bg-lime-400 selection:text-black">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header / Progress */}
      <div className="px-6 pt-8 pb-4 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center text-black font-bold text-lg">G</div>
            <span className="font-bold text-lg tracking-tight">Good For It</span>
          </div>
          <span className="text-xs font-bold text-neutral-500">Step {step} of {totalSteps}</span>
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
      <div className="flex-1 px-6 py-4 z-10 overflow-y-auto scrollbar-hide">
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
              <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1762608206423-be8c07645de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29tbXVuaXR5JTIwdm9sdW50ZWVycyUyMGxhdWdoaW5nJTIwd29ya2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MTczMDM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="Community" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <div className="bg-lime-400 text-black text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">INVEST IN IMPACT</div>
                  <h2 className="text-xl font-bold text-white leading-tight">Fund Causes,<br/>Not Individuals.</h2>
                </div>
              </div>

              <div className="text-left px-2">
                <h1 className="text-3xl font-bold mb-2">Hi there! 👋</h1>
                <p className="text-neutral-400 text-lg">Support the non-profits shaping our future.</p>
              </div>

              <div className="grid gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { updateForm('role', 'investor'); handleNext(); }}
                  className="w-full p-5 bg-neutral-900 border border-neutral-800 rounded-[2rem] hover:border-lime-500 hover:shadow-[0_0_20px_rgba(163,230,53,0.1)] transition-all text-left flex items-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800 text-lime-400 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors shadow-lg relative z-10">
                    <Wallet size={28} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg text-white group-hover:text-lime-400 transition-colors">I want to Fund Non-Profits</h3>
                    <p className="text-sm text-neutral-500">Donate & track social impact.</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="text-lime-400" />
                  </div>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { updateForm('role', 'nonprofit'); handleNext(); }}
                  className="w-full p-5 bg-neutral-900 border border-neutral-800 rounded-[2rem] hover:border-white hover:shadow-md transition-all text-left flex items-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shadow-lg relative z-10">
                    <Building2 size={28} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg text-white">I Represent a Non-Profit</h3>
                    <p className="text-sm text-neutral-500">Register for funding & grants.</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="text-white" />
                  </div>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { updateForm('role', 'volunteer'); handleNext(); }}
                  className="w-full p-5 bg-neutral-900 border border-neutral-800 rounded-[2rem] hover:border-neutral-500 hover:shadow-md transition-all text-left flex items-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800 text-neutral-300 flex items-center justify-center group-hover:bg-neutral-700 group-hover:text-white transition-colors shadow-lg relative z-10">
                    <HeartHandshake size={28} /> 
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg text-white">I want to Volunteer</h3>
                    <p className="text-sm text-neutral-500">Join projects & mobilize.</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="text-neutral-300" />
                  </div>
                </motion.button>
              </div>

              <div className="text-center pt-4">
                 <button 
                   onClick={() => navigate('/login')}
                   className="text-sm text-neutral-500 hover:text-white transition-colors"
                 >
                   Already have an account? <span className="text-lime-400 font-bold">Log in</span>
                 </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: KYC / IDENTITY */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Who Are You?</h2>
                <p className="text-neutral-400 text-sm">Join the community driving real change.</p>
              </div>

              {/* Avatar Upload */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-neutral-900 border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-neutral-500 cursor-pointer hover:bg-neutral-800 hover:border-neutral-500 transition-colors">
                  <Camera size={24} />
                  <span className="text-[10px] font-bold mt-1">Selfie</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Legal Name</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:border-lime-400 focus:outline-none text-white placeholder:text-neutral-600"
                    placeholder="As it appears on ID"
                    value={formData.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Country</label>
                    <select 
                      className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:border-lime-400 focus:outline-none appearance-none text-white text-sm"
                      value={formData.country}
                      onChange={(e) => updateForm('country', e.target.value)}
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code} className="bg-neutral-900">{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Mobile</label>
                    <input 
                      type="tel" 
                      className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:border-lime-400 focus:outline-none text-white placeholder:text-neutral-600 text-sm"
                      placeholder="+1 (555)..."
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Verify with ID</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['National ID', 'Passport', 'Driver Lic.'].map(type => (
                      <button
                        key={type}
                        onClick={() => updateForm('idType', type)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                          formData.idType === type 
                            ? 'bg-lime-400 text-black border-lime-400' 
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                        }`}
                      >
                        <ScanFace size={20} />
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FINANCIAL PROFILE */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Financial Pulse</h2>
                <p className="text-neutral-400 text-sm">Help us understand your money moves.</p>
              </div>

              <div className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Primary Sector</label>
                   <div className="grid grid-cols-2 gap-3">
                     {[
                       { id: 'education', label: 'Education', icon: GraduationCap },
                       { id: 'health', label: 'Healthcare', icon: HeartHandshake },
                       { id: 'environment', label: 'Environment', icon: Globe },
                       { id: 'community', label: 'Community', icon: Users },
                     ].map(item => (
                       <button
                         key={item.id}
                         onClick={() => updateForm('incomeSource', item.id)}
                         className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                           formData.incomeSource === item.id 
                             ? 'bg-lime-900/20 border-lime-500/50 text-white' 
                             : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                         }`}
                       >
                         <item.icon size={20} className={formData.incomeSource === item.id ? 'text-lime-400' : 'text-neutral-600'} />
                         <span className="font-bold text-sm">{item.label}</span>
                       </button>
                     ))}
                   </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-3">Key Focus Area</label>
                    <div className="flex flex-wrap gap-2">
                       {['Poverty Alleviation', 'Quality Education', 'Climate Action', 'Gender Equality', 'Healthcare Access', 'Clean Water', 'Zero Hunger'].map(opt => (
                         <button
                           key={opt}
                           // @ts-ignore
                           onClick={() => toggleSelection('problem', opt)}
                           className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all ${
                             // @ts-ignore
                             (formData.problem || []).includes(opt)
                               ? 'bg-lime-400 text-black border-lime-400' 
                               : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                           }`}
                         >
                           {opt}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-3">Key Partners</label>
                    <div className="flex flex-wrap gap-2">
                       {['Local Volunteers', 'Corporate Sponsors', 'Government Agencies', 'International NGOs', 'Community Leaders', 'Tech Startups'].map(opt => (
                         <button
                           key={opt}
                           // @ts-ignore
                           onClick={() => toggleSelection('partners', opt)}
                           className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all ${
                             // @ts-ignore
                             (formData.partners || []).includes(opt)
                               ? 'bg-lime-400 text-black border-lime-400' 
                               : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                           }`}
                         >
                           {opt}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-3">Impact Metrics</label>
                    <div className="flex flex-wrap gap-2">
                       {['Lives Impacted', 'Funds Deployed', 'Projects Completed', 'CO2 Reduced', 'Jobs Created', 'Students Enrolled'].map(opt => (
                         <button
                           key={opt}
                           // @ts-ignore
                           onClick={() => toggleSelection('metrics', opt)}
                           className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all ${
                             // @ts-ignore
                             (formData.metrics || []).includes(opt)
                               ? 'bg-lime-400 text-black border-lime-400' 
                               : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                           }`}
                         >
                           {opt}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: BANKING / CARD SELECTION */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Connect & Give</h2>
                <p className="text-neutral-400 text-sm">How do you want to move impact?</p>
              </div>

              <div className="space-y-4">
                {/* Option A: Connect Existing */}
                <button 
                  onClick={() => updateForm('cardChoice', 'connect')}
                  className={`w-full p-5 rounded-[2rem] border transition-all text-left relative overflow-hidden group ${
                    formData.cardChoice === 'connect' 
                      ? 'bg-neutral-800 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.1)]' 
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-3 bg-neutral-950 rounded-xl">
                      <Landmark size={24} className="text-white" />
                    </div>
                    {formData.cardChoice === 'connect' && <CheckCircle2 className="text-lime-400" size={24} />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Connect Existing Card</h3>
                  <p className="text-xs text-neutral-400">Link your Debit/Credit card instantly.</p>
                  <div className="flex gap-2 mt-3 opacity-50">
                    <div className="w-8 h-5 bg-white/20 rounded"></div>
                    <div className="w-8 h-5 bg-white/20 rounded"></div>
                  </div>
                </button>

                <div className="flex items-center gap-4">
                  <div className="h-px bg-neutral-800 flex-1"></div>
                  <span className="text-neutral-600 text-xs font-bold uppercase">OR</span>
                  <div className="h-px bg-neutral-800 flex-1"></div>
                </div>

                {/* Option B: Get GoodForIt Card */}
                <div 
                  onClick={() => updateForm('cardChoice', 'issue')}
                  className={`w-full p-0 rounded-[2rem] border transition-all text-left relative overflow-hidden group cursor-pointer ${
                    formData.cardChoice === 'issue' 
                      ? 'bg-neutral-800 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.1)]' 
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  {/* Card Visual Background */}
                  <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1639322537228-ad7117a76411?w=500')] bg-cover bg-center" />
                  
                  <div className="p-5 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-lime-400 rounded-xl text-black">
                        <CreditCard size={24} />
                      </div>
                      {formData.cardChoice === 'issue' && <CheckCircle2 className="text-lime-400" size={24} />}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Get the GFI Grant Card</h3>
                    <p className="text-xs text-neutral-400 mb-4">Partnered with <span className="text-white font-bold">Evolve Bank & Trust</span> for social good.</p>
                    
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-lime-400" /> Direct funds to community projects
                      </li>
                      <li className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-lime-400" /> Track your inclusive growth impact
                      </li>
                    </ul>

                    {formData.cardChoice === 'issue' && (
                       <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                         <button 
                           onClick={(e) => { e.stopPropagation(); updateForm('cardType', 'physical'); }}
                           className={`flex-1 py-2 text-xs font-bold rounded-lg border text-center ${formData.cardType === 'physical' ? 'bg-lime-400 text-black border-lime-400' : 'bg-black/50 text-white border-white/20'}`}
                         >
                           Physical Card
                         </button>
                         <button 
                           onClick={(e) => { e.stopPropagation(); updateForm('cardType', 'virtual'); }}
                           className={`flex-1 py-2 text-xs font-bold rounded-lg border text-center ${formData.cardType === 'virtual' ? 'bg-lime-400 text-black border-lime-400' : 'bg-black/50 text-white border-white/20'}`}
                         >
                           Virtual Only
                         </button>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: TRUST ASSESSMENT */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                 <div className="inline-block p-3 bg-lime-400/10 rounded-full mb-3 text-lime-400">
                   <ShieldCheck size={32} />
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Community Impact Score</h2>
                 <p className="text-neutral-400 text-sm">How do you want to participate?</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Impact Goal Level</label>
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
                      <span className={formData.riskLevel === 'Low' ? 'text-lime-400' : ''}>Local</span>
                      <span className={formData.riskLevel === 'Medium' ? 'text-lime-400' : ''}>Regional</span>
                      <span className={formData.riskLevel === 'High' ? 'text-lime-400' : ''}>Global</span>
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-neutral-400 mb-2">Donation Frequency</label>
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                     {['One-Time', 'Monthly', 'Annual'].map(freq => (
                       <button
                         key={freq}
                         onClick={() => updateForm('repaymentFreq', freq)}
                         className={`px-4 py-3 rounded-xl text-sm font-bold border whitespace-nowrap flex-1 ${
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
                   <label className="block text-sm font-bold text-neutral-400 mb-2">Impact Sector</label>
                   <div className="flex flex-wrap gap-2">
                     {['Education', 'Environment', 'Healthcare', 'Housing', 'Civil Rights'].map(type => (
                       <button
                         key={type}
                         onClick={() => updateForm('fundingFocus', type)}
                         className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all ${
                           formData.fundingFocus === type 
                             ? 'bg-lime-400 text-black border-lime-400' 
                             : 'bg-neutral-900 text-neutral-400 border-neutral-800'
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

          {/* STEP 6: SAFETY & AGREEMENT */}
          {step === 6 && (
            <motion.div
              key="step6"
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
                    <BrainCircuit size={24} className="text-lime-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">You're a Changemaker!</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      Based on your profile, your starting Community Impact Score is <span className="text-white font-bold">85%</span>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] font-bold bg-lime-400/10 px-2 py-1 rounded text-lime-400 border border-lime-400/20">
                         {formData.incomeSource.toUpperCase()}
                       </span>
                       <span className="text-[10px] font-bold bg-lime-400/10 px-2 py-1 rounded text-lime-400 border border-lime-400/20">
                         {formData.cardChoice === 'issue' ? 'GFI CARD' : 'BANK CONNECT'}
                       </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-2">
                <h2 className="text-2xl font-bold mb-2">Final Check</h2>
                <p className="text-neutral-400 text-sm">Safe, secure, and community driven.</p>
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
                    I agree to the <span className="text-white font-bold underline cursor-pointer">Terms</span> and I authorize Evolve Bank & Trust to verify my identity.
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
                    I understand that "Good For It" uses community trust scores, not FICO scores.
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
            onClick={step === totalSteps ? finishOnboarding : handleNext}
            disabled={
              (step === 2 && (!formData.name || !formData.idType)) ||
              (step === 4 && !formData.cardChoice) ||
              (step === totalSteps && (!formData.agreedToTerms || !formData.agreedToRisk))
            }
            className={`flex-1 py-4 rounded-xl font-bold text-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
              ((step === 2 && (!formData.name || !formData.idType)) ||
               (step === 4 && !formData.cardChoice) ||
               (step === totalSteps && (!formData.agreedToTerms || !formData.agreedToRisk)))
                ? 'bg-neutral-700 cursor-not-allowed shadow-none text-neutral-400'
                : 'bg-lime-400 hover:bg-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]'
            }`}
          >
            {step === totalSteps ? 'Get Started' : 'Continue'}
            {step < totalSteps && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}