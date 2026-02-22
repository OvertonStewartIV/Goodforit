import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Mail, Smartphone, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('hasOnboarded', 'true');
      // Set a mock user profile if not exists
      if (!localStorage.getItem('userProfile')) {
        localStorage.setItem('userProfile', JSON.stringify({
          name: 'Returning User',
          trustScore: 92,
          level: 'Voucher',
          country: 'US',
          cardType: 'GFI Prepaid'
        }));
      }
      navigate('/app/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white relative overflow-hidden selection:bg-lime-400 selection:text-black">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="p-6">
        <button 
          onClick={() => navigate('/')}
          className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold"
        >
          ← Back
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-20 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-lime-400 rounded-2xl mx-auto mb-6 flex items-center justify-center text-black font-bold text-3xl shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              G
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-neutral-400">Continue your financial journey.</p>
          </div>

          {/* Login Method Toggle */}
          <div className="bg-neutral-900/50 p-1 rounded-xl flex border border-neutral-800">
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                method === 'email' 
                  ? 'bg-neutral-800 text-white shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                method === 'phone' 
                  ? 'bg-neutral-800 text-white shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  {method === 'email' ? <Mail size={20} /> : <Smartphone size={20} />}
                </div>
                <input
                  type={method === 'email' ? 'email' : 'tel'}
                  required
                  placeholder={method === 'email' ? 'Enter your email' : 'Enter mobile number'}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all"
                  value={formData.identifier}
                  onChange={(e) => setFormData(prev => ({ ...prev, identifier: e.target.value }))}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-neutral-500 hover:text-lime-400 transition-colors">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-lime-400 text-black font-bold text-lg py-4 rounded-2xl hover:bg-lime-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Log In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-neutral-800"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-black px-4 text-neutral-500 font-bold">Or continue with</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="py-3 px-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 text-sm font-bold text-neutral-300 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button type="button" className="py-3 px-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 text-sm font-bold text-neutral-300 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              Apple
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-neutral-500 text-xs">
          Don't have an account? <button onClick={() => navigate('/')} className="text-lime-400 font-bold hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
}