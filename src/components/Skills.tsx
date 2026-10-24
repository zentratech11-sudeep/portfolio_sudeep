import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { 
  Code2, 
  Palette, 
  FileCode, 
  FileCode2, 
  Globe, 
  GitBranch, 
  Server, 
  Figma, 
  Plus, 
  Trash2,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const { 
    skills, 
    updateSkill, 
    addSkill, 
    removeSkill, 
    isEditMode 
  } = usePortfolio();

  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tech' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & DevOps' },
    { id: 'design', label: 'UI/UX Design' },
  ];

  const filteredSkills = filterCategory === 'all'
    ? skills
    : skills.filter(s => s.category === filterCategory);

  const getSkillIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('react')) return <Code2 className="w-6 h-6 text-cyan-500" />;
    if (lower.includes('tailwind') || lower.includes('css')) return <Palette className="w-6 h-6 text-teal-400" />;
    if (lower.includes('javascript') || lower.includes('js')) return <FileCode className="w-6 h-6 text-amber-400" />;
    if (lower.includes('typescript') || lower.includes('ts')) return <FileCode2 className="w-6 h-6 text-blue-500" />;
    if (lower.includes('next')) return <Globe className="w-6 h-6 text-slate-800 dark:text-white" />;
    if (lower.includes('git')) return <GitBranch className="w-6 h-6 text-orange-500" />;
    if (lower.includes('node') || lower.includes('express')) return <Server className="w-6 h-6 text-emerald-500" />;
    if (lower.includes('figma') || lower.includes('design')) return <Figma className="w-6 h-6 text-pink-500" />;
    return <Cpu className="w-6 h-6 text-indigo-500" />;
  };

  const handleAddNewSkill = () => {
    addSkill({
      name: "New Technology",
      category: "frontend",
      proficiency: 85,
      iconName: "Code2",
    });
  };

  return (
    <section id="skills" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
              Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Skills & Technologies
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    filterCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {isEditMode && (
              <button
                onClick={handleAddNewSkill}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getSkillIcon(skill.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      <EditableText
                        value={skill.name}
                        onSave={(val) => updateSkill(skill.id, { name: val })}
                      />
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400 capitalize">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                    {skill.proficiency}%
                  </span>
                  {isEditMode && (
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Meter */}
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                  />
                </div>

                {isEditMode && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] text-slate-400">Level:</span>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={skill.proficiency}
                      onChange={(e) => updateSkill(skill.id, { proficiency: Number(e.target.value) })}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
