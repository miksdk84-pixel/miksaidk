"use client";
import React from 'react';

export default function GlowHub() {
  const appointments = [
    { time: "09:22", title: "Opsamling: Transport", loc: "Klausdalsbrov. 275", color: "#94a3b8" },
    { time: "11:00", title: "Samtale: Dorte L", loc: "Rigshospitalet", color: "#3b82f6" },
    { time: "06:22", title: "Transport (Fredag)", loc: "Klausdalsbrov. 275", color: "#94a3b8" },
    { time: "08:00", title: "Dialyse (Fredag)", loc: "Klinik 8601", color: "#ef4444" },
    { time: "11:30", title: "Dialyse (Søndag)", loc: "Klinik 8601", color: "#ef4444" },
    { time: "12:30", title: "Karkirurgi (8. Maj)", loc: "Klinik 3111", color: "#10b981" }
  ];

  return (
    <div style={{ backgroundColor: '#020106', color: 'white', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {/* Header med Neon-look */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', margin: 0, letterSpacing: '-1.5px' }}>
              Godmorgen <span style={{ color: '#3b82f6' }}>Micki</span> ☀️
            </h1>
            <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', letterSpacing: '4px', marginTop: '5px' }}>HEALTH_SYNC_ACTIVE</p>
          </div>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '12px 20px', borderRadius: '20px', textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#3b82f6' }}>18°</div>
            <div style={{ fontSize: '8px', opacity: 0.5, fontWeight: 'bold' }}>SHORTS-VEJR</div>
          </div>
        </header>

        {/* Kalender-liste */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.3, letterSpacing: '3px', marginBottom: '8px' }}>DAGENS PROTOKOL</h2>
          {appointments.map((apt, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              padding: '20px', 
              borderRadius: '24px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderLeft: `6px solid ${apt.color}`
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>{apt.title}</div>
                <div style={{ fontSize: '10px', opacity: 0.4 }}>{apt.loc}</div>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '900', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>{apt.time}</div>
            </div>
          ))}
        </div>

        {/* BIF Status Footer */}
        <div style={{ marginTop: '40px', padding: '20px', borderRadius: '24px', background: 'linear-gradient(to bottom right, rgba(255, 222, 89, 0.1), transparent)', border: '1px solid rgba(255, 222, 89, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '8px', color: '#ffde59', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '4px' }}>SUPERLIGA_LIVE</p>
            <p style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic' }}>6. PLADS</p>
          </div>
          <div style={{ background: '#ffde59', color: 'black', padding: '10px', borderRadius: '12px', fontWeight: '900', fontStyle: 'italic' }}>BIF</div>
        </div>
      </div>
    </div>
  );
}
