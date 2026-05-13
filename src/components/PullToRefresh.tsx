import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useTransform, useSpring } from 'framer-motion';
import { usePullToRefresh } from '../hooks/use-pull-to-refresh';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  enabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  enabled = true,
  className,
  style,
  targetRef: externalRef
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (externalRef?.current) {
      setScrollTarget(externalRef.current);
    } else if (containerRef.current) {
      let parent = containerRef.current.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          setScrollTarget(parent);
          return;
        }
        parent = parent.parentElement;
      }
      setScrollTarget(window as any);
    }
  }, [externalRef]);

  const { pullDistance, isRefreshing, progress } = usePullToRefresh(
    onRefresh,
    enabled,
    { current: scrollTarget as any }
  );

  const smoothDistance = useSpring(pullDistance, { damping: 25, stiffness: 220 });

  // Vị trí dừng chân khi refresh (Đè lên Header)
  const finalPos = 60;

  const y = useTransform(smoothDistance, (val) => {
    if (isRefreshing) return finalPos;
    // Xuất phát từ -40 và đi xuống nhanh để đè lên Header ngay lập tức
    return (val * 2.2) - 40;
  });

  const scale = useTransform(smoothDistance, [0, 30], [0.8, 1.1]);
  const opacity = useTransform(smoothDistance, [0, 10], [0, 1]);
  const rotateValue = useTransform(smoothDistance, (val) => val * 12); // Xoay nhanh hơn vì quãng đường ngắn

  const showLoader = isRefreshing || progress > 0.01;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', ...style }}
    >
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="pull-indicator"
            initial={{ y: -60, opacity: 0 }}
            style={{
              y,
              opacity,
              scale,
              rotate: isRefreshing ? 0 : rotateValue,
              position: 'fixed',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2147483647, // Z-INDEX TỐI ĐA ĐỂ ĐÈ LÊN HEADER
              top: 0,
            }}
            exit={{
              y: -60,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
          >
            <div className="bg-white rounded-full p-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-100 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isRefreshing ? (
                  <motion.div
                    key="refreshing-icon"
                    initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 360, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      rotate: { repeat: Infinity, duration: 0.7, ease: "linear" },
                      default: { duration: 0.2 }
                    }}
                    className="flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#4f46e5">
                      <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pulling-icon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#4f46e5">
                      <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
