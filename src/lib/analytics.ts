import { GA4Event } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

let eventListeners: ((event: GA4Event) => void)[] = [];
let eventHistory: GA4Event[] = [];

export function subscribeToGA4Events(listener: (event: GA4Event) => void) {
  eventListeners.push(listener);
  return () => {
    eventListeners = eventListeners.filter((l) => l !== listener);
  };
}

function notifyListeners(event: GA4Event) {
  eventHistory = [event, ...eventHistory].slice(0, 20); // keep last 20
  eventListeners.forEach((l) => l(event));
}

export function getEventHistory(): GA4Event[] {
  return eventHistory;
}

export function initGA4(measurementId: string) {
  if (!measurementId || measurementId.trim() === '' || measurementId === 'G-MEASUREMENT_ID') {
    console.log('[GA4 Simulation Mode] No active GA4 Measurement ID set.');
    return;
  }

  const cleanId = measurementId.trim();

  // Check if script already injected
  const scriptId = 'ga4-gtag-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${cleanId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(..._args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', cleanId, { send_page_view: false });
    console.log(`[GA4] Initialized Google Analytics 4 with ID: ${cleanId}`);
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  const timestamp = new Date().toLocaleTimeString();
  const event: GA4Event = { name: eventName, params, timestamp };

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
    console.log(`[GA4 Event Fired]`, eventName, params);
  } else {
    console.log(`[GA4 Simulated Event]`, eventName, params);
  }

  notifyListeners(event);
}

export function trackPageView(pageTitle: string, language: string) {
  trackEvent('page_view', {
    page_title: pageTitle,
    language: language,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
}
