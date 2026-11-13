import { useState } from 'react';
import { Coffee } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackTitle = 'Figure 8 Coffee Purveyors',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#EAE2D3] text-[#211510]/70 p-8 text-center ${className}`}
      >
        <Coffee className="w-8 h-8 mb-3 text-[#9E522C]" strokeWidth={1.5} />
        <p className="font-display text-lg font-semibold text-[#211510]">{fallbackTitle}</p>
        <p className="text-xs text-[#59483F] mt-1">1111 Chicon St · East Austin</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
