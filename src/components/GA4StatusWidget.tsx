import React, { useState, useEffect } from 'react';
import { GA4Event } from '../types';
import { subscribeToGA4Events, getEventHistory } from '../lib/analytics';
import { Activity, Radio, ChevronDown, ChevronUp } from 'lucide-react';

interface GA4StatusWidgetProps {
  ga4MeasurementId: string;
  onOpenAdmin: () => void;
}

export const GA4StatusWidget: React.FC<GA4StatusWidgetProps> = ({
  ga4MeasurementId,
  onOpenAdmin,
}) => {
  const [events, setEvents] = useState<GA4Event[]>(getEventHistory());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToGA4Events((newEvent) => {
      setEvents([newEvent, ...getEventHistory()]);
    });
    return unsubscribe;
  }, []);

  const isConfigured =
    ga4MeasurementId && ga4MeasurementId.trim() !== '' && ga4MeasurementId !== 'G-MEASUREMENT_ID';

  return (
    <div className="bg-slate-900 text-white border-t border-slate-800 py-3 px-4 text-xs font-mono select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Left: GA Status indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isConfigured ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isConfigured ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>

          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-indigo-400" />
            GA4 ID:{' '}
            <span
              onClick={onOpenAdmin}
              className="underline cursor-pointer font-bold text-indigo-300 hover:text-white"
            >
              {isConfigured ? ga4MeasurementId : 'G-MEASUREMENT_ID (Kliknij, aby ustawić)'}
            </span>
          </span>
        </div>

        {/* Center: Latest event badge */}
        {events.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Ostatnie zdarzenie:</span>
            <span className="font-bold text-emerald-300">{events[0].name}</span>
            <span className="text-slate-500 text-[10px]">({events[0].timestamp})</span>
          </div>
        )}

        {/* Right: Expand logs toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
        >
          <span>Dziennik zdarzeń ({events.length})</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Log Drawer */}
      {isExpanded && (
        <div className="max-w-4xl mx-auto mt-3 pt-3 border-t border-slate-800 space-y-2 max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <span>Dziennik zdarzeń GA4 w czasie rzeczywistym</span>
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Otwórz Google Analytics Realtime Dashboard ↗
            </a>
          </div>

          {events.length === 0 ? (
            <p className="text-slate-500 italic text-[11px]">Brak zdarzeń. Klikaj przyciski na stronie, aby zarejestrować zdarzenia GA4.</p>
          ) : (
            events.map((evt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800 text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">[{evt.timestamp}]</span>
                  <span className="text-indigo-300 font-bold">{evt.name}</span>
                </div>
                <div className="text-slate-400 text-[10px] truncate max-w-xs font-mono">
                  {JSON.stringify(evt.params)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
