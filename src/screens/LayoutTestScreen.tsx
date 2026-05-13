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

const LayoutTestScreen: React.FC = () => {
  const navigate = useNavigate();
  const [cssVars, setCssVars] = useState({
    safeTop: '0px', safeBottom: '0px',
    statusBarH: '0px', titleBarH: '0px',
    windowH: '0px',
  });

  useEffect(() => {
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
    return () => clearTimeout(t);
  }, []);

  return (
    <StandardPage hideAppBar contentClassName="bg-[#F8FAFC]">
      <div
        className="p-6 flex flex-col gap-6 pb-20"
        style={{ paddingTop: 'calc(var(--ejsc-safe-top) + 16px)' }}
      >
        <div className="flex flex-col gap-1">
          <Text variant="h2" weight="bold" className="text-slate-800">Kiểm tra Header native</Text>
          <Text variant="sub" className="text-slate-500">Thử nghiệm AppBar, màu sắc và thanh trạng thái</Text>
        </div>

        {/* ─── MỤC 1: HIỂN THỊ APPBAR ─── */}
        <section className="flex flex-col gap-2">
          <Text weight="bold" variant="base" className="text-slate-700">1. Hiển thị AppBar</Text>
          <div className="bg-white rounded-ejsc border border-slate-100 p-4 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => apisAsync.setNavigationBar({
                  visible: true, title: 'AppBar Native',
                  backgroundColor: '#10B981', frontColor: '#ffffff',
                  backIcon: 'arrow', immersive: false
                })}
                className="py-3 px-4 bg-emerald-500 rounded-ejsc text-[12px] font-bold text-white active:scale-95 transition-all"
              >
                Hiện AppBar
              </button>
              <button
                onClick={() => apisAsync.setNavigationBar({ visible: false })}
                className="py-3 px-4 bg-slate-800 rounded-ejsc text-[12px] font-bold text-white active:scale-95 transition-all"
              >
                Ẩn AppBar
              </button>
            </div>
          </div>
        </section>

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
          <Text weight="bold" variant="base" className="text-slate-700">3. Icon back</Text>
          <div className="bg-white rounded-ejsc border border-slate-100 p-4 flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { apisAsync.setNavigationBar({ visible: true, backIcon: 'arrow', title: 'Back: Arrow' }); toast.success('Icon: ← Arrow'); }}
                className="py-3 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-700 active:scale-95 transition-all"
              >
                ← Arrow
              </button>
              <button
                onClick={() => { apisAsync.setNavigationBar({ visible: true, backIcon: 'close', title: 'Back: Close' }); toast.success('Icon: ✕ Close'); }}
                className="py-3 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-700 active:scale-95 transition-all"
              >
                ✕ Close
              </button>
              <button
                onClick={() => { apisAsync.setNavigationBar({ visible: true, backIcon: 'none', title: 'Back: None' }); toast.success('Icon: (ẩn)'); }}
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
                  (apisAsync as any).setNavigationBar({ statusBarStyle: 'dark', frontColor: '#000000' });
                  toast.success('Icon: Đen');
                }}
                className="py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-600 flex items-center justify-center gap-2 active:scale-95"
              >
                Icon đen
              </button>
              <button
                onClick={() => {
                  (apisAsync as any).setNavigationBar({ statusBarStyle: 'light', frontColor: '#ffffff' });
                  toast.success('Icon: Trắng');
                }}
                className="py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-ejsc text-[11px] font-bold text-slate-600 flex items-center justify-center gap-2 active:scale-95"
              >
                Icon trắng
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

        {/* ─── DEMO TRỰC QUAN LAYOUT ─── */}
        <section className="flex flex-col gap-3 pb-10">
          <Text weight="bold" variant="base" className="text-slate-700">Demo: Layout thực tế với Safe Area</Text>

          {/* Phone mockup */}
          <div className="relative mx-auto w-[240px] h-[440px] rounded-[32px] border-[6px] border-slate-800 bg-slate-100 overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-0 right-0 flex justify-center pt-1 z-10">
              <div className="w-16 h-4 bg-slate-900 rounded-full" />
            </div>

            {/* STATUS BAR zone */}
            <div
              className="absolute top-0 left-0 right-0 bg-emerald-500/80 flex items-end justify-center"
              style={{ height: `calc(${cssVars.statusBarH} * 0.5 + 16px)` }}
            >
              <span className="text-white text-[8px] font-bold pb-0.5 opacity-90">
                status bar · {cssVars.statusBarH}
              </span>
            </div>

            {/* TITLE BAR zone */}
            <div
              className="absolute left-0 right-0 bg-indigo-500/80 flex items-center justify-center"
              style={{
                top: `calc(${cssVars.statusBarH} * 0.5 + 16px)`,
                height: `calc(${cssVars.titleBarH} * 0.5 + 18px)`,
              }}
            >
              <span className="text-white text-[8px] font-bold opacity-90">
                title bar · {cssVars.titleBarH}
              </span>
            </div>

            {/* CONTENT zone */}
            <div
              className="absolute left-0 right-0 bg-white flex items-center justify-center"
              style={{
                top: `calc(${cssVars.statusBarH} * 0.5 + ${cssVars.titleBarH} * 0.5 + 34px)`,
                bottom: `calc(${cssVars.safeBottom} * 0.5 + 12px)`,
              }}
            >
              <div className="flex flex-col items-center gap-1 px-3 text-center">
                <div className="w-full h-2 bg-slate-200 rounded-full" />
                <div className="w-3/4 h-2 bg-slate-100 rounded-full" />
                <div className="w-full h-2 bg-slate-200 rounded-full mt-2" />
                <div className="w-2/3 h-2 bg-slate-100 rounded-full" />
                <span className="text-[7px] text-slate-400 mt-2 font-bold uppercase tracking-widest opacity-30 block">Nội dung</span>
              </div>
            </div>

            {/* SAFE BOTTOM zone */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-amber-400/80 flex items-start justify-center"
              style={{ height: `calc(${cssVars.safeBottom} * 0.5 + 12px)` }}
            >
              <span className="text-white text-[8px] font-bold pt-0.5 opacity-90">
                safe bottom · {cssVars.safeBottom}
              </span>
            </div>
          </div>

          {/* Chú thích màu */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { color: 'bg-emerald-500', label: 'Status bar', val: cssVars.statusBarH },
              { color: 'bg-indigo-500', label: 'Title bar', val: cssVars.titleBarH },
              { color: 'bg-white border border-slate-200', label: 'Nội dung', val: '' },
              { color: 'bg-amber-400', label: 'Safe bottom', val: cssVars.safeBottom },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 bg-white rounded-ejsc border border-slate-100 px-3 py-2">
                <div className={`w-3 h-3 rounded-sm shrink-0 ${item.color}`} />
                <div>
                  <Text variant="tiny" weight="bold" className="text-slate-700">{item.label}</Text>
                  {item.val && <div className="text-[9px] text-slate-400 font-mono">{item.val}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Safe Top hiển thị riêng */}
          <div className="bg-white rounded-ejsc border border-slate-100 px-4 py-3 flex items-center justify-between">
            <div>
              <Text variant="caption" weight="bold" className="text-slate-700">Safe area top (tổng)</Text>
              <code className="text-[9px] text-slate-400">--ejsc-safe-top</code>
            </div>
            <span className="text-[12px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded font-mono">
              {cssVars.safeTop}
            </span>
          </div>
        </section>
      </div>
    </StandardPage>
  );
};

export default LayoutTestScreen;
