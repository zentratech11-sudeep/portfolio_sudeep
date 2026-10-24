import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Moon, Sun, Edit3, Menu, X, ArrowUpRight, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, isEditMode, setIsEditMode, developer, downloadSourceZip } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#home" 
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
            <span>&lt;/&gt;</span>
          </div>
          <span>Pixel<span className="text-blue-600 dark:text-blue-400">Craft</span></span>
        </a>

        {/* Zone 2: 4-5 Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Download Project ZIP with Live Customized Images & Data */}
          <button
            onClick={() => downloadSourceZip()}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Download Project ZIP (Includes All Your Custom Images & Edits)"
          >
            <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden lg:inline">Download ZIP</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setIsEditMode(prev => !prev)}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isEditMode 
                ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isEditMode ? "Exit Edit Mode" : "Turn on Edit Mode"}
          >
            <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden xl:inline">{isEditMode ? 'Editing On' : 'Edit Page'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700 hover:text-blue-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300" />
            )}
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                downloadSourceZip();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 cursor-pointer"
            >
              <span>Download Project ZIP</span>
              <Download className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-xs text-slate-500">Edit Mode</span>
              <button
                onClick={() => setIsEditMode(prev => !prev)}
                className="px-3 py-1 text-xs font-semibold rounded bg-blue-50 dark:bg-blue-950 text-blue-600"
              >
                {isEditMode ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
