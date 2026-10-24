import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Edit3, 
  Eye, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  Sliders,
  FileArchive
} from 'lucide-react';

export const EditToolbar: React.FC = () => {
  const { 
    isEditMode, 
    setIsEditMode, 
    saveStatus, 
    saveChangesNow,
    downloadSourceZip,
    exportJSON, 
    importJSON, 
    resetToDefaults 
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJSON(content);
      if (success) {
        alert("Portfolio data imported successfully!");
      } else {
        alert("Failed to parse JSON file. Please ensure it is a valid DevCraft export file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {isEditMode ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 dark:bg-slate-950/95 text-white border border-slate-700/80 rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4 sm:gap-6 backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 max-w-[95vw] overflow-x-auto">
          {/* Status badge */}
          <div className="flex items-center gap-2 pr-3 border-r border-slate-700 whitespace-nowrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                Visual Editor Active
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                {saveStatus}
              </span>
            </div>
          </div>

          <div className="hidden md:block text-xs text-slate-300 pr-3 border-r border-slate-700 whitespace-nowrap">
            💡 Click any headline, text, or image camera badge to edit
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <button
              onClick={saveChangesNow}
              title="Explicitly save all current edits"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            <button
              onClick={() => downloadSourceZip()}
              title="Download entire project source code with all your latest edited images & text"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <FileArchive className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Project ZIP</span>
            </button>

            <button
              onClick={exportJSON}
              title="Download portfolio as JSON file"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import portfolio JSON file"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Import</span>
            </button>

            <button
              onClick={resetToDefaults}
              title="Reset content back to original template"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setIsEditMode(false)}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Mode</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditMode(true)}
          className="fixed bottom-6 right-6 z-40 bg-slate-900 dark:bg-slate-800 text-white hover:bg-blue-600 dark:hover:bg-blue-600 border border-slate-700/60 rounded-full px-4 py-2.5 shadow-xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
          title="Enter Edit Mode to customize text, stats, and images"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
          <span>Customize Content</span>
        </button>
      )}
    </>
  );
};
