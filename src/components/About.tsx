import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { Camera, ArrowRight, UserCheck, Code2, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const { 
    developer, 
    updateDeveloperField, 
    isEditMode, 
    openImagePicker 
  } = usePortfolio();

  return (
    <section id="about" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Circular Developer Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer Glowing Circle */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 opacity-30 dark:opacity-40 blur-xl group-hover:opacity-60 transition-opacity" />

              {/* Avatar Border Ring */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-950 relative">
                  <img
                    src={developer.avatarUrl}
                    alt={developer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Edit Mode Camera Overlay */}
                  {isEditMode && (
                    <button
                      onClick={() =>
                        openImagePicker({
                          key: 'avatarUrl',
                          currentUrl: developer.avatarUrl,
                          label: 'Developer Profile Avatar',
                          aspectRatioHint: '1:1',
                          onSelect: (url) => updateDeveloperField('avatarUrl', url),
                        })
                      }
                      className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 transition-opacity cursor-pointer"
                      title="Click to change avatar photo"
                    >
                      <Camera className="w-6 h-6 text-blue-400" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Change Photo
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Floating Code badge */}
              <div className="absolute -bottom-2 right-4 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-3 py-1.5 rounded-full font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-700/50">
                <Code2 className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
                <span>&lt;/dev&gt;</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2 font-mono">
                02 — About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                <EditableText
                  value={developer.aboutTitle}
                  onSave={(val) => updateDeveloperField('aboutTitle', val)}
                />
              </h2>
            </div>

            <div className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <EditableText
                value={developer.bio}
                onSave={(val) => updateDeveloperField('bio', val)}
                multiline
                className="block"
              />
            </div>

            {/* Quantitative Milestone Cards */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
                <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums block">
                  <EditableText
                    value={`${developer.yearsExperience}+`}
                    onSave={(val) => {
                      const num = parseInt(val.replace(/\D/g, '')) || 0;
                      updateDeveloperField('yearsExperience', num);
                    }}
                  />
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                  Years Exp
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
                <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums block">
                  <EditableText
                    value={`${developer.completedProjects}+`}
                    onSave={(val) => {
                      const num = parseInt(val.replace(/\D/g, '')) || 0;
                      updateDeveloperField('completedProjects', num);
                    }}
                  />
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                  Projects
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
                <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400 tabular-nums block">
                  <EditableText
                    value={`${developer.dedicationRate}%`}
                    onSave={(val) => {
                      const num = parseInt(val.replace(/\D/g, '')) || 0;
                      updateDeveloperField('dedicationRate', num);
                    }}
                  />
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                  Dedication
                </span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
