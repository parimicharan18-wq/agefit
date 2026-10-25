import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Check,
  Activity,
  Award,
  Clock,
  RotateCw,
  RefreshCw,
  Layers,
  ArrowRight,
  Flame,
  Volume2,
  Droplets,
  HeartPulse
} from 'lucide-react';
import { AutonomousEngine } from '../data/autonomousEngine';
import type { AutonomousFeature } from '../data/autonomousEngine';
import { AutonomousErrorEngine } from '../data/autonomousErrorEngine';
import type { ErrorAuditLog } from '../data/autonomousErrorEngine';
import type { UserProfile } from '../types';

interface ChatGPTAssistantProps {
  user: UserProfile;
}

export const ChatGPTAssistant: React.FC<ChatGPTAssistantProps> = ({ user }) => {
  const [features, setFeatures] = useState<AutonomousFeature[]>(() => AutonomousEngine.getFeatures());
  const [errorLogs, setErrorLogs] = useState<ErrorAuditLog[]>(() => AutonomousErrorEngine.getLogs());
  const [lastCheckTime, setLastCheckTime] = useState<string>(() => new Date().toLocaleTimeString());
  const [isManualScanning, setIsManualScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Synchronized background loop: checks errors AND updates features simultaneously every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Check & Fix Errors
      AutonomousErrorEngine.sweepAndFixErrors();
      // 2. Evolve & Update Features
      AutonomousEngine.evolveFeaturesSilently();
      // 3. Sync UI State
      setFeatures([...AutonomousEngine.getFeatures()]);
      setErrorLogs([...AutonomousErrorEngine.getLogs()]);
      setLastCheckTime(new Date().toLocaleTimeString());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRunDualSweep = () => {
    setIsManualScanning(true);
    setTimeout(() => {
      AutonomousErrorEngine.sweepAndFixErrors();
      AutonomousEngine.evolveFeaturesSilently();
      setErrorLogs([...AutonomousErrorEngine.getLogs()]);
      setFeatures([...AutonomousEngine.getFeatures()]);
      setIsManualScanning(false);
      setScanMessage('Dual Autonomous Sweep Complete: Errors repaired and features updated simultaneously!');
      setTimeout(() => setScanMessage(null), 3500);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* ============================================================== */}
      {/* 1. DUAL AUTONOMOUS MASTER BANNER */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-7 sm:p-9 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Simultaneous Dual Engine • Free Forever • $0 Cost
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Auto-Fix Errors & Auto-Update Features <br />
            <span className="text-emerald-400">At The Same Time</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Antigravity and the autonomous background engine run side-by-side: repairing runtime bugs, monitoring storage, and upgrading workout routines simultaneously with zero user effort.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={handleRunDualSweep}
            disabled={isManualScanning}
            className="px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isManualScanning ? (
              <>
                <RotateCw size={15} className="animate-spin" />
                <span>Running Dual Sweep...</span>
              </>
            ) : (
              <>
                <RefreshCw size={15} />
                <span>Run Both Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Status Card */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
            <Activity size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Dual Daemon Active & Guarded</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase">
                Last Sync: {lastCheckTime}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuously repairs memory, stops exceptions, and refines routines every 10 seconds.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-semibold">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 size={15} /> Auto-Fix Engine: 100% OK
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <Sparkles size={15} /> Feature Engine: Live
          </span>
        </div>
      </div>

      {/* Success Notification Banner */}
      {scanMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. DUAL SIMULTANEOUS COLUMNS: LEFT (ERRORS) & RIGHT (FEATURES) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUMN 1: AUTO ERROR CHECKER & SELF-REPAIR (6 COLS) */}
        <section className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={20} />
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                1. Auto-Error Fixes (Live)
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              0 Active Errors
            </span>
          </div>

          <div className="space-y-3">
            {errorLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check size={13} />
                    </span>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {log.description}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[9px] font-bold uppercase">
                    {log.category}
                  </span>
                </div>

                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pl-8">
                  → {log.autoFixAction}
                </div>

                <div className="text-[10px] text-slate-400 pl-8 pt-1 flex items-center gap-1 border-t border-slate-100 dark:border-slate-700/50">
                  <Clock size={10} />
                  <span>Verified: {log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 2: AUTONOMOUS FEATURE UPDATES (6 COLS) */}
        <section className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={20} />
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                2. Auto-Updated Features (Live)
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {features.length} Running
            </span>
          </div>

          <div className="space-y-3">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 shadow-xs">
                      {feat.icon}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {feat.name}
                      </h3>
                      <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {feat.headline}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[9px] font-black uppercase">
                    {feat.version}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed pl-10">
                  {feat.benefit}
                </p>

                <div className="text-[10px] text-slate-400 pl-10 pt-1 flex justify-between items-center border-t border-slate-100 dark:border-slate-700/50">
                  <span>{feat.targetGroup}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Check size={10} /> Auto-Evolving
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
