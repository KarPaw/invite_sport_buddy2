import React from 'react';
import { TranslationContent } from '../../types';

interface MockupProps {
  t: TranslationContent;
  customImage?: string;
  appName: string;
  developerName: string;
}

export const PlayStoreErrorMockup: React.FC<MockupProps> = ({ t, customImage }) => {
  if (customImage) {
    return <img src={customImage} alt="Play Store Error" className="w-full h-auto rounded-xl object-contain shadow-md" />;
  }

  return (
    <div className="relative w-full max-w-sm mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-lg overflow-hidden select-none">
      {/* Red X Badge Overlay */}
      <div className="absolute top-2 right-2 z-20 bg-red-500/10 border-2 border-red-500 rounded-full p-2 animate-pulse">
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      {/* Satellite Error Illustration */}
      <div className="my-6 flex justify-center">
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700">
          <svg className="w-16 h-16 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11a2 2 0 00-2-2h-1c-.601 0-1.03-.432-1.03-1a2.003 2.003 0 011.03-1.802L18.5 4.5" />
          </svg>
        </div>
      </div>

      <p className="text-slate-700 dark:text-slate-300 font-medium text-base mb-6">
        {t.googleMockups.playErrorTitle}
      </p>

      <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-full transition-colors shadow">
        {t.googleMockups.playErrorButton}
      </button>
    </div>
  );
};

export const PlayStoreSuccessMockup: React.FC<MockupProps> = ({ t, customImage, appName, developerName }) => {
  if (customImage) {
    return <img src={customImage} alt="Play Store Success" className="w-full h-auto rounded-xl object-contain shadow-md" />;
  }

  return (
    <div className="relative w-full max-w-sm mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg select-none">
      {/* Green Check Badge Overlay */}
      <div className="absolute top-3 right-3 z-20 bg-emerald-500/15 border-2 border-emerald-500 rounded-full p-2 animate-bounce">
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Google Play App Top Bar */}
      <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700">
        <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.55.45-1 1-1h.21l10.3 10.3-10.3 10.3H4c-.55 0-1-.45-1-1zm14.15-8.5l2.64-2.64c.39-.39.39-1.02 0-1.41l-2.64-2.64L14.3 8.15l2.85 3.85zm-2.85 1.7l2.85 3.85 2.64-2.64c.39-.39.39-1.02 0-1.41l-2.64-2.64-2.85 2.84z"/></svg>
          Google Play
        </span>
        <div className="flex items-center gap-3 font-medium">
          <span>Kategorie</span>
        </div>
      </div>

      {/* App Details Card */}
      <div className="p-5 bg-white dark:bg-slate-900">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md border border-amber-400 shrink-0">
            {appName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
              {appName} ({t.googleMockups.playSuccessEarlyAccess})
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {developerName}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {t.googleMockups.playContainsAds}
            </p>
          </div>
        </div>

        {/* Install Button */}
        <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-md flex items-center justify-center gap-2">
          <span>{t.googleMockups.playInstallButton}</span>
        </button>

        {/* Info text */}
        <div className="mt-4 p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
          <span className="text-base">ℹ️</span>
          <p>{t.googleMockups.playPegeInfo}</p>
        </div>
      </div>
    </div>
  );
};

export const Step1ErrorMockup: React.FC<MockupProps> = ({ t, customImage, appName }) => {
  if (customImage) {
    return <img src={customImage} alt="Step 1 Error" className="w-full h-auto rounded-xl object-contain shadow-md" />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-md text-xs select-none">
      {/* Top navbar */}
      <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-600 text-sm">Grupy</span>
          <span className="text-slate-500 font-medium">Aplikacja {appName}. Wczesny dostęp.</span>
        </div>
        <button className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-semibold">Zaloguj się</button>
      </div>

      {/* Content card */}
      <div className="p-6 text-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 mx-auto mb-3 text-slate-400 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
          🚫
        </div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-2">
          {t.googleMockups.groupsAccessError}
        </h4>
        <p className="text-slate-600 dark:text-slate-400 text-[11px] max-w-xs mx-auto mb-4">
          {t.googleMockups.groupsContactAdmin}
        </p>
      </div>
    </div>
  );
};

export const Step2JoinMockup: React.FC<MockupProps> = ({ t, customImage, appName }) => {
  if (customImage) {
    return <img src={customImage} alt="Step 2 Join" className="w-full h-auto rounded-xl object-contain shadow-md" />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-md text-xs select-none">
      {/* Top browser address bar style */}
      <div className="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 border-b border-slate-300 dark:border-slate-700 flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
        <span className="text-emerald-600">🔒</span>
        <span className="truncate">groups.google.com/g/aplikacja-{appName.toLowerCase().replace(/\s+/g, '')}-wczesny-dostep</span>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-sm">👥 Grupy</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Aplikacja {appName}. Wczesny dostęp.</span>
          </div>
          <span className="text-blue-600 font-semibold underline cursor-pointer bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800 animate-pulse">
            {t.googleMockups.groupsJoinLink}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            {t.googleMockups.groupsAccessError}
          </p>
          <p className="text-blue-600 font-medium underline mt-1 cursor-pointer">
            Aby uzyskać dostęp, <span className="font-bold underline">{t.googleMockups.groupsJoinLink}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Step3ModalMockup: React.FC<MockupProps> = ({ t, customImage, appName }) => {
  if (customImage) {
    return <img src={customImage} alt="Step 3 Modal" className="w-full h-auto rounded-xl object-contain shadow-md" />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/40 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-300 dark:border-slate-800 select-none">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 shadow-xl text-xs">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
          {t.googleMockups.groupsJoiningTitle} {appName}
        </h4>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {t.googleMockups.groupsDisplayName}
            </label>
            <input
              type="text"
              readOnly
              value="Tester Google"
              className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            <span>{t.googleMockups.groupsConnectProfile}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input type="checkbox" className="rounded text-blue-600" />
            <span>{t.googleMockups.groupsSubscribeEmail}</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button className="px-3 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            {t.googleMockups.groupsCancel}
          </button>
          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow ring-2 ring-blue-400">
            {t.googleMockups.groupsJoinButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Step4JoinedMockup: React.FC<MockupProps> = ({ t, customImage, appName }) => {
  if (customImage) {
    return <img src={customImage} alt="Step 4 Joined" className="w-full h-auto rounded-xl object-contain shadow-md" />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-md text-xs select-none">
      <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓ Dołączono</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Aplikacja {appName}</span>
        </div>
        <span className="text-[10px] text-slate-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">
          Członek grupy
        </span>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-950 space-y-2">
        <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between shadow-sm">
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 text-[11px]">
              {t.googleMockups.groupsWelcomeTopic}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Właściciel grupy • Dzisiaj</div>
          </div>
          <span className="text-amber-500">★</span>
        </div>
      </div>
    </div>
  );
};
