import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { IMAGE_PRESETS } from '../data/initialData';
import { compressImageFile } from '../utils/storage';
import { X, Upload, Link2, Image as ImageIcon, Check, Loader2 } from 'lucide-react';

export const ImageSwitcherModal: React.FC = () => {
  const { activeImageTarget, closeImagePicker } = usePortfolio();
  const [customUrl, setCustomUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'presets' | 'url' | 'upload'>('presets');
  const [uploadError, setUploadError] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  if (!activeImageTarget) return null;

  const handleApply = (urlToUse: string) => {
    if (!urlToUse) return;
    activeImageTarget.onSelect(urlToUse);
    closeImagePicker();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    try {
      setIsCompressing(true);
      const compressed = await compressImageFile(file);
      setPreviewUrl(compressed);
    } catch (err) {
      setUploadError('Failed to process image file. Please try another image.');
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Change Image
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Target: <span className="font-semibold text-blue-600 dark:text-blue-400">{activeImageTarget.label}</span>
            </p>
          </div>
          <button
            onClick={closeImagePicker}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 gap-6">
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'presets'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Curated Presets
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Link2 className="w-4 h-4" />
            Custom URL
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'presets' && (
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Select from ready-to-use photography, 3D character art, and interface mockups:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {IMAGE_PRESETS.map((preset, idx) => {
                  const isCurrent = activeImageTarget.currentUrl === preset.url;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleApply(preset.url)}
                      className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all aspect-video flex flex-col justify-end p-2 ${
                        isCurrent
                          ? 'border-blue-600 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="relative z-10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                          {preset.category}
                        </span>
                        <p className="text-xs font-semibold text-white truncate">
                          {preset.label}
                        </p>
                      </div>
                      {isCurrent && (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Paste Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.example.com/my-photo.jpg"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    className="flex-1 px-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => handleApply(customUrl)}
                    disabled={!customUrl}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Live Preview</p>
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="URL Preview"
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={() => setUploadError('Could not load image from this URL.')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Select an image from your computer
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PNG, JPG, WebP, SVG up to 5MB
                </p>
                <label className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors">
                  Browse Files
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadError && (
                <p className="text-xs text-red-500 font-medium">{uploadError}</p>
              )}

              {previewUrl && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Selected Image Preview</p>
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Upload Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <button
                    onClick={() => handleApply(previewUrl)}
                    className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Confirm & Use This Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Current image will be updated immediately upon selection</span>
          <button
            onClick={closeImagePicker}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
