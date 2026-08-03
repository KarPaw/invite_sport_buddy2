export type Language = 'pl' | 'en' | 'ua';

export interface AppConfig {
  appName: string;
  developerName: string;
  groupUrl: string;
  appUrl: string;
  ga4MeasurementId: string;
  customStepImages?: Record<string, string>; // step key -> image URL or base64
}

export interface TranslationContent {
  languageName: string;
  flagSymbol: string;
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  scenarios: {
    title: string;
    sadTitle: string;
    sadBadge: string;
    sadText: string;
    happyTitle: string;
    happyBadge: string;
    happyText: string;
  };
  mainCTA: {
    title: string;
    subtitle: string;
    buttonText: string;
    copyLinkText: string;
    copiedText: string;
  };
  steps: {
    step1: {
      number: string;
      title: string;
      subtitle: string;
      tip: string;
    };
    step2: {
      number: string;
      title: string;
      subtitle: string;
      tip: string;
    };
    step3: {
      number: string;
      title: string;
      subtitle: string;
      tip: string;
    };
    step4: {
      number: string;
      title: string;
      subtitle: string;
      tip: string;
    };
    step5: {
      number: string;
      title: string;
      subtitle: string;
      buttonText: string;
      tip: string;
    };
  };
  googleMockups: {
    playErrorTitle: string;
    playErrorButton: string;
    playSuccessEarlyAccess: string;
    playInstallButton: string;
    playContainsAds: string;
    playPegeInfo: string;
    groupsAccessError: string;
    groupsContactAdmin: string;
    groupsJoinLink: string;
    groupsJoiningTitle: string;
    groupsDisplayName: string;
    groupsConnectProfile: string;
    groupsSubscribeEmail: string;
    groupsCancel: string;
    groupsJoinButton: string;
    groupsWelcomeTopic: string;
  };
  admin: {
    title: string;
    appNameLabel: string;
    devNameLabel: string;
    groupUrlLabel: string;
    appUrlLabel: string;
    ga4Label: string;
    saveButton: string;
    resetButton: string;
  };
  deploy: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    exportStaticButton: string;
    copyWorkflowButton: string;
  };
}

export interface GA4Event {
  name: string;
  params?: Record<string, any>;
  timestamp: string;
}
