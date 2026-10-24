import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { 
  Award, 
  CheckCircle, 
  Calendar, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Camera, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Certifications: React.FC = () => {
  const { 
    certifications, 
    updateCertification, 
    addCertification, 
    removeCertification, 
    isEditMode,
    developer,
    openImagePicker,
    updateDeveloperField
  } = usePortfolio();

  const handleAddNewCert = () => {
    addCertification({
      title: "New Professional Certification",
      issuer: "Credential Authority",
      issueDate: "Present",
      verified: true,
      credentialUrl: "https://example.com",
      iconName: "Award",
    });
  };

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
              Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Certifications & Badges
            </h2>
          </div>

          {isEditMode && (
            <button
              onClick={handleAddNewCert}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </button>
          )}
        </div>

        {/* Content Split: Left Certifications List, Right Achievement Avatar Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Certificates List */}
          <div className="lg:col-span-7 space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 hover:shadow-md transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>

                  {/* Cert text details */}
                  <div className="min-w-0 space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      <EditableText
                        value={cert.title}
                        onSave={(val) => updateCertification(cert.id, { title: val })}
                      />
                    </h3>

                    {/* Unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        <EditableText
                          value={cert.issuer}
                          onSave={(val) => updateCertification(cert.id, { issuer: val })}
                        />
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <EditableText
                          value={cert.issueDate}
                          onSave={(val) => updateCertification(cert.id, { issueDate: val })}
                        />
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right action / External link */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="View Credential"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {isEditMode && (
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                      title="Delete Certification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Stylized Graduate / Milestone Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Radial glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-blue-500/20 to-purple-500/20 blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-900/10 to-indigo-950/20 p-6 shadow-xl aspect-4/5 flex flex-col justify-end">
                <img
                  src={developer.secondaryAvatarUrl || developer.avatarUrl}
                  alt="Academic & Industry Milestones"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Content card on bottom */}
                <div className="relative z-10 text-white space-y-1">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Continuous Mastery</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white">
                    Verified Industry Competence
                  </h4>
                  <p className="text-xs text-slate-300">
                    Industry-certified in modern web architectures, algorithmic problem solving, and production engineering.
                  </p>
                </div>

                {/* Edit Mode Camera */}
                {isEditMode && (
                  <button
                    onClick={() =>
                      openImagePicker({
                        key: 'secondaryAvatarUrl',
                        currentUrl: developer.secondaryAvatarUrl,
                        label: 'Achievement Spotlight Image',
                        aspectRatioHint: '4:5',
                        onSelect: (url) => updateDeveloperField('secondaryAvatarUrl', url),
                      })
                    }
                    className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2 transition-opacity z-20 cursor-pointer"
                  >
                    <div className="p-3 bg-blue-600 rounded-full shadow-lg">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Change Image
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
