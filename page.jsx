import React, { useState, useEffect } from 'react';

export default function MiksAI() {
  const [inputText, setInputText] = useState("");
  const [kalender, setKalender] = useState([
    { tid: "11:00", event: "Samtale m. Dorte L", lok: "Rigshospitalet", kat: "Health" },
    { tid: "08:00 (Fre)", event: "Behandling m. Nina H", lok: "Rigshospitalet", kat: "Health" }
  ]);
  const [madplan, setMadplan] = useState([
    { d: "Man", r: "Pasta Bolognese", c: "#ff3131" },
    { d: "Tir", r: "Laks m. Ris", c: "#ffcc00" },
    { d: "Ons", r: "Kylling m. Grønt", c: "#b266ff" }
  ]);
  const [chatLog, setChatLog] = useState([
    { role: 'ai', text: 'MiksAI v5.0 Online. Send dine screenshots eller indtast info herunder.' }
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.toLowerCase();
    const newLog = [...chatLog, { role: 'user', text: inputText }];
    setChatLog(newLog);
    
    // AI logik til kalender-opdatering
    if (userMsg.includes("aftale") || userMsg.includes("kl")) {
      const tidMatch = inputText.match(/(\d{2}:\d{2})/);
      const tid = tidMatch ? tidMatch[0] : "??:??";
      const event = inputText.replace(/aftale|kl|(\d{2}:\d{2})/gi, "").trim();
      setKalender(prev => [...prev, { tid, event, kat: "User" }].sort((a,b) => a.tid.localeCompare(b.tid)));
      setTimeout(() => setChatLog([...newLog, { role: 'ai', text: 'Forstået. Din Sundhedsprotokol er opdateret.' }]), 400);
    } else {
      setTimeout(() => setChatLog([...newLog, { role: 'ai', text: 'Information modtaget. Jeg lærer af dine data.' }]), 400);
    }
    setInputText("");
  };

  const genererMadplan = () => {
    const sundeRetter = ["Salat Bowl", "Bagt Torsk", "Grøntsagswok", "Kyllingesalat", "Smoothie Bowl", "Omelet"];
    const nyeRetter = madplan.map(m => ({
      ...m,
      r: sundeRetter[Math.floor(Math.random() * sundeRetter.length)]
    }));
    setMadplan(nyeRetter);
  };

  return (
    <div style={{ backgroundColor: '#02010a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: '-apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 2026 BACKGROUND ENGINE */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.3, backgroundImage: 'url(/backfest.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at top left, rgba(255,49,49,0.15) 0%, transparent 60%), radial-gradient(circle at bottom right, rgba(57,255,20,0.1) 0%, transparent 60%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px', margin: '0 auto', paddingBottom: '140px' }}>
        
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px', paddingTop: '10px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '100', margin: 0 }}>Miks<span style={{ fontWeight: '900' }}>AI</span></h1>
            <div style={{ fontSize: '9px', color: '#39ff14', fontWeight: 'bold', letterSpacing: '3px' }}>DATA_SCAN_ACTIVE</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>TORSDAG 16. APR</div>
            <div style={{ fontSize: '10px', opacity: 0.5 }}>HJORTESPRING</div>
          </div>
        </header>

        {/* SUNDHEDS PROTOKOL (Dine Screenshots lander her) */}
        <section style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(35px)', padding: '25px', borderRadius: '35px', border: '1px solid rgba(57,255,20,0.3)', marginBottom: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <h3 style={{ fontSize: '10px', color: '#39ff14', letterSpacing: '2px', marginBottom: '20px', fontWeight: '900' }}>HEALTH_SYNC_PROTOCOL</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {kalender.map((k, i) => (
              <div key={i} style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', borderLeft: '4px solid #39ff14' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '900', color: '#39ff14' }}>{k.tid}</span>
                  <span style={{ fontSize: '9px', opacity: 0.4 }}>RIGSHOSPITALET</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{k.event}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SPORT & MADPLAN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <section style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(30px)', padding: '20px', borderRadius: '30px', border: '1px solid rgba(255,222,89,0.2)' }}>
            <h3 style={{ fontSize: '9px', color: '#ffde59', marginBottom: '12px', fontWeight: '900' }}>SUPERLIGA</h3>
            <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>1. AGF</span> <b>56</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffde59' }}><span>6. BIF</span> <b>35</b></div>
              <div style={{ fontSize: '8px', opacity: 0.4, marginTop: '5px' }}>Næste: BIF v SØN</div>
            </div>
          </section>

          <section style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(30px)', padding: '20px', borderRadius: '30px', border: '1px solid rgba(178,102,255,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '9px', color: '#b266ff', fontWeight: '900' }}>MENU</h3>
              <button onClick={genererMadplan} style={{ background: 'none', border: '1px solid #b266ff', color: '#b266ff', fontSize: '7px', borderRadius: '5px', cursor: 'pointer' }}>GENTAG</button>
            </div>
            {madplan.slice(0, 3).map((m, i) => (
              <div key={i} style={{ fontSize: '10px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ opacity: 0.4 }}>{m.d}</span>
                <span style={{ fontWeight: 'bold' }}>{m.r}</span>
              </div>
            ))}
          </section>
        </div>

        {/* CHAT LOG */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 10px', marginBottom: '20px' }}>
          {chatLog.slice(-2).map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ padding: '12px 18px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: msg.role === 'user' ? 'rgba(255,49,49,0.15)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* FLOATING COMMAND INPUT */}
        <div style={{ position: 'fixed', bottom: '30px', left: '20px', right: '20px', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Indtast data eller send screenshot..." 
              style={{ flex: 1, padding: '20px 25px', background: 'rgba(10, 5, 30, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', fontSize: '13px', outline: 'none', backdropFilter: 'blur(20px)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}
            />
            <button onClick={handleSend} style={{ width: '55px', height: '55px', background: '#39ff14', borderRadius: '50%', border: 'none', color: 'black', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', boxShadow: '0 0 20px rgba(57,255,20,0.3)' }}>↑</button>
          </div>
        </div>

      </div>
    </div>
  );
}
