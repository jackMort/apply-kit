import { useState } from 'react';
import { templates, getTemplateComponent } from '../templates';
import { presets } from './presets';
import type { CVData } from '../../types';

export function Playground() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [selectedPreset, setSelectedPreset] = useState(presets[2].id); // Full by default
  const [showGrid, setShowGrid] = useState(false);
  const [scale, setScale] = useState(0.6);
  const [customData, setCustomData] = useState<CVData | null>(null);

  const currentPreset = presets.find(p => p.id === selectedPreset);
  const cvData = customData ?? currentPreset?.data ?? presets[0].data;
  const TemplateComponent = getTemplateComponent(selectedTemplate);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Logo and title */}
            <div className="flex items-center gap-3">
              <span className="text-xl">🛠</span>
              <h1 className="font-bold text-slate-800 dark:text-slate-100">Template Playground</h1>
              <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">DEV</span>
            </div>

            {/* Center: Selectors */}
            <div className="flex items-center gap-4">
              {/* Template selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600 dark:text-slate-400">Template:</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-700 dark:text-slate-100"
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Preset selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600 dark:text-slate-400">Data:</label>
                <select
                  value={selectedPreset}
                  onChange={(e) => {
                    setSelectedPreset(e.target.value);
                    setCustomData(null);
                  }}
                  className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-700 dark:text-slate-100"
                >
                  {presets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right: Tools */}
            <div className="flex items-center gap-3">
              {/* Grid toggle */}
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg transition-colors ${
                  showGrid ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
                title="Toggle grid overlay"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </button>

              {/* Print preview */}
              <button
                onClick={() => window.print()}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                title="Print preview"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>

              {/* Scale slider */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">{Math.round(scale * 100)}%</span>
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>

          {/* Preset description */}
          {currentPreset && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{currentPreset.description}</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="p-8 flex justify-center">
        <div
          className="relative"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Grid overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Vertical center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500/30" />
              {/* Horizontal lines every 20mm */}
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-blue-500/20"
                  style={{ top: `${(i + 1) * 20}mm` }}
                />
              ))}
              {/* Margin guides (10mm) */}
              <div className="absolute top-0 bottom-0 left-[10mm] w-px bg-green-500/30" />
              <div className="absolute top-0 bottom-0 right-[10mm] w-px bg-green-500/30" />
              <div className="absolute left-0 right-0 top-[10mm] h-px bg-green-500/30" />
              <div className="absolute left-0 right-0 bottom-[10mm] h-px bg-green-500/30" />
            </div>
          )}

          {/* Template */}
          <div className="shadow-2xl">
            <TemplateComponent data={cvData} />
          </div>
        </div>
      </div>

      {/* Quick template switcher - bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-3 print:hidden">
        <div className="flex justify-center gap-2">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${selectedTemplate === t.id
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }
              `}
            >
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${t.color}`} />
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
