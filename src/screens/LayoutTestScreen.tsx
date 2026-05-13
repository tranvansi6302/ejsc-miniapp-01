/**
 * @file LayoutTestScreen.tsx
 * @description Kiểm tra Header Native: AppBar, màu sắc, icon back, Status Bar.
 * Thiết kế phẳng (flat), tinh gọn 3 cột, Sentence case.
 */
import React, { useEffect, useState } from 'react';
import { StandardPage, Text, toast } from 'ejsc-ma-component';
import { apisAsync } from 'ejsc-ma-api';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'ejsc-ma-router';
import { Header } from '../components/Header';

const LayoutTestScreen: React.FC = () => {
  const navigate = useNavigate();
  const [cssVars, setCssVars] = useState({
    safeTop: '0px', safeBottom: '0px',
    statusBarH: '0px', titleBarH: '0px',
    windowH: '0px',
  });

  useEffect(() => {
    // Mặc định hiện AppBar Native khi vào trang này để có nút Back hệ thống
    // Thêm delay nhỏ để tránh xung đột với quá trình mount của component
    const timer = setTimeout(() => {
      apisAsync.setNavigationBar({
        visible: true,
        title: 'Kiểm tra Layout',
        backgroundColor: '#FFFFFF',
        frontColor: '#000000',
        backIcon: 'arrow',
        immersive: false
      });
    }, 100);

    const read = () => {
      const s = getComputedStyle(document.documentElement);
      setCssVars({
        safeTop: s.getPropertyValue('--ejsc-safe-top').trim() || '0px',
        safeBottom: s.getPropertyValue('--ejsc-safe-bottom').trim() || '0px',
        statusBarH: s.getPropertyValue('--ejsc-status-bar-height').trim() || '0px',
        titleBarH: s.getPropertyValue('--ejsc-title-bar-height').trim() || '0px',
        windowH: s.getPropertyValue('--ejsc-window-height').trim() || '0px',
      });
    };
    read();
    const t = setTimeout(read, 800);
    return () => {
      clearTimeout(t);
      clearTimeout(timer);
    };
  }, []);

  return (
    <StandardPage contentClassName="bg-[#F8FAFC]">
      <div 
        className="p-6 flex flex-col gap-6 pb-20"
      >
        {/* ─── MỤC 2: MÀU NỀN VÀ TIÊU ĐỀ ─── */}
        <section className="flex flex-col gap-2">
          <Text weight="bold" variant="base" className="text-slate-700">2. Màu nền và tiêu đề</Text>
          <div className="bg-white rounded-ejsc border border-slate-100 p-4 flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Trắng', bg: '#FFFFFF', front: '#000000', title: 'Nền trắng' },
                { label: 'Đen', bg: '#111827', front: '#ffffff', title: 'Nền đen' },
                { label: 'Indigo', bg: '#4F46E5', front: '#ffffff', title: 'Nền Indigo' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => apisAsync.setNavigationBar({
                    visible: true,
                    title: item.title,
                    backgroundColor: item.bg,
                    frontColor: item.front,
                  })}
                  className="py-3 rounded-ejsc text-[11px] font-bold active:scale-95 transition-all border"
                  style={{ background: item.bg, color: item.front, borderColor: item.bg === '#FFFFFF' ? '#e2e8f0' : item.bg }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MỤC 3: ICON BACK ─── */}
        <section className="flex flex-col gap-2">
          <Text weight="bold" variant="base" className="text-slate-700">3. Nút quay lại</Text>
          <div className="bg-white rounded-ejsc border border-slate-100 p-4 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { apisAsync.setNavigationBar({ visible: true, backIcon: 'arrow', title: 'Hiện nút Back' }); toast.success('Đã hiện nút Back'); }}
                className="py-3 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-700 active:scale-95 transition-all"
              >
                Hiện icon
              </button>
              <button
                onClick={() => { apisAsync.setNavigationBar({ visible: true, backIcon: 'none', title: 'Ẩn nút Back' }); toast.success('Đã ẩn nút Back'); }}
                className="py-3 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-700 active:scale-95 transition-all"
              >
                Ẩn icon
              </button>
            </div>
          </div>
        </section>

        {/* ─── MỤC 4: MÀU SẮC PIN, SÓNG, THÔNG BÁO ─── */}
        <section className="flex flex-col gap-2">
          <Text weight="bold" variant="base" className="text-slate-700">4. Màu sắc pin, sóng, thông báo</Text>
          <div className="bg-white rounded-ejsc border border-slate-100 p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  (apisAsync as any).setNavigationBar({
                    visible: true,
                    statusBarStyle: 'dark',
                    frontColor: '#FFA500' // Màu cam
                  });
                  toast.success('Pin đen + Chữ cam');
                }}
                className="py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-600 flex items-center justify-center gap-2 active:scale-95"
              >
                Icon đen, cam
              </button>
              <button
                onClick={() => {
                  (apisAsync as any).setNavigationBar({
                    visible: true,
                    statusBarStyle: 'light',
                    frontColor: '#FF0000' // Màu đỏ
                  });
                  toast.success('Pin trắng + Chữ đỏ');
                }}
                className="py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-600 flex items-center justify-center gap-2 active:scale-95"
              >
                Icon trắng, đỏ
              </button>
            </div>


          </div>
        </section>

        {/* ─── MỤC 5: BG TRÀN VIỀN ─── */}
        <section className="flex flex-col gap-2">
          <Text weight="bold" variant="base" className="text-slate-700">5. BG tràn viền và Pull to Refresh</Text>
          <div className="bg-white rounded-ejsc border border-slate-100 p-4 flex flex-col gap-4">
            <button
              onClick={() => navigate('/test-immersive')}
              className="w-full py-4.5 bg-slate-900 rounded-ejsc text-white font-bold text-[13px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            >
              Vào trang test BG tràn viền <ChevronRight size={18} />
            </button>
            <Text variant="sub" className="text-slate-500 text-center px-4">
              Kiểm tra hiển thị ảnh nền và hiệu ứng làm mới trang
            </Text>
          </div>
        </section>


      </div>
    </StandardPage>
  );
};

export default LayoutTestScreen;
