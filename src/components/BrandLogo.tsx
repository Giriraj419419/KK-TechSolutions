import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

export interface BrandLogoProps {
  iconName?: string; // simpleicons name e.g. 'microsoft', 'adobe', 'amazonaws'
  fallbackIcon?: LucideIcon;
  color?: string; // Hex without #, or 'white'
  className?: string;
  style?: React.CSSProperties;
  customSvg?: React.ReactNode;
}

export function BrandLogo({ iconName, fallbackIcon: FallbackIcon, color = 'ffffff', className = "w-6 h-6", style, customSvg }: BrandLogoProps) {
  const [error, setError] = useState(false);

  if (customSvg) {
    return <div className={`flex items-center justify-center ${className}`} style={style}>{customSvg}</div>;
  }

  if (iconName && !error) {
    const src = color === 'default' ? `https://cdn.simpleicons.org/${iconName}` : `https://cdn.simpleicons.org/${iconName}/${color}`;
    return (
      <img
        src={src}
        alt={`${iconName} logo`}
        className={`${className} object-contain`}
        style={style}
        loading="lazy"
        decoding="async"
        onError={() => setError(true)}
      />
    );
  }

  if (FallbackIcon) {
    return <FallbackIcon className={className} style={style} />;
  }

  return null;
}
