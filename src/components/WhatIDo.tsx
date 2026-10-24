import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { Code2, Box, Palette, Cpu, ArrowUpRight } from 'lucide-react';

export const WhatIDo: React.FC = () => {
  const { services, updateService } = usePortfolio();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box':
        return <Box className="w-6 h-6 text-indigo-500" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-pink-500" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-500" />;
      case 'Code2':
      default:
        return <Code2 className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2 font-mono">
            03 — What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Specialized Engineering & Design Capabilities
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            From performant frontend architectures and immersive 3D canvas visuals to practical AI automation pipelines.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/60 dark:border-slate-700/60">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <EditableText
                    value={service.title}
                    onSave={(val) => updateService(service.id, { title: val })}
                  />
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  <EditableText
                    value={service.description}
                    onSave={(val) => updateService(service.id, { description: val })}
                    multiline
                  />
                </p>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                  title="Inquire about this capability"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
