import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { EditableText } from './EditableText';
import { ProjectModal } from './ProjectModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Camera, 
  Plus, 
  Trash2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { 
    projects, 
    updateProject, 
    addProject, 
    removeProject, 
    isEditMode, 
    openImagePicker 
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Applications' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'mobile', label: 'Mobile Apps' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddNewProject = () => {
    addProject({
      title: "New Creative Project",
      subtitle: "Full-Stack Web Experience",
      category: "web",
      description: "An impactful modern web application built with high performance and accessibility in mind.",
      fullOverview: "Detailed architecture overview of the application, engineering challenges solved, and performance optimizations achieved.",
      keyFeatures: [
        "Modern responsive client-side interface",
        "Optimistic state caching and offline resiliency",
        "Complete accessibility compliance"
      ],
      techStack: ["React 19", "TypeScript", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      liveDemoUrl: "https://example.com",
      githubUrl: "https://github.com",
      metrics: "+35% Performance Enhancement",
      featured: true,
    });
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              My Creative <span className="text-blue-600 dark:text-blue-400">Projects</span>
            </h2>
          </div>

          {/* Right Navigation & Category Bar */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Category Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                aria-label="Previous Projects"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                aria-label="Next Projects"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {isEditMode && (
              <button
                onClick={handleAddNewProject}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel / Card Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="min-w-[300px] sm:min-w-[340px] max-w-[360px] snap-start flex-shrink-0 group rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden hover:border-blue-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Slot */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                      {project.category}
                    </span>
                  </div>

                  {/* Edit Image Button */}
                  {isEditMode && (
                    <button
                      onClick={() =>
                        openImagePicker({
                          key: `project-${project.id}`,
                          currentUrl: project.imageUrl,
                          label: `Image for "${project.title}"`,
                          aspectRatioHint: '16:9',
                          onSelect: (url) => updateProject(project.id, { imageUrl: url }),
                        })
                      }
                      className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 transition-opacity cursor-pointer z-10"
                    >
                      <Camera className="w-6 h-6 text-blue-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Change Image
                      </span>
                    </button>
                  )}
                </div>

                {/* Content info */}
                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        <EditableText
                          value={project.title}
                          onSave={(val) => updateProject(project.id, { title: val })}
                        />
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        <EditableText
                          value={project.subtitle}
                          onSave={(val) => updateProject(project.id, { subtitle: val })}
                        />
                      </p>
                    </div>

                    {isEditMode && (
                      <button
                        onClick={() => removeProject(project.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    <EditableText
                      value={project.description}
                      onSave={(val) => updateProject(project.id, { description: val })}
                      multiline
                    />
                  </p>
                </div>
              </div>

              {/* Card Footer with Inspect Action */}
              <div className="px-5 py-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  {project.metrics ? 'Case Study' : 'Web Project'}
                </span>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all transform group-hover:translate-x-1"
                  title="View Case Study Details"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
