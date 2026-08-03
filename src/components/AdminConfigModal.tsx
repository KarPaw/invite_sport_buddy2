import React, { useState } from 'react';
import { AppConfig, TranslationContent } from '../types';
import { defaultConfig } from '../data/defaultConfig';
import { X, Save, RotateCcw, Upload, Image as ImageIcon } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => void;
  t: TranslationContent;
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  t,
}) => {
  const [formData, setFormData] = useState<AppConfig>({ ...config });
  const [customImages, setCustomImages] = useState<Record<string, string>>(
    config.customStepImages || {}
  );

  if (!isOpen) return null;

  const handleInputChange = (field: keyof AppConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomImages((prev) => ({ ...prev, [key]: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (key: string) => {
    setCustomImages((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalConfig = { ...formData, customStepImages: customImages };
    onSaveConfig(finalConfig);
    trackEvent('admin_save_config', {
      app_name: finalConfig.appName,
      has_ga4: Boolean(finalConfig.ga4MeasurementId),
    });
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...defaultConfig });
    setCustomImages({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
            {t.admin.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-5 pr-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t.admin.appNameLabel}
            </label>
            <input
              type="text"
              value={formData.appName}
              onChange={(e) => handleInputChange('appName', e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.admin.devNameLabel}
            </label>
            <input
              type="text"
              value={formData.developerName}
              onChange={(e) => handleInputChange('developerName', e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.admin.groupUrlLabel}
            </label>
            <input
              type="url"
              value={formData.groupUrl}
              onChange={(e) => handleInputChange('groupUrl', e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.admin.appUrlLabel}
            </label>
            <input
              type="url"
              value={formData.appUrl}
              onChange={(e) => handleInputChange('appUrl', e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.admin.ga4Label}
            </label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX"
              value={formData.ga4MeasurementId}
              onChange={(e) => handleInputChange('ga4MeasurementId', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:ring-2 focus:ring-slate-900"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Twój kod śledzenia z Google Analytics (np. G-1234567890).
            </p>
          </div>

          {/* Custom Step Images Upload */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-700" />
              Własne zrzuty ekranu (Opcjonalnie)
            </h4>
            <p className="text-xs text-slate-500">
              Możesz wgrać własne zdjęcia zrzutów ekranu dla kroków zamiast domyślnych makiet:
            </p>

            {['sad', 'happy', 'step1', 'step2', 'step3', 'step4', 'step5'].map((key) => (
              <div key={key} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700 uppercase">
                  {key}
                </span>

                <div className="flex items-center gap-2">
                  {customImages[key] ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓ Wgrano</span>
                      <button
                        type="button"
                        onClick={() => handleClearImage(key)}
                        className="text-red-500 hover:underline text-[11px]"
                      >
                        Usuń
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer bg-white hover:bg-slate-100 px-3 py-1 rounded border border-slate-300 text-slate-700 font-medium flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      Wgraj plik
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(key, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 text-slate-600 hover:text-slate-900 flex items-center gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              {t.admin.resetButton}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {t.admin.saveButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
