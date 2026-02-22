import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Calendar, BookOpen, Briefcase, 
  FileText, Users, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router';

const ServiceCard = ({ icon: Icon, title, description, availability, onBook }: { icon: any, title: string, description: string, availability: string, onBook: () => void }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-neutral-900 border border-neutral-800 p-5 rounded-[2rem] flex flex-col justify-between h-full group hover:border-lime-400/50 transition-colors"
  >
    <div>
      <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:bg-lime-400 group-hover:text-black transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 mb-4">{description}</p>
    </div>
    
    <div>
      <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase mb-4">
        <Calendar size={14} />
        {availability}
      </div>
      <button 
        onClick={onBook}
        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-lime-400 transition-colors"
      >
        Book Session
      </button>
    </div>
  </motion.div>
);

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Wraparound Supports</h1>
          <p className="text-neutral-500 text-xs">Funded by The Community Trust</p>
        </div>
      </header>

      <div className="mb-8 bg-lime-900/10 border border-lime-500/20 p-6 rounded-[2rem] flex items-start gap-4">
        <div className="p-3 bg-lime-400 rounded-full text-black shrink-0">
           <HeartHandshake size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-1">More Than Just Capital</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            We believe in holistic growth. Our "Wraparound Supports" fund provides free access to professional services to help you succeed, not just repay.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServiceCard 
          icon={Users}
          title="Financial Coaching"
          description="1-on-1 sessions to help you build a budget, improve credit, and plan for the future."
          availability="Next: Mon, 10am"
          onBook={() => {}}
        />
        <ServiceCard 
          icon={FileText}
          title="Tax Prep Assistance"
          description="Expert guidance on filing taxes for your small business or personal finances."
          availability="Seasonal"
          onBook={() => {}}
        />
        <ServiceCard 
          icon={Briefcase}
          title="Career Counseling"
          description="Resume reviews, interview prep, and connections to local job opportunities."
          availability="Next: Tue, 2pm"
          onBook={() => {}}
        />
        <ServiceCard 
          icon={BookOpen}
          title="Benefits Navigation"
          description="Help identifying and applying for public benefits you may be eligible for."
          availability="Walk-ins Welcome"
          onBook={() => {}}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-neutral-600">
          Powered by <span className="font-bold text-neutral-500">The Community Trust Fund</span> operations budget.
        </p>
      </div>
    </div>
  );
}