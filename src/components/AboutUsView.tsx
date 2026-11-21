import React from 'react';
import { Building2, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { OrgSettings } from '../types';
import { GROUPTLY_LOGO_URL } from '../constants/branding';

interface AboutUsViewProps {
  settings: OrgSettings;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ settings }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">About {settings.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Our mission, group background, and governance framework.</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm space-y-6">
        {/* Background-blended Grouptly Logo Splash */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 opacity-[0.07] mix-blend-multiply dark:opacity-[0.09] dark:mix-blend-normal dark:[mask-image:radial-gradient(closest-side,black_40%,transparent_100%)] select-none">
          <img src={GROUPTLY_LOGO_URL} alt="" className="h-full w-full object-contain -rotate-12" />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold text-2xl shadow-lg">
              {settings.logoText || 'GT'}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{settings.name}</h2>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{settings.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2">
            <div className="h-7 w-7 rounded-md bg-white p-0.5 flex items-center justify-center">
              <img src={GROUPTLY_LOGO_URL} alt="Grouptly" className="h-full w-full object-contain" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Grouptly Verified</span>
          </div>
        </div>

        <div className="relative z-10 space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
          <p>
            Welcome to the official digital hub of <strong className="text-slate-900 dark:text-white">{settings.name}</strong>. Empowering digital leaders, creators, and innovators worldwide through structured collaboration, regular general assemblies, and transparent governance.
          </p>
          <p>
            Managed securely via <span className="font-bold text-indigo-600 dark:text-indigo-400">Grouptly (www.grouptly.com)</span>, our members benefit from seamless registration, transparent dues tracking, verified event attendance, and secure access to official group records and constitution documents.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Official Contact</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{settings.contactEmail}</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Website Portal</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{settings.website}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
