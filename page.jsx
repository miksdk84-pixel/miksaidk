"use client";
import React from 'react';

export default function GlowHub() {
  // HER ER DINE RIGTIGE DATA FRA DINE BILLEDER
  const appointments = [
    { time: "09:22", title: "Opsamling: Transport", loc: "Klausdalsbrov. 275", color: "border-gray-500" },
    { time: "11:00", title: "Samtale: Dorte L", loc: "Rigshospitalet", color: "border-blue-500" },
    { time: "06:22", title: "Transport (Fredag)", loc: "Klausdalsbrov. 275", color: "border-gray-500" },
    { time: "08:00", title: "Dialyse (Fredag)", loc: "Klinik 8601", color: "border-red-500" },
    { time: "11:30", title: "Dialyse (Søndag)", loc: "Klinik 8601", color: "border-red-500" },
    { time: "12:30", title: "Karkirurgi (8/5)", loc: "Klinik 3111", color: "border-green-500" }
  ];

  return (
    <div className="min-h-screen bg-[#020106] text-white p-6 font-sans">
      {/* HEADER & WEATHER */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-black italic tracking-tighter">Godmorgen Micki ☀️</h1>
          <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-3xl text-right">
            <p className="text-xs font-bold text-blue-400">18° ☀️</p>
            <p className="text-[8px] opacity-50 uppercase tracking-widest italic">Shorts-vejr</p>
          </div>
        </div>

        {/* APPOINTMENTS - DIT FLOTTE LAYOUT */}
        <section>
          <h2 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-6">Dagens Protokol</h2>
          <div className="grid gap-4">
            {appointments.map((apt, i) => (
              <div key={i} className={`bg-white/5 border-l-4 ${apt.color} p-5 rounded-3xl backdrop-blur-xl flex justify-between items-center`}>
                <div>
                  <h3 className="font-bold text-lg">{apt.title}</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-tighter">{apt.loc}</p>
                </div>
                <div className="text-right font-black text-xl tracking-tighter italic">
                  {apt.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BIF STATUS */}
        <div className="mt-10 p-5 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">BIF_LEAGUE</span>
          <span className="text-xl font-black italic">6. PLADS</span>
        </div>
      </div>
    </div>
  );
}
