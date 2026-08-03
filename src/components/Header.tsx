import React from 'react';
import { Language, TranslationContent } from '../types';
import { Settings, Rocket, Sparkles } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationContent;
  onOpenAdmin: () => void;
  onOpenDeploy: () => void;
  appName: string;
}

const languages: { id: Language; flag: string; label: string }[] = [
  { id: 'pl', flag: '🇵🇱', label: 'Polski' },
  { id: 'en', flag: '🇬🇧', label: 'English' },
  { id: 'ua', flag: '🇺🇦', label: 'Українська' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  t,
  onOpenAdmin,
  onOpenDeploy,
  appName,
}) => {
  const handleSelectLanguage = (lang: Language) => {
    onLanguageChange(lang);
    trackEvent('language_change', {
      selected_language: lang,
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#f5dcc4]/90 backdrop-blur-md border-b border-black/10 shadow-sm py-3 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: App title & badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white font-black text-xl flex items-center justify-center shadow-md">
            {appName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-black/5 px-2 py-0.5 rounded border border-black/10">
                {appName}
              </span>
              <span className="text-[10px] text-slate-600 font-medium hidden md:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Tester Guide
              </span>
            </div>
            <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
              {t.header.title}
            </h1>
          </div>
        </div>

        {/* Right: Language Flags & Controls */}
        <div className="flex items-center gap-3">
          {/* Flag buttons */}
          <div className="flex items-center bg-black/5 p-1 rounded-xl border border-black/10 shadow-inner">
            {languages.map((lang) => {
              const isActive = currentLang === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleSelectLanguage(lang.id)}
                  title={lang.label}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-md scale-105 border border-black/10 font-bold'
                      : 'text-slate-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span className="hidden md:inline">{lang.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 border-l border-black/10 pl-3">
            <button
              onClick={onOpenDeploy}
              title="GitHub Pages & GA4 Deployment"
              className="p-2 text-slate-800 hover:text-black bg-white hover:bg-slate-100 rounded-xl border border-black/10 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
            >
              <Rocket className="w-4 h-4 text-slate-900" />
              <span className="hidden lg:inline">GitHub Pages</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="App & GA4 Settings"
              className="p-2 text-slate-800 hover:text-black bg-white hover:bg-slate-100 rounded-xl border border-black/10 transition-colors shadow-sm"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
