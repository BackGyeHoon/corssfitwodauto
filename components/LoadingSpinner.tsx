
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-cyan-400 border-t-transparent`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};

export default LoadingSpinner;
