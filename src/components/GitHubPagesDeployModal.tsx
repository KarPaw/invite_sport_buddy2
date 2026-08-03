import React, { useState } from 'react';
import { AppConfig, TranslationContent } from '../types';
import { X, Copy, Check, Download, Github, Code, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface GitHubPagesDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  t: TranslationContent;
}

export const GitHubPagesDeployModal: React.FC<GitHubPagesDeployModalProps> = ({
  isOpen,
  onClose,
  config,
  t,
}) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);

  if (!isOpen) return null;

  const ga4Script = config.ga4MeasurementId && config.ga4MeasurementId !== 'G-MEASUREMENT_ID'
    ? `
  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${config.ga4MeasurementId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${config.ga4MeasurementId}');
  </script>`
    : `  <!-- Google Analytics 4 (Not configured yet - set your G-XXXXXXXXXX in app settings) -->`;

  const githubWorkflowYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(githubWorkflowYaml);
    setCopiedWorkflow(true);
    trackEvent('copy_github_workflow', {});
    setTimeout(() => setCopiedWorkflow(false), 2500);
  };

  const handleDownloadStandaloneIndex = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.appName} - Instrukcja Pobierania / Tester Guide</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${ga4Script}
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <div className="max-w-4xl mx-auto p-6">
    <header class="py-6 border-b border-slate-200 flex justify-between items-center">
      <h1 class="text-2xl font-bold">${config.appName} - Jak pobrać aplikację?</h1>
      <a href="${config.groupUrl}" target="_blank" class="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Dołącz do Grupy</a>
    </header>
    <main class="py-10 space-y-8">
      <section class="bg-white p-6 rounded-2xl border shadow-sm">
        <h2 class="text-xl font-bold text-slate-900 mb-2">1. Dołącz do społeczności testerów</h2>
        <p class="text-slate-600 mb-4">Aby wypróbować wersję z wczesnym dostępem, musisz najpierw być członkiem grupy Google.</p>
        <a href="${config.groupUrl}" target="_blank" class="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl">Link do Grupy Google</a>
      </section>
      <section class="bg-white p-6 rounded-2xl border shadow-sm">
        <h2 class="text-xl font-bold text-slate-900 mb-2">2. Pobierz z Google Play</h2>
        <p class="text-slate-600 mb-4">Po dołączeniu do grupy kliknij poniższy link, aby otworzyć sklep Google Play.</p>
        <a href="${config.appUrl}" target="_blank" class="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">Link do Aplikacji w Google Play</a>
      </section>
    </main>
  </div>
</body>
</html>`;

    const blob = new Blob([staticHtmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent('download_standalone_html', {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Github className="w-5 h-5 text-slate-900" />
            {t.deploy.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2 text-sm text-slate-700">
          <p className="text-xs sm:text-sm text-slate-600">
            {t.deploy.subtitle}
          </p>

          {/* GA4 Status Badge */}
          <div className="p-4 bg-slate-100 border border-slate-300 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Google Analytics 4 Status
              </h4>
              <p className="text-xs text-slate-700 mt-1">
                Aktywny identyfikator: <span className="font-mono font-bold text-slate-900">{config.ga4MeasurementId}</span>.
                Kod śledzenia zdarzeń jest gotowy i zintegrowany.
              </p>
            </div>
          </div>

          {/* Method 1: GitHub Actions (Recommended) */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Code className="w-4 h-4 text-slate-900" />
              Metoda 1: Automatyczny GitHub Actions Workflow (Zalecana)
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
              <li>W swoim repozytorium GitHub utwórz plik w ścieżce <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-900">.github/workflows/deploy.yml</code>.</li>
              <li>Wklej poniższą zawartość konfiguracji workflow.</li>
              <li>W ustawieniach repozytorium GitHub włącz <strong>Settings → Pages → Source: GitHub Actions</strong>.</li>
            </ol>

            <button
              onClick={handleCopyWorkflow}
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {copiedWorkflow ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Skopiowano plik deploy.yml!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.deploy.copyWorkflowButton}</span>
                </>
              )}
            </button>
          </div>

          {/* Method 2: Single Static File Download */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-600" />
              Metoda 2: Pobierz gotowy plik index.html (Dla gałęzi gh-pages)
            </h4>
            <p className="text-xs text-slate-600">
              Pobierz pojedynczy plik HTML zawierający Twój aktywne ID GA4 (<code className="font-mono text-slate-900">{config.ga4MeasurementId}</code>) oraz odnośniki. Możesz wrzucić go bezpośrednio do repozytorium na GitHub Pages!
            </p>

            <button
              onClick={handleDownloadStandaloneIndex}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.deploy.exportStaticButton}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
