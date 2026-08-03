import React, { useState } from 'react';
import { TranslationContent, AppConfig } from '../types';
import { LightboxModal } from './LightboxModal';
import { Maximize2, Lightbulb } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface TutorialStepProps {
  stepNumber: string;
  title: string;
  subtitle: string;
  tip?: string;
  mockup: React.ReactNode;
  t: TranslationContent;
  config: AppConfig;
}

export const TutorialStep: React.FC<TutorialStepProps> = ({
  stepNumber,
  title,
  subtitle,
  tip,
  mockup,
  t,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenLightbox = () => {
    setIsLightboxOpen(true);
    trackEvent('step_image_expand', {
      step_number: stepNumber,
      step_title: title,
    });
  };

  return (
    <div className="my-8 sm:my-12 bg-white/95 border border-black/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left column: Step Number & Text */}
        <div className="lg:col-span-6 flex items-start gap-4 sm:gap-6">
          {/* Big Number */}
          <div className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter shrink-0 select-none leading-none">
            {stepNumber}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {title}
            </h3>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {subtitle}
            </p>

            {tip && (
              <div className="mt-4 p-3.5 bg-black/5 border border-black/10 rounded-xl text-xs text-slate-800 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{tip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Screenshot Mockup */}
        <div className="lg:col-span-6">
          <div className="relative group bg-slate-100 p-4 rounded-2xl border border-black/10">
            <button
              onClick={handleOpenLightbox}
              className="absolute top-2 right-2 z-10 bg-slate-900/80 hover:bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1 opacity-90 transition-opacity cursor-pointer shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{t.scenarios.sadTitle ? 'Powiększ' : 'Zoom'}</span>
            </button>

            <div
              onClick={handleOpenLightbox}
              className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.01]"
            >
              {mockup}
            </div>
          </div>
        </div>
      </div>

      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={`Krok ${stepNumber}: ${title}`}
      >
        <div className="w-full flex justify-center">{mockup}</div>
      </LightboxModal>
    </div>
  );
};
