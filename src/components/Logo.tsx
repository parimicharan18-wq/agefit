import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 text-lg rounded-lg',
    md: 'w-9 h-9 text-xl rounded-xl',
    lg: 'w-11 h-11 text-2xl rounded-2xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div
        className={`${iconSizes[size]} bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black shadow-xs shrink-0`}
        aria-hidden="true"
      >
        🌿
      </div>
      {showText && (
        <span className={`font-extrabold ${textSizes[size]} tracking-tight text-slate-900 dark:text-white leading-none`}>
          Age<span className="text-emerald-600 dark:text-emerald-400">Fit</span>
        </span>
      )}
    </div>
  );
};
