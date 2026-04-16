"use client";
import React from 'react';

export default function GlowHub() {
  const appointments = [
    { time: "09:22", title: "Opsamling: Transport", loc: "Klausdalsbrov. 275", color: "blue" },
    { time: "11:00", title: "Samtale: Dorte L", loc: "Rigshospitalet", color: "indigo" },
    { time: "06:22", title: "Transport (Fredag)", loc: "Klausdalsbrov. 275", color: "blue" },
    { time: "08:00", title: "Dialyse (Fredag)", loc: "Klinik 8601", color: "red" },
    { time: "11:30", title: "Dialyse (Søndag)", loc: "Klinik 8601", color: "red" },
    { time: "12:30", title: "Karkirurgi (8/5)", loc: "Klinik 3111", color: "green" }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-md mx-auto relative">
        {/* Dekorativ baggrunds-glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <header className="flex justify-between items-start mb-12 relative z-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Godmorgen Micki ☀️
            </h1>
            <p className="text-[10px] text-blue-400 font-mono tracking-[0.4em] uppercase mt-2 font-bold">Health Sync v3.0</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem] text-right backdrop-blur-2xl shadow-2xl">
            <p className="text-2xl font-black text-blue-400 leading-none">18°</p>
            <p className="text-[8px] opacity-40 uppercase font-black tracking-tighter mt-1">Shorts-vejr</p>
          </div>
        </header>

        <section className="space-y-4 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase italic">Dagens Protokol</h2>
            <div className="h-[1px] flex-1 bg-white/5 ml-4" />
          </div>

          {appointments.map((apt, i) => (
            <div key={i} className="group relative bg-white/[0.03] border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-3xl flex justify-between items-center transition-all hover:bg-white/[0.06] hover:scale-[1.02] active:scale-95">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors">{apt.title}</h3>
                <p className="text-[10px] opacity-30 font-medium uppercase tracking-wider italic">{apt.loc}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black italic tracking-tighter text-white/90">{apt.time}</p>
              </div>
              {/* Lille neon-indikator */}
              <div className={`absolute left-6 -bottom-1 w-8 h-[2px] shadow-[0_0_10px_rgba(59,130,246,0.5)]`} style={{ backgroundColor: apt.color === 'red' ? '#ef4444' : apt.color === 'green' ? '#10b981' : '#3b82f6' }} />
            </div>
          ))}
        </section>

        {/* BIF STATUS FOOTER */}
        <div className="mt-12 p-6 rounded-[2.5rem] bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/10 flex justify-between items-center backdrop-blur-md">
          <div>
             <p className="text-[8px] font-black uppercase tracking-[0.2em] text-yellow-500/60 mb-1 italic">Brøndby IF Status</p>
             <p className="text-3xl font-black italic tracking-tighter">6. PLADS</p>
          </div>
          <div className="w-14 h-14 bg-yellow-500 rounded-[1.2rem] flex items-center justify-center text-black font-black italic text-xl shadow-lg shadow-yellow-500/20">BIF</div>
        </div>
      </div>
    </div>
  );
}
