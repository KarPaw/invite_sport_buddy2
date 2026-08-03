import React, { useState } from 'react';
import { TranslationContent, AppConfig } from '../types';
import { ExternalLink, Copy, Check, Users } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface GroupTitleSectionProps {
  t: TranslationContent;
  config: AppConfig;
}

export const GroupTitleSection: React.FC<GroupTitleSectionProps> = ({ t, config }) => {
  const [copied, setCopied] = useState(false);

  const handleGroupClick = () => {
    trackEvent('group_link_click', {
      group_url: config.groupUrl,
      app_name: config.appName,
    });
    window.open(config.groupUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(config.groupUrl);
    setCopied(true);
    trackEvent('copy_group_link', {
      group_url: config.groupUrl,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="my-10 text-center max-w-3xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden border border-slate-800">
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-4 text-white">
          <Users className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-balance max-w-xl">
          {t.mainCTA.title}
        </h2>

        <p className="text-sm text-slate-300 max-w-lg mb-8 leading-relaxed">
          {t.mainCTA.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button
            onClick={handleGroupClick}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black text-base rounded-2xl transition-all duration-200 shadow-lg hover:scale-105 flex items-center justify-center gap-2.5 group cursor-pointer border border-white"
          >
            <span>{t.mainCTA.buttonText}</span>
            <ExternalLink className="w-5 h-5 text-black group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-5 py-4 bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-sm rounded-2xl transition-colors border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.mainCTA.copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.mainCTA.copyLinkText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
