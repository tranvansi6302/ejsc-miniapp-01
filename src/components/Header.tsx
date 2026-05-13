import React from 'react';
import { Text } from 'ejsc-ma-component';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  transparent?: boolean;
}

/**
 * Header component tối ưu cho thiết kế tràn viền (Immersive).
 * Không bao gồm nút Back vì đã được xử lý ở Native.
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  className = '',
  transparent = false
}) => {
  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${transparent
        ? 'bg-transparent'
        : 'bg-white/80 backdrop-blur-md border-b border-white/20'
        } ${className}`}
      style={{
        paddingTop: 'var(--ejsc-safe-top)',
        boxShadow: 'none' // Đảm bảo không có shadow theo yêu cầu
      }}
    >
      <div className="px-5 py-4 flex flex-col gap-0.5">
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
  );
};
