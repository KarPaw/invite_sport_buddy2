import React, { useState } from 'react';
import { TranslationContent, AppConfig } from '../types';
import { PlayStoreErrorMockup, PlayStoreSuccessMockup } from './Screenshots/MockupScreenshots';
import { LightboxModal } from './LightboxModal';
import { AlertTriangle, CheckCircle, Info, Maximize2 } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface SadHappyComparisonProps {
  t: TranslationContent;
  config: AppConfig;
}

export const SadHappyComparison: React.FC<SadHappyComparisonProps> = ({ t, config }) => {
  const [activeLightbox, setActiveLightbox] = useState<'sad' | 'happy' | null>(null);

  const handleOpenLightbox = (scenario: 'sad' | 'happy') => {
    setActiveLightbox(scenario);
    trackEvent('view_scenario_details', {
      scenario: scenario,
    });
  };

  return (
    <section className="my-8 sm:my-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
          {t.scenarios.title}
        </h2>
        <p className="text-sm text-slate-700 mt-2">
          {t.header.subtitle}
        </p>
      </div>

      {/* Grid comparing Sad vs Happy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {/* SAD SCENARIO (Red) */}
        <div className="group relative bg-white/95 border-2 border-red-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-red-500">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white tracking-wider shadow-sm">
              <AlertTriangle className="w-3.5 h-3.5" />
              {t.scenarios.sadBadge}
            </span>
            <button
              onClick={() => handleOpenLightbox('sad')}
              className="text-xs text-red-700 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Powiększ
            </button>
          </div>

          <h3 className="text-lg font-bold text-red-950 mb-2">
            {t.scenarios.sadTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
            {t.scenarios.sadText}
          </p>

          <div
            onClick={() => handleOpenLightbox('sad')}
            className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
          >
            <PlayStoreErrorMockup
              t={t}
              customImage={config.customStepImages?.['sad']}
              appName={config.appName}
              developerName={config.developerName}
            />
          </div>
        </div>

        {/* HAPPY SCENARIO (Green) */}
        <div className="group relative bg-white/95 border-2 border-emerald-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-700 text-white tracking-wider shadow-sm">
              <CheckCircle className="w-3.5 h-3.5" />
              {t.scenarios.happyBadge}
            </span>
            <button
              onClick={() => handleOpenLightbox('happy')}
              className="text-xs text-emerald-800 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Powiększ
            </button>
          </div>

          <h3 className="text-lg font-bold text-emerald-950 mb-2">
            {t.scenarios.happyTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
            {t.scenarios.happyText}
          </p>

          <div
            onClick={() => handleOpenLightbox('happy')}
            className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
          >
            <PlayStoreSuccessMockup
              t={t}
              customImage={config.customStepImages?.['happy']}
              appName={config.appName}
              developerName={config.developerName}
            />
          </div>
        </div>
      </div>

      {/* Lightbox for Scenarios */}
      <LightboxModal
        isOpen={activeLightbox !== null}
        onClose={() => setActiveLightbox(null)}
        title={
          activeLightbox === 'sad'
            ? t.scenarios.sadTitle
            : t.scenarios.happyTitle
        }
      >
        {activeLightbox === 'sad' ? (
          <PlayStoreErrorMockup
            t={t}
            customImage={config.customStepImages?.['sad']}
            appName={config.appName}
            developerName={config.developerName}
          />
        ) : (
          <PlayStoreSuccessMockup
            t={t}
            customImage={config.customStepImages?.['happy']}
            appName={config.appName}
            developerName={config.developerName}
          />
        )}
      </LightboxModal>
    </section>
  );
};
