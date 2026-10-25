import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { NUTRITION_GUIDELINES } from '../data/profiles';

export const Nutrition: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Food and Water Guide</h1>
        <p className="text-sm text-slate-500">Simple, healthy eating and water habits for every age.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {NUTRITION_GUIDELINES.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === idx
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {item.ageGroup}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
            {NUTRITION_GUIDELINES[activeTab].ageGroup}
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {NUTRITION_GUIDELINES[activeTab].headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NUTRITION_GUIDELINES[activeTab].tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {tip}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 flex items-center gap-2">
          <ShieldAlert size={16} className="text-emerald-600 shrink-0" />
          <span>These are simple general tips. Please check with your doctor or nutritionist for specific health and diet questions.</span>
        </div>
      </div>
    </div>
  );
};
