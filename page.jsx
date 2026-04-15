"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Cloud,
  Navigation,
  Calendar,
  Newspaper,
  Trophy,
  Sparkles,
} from "lucide-react";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState("requesting");
  const [news, setNews] = useState([]);
  const [sports, setSports] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [sportsLoading, setSportsLoading] = useState(true);

  useEffect(() => {
    requestLocationAndFetchWeather();
    fetchNews();
    fetchSports();
  }, []);

  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data.news || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchSports = async () => {
    try {
      setSportsLoading(true);
      const response = await fetch("/api/sports");
      if (!response.ok) {
        throw new Error("Failed to fetch sports");
      }
      const data = await response.json();
      setSports(data.sports || []);
    } catch (err) {
      console.error("Error fetching sports:", err);
    } finally {
      setSportsLoading(false);
    }
  };

  const requestLocationAndFetchWeather = () => {
    setLoading(true);
    setError(null);
    setLocationStatus("requesting");

    if (!navigator.geolocation) {
      setError("Geolokation understøttes ikke af din browser");
      setLocationStatus("denied");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocationStatus("granted");
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `/integrations/weather-by-city/weather/${latitude},${longitude}`,
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch weather data: [${response.status}] ${response.statusText}`,
            );
          }
          const data = await response.json();
          setWeather(data);
        } catch (err) {
          console.error(err);
          setError("Kan ikke hente vejrdata for din lokation.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setLocationStatus("denied");
        setError(
          "Lokationstilladelse nægtet. Aktiver venligst lokationsadgang i din browsers indstillinger.",
        );
        setLoading(false);
      },
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-rajdhani">
      {/* Animated Background with Light Trails */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0520] via-[#1a0b3f] to-[#0f0829] z-0">
        {/* Moving Light Trails */}
        <div className="absolute inset-0 opacity-30">
          <div className="light-trail light-trail-1"></div>
          <div className="light-trail light-trail-2"></div>
          <div className="light-trail light-trail-3"></div>
        </div>

        {/* Atmospheric Glow Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF1744] rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-20 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#B721FF] rounded-full blur-[120px] opacity-15 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="backdrop-blur-md bg-black/20 border-b border-[#FF1744]/30 shadow-[0_0_20px_rgba(255,23,68,0.3)]">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1
              className="text-5xl font-bold text-white tracking-wider"
              style={{
                textShadow:
                  "0 0 20px rgba(255,23,68,0.8), 0 0 40px rgba(0,229,255,0.6)",
              }}
            >
              VEJR<span className="text-[#FF1744]">_</span>OVERSIGT
            </h1>
            <p className="text-sm text-[#00E5FF] mt-2 tracking-wide">
              REAL-TIME ATMOSFÆRISK DATASTREAM
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Location Status Section */}
          <div className="glass-card neon-border-red mb-8 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF1744]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#FF1744]/40 shadow-[0_0_15px_rgba(255,23,68,0.3)]">
                  <MapPin className="text-[#FF1744]" size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#00E5FF] tracking-wider">
                    DIN LOKATION
                  </div>
                  <div className="text-sm text-white tracking-wide mt-1">
                    {locationStatus === "requesting" &&
                      "Anmoder om lokationsadgang..."}
                    {locationStatus === "granted" &&
                      weather &&
                      `${weather.location.name}, ${weather.location.country}`}
                    {locationStatus === "denied" && "Tilladelse nægtet"}
                  </div>
                </div>
              </div>
              <button
                onClick={requestLocationAndFetchWeather}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FF1744]/20 to-[#B721FF]/20 backdrop-blur-sm border-2 border-[#FF1744] text-white text-xs font-bold rounded-lg hover:shadow-[0_0_25px_rgba(255,23,68,0.6)] focus-visible:outline-none focus-visible:shadow-[0_0_25px_rgba(255,23,68,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all tracking-wider"
              >
                <Navigation size={16} className="inline mr-2" />
                {loading ? "SKANNER..." : "OPDATER"}
              </button>
            </div>
            {error && (
              <div className="mt-4 text-sm text-[#FF1744] bg-[#FF1744]/10 border border-[#FF1744]/30 rounded-lg px-4 py-3 tracking-wide">
                {error}
              </div>
            )}
          </div>

          {/* Weather Display */}
          {weather && !loading && (
            <div className="space-y-6">
              {/* Location & Current Conditions */}
              <div className="glass-card neon-border-blue p-8">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2
                      className="text-4xl font-bold text-white tracking-wider"
                      style={{ textShadow: "0 0 10px rgba(0,229,255,0.6)" }}
                    >
                      {weather.location.name}
                    </h2>
                    <p className="text-sm text-gray-300 mt-2 tracking-wide">
                      {weather.location.region}, {weather.location.country}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="neon-pill-blue">
                        {weather.location.localtime}
                      </span>
                      <span className="neon-pill-purple">
                        {weather.current.is_day ? "DAG_MODE" : "NAT_MODE"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-start gap-4">
                      <img
                        src={`https:${weather.current.condition.icon}`}
                        alt={weather.current.condition.text}
                        className="w-20 h-20 drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]"
                      />
                      <div>
                        <div
                          className="text-6xl font-bold text-[#00E5FF] tracking-tight"
                          style={{ textShadow: "0 0 20px rgba(0,229,255,0.8)" }}
                        >
                          {Math.round(weather.current.temp_c)}°
                        </div>
                        <div className="text-sm text-white mt-2 tracking-wide uppercase">
                          {weather.current.condition.text}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-3 tracking-wide">
                      FØLES SOM {Math.round(weather.current.feelslike_c)}°C
                    </div>
                  </div>
                </div>

                {/* Temperature Display Pills */}
                <div className="flex gap-3">
                  <span className="neon-pill-red">
                    {Math.round(weather.current.temp_c)}°C
                  </span>
                  <span className="neon-pill-red">
                    {Math.round(weather.current.temp_f)}°F
                  </span>
                </div>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Wind */}
                <div className="glass-card neon-border-purple p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Wind className="text-[#00E5FF]" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#00E5FF] tracking-wider">
                        VINDHASTIGHED
                      </div>
                      <div
                        className="text-2xl font-bold text-white"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      >
                        {weather.current.wind_kph}
                        <span className="text-sm text-gray-400"> km/h</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-300 flex items-center tracking-wide">
                      <span className="text-[#FF1744] mr-2">▸</span>
                      Retning: {weather.current.wind_dir} (
                      {weather.current.wind_degree}°)
                    </div>
                    <div className="text-xs text-gray-300 flex items-center tracking-wide">
                      <span className="text-[#FF1744] mr-2">▸</span>
                      Vindstød: {weather.current.gust_kph} km/h
                    </div>
                  </div>
                </div>

                {/* Humidity */}
                <div className="glass-card neon-border-purple p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Droplets className="text-[#00E5FF]" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#00E5FF] tracking-wider">
                        LUFTFUGTIGHED
                      </div>
                      <div
                        className="text-2xl font-bold text-white"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      >
                        {weather.current.humidity}
                        <span className="text-sm text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-300 flex items-center tracking-wide">
                      <span className="text-[#FF1744] mr-2">▸</span>
                      Nedbør: {weather.current.precip_mm} mm
                    </div>
                  </div>
                </div>

                {/* Visibility */}
                <div className="glass-card neon-border-purple p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Eye className="text-[#00E5FF]" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#00E5FF] tracking-wider">
                        SIGTBARHED
                      </div>
                      <div
                        className="text-2xl font-bold text-white"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      >
                        {weather.current.vis_km}
                        <span className="text-sm text-gray-400"> km</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-300 flex items-center tracking-wide">
                      <span className="text-[#FF1744] mr-2">▸</span>
                      UV Indeks: {weather.current.uv}
                    </div>
                  </div>
                </div>

                {/* Pressure */}
                <div className="glass-card neon-border-purple p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Gauge className="text-[#00E5FF]" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#00E5FF] tracking-wider">
                        LUFTTRYK
                      </div>
                      <div
                        className="text-2xl font-bold text-white"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      >
                        {weather.current.pressure_mb}
                        <span className="text-sm text-gray-400"> mb</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-300 flex items-center tracking-wide">
                      <span className="text-[#FF1744] mr-2">▸</span>
                      {weather.current.pressure_in} in
                    </div>
                  </div>
                </div>

                {/* Cloud Cover */}
                <div className="glass-card neon-border-purple p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Cloud className="text-[#00E5FF]" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#00E5FF] tracking-wider">
                        SKYDÆKKE
                      </div>
                      <div
                        className="text-2xl font-bold text-white"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      >
                        {weather.current.cloud}
                        <span className="text-sm text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="glass-card neon-border-blue p-4">
                <div className="text-xs text-gray-400 tracking-wider">
                  SIDST OPDATERET:{" "}
                  <span className="text-[#00E5FF]">
                    {weather.current.last_updated}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="glass-card neon-border-purple p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF1744]/20 to-[#B721FF]/20 flex items-center justify-center mx-auto mb-6 border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                <Navigation
                  className="text-[#00E5FF] animate-spin-slow"
                  size={32}
                />
              </div>
              <h3
                className="text-xl font-bold text-white mb-2 tracking-wider"
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
              >
                TILGÅR GEOLOKATION
              </h3>
              <p className="text-sm text-gray-400 tracking-wide">
                Anmoder om atmosfæriske data for dine koordinater...
              </p>
            </div>
          )}

          {/* Error State (No Weather Data) */}
          {!weather && !loading && error && (
            <div className="glass-card neon-border-red p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF1744]/20 to-[#B721FF]/20 flex items-center justify-center mx-auto mb-6 border border-[#FF1744]/40 shadow-[0_0_20px_rgba(255,23,68,0.4)]">
                <MapPin className="text-[#FF1744]" size={32} />
              </div>
              <h3
                className="text-xl font-bold text-white mb-2 tracking-wider"
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
              >
                LOKATIONSADGANG PÅKRÆVET
              </h3>
              <p className="text-sm text-gray-400 tracking-wide mb-6">
                Aktiver lokationstilladelser for at se vejrdata
              </p>
            </div>
          )}

          {/* Dagens Program (Today's Schedule) */}
          <div className="glass-card neon-border-red p-8 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF1744]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#FF1744]/40 shadow-[0_0_15px_rgba(255,23,68,0.3)]">
                <Calendar className="text-[#FF1744]" size={24} />
              </div>
              <div>
                <h2
                  className="text-3xl font-bold text-white tracking-wider"
                  style={{
                    textShadow:
                      "0 0 20px rgba(255,23,68,0.8), 0 0 40px rgba(183,33,255,0.6)",
                  }}
                >
                  DAGENS<span className="text-[#FF1744]">_</span>PROGRAM
                </h2>
                <p className="text-xs text-[#FF1744] mt-1 tracking-wide">
                  MICROSOFT OUTLOOK INTEGRATION
                </p>
              </div>
            </div>

            <div className="text-center py-8">
              <p className="text-sm text-gray-300 mb-6 tracking-wide">
                Tilslut din Outlook-kalender for at se dagens aftaler i realtid
              </p>
              <button className="px-10 py-4 bg-gradient-to-r from-[#FF1744]/20 to-[#B721FF]/20 backdrop-blur-sm border-2 border-[#FF1744] text-white text-base font-bold rounded-lg hover:shadow-[0_0_30px_rgba(255,23,68,0.7)] focus-visible:outline-none focus-visible:shadow-[0_0_30px_rgba(255,23,68,0.7)] transition-all tracking-wider flex items-center gap-3 mx-auto">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.17 3.25q.33 0 .59.25.25.26.25.59v15.83q0 .33-.25.59-.26.25-.59.25H7.83q-.33 0-.59-.25-.25-.26-.25-.59v-15.83q0-.33.25-.59.26-.25.59-.25h1.75q.33 0 .59.25.25.26.25.59v15.83q0 .33-.25.59-.26.25-.59.25H7V4.09q0-.33.25-.59Q2.5 7 2.83 7H7V4.09q0-.33.25-.59.26-.25.59-.25zM7 13.06l1.18 2.22h1.75L8 12.06l1.93-3.17H8.22L7.13 10.9l-.04-.06-.03.06-1.09-2.01H4.22l1.93 3.17-1.93 3.22h1.75zm12.76 2.01v-3.24h-3.21V9.75H14.5v2.08h-3.21v3.24h3.21v2.08h2.05v-2.08z" />
                </svg>
                Log ind med Microsoft
              </button>
            </div>
          </div>

          {/* Morgenens Nyheder (Morning News) */}
          <div className="glass-card neon-border-blue p-8 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/30 to-[#B721FF]/30 flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Newspaper className="text-[#00E5FF]" size={24} />
              </div>
              <div>
                <h2
                  className="text-3xl font-bold text-white tracking-wider"
                  style={{
                    textShadow:
                      "0 0 20px rgba(0,229,255,0.8), 0 0 40px rgba(183,33,255,0.6)",
                  }}
                >
                  MORGEN<span className="text-[#00E5FF]">_</span>NYHEDER
                </h2>
                <p className="text-xs text-[#00E5FF] mt-1 tracking-wide">
                  SENESTE DANSKE & GLOBALE NYHEDER
                </p>
              </div>
            </div>

            {newsLoading ? (
              <div className="text-center py-8">
                <div className="text-sm text-gray-400 tracking-wide animate-pulse">
                  Henter de seneste nyheder...
                </div>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-sm text-gray-400 tracking-wide">
                  Ingen nyheder tilgængelige i øjeblikket.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-1.5 h-20 bg-gradient-to-b ${
                          index === 0
                            ? "from-[#FF1744] to-[#B721FF]"
                            : index === 1
                              ? "from-[#00E5FF] to-[#B721FF]"
                              : "from-[#B721FF] to-[#FF1744]"
                        } rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]`}
                      ></div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-base mb-2 tracking-wide group-hover:text-[#00E5FF] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                          {item.snippet}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="neon-pill-blue"
                            style={{
                              fontSize: "10px",
                              padding: "0.25rem 0.6rem",
                            }}
                          >
                            LIVE
                          </span>
                          <span className="text-[10px] text-gray-500 tracking-wider">
                            {item.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sports-overblik (Sports Overview) */}
          <div className="glass-card neon-border-purple p-8 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B721FF]/30 to-[#FF1744]/30 flex items-center justify-center border border-[#B721FF]/40 shadow-[0_0_15px_rgba(183,33,255,0.3)]">
                <Trophy className="text-[#B721FF]" size={24} />
              </div>
              <div>
                <h2
                  className="text-3xl font-bold text-white tracking-wider"
                  style={{
                    textShadow:
                      "0 0 20px rgba(183,33,255,0.8), 0 0 40px rgba(255,23,68,0.6)",
                  }}
                >
                  SPORTENS<span className="text-[#B721FF]">_</span>VERDEN
                </h2>
                <p className="text-xs text-[#B721FF] mt-1 tracking-wide">
                  RESULTATER & NYHEDER FRA NATTEN
                </p>
              </div>
            </div>

            {sportsLoading ? (
              <div className="text-center py-8">
                <div className="text-sm text-gray-400 tracking-wide animate-pulse">
                  Henter de seneste sportsresultater...
                </div>
              </div>
            ) : sports.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-sm text-gray-400 tracking-wide">
                  Ingen sportsresultater tilgængelige i øjeblikket.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {sports.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-[#B721FF]/20 hover:border-[#B721FF]/60 hover:shadow-[0_0_25px_rgba(183,33,255,0.4)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-20 bg-gradient-to-b from-[#B721FF] to-[#FF1744] rounded-full shadow-[0_0_10px_rgba(183,33,255,0.5)]"></div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-base mb-2 tracking-wide group-hover:text-[#B721FF] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                          {item.snippet}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="neon-pill-purple"
                            style={{
                              fontSize: "10px",
                              padding: "0.25rem 0.6rem",
                            }}
                          >
                            LIVE
                          </span>
                          <span className="text-[10px] text-gray-500 tracking-wider">
                            {item.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* AI Morgenbriefing (AI Morning Briefing) */}
          <div className="glass-card neon-border-red p-8 mt-6 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF1744]/30 via-[#B721FF]/30 to-[#00E5FF]/30 flex items-center justify-center border border-[#FF1744]/40 shadow-[0_0_20px_rgba(255,23,68,0.4)] animate-pulse-slow">
                <Sparkles className="text-[#FF1744]" size={24} />
              </div>
              <h2
                className="text-3xl font-bold text-white tracking-wider"
                style={{
                  textShadow:
                    "0 0 15px rgba(255,23,68,0.8), 0 0 30px rgba(0,229,255,0.6)",
                }}
              >
                AI Morgenbriefing
              </h2>
            </div>

            <div className="bg-gradient-to-br from-black/40 to-[#0a0520]/60 backdrop-blur-sm rounded-xl p-6 border border-[#00E5FF]/20">
              <div className="space-y-4">
                <p className="text-white text-base leading-relaxed tracking-wide">
                  God morgen! 🌅 Her er dit personlige morgenoverblik:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00E5FF] mt-1">▸</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-[#00E5FF] font-semibold">
                        Vejret:
                      </span>{" "}
                      Det bliver en{" "}
                      {weather
                        ? weather.current.is_day
                          ? "fin dag"
                          : "behagelig aften"
                        : "skøn dag"}{" "}
                      med temperaturer omkring{" "}
                      {weather ? Math.round(weather.current.temp_c) : "18"}°C
                      {weather
                        ? ` og ${weather.current.condition.text.toLowerCase()}`
                        : ""}
                      .{" "}
                      {weather && weather.current.temp_c > 15
                        ? "Perfekt til en morgentur!"
                        : "Husk en jakke!"}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#B721FF] mt-1">▸</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-[#B721FF] font-semibold">
                        Nyheder:
                      </span>{" "}
                      {news.length > 0
                        ? `${news.length} vigtige historier at følge i dag - ${news[0]?.title?.slice(0, 60)}${news[0]?.title?.length > 60 ? "..." : ""} og mere.`
                        : "Henter de seneste nyheder til dig..."}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#FF1744] mt-1">▸</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-[#FF1744] font-semibold">
                        Sport:
                      </span>{" "}
                      {sports.length > 0
                        ? `Spændende nat i sportsverdenen - ${sports[0]?.title?.slice(0, 60)}${sports[0]?.title?.length > 60 ? "..." : ""} og flere resultater.`
                        : "Henter de seneste sportsresultater..."}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#00E5FF] mt-1">▸</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-[#00E5FF] font-semibold">
                        Kalender:
                      </span>{" "}
                      Tilslut din Outlook-kalender for at se dagens aftaler
                      direkte her.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#00E5FF]/20 mt-4">
                  <p className="text-gray-400 text-xs italic tracking-wide">
                    💡 Denne briefing bliver mere personaliseret når du
                    tilslutter dine konti og præferencer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations & Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');

        .glass-card {
          background: rgba(10, 5, 32, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neon-border-red {
          box-shadow: 0 0 20px rgba(255, 23, 68, 0.3),
                      inset 0 0 20px rgba(255, 23, 68, 0.05);
          border: 1px solid rgba(255, 23, 68, 0.4);
        }

        .neon-border-blue {
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.3),
                      inset 0 0 20px rgba(0, 229, 255, 0.05);
          border: 1px solid rgba(0, 229, 255, 0.4);
        }

        .neon-border-purple {
          box-shadow: 0 0 20px rgba(183, 33, 255, 0.3),
                      inset 0 0 20px rgba(183, 33, 255, 0.05);
          border: 1px solid rgba(183, 33, 255, 0.4);
        }

        .neon-pill-red {
          background: rgba(255, 23, 68, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 23, 68, 0.5);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #FF1744;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.05em;
          box-shadow: 0 0 10px rgba(255, 23, 68, 0.3);
        }

        .neon-pill-blue {
          background: rgba(0, 229, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 229, 255, 0.5);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #00E5FF;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.05em;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
        }

        .neon-pill-purple {
          background: rgba(183, 33, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(183, 33, 255, 0.5);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #B721FF;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.05em;
          box-shadow: 0 0 10px rgba(183, 33, 255, 0.3);
        }

        /* Animated Light Trails */
        .light-trail {
          position: absolute;
          width: 2px;
          height: 200px;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(255, 23, 68, 0.8), 
            rgba(0, 229, 255, 0.8),
            transparent
          );
          animation: moveTrail 8s linear infinite;
          opacity: 0.6;
        }

        .light-trail-1 {
          top: -200px;
          left: 20%;
          animation-delay: 0s;
        }

        .light-trail-2 {
          top: -200px;
          left: 60%;
          animation-delay: 3s;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(183, 33, 255, 0.8), 
            rgba(0, 229, 255, 0.8),
            transparent
          );
        }

        .light-trail-3 {
          top: -200px;
          left: 85%;
          animation-delay: 6s;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(0, 229, 255, 0.8), 
            rgba(255, 23, 68, 0.8),
            transparent
          );
        }

        @keyframes moveTrail {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(calc(100vh + 200px)) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}



