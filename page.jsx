"use client";
import React, { useState } from 'react';

export default function MiksAI() {
  // DINE RIGTIGE DATA FRA DINE BILLEDER (Dialyse, Transport & Rigshospitalet)
  const [appointments] = useState([
    { id: 1, time: "09:22 - 10:17", title: "Opsamling: Transport", loc: "Klausdalsbrov. 275", kat: "Transport", color: "#94a3b8" },
    { id: 2, time: "11:00", title: "Samtale med Dorte L", loc: "Rigshospitalet, klinik 4005ONKE", kat: "Sundhed", color: "#3b82f6" },
    { id: 3, time: "06:22 - 07:17", title: "Opsamling: Transport", loc: "Klausdalsbrov. 275", kat: "Transport", color: "#94a3b8" },
    { id: 4, time: "08:00", title: "Dialyse (6 timer)", loc: "Esther Møllers Vej 6, klinik 8601", kat: "Behandling", color: "#ef4444" },
    { id: 5, time: "11:30", title: "Dialyse (6 timer)", loc: "Esther Møllers Vej 6, klinik 8601", kat: "Behandling", color: "#ef4444" },
    { id: 6, time: "12:30", title: "Kontrol: Karkirurgi", loc: "Karkirurgi, klinik 3111", kat: "Kontrol", color: "#10b981" }
  ]);

  return (
    <div style={{ backgroundColor: '#02010a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', position: 'relative' }}>
      
      {/* BAGGRUND MED DIN "M" EFFEKT */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.2, backgroundImage: 'url(/backfest.png)', backgroundSize: 'cover', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at top left, rgba(59,130,246,0.15) 0%, transparent 50%)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '38px', fontWeight: '900', margin: 0, letterSpacing: '-2px', fontStyle: 'italic' }}>MIKS<span style={{ color: '#3b82f6' }}>AI</span></h1>
            <div style={{ fontSize: '9px', color: '#39ff14', fontWeight: 'bold', letterSpacing: '3px' }}>HEALTH_PROTOCOL_CONNECTED</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>16. APR 2026</div>
            <div style={{ fontSize: '10px', opacity: 0.5 }}>BAGSVÆRD</div>
          </div>
        </header>

        {/* KALENDER SEKTION */}
        <section>
          <h2 style={{ fontSize: '10px', fontWeight: '900', color: '#3b82f6', letterSpacing: '3px', marginBottom: '20px', textTransform: 'uppercase' }}>Dagens Protokol</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {appointments.map((apt) => (
              <div 
                key={apt.id} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  backdropFilter: 'blur(20px)', 
                  padding: '20px', 
                  borderRadius: '25px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderLeft: `5px solid ${apt.color}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '8px', fontWeight: 'bold', color: apt.color, marginBottom: '4px', textTransform: 'uppercase' }}>{apt.kat}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{apt.title}</div>
                  <div style={{ fontSize: '11px', opacity: 0.4, marginTop: '2px' }}>{apt.loc}</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '-1px' }}>{apt.time.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
          <div style={{ background: 'rgba(255,222,89,0.05)', border: '1px solid rgba(255,222,89,0.2)', padding: '15px', borderRadius: '20px' }}>
            <div style={{ fontSize: '8px', color: '#ffde59', fontWeight: 'bold', marginBottom: '5px' }}>BIF_STATUS</div>
            <div style={{ fontSize: '14px', fontWeight: '900' }}>6. PLADS</div>
          </div>
          <div style={{ background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)', padding: '15px', borderRadius: '20px' }}>
            <div style={{ fontSize: '8px', color: '#39ff14', fontWeight: 'bold', marginBottom: '5px' }}>SYSTEM</div>
            <div style={{ fontSize: '14px', fontWeight: '900' }}>OPTIMAL</div>
          </div>
        </div>

      </div>
    </div>
  );
}
