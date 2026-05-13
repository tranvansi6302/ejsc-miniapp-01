import { useState, useEffect, useRef } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { apisAsync } from 'ejsc-ma-api';

/**
 * Hook xử lý hiệu ứng Pull to Refresh phong cách Native cao cấp.
 * Đã tối ưu hóa an toàn tuyệt đối để tránh lỗi .get() undefined.
 */
export const usePullToRefresh = (
  onRefresh: () => Promise<void> | void, 
  enabled = true,
  targetRef?: React.RefObject<HTMLDivElement | null>
) => {
  // Khởi tạo MotionValue bền vững
  const pullDistance = useMotionValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startY = useRef(0);
  const isPulling = useRef(false);
  const canPull = useRef(false); 
  const firstMove = useRef(true);

  const THRESHOLD = 30;  
  const MAX_PULL = 70;   
  const DRAG_BUFFER = 40; 

  useEffect(() => {
    if (!enabled || isRefreshing) return;

    const getScrollTop = () => {
      if (targetRef?.current) return targetRef.current.scrollTop;
      return window.pageYOffset || document.documentElement.scrollTop;
    };

    const onStart = (pageY: number) => {
      if (isRefreshing) return;
      const scrollTop = getScrollTop();
      
      if (scrollTop <= 1) {
        canPull.current = true;
        startY.current = pageY;
        isPulling.current = false; 
        firstMove.current = true;
      } else {
        canPull.current = false;
      }
    };

    const onMove = (pageY: number, e: TouchEvent | MouseEvent) => {
      if (!canPull.current || !pullDistance) return;
      
      const diff = pageY - startY.current;

      if (firstMove.current) {
        firstMove.current = false;
        if (diff <= 0) {
          canPull.current = false;
          return;
        }
        isPulling.current = true;
      }

      if (isPulling.current && diff > 0) {
        const scrollTop = getScrollTop();
        if (scrollTop > 2) {
          isPulling.current = false;
          canPull.current = false;
          if (pullDistance.set) pullDistance.set(0);
          return;
        }

        if (diff > DRAG_BUFFER) {
          const actualDistance = diff - DRAG_BUFFER;
          const resistance = 0.3; 
          const distance = Math.min(MAX_PULL, actualDistance * resistance); 
          
          if (pullDistance.set) {
            pullDistance.set(distance);
            const newProgress = Math.min(1, distance / THRESHOLD);
            setProgress(newProgress);
          }
          
          if (e.cancelable) e.preventDefault();
        } else {
          if (pullDistance.set) {
            pullDistance.set(0);
            setProgress(0);
          }
        }
      }
    };

    const onEnd = async () => {
      try {
        if (!pullDistance || typeof pullDistance.get !== 'function') return;

        const wasPulling = isPulling.current;
        const currentDistance = pullDistance.get();

        isPulling.current = false;
        canPull.current = false;

        if (wasPulling && currentDistance >= THRESHOLD) {
          apisAsync.triggerHapticFeedback({ type: 'light' }); 
          setIsRefreshing(true);
          animate(pullDistance, 0, { type: 'spring', damping: 20, stiffness: 200 });
          setProgress(0);
          
          try {
            await onRefresh();
          } finally {
            setTimeout(() => {
              setIsRefreshing(false);
            }, 300);
          }
        } else {
          animate(pullDistance, 0, { type: 'spring', bounce: 0.4, duration: 0.5 });
          setProgress(0);
        }
      } catch (err) {
        // Bắt lỗi âm thầm nếu MotionValue bị hủy trong lúc đang tính toán
        console.warn("PullToRefresh: onEnd suppressed error", err);
      }
    };

    const handleTouchStart = (e: TouchEvent) => onStart(e.touches[0].pageY);
    const handleTouchMove = (e: TouchEvent) => onMove(e.touches[0].pageY, e);
    const handleTouchEnd = () => onEnd();
    
    const target = targetRef?.current || window;
    target.addEventListener('touchstart', handleTouchStart as any, { passive: false });
    target.addEventListener('touchmove', handleTouchMove as any, { passive: false });
    target.addEventListener('touchend', handleTouchEnd as any);

    return () => {
      target.removeEventListener('touchstart', handleTouchStart as any);
      target.removeEventListener('touchmove', handleTouchMove as any);
      target.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [enabled, isRefreshing, onRefresh, targetRef, pullDistance]);

  return {
    pullDistance,
    isRefreshing,
    progress
  };
};
