import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Pencil } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  as = 'span',
  className = '',
  multiline = false,
  placeholder = 'Click to edit...',
}) => {
  const { isEditMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Synchronize element text with prop only when user is NOT actively typing/editing
  useEffect(() => {
    if (!isEditing && elementRef.current) {
      elementRef.current.innerText = value || '';
    }
  }, [value, isEditing]);

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    // Keep local content in sync while typing
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    setIsEditing(false);
    const newText = (e.currentTarget.innerText || '').trim();
    if (newText !== value) {
      onSave(newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const Component = as;

  if (!isEditMode) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  return (
    <span className="relative inline-block group">
      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsEditing(true)}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`cursor-text transition-all duration-150 inline-block ${className} ${
          isEditing
            ? 'outline-2 outline-blue-600 bg-blue-50/70 dark:bg-blue-950/50 rounded px-1 min-w-[20px]'
            : 'hover:outline-1 hover:outline-dashed hover:outline-blue-400/80 rounded px-1'
        }`}
        title="Click to edit text"
      >
        {value || placeholder}
      </Component>

      {!isEditing && (
        <span 
          aria-hidden="true"
          className="opacity-0 group-hover:opacity-100 absolute -top-3 -right-3 bg-blue-600 text-white p-0.5 rounded shadow pointer-events-none transition-opacity text-[10px] z-10"
        >
          <Pencil className="w-2.5 h-2.5" />
        </span>
      )}
    </span>
  );
};
