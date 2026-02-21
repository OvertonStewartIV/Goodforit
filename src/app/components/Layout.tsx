import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { Home, PlusCircle, Users, HandCoins, User, Globe, PenTool } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden max-w-md mx-auto shadow-2xl border-x border-neutral-800">
      {/* Good For It Branding Header can go here if needed, but nav is bottom */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide bg-gradient-to-b from-neutral-900 to-black">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900/90 backdrop-blur-md border-t border-neutral-800 px-6 py-4 flex justify-between items-center z-50 max-w-md mx-auto rounded-t-3xl">
        <NavLink 
          to="/app/home" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-lime-400 scale-110' : 'text-neutral-500 hover:text-neutral-300'}`
          }
        >
          {({ isActive }) => (
            <>
              <Home size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="w-1 h-1 rounded-full bg-lime-400 mt-1"></span>}
            </>
          )}
        </NavLink>
        
        <NavLink 
          to="/app/connect" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-lime-400 scale-110' : 'text-neutral-500 hover:text-neutral-300'}`
          }
        >
          {({ isActive }) => (
            <>
              <Globe size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="w-1 h-1 rounded-full bg-lime-400 mt-1"></span>}
            </>
          )}
        </NavLink>
        
        <NavLink 
          to="/app/add" 
          className="flex flex-col items-center gap-1 -mt-10"
        >
          <div className="bg-lime-400 text-black p-4 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 transition-transform border-[6px] border-black">
            <PenTool size={28} strokeWidth={2.5} />
          </div>
        </NavLink>
        
        <NavLink 
          to="/app/loans" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-lime-400 scale-110' : 'text-neutral-500 hover:text-neutral-300'}`
          }
        >
          {({ isActive }) => (
            <>
              <HandCoins size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="w-1 h-1 rounded-full bg-lime-400 mt-1"></span>}
            </>
          )}
        </NavLink>
        
        <NavLink 
          to="/app/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-lime-400 scale-110' : 'text-neutral-500 hover:text-neutral-300'}`
          }
        >
          {({ isActive }) => (
            <>
              <User size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="w-1 h-1 rounded-full bg-lime-400 mt-1"></span>}
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}
