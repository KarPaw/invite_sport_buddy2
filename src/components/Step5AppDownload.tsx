import React, { useState } from 'react';
import { TranslationContent, AppConfig } from '../types';
import { PlayStoreSuccessMockup } from './Screenshots/MockupScreenshots';
import { LightboxModal } from './LightboxModal';
import { Download, ExternalLink, Lightbulb, Maximize2 } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface Step5AppDownloadProps {
  t: TranslationContent;
  config: AppConfig;
}

export const Step5AppDownload: React.FC<Step5AppDownloadProps> = ({ t, config }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleAppDownloadClick = () => {
    trackEvent('app_link_click', {
      app_url: config.appUrl,
      app_name: config.appName,
    });
    window.open(config.appUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="my-8 sm:my-12 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex items-start gap-4 sm:gap-6">
          <div className="text-6xl sm:text-8xl font-black text-slate-300 tracking-tighter shrink-0 select-none leading-none">
            {t.steps.step5.number}
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              {t.steps.step5.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {t.steps.step5.subtitle}
            </p>

            {/* Direct App Link Button */}
            <div className="pt-2">
              <button
                onClick={handleAppDownloadClick}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base rounded-2xl transition-all duration-200 shadow-xl hover:scale-105 flex items-center gap-3 group cursor-pointer border border-emerald-500/50"
              >
                <Download className="w-5 h-5 text-emerald-100" />
                <span>{t.steps.step5.buttonText}</span>
                <ExternalLink className="w-5 h-5 text-emerald-200" />
              </button>
            </div>

            {t.steps.step5.tip && (
              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{t.steps.step5.tip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Google Play Mockup */}
        <div className="lg:col-span-5">
          <div className="relative group bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-2 right-2 z-10 bg-slate-900/80 hover:bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1 opacity-90 cursor-pointer shadow"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Powiększ</span>
            </button>

            <div
              onClick={() => setIsLightboxOpen(true)}
              className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
            >
              <PlayStoreSuccessMockup
                t={t}
                customImage={config.customStepImages?.['step5']}
                appName={config.appName}
                developerName={config.developerName}
              />
            </div>
          </div>
        </div>
      </div>

      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={`Krok 5: ${t.steps.step5.title}`}
      >
        <PlayStoreSuccessMockup
          t={t}
          customImage={config.customStepImages?.['step5']}
          appName={config.appName}
          developerName={config.developerName}
        />
      </LightboxModal>
    </div>
  );
};
