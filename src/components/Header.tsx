import React from 'react';
import { Text } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  transparent?: boolean;
  showBack?: boolean;
}

/**
 * Header component tối ưu cho thiết kế tràn viền (Immersive).
 * Hỗ trợ nút Back tùy chọn.
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  className = '',
  transparent = false,
  showBack = false
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${transparent
        ? 'bg-transparent'
        : 'bg-white/80 backdrop-blur-md border-b border-white/20'
        } ${className}`}
      style={{
        paddingTop: 'var(--ejsc-safe-top)',
        boxShadow: 'none'
      }}
    >
      <div className="px-5 py-4 flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform ${
              transparent 
                ? 'bg-black/20 backdrop-blur-md text-white border border-white/20' 
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div className="flex flex-col gap-0.5">
          <Text
            weight="bold"
            variant='h3'
            className={transparent ? 'text-white' : 'text-slate-900'}
          >
            {title}
          </Text>
          {subtitle && (
            <div className={transparent ? "inline-flex mt-1 bg-white/10 backdrop-blur-md rounded-full px-3 py-0.5 border border-white/20 w-fit" : ""}>
              <Text
                variant="sub"
                className={transparent ? 'text-white/90' : 'text-slate-500'}
              >
                {subtitle}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
