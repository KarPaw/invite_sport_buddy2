import { useState, useEffect } from 'react';
import { Language, AppConfig } from './types';
import { translations } from './data/translations';
import { defaultConfig } from './data/defaultConfig';
import { initGA4, trackPageView } from './lib/analytics';
import { Header } from './components/Header';
import { SadHappyComparison } from './components/SadHappyComparison';
import { GroupTitleSection } from './components/GroupTitleSection';
import { TutorialStep } from './components/TutorialStep';
import { Step5AppDownload } from './components/Step5AppDownload';
import { AdminConfigModal } from './components/AdminConfigModal';
import { GitHubPagesDeployModal } from './components/GitHubPagesDeployModal';
import {
  Step1ErrorMockup,
  Step2JoinMockup,
  Step3ModalMockup,
  Step4JoinedMockup,
} from './components/Screenshots/MockupScreenshots';

import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('tester_guide_lang');
    return (saved as Language) || 'pl';
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('tester_guide_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved config:', e);
      }
    }
    return defaultConfig;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);

  const t = translations[currentLang] || translations.pl;

  // Save language preference
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('tester_guide_lang', lang);
  };

  // Save config
  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('tester_guide_config', JSON.stringify(newConfig));
  };

  // Initialize GA4 and send page view
  useEffect(() => {
    initGA4(config.ga4MeasurementId);
    trackPageView(`${config.appName} - Download Guide`, currentLang);
  }, [config.ga4MeasurementId, currentLang, config.appName]);

  return (
    <div className="min-h-screen bg-[#f5dcc4] text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        t={t}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDeploy={() => setIsDeployOpen(true)}
        appName={config.appName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {/* Intro Subtitle Banner */}
        <div className="text-center mb-8">
          <p className="text-sm sm:text-base font-semibold text-slate-800 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            {t.header.subtitle}
          </p>
        </div>

        {/* Section 1: Sad vs Happy Scenario Comparison */}
        <SadHappyComparison t={t} config={config} />

        {/* Section 2: Title of Tutorial on Joining Group + Main CTA */}
        <GroupTitleSection t={t} config={config} />

        {/* Section 3: Steps 1 - 4 */}
        <section className="mt-12 space-y-4">
          <div className="border-b border-black/10 pb-4 mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-900">
              Instrukcja Krok po Kroku / Step-by-Step Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Postępuj zgodnie z poniższymi krokami, aby pomyślnie uzyskać dostęp do aplikacji
            </p>
          </div>

          {/* Step 1 */}
          <TutorialStep
            stepNumber={t.steps.step1.number}
            title={t.steps.step1.title}
            subtitle={t.steps.step1.subtitle}
            tip={t.steps.step1.tip}
            t={t}
            config={config}
            mockup={
              <Step1ErrorMockup
                t={t}
                customImage={config.customStepImages?.['step1']}
                appName={config.appName}
                developerName={config.developerName}
              />
            }
          />

          {/* Step 2 */}
          <TutorialStep
            stepNumber={t.steps.step2.number}
            title={t.steps.step2.title}
            subtitle={t.steps.step2.subtitle}
            tip={t.steps.step2.tip}
            t={t}
            config={config}
            mockup={
              <Step2JoinMockup
                t={t}
                customImage={config.customStepImages?.['step2']}
                appName={config.appName}
                developerName={config.developerName}
              />
            }
          />

          {/* Step 3 */}
          <TutorialStep
            stepNumber={t.steps.step3.number}
            title={t.steps.step3.title}
            subtitle={t.steps.step3.subtitle}
            tip={t.steps.step3.tip}
            t={t}
            config={config}
            mockup={
              <Step3ModalMockup
                t={t}
                customImage={config.customStepImages?.['step3']}
                appName={config.appName}
                developerName={config.developerName}
              />
            }
          />

          {/* Step 4 */}
          <TutorialStep
            stepNumber={t.steps.step4.number}
            title={t.steps.step4.title}
            subtitle={t.steps.step4.subtitle}
            tip={t.steps.step4.tip}
            t={t}
            config={config}
            mockup={
              <Step4JoinedMockup
                t={t}
                customImage={config.customStepImages?.['step4']}
                appName={config.appName}
                developerName={config.developerName}
              />
            }
          />

          {/* Step 5: Final Download */}
          <Step5AppDownload t={t} config={config} />
        </section>
      </main>

      {/* Admin Settings Modal */}
      <AdminConfigModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        t={t}
      />

      {/* GitHub Pages & GA4 Deployment Modal */}
      <GitHubPagesDeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        config={config}
        t={t}
      />
    </div>
  );
}
