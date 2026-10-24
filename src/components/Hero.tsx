import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { 
  Download, 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Youtube, 
  Camera, 
  Sparkles,
  Code,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { 
    developer, 
    updateDeveloperField, 
    isEditMode, 
    openImagePicker 
  } = usePortfolio();

  const handleDownloadCV = () => {
    // Generate an instant dynamic text resume or trigger download
    const cvText = `RESUME: ${developer.name}
Role: ${developer.role}
Email: ${developer.email}
Location: ${developer.location}

Bio:
${developer.bio}

Experience: ${developer.yearsExperience}+ Years
Projects: ${developer.completedProjects}+ Completed
Dedication: ${developer.dedicationRate}%
`;
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${developer.name.toLowerCase().replace(/\s+/g, '_')}_resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Presentation */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Social Channels Strip */}
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <a
                href={developer.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={developer.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={developer.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              {developer.socials.youtube && (
                <a
                  href={developer.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {developer.statusText}
              </span>
            </div>

            {/* Headline and Intro */}
            <div className="space-y-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 block">
                Hi, I'm
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                <EditableText
                  value={developer.name}
                  onSave={(val) => updateDeveloperField('name', val)}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent inline-block"
                />
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                <EditableText
                  value={developer.role}
                  onSave={(val) => updateDeveloperField('role', val)}
                />
              </h2>
            </div>

            {/* Tagline / Value Proposition */}
            <div className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <EditableText
                value={developer.tagline}
                onSave={(val) => updateDeveloperField('tagline', val)}
                multiline
                className="block"
              />
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all active:scale-95"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Hire Me</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 max-w-md">
              <div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  <EditableText
                    value={`${developer.yearsExperience}+`}
                    onSave={(val) => {
                      const num = parseInt(val.replace(/\D/g, '')) || 0;
                      updateDeveloperField('yearsExperience', num);
                    }}
                  />
                </span>
                <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Years Exp.
                </span>
              </div>

              <div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  <EditableText
                    value={`${developer.completedProjects}+`}
                    onSave={(val) => {
                      const num = parseInt(val.replace(/\D/g, '')) || 0;
                      updateDeveloperField('completedProjects', num);
                    }}
                  />
                </span>
                <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Projects Done
                </span>
              </div>

              <div>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  <EditableText
                    value={`${developer.dedicationRate}%`}
                    onSave={(val) => {
                      const num = parseInt(val.replace(/\D/g, '')) || 0;
                      updateDeveloperField('dedicationRate', num);
                    }}
                  />
                </span>
                <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Client Focus
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame with 3D Character / Photo & Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Container */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent dark:from-blue-500/20 dark:via-indigo-900/10 p-6 flex items-center justify-center border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
              
              {/* Outer Glow Ring */}
              <div className="absolute inset-4 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-2xl -z-10" />

              {/* Main Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img
                  src={developer.heroCharacterUrl || developer.avatarUrl}
                  alt={developer.name}
                  className="w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to avatar if hero character url fails
                    (e.target as HTMLImageElement).src = developer.avatarUrl;
                  }}
                />

                {/* Edit Mode Camera Button */}
                {isEditMode && (
                  <button
                    onClick={() =>
                      openImagePicker({
                        key: 'heroCharacterUrl',
                        currentUrl: developer.heroCharacterUrl,
                        label: 'Hero Visual Artwork / Character',
                        onSelect: (url) => updateDeveloperField('heroCharacterUrl', url),
                      })
                    }
                    className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2 transition-opacity hover:bg-black/75 cursor-pointer"
                  >
                    <div className="p-3 bg-blue-600 rounded-full shadow-lg">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Change Hero Image
                    </span>
                  </button>
                )}
              </div>

              {/* Floating Badge 1: 3D & Full-Stack */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 z-10"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Code className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">3D & Web</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Three.js & Full-Stack</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: AI Automation & Design */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 z-10"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Intelligence</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">AI Automation</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
