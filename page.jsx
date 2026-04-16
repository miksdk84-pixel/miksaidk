"use client";
import React from 'react';

export default function Page() {
  const appointments = [
    { time: "09:22", title: "Opsamling: Transport", color: "#94a3b8" },
    { time: "11:00", title: "Samtale: Dorte L", color: "#3b82f6" },
    { time: "06:22", title: "Transport (Fre)", color: "#94a3b8" },
    { time: "08:00", title: "Dialyse (Fre)", color: "#ef4444" },
    { time: "11:30", title: "Dialyse (Søn)", color: "#ef4444" },
    { time: "12:30", title: "Karkirurgi (8/5)", color: "#10b981" }
  ];

  return (
    <div style={{ backgroundColor: '#020106', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontStyle: 'italic', fontWeight: '900', fontSize: '28px', marginBottom: '30px' }}>MIKS HUB</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {appointments.map((apt, i) => (
          <div key={i} style={{ 
            padding: '18px', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '18px', 
            borderLeft: `4px solid ${apt.color}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{apt.title}</span>
            <span style={{ opacity: 0.5, fontSize: '14px', fontWeight: '900' }}>{apt.time}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,222,89,0.2)', display: 'flex', justifyContent: 'space-between' }}>
         <span style={{ fontSize: '10px', color: '#ffde59', fontWeight: 'bold' }}>BIF_STATUS</span>
         <span style={{ fontWeight: '900' }}>6. PLADS</span>
      </div>
    </div>
  );
}
