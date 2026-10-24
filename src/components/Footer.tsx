import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Twitter, Youtube, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { developer } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3" style={{ textAlign: 'left' }}>
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
              <span style={{ textAlign: 'center' }}>&lt;/&gt;</span>
            </div>
            <p
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                lineHeight: '49px',
                fontSize: '16px',
              }}
            >
              © {new Date().getFullYear()} {developer.name}. Crafted for high performance and clean code.
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <a
              href={developer.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={developer.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={developer.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            {developer.socials.youtube && (
              <a
                href={developer.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
