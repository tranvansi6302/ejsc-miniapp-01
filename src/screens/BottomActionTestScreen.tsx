import React from 'react';
import { StandardPage, Text } from 'ejsc-ma-component';

const BottomActionTestScreen: React.FC = () => {
  return (
    <StandardPage title="Nút bấm cố định đáy">
      <div className="p-6 flex flex-col gap-6">
        <Text variant="sub">Trang này kiểm tra xem nút bấm ở dưới cùng có bị thanh Home Indicator (vạch đen trên iPhone) che mất không.</Text>
        
        {/* Placeholder content to enable scrolling */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="h-20 bg-slate-100 rounded-xl mb-4" />
        ))}
      </div>

      {/* Fixed Bottom Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 shadow-[0_-4px_20_rgba(0,0,0,0.05)] z-[100]"
        style={{ paddingBottom: 'var(--ejsc-safe-bottom)' }}
      >
        <button className="w-full h-14 bg-ejsc-brand text-white rounded-2xl font-bold active:scale-95 transition-transform">
           Tiếp tục thanh toán (Safe Area Bottom)
        </button>
      </div>
    </StandardPage>
  );
};

export default BottomActionTestScreen;
