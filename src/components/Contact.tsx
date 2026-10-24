import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { developer, updateDeveloperField } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Frontend Development',
    budget: '$1000 - $4000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [preparedEmail, setPreparedEmail] = useState({
    recipient: 'zentratech11@gmail.com',
    mailtoUrl: '',
    gmailWebUrl: '',
    rawBody: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const recipient = developer.email || 'zentratech11@gmail.com';
    const subjectText = `[Project Inquiry] ${formData.projectType} — ${formData.name}`;
    const bodyText = `Hi Sudeep,\n\nI would like to discuss a project with you.\n\nPROJECT DETAILS:\n• Client Name: ${formData.name}\n• Client Email: ${formData.email}\n• Project Scope: ${formData.projectType}\n• Budget Range: ${formData.budget}\n\nPROJECT OBJECTIVES & SPECIFICATIONS:\n${formData.message}\n\nBest regards,\n${formData.name}`;

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    setPreparedEmail({
      recipient,
      mailtoUrl: mailto,
      gmailWebUrl: gmailWeb,
      rawBody: bodyText,
    });

    // Launch system mail client
    try {
      window.location.href = mailto;
    } catch (e) {
      console.warn('Mailto link invocation handled', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(preparedEmail.rawBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Channels & Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2 font-mono">
                04 — Call To Action
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Have a project in mind?
              </h2>
            </div>

            <p className="text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
              Let's turn your idea into a digital experience.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${developer.email || 'zentratech11@gmail.com'}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                  >
                    <EditableText
                      value={developer.email || 'zentratech11@gmail.com'}
                      onSave={(val) => updateDeveloperField('email', val)}
                    />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Location & Workzone
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">
                    <EditableText
                      value={developer.location}
                      onSave={(val) => updateDeveloperField('location', val)}
                    />
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Response Guarantee
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">
                    Within 24 business hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Client Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-lg relative">
              
              {submitted ? (
                <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      Inquiry Ready for Email Dispatch!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1">
                      Your project specifications are pre-addressed directly to{' '}
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {preparedEmail.recipient}
                      </span>.
                    </p>
                  </div>

                  {/* Primary Dispatch Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={preparedEmail.mailtoUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Launch Default Mail Client</span>
                    </a>

                    <a
                      href={preparedEmail.gmailWebUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4 text-red-500" />
                      <span>Open in Gmail Webmail</span>
                    </a>
                  </div>

                  {/* Copy message fallback */}
                  <div className="pt-2">
                    <button
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied formatted email to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Text to Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
                    >
                      ← Edit details or send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="zentra tech"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="zentratech11@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Project Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                      >
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="Full Web Application">Full Web Application</option>
                        <option value="3D web design">3D web design</option>
                        <option value="Performance Optimization">Performance Optimization</option>
                        <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                      >
                        <option value="Under $500">Under $500</option>
                        <option value="$1000 - $4000">$1000 - $4000</option>
                        <option value="$3500 - $7000">$3500 - $7000</option>
                        <option value="$7000+">$7000+</option>
                        <option value="Full-Time Salary">Full-Time Salary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Details & Objectives *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe what you're building, key goals, timeline, and tech preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-bold text-red-500">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Preparing Inquiry...</span>
                    ) : (
                      <>
                        <span>Let's Work Together</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
