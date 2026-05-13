/**
 * @file HeaderTestScreen.tsx
 * @description Hiển thị toàn bộ biến CSS --ejsc-* được inject từ Native.
 */
import React, { useEffect, useState } from 'react';
import { Text } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';
import { ArrowLeft } from 'lucide-react';
import { apisAsync } from 'ejsc-ma-api';
import { Header } from '../components/Header';

const ALL_VARIABLES = [
  // === SAFE AREA ===
  { group: 'Safe area', name: '--ejsc-safe-top', desc: 'Safe area top' },
  { group: 'Safe area', name: '--ejsc-safe-bottom', desc: 'Safe area bottom' },
  { group: 'Safe area', name: '--ejsc-safe-left', desc: 'Safe area left' },
  { group: 'Safe area', name: '--ejsc-safe-right', desc: 'Safe area right' },
  // === DEVICE & WINDOW ===
  { group: 'Thiết bị và cửa sổ', name: '--ejsc-device-width', desc: 'Chiều rộng thiết bị' },
  { group: 'Thiết bị và cửa sổ', name: '--ejsc-device-height', desc: 'Chiều cao thiết bị' },
  { group: 'Thiết bị và cửa sổ', name: '--ejsc-screen-width', desc: 'Chiều rộng màn hình' },
  { group: 'Thiết bị và cửa sổ', name: '--ejsc-screen-height', desc: 'Chiều cao màn hình' },
  { group: 'Thiết bị và cửa sổ', name: '--ejsc-window-width', desc: 'Chiều rộng cửa sổ' },
  { group: 'Thiết bị và cửa sổ', name: '--ejsc-window-height', desc: 'Chiều cao cửa sổ' },
  // === HEADER / BAR ===
  { group: 'Thanh tiêu đề', name: '--ejsc-status-bar-height', desc: 'Chiều cao status bar' },
  { group: 'Thanh tiêu đề', name: '--ejsc-title-bar-height', desc: 'Chiều cao title bar' },
  { group: 'Thanh tiêu đề', name: '--ejsc-header-padding-left', desc: 'Padding trái header' },
  { group: 'Thanh tiêu đề', name: '--ejsc-header-padding-right', desc: 'Padding phải header' },
  // === MISC ===
  { group: 'Khác', name: '--is-real-device', desc: 'Máy thật (1 = đúng)' },
];

const HeaderTestScreen: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Đặt mặc định hiện AppBar Native và icon pin, sóng màu đen (dark)
    apisAsync.setNavigationBar({
      visible: true,
      title: 'Biến CSS Safe Area',
      statusBarStyle: 'dark',
      frontColor: '#000000',
      backgroundColor: '#FFFFFF',
      backIcon: 'arrow'
    });

    const read = () => {
      const styles = getComputedStyle(document.documentElement);
      const result: Record<string, string> = {};
      ALL_VARIABLES.forEach(v => {
        result[v.name] = styles.getPropertyValue(v.name).trim() || 'N/A';
      });
      setValues(result);
    };
    read();
    const t = setTimeout(read, 800);
    return () => clearTimeout(t);
  }, []);

  const groups = [...new Set(ALL_VARIABLES.map(v => v.group))];
  const isRealDevice = values['--is-real-device'] === '1';

  return (
    <div className="h-full bg-[#F8FAFC] overflow-y-auto">
      <div
        className="px-6 flex flex-col gap-6 pb-40"
        style={{ paddingTop: 'var(--ejsc-safe-top)' }}
      >

        {/* Environment Badge */}
        <div className={`flex items-center gap-3 px-4 mt-6 py-3.5 rounded-ejsc border ${isRealDevice ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${isRealDevice ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <Text variant="base" weight="bold" className={isRealDevice ? 'text-emerald-700' : 'text-amber-700'}>
            {isRealDevice ? 'Môi trường: Máy thật' : 'Môi trường: Giả lập'}
          </Text>
        </div>

        {/* CSS Groups */}
        {groups.map(group => (
          <div key={group} className="flex flex-col gap-2">
            <Text variant="base" weight="bold" className="text-slate-700">
              {group}
            </Text>
            <div className="bg-white rounded-ejsc border border-slate-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {ALL_VARIABLES.filter(v => v.group === group).map((v, i, arr) => (
                    <tr
                      key={v.name}
                      className={`${i < arr.length - 1 ? 'border-b border-slate-50' : ''}`}
                    >
                      <td className="px-4 py-4">
                        <Text variant="sub" weight="bold" className="text-slate-700 block">
                          {v.desc}
                        </Text>
                        <code className="text-[10px] text-slate-400 font-mono">{v.name}</code>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={`text-[12px] font-bold px-2.5 py-1.5 rounded font-mono ${values[v.name] && values[v.name] !== 'N/A'
                          ? 'text-indigo-700 bg-indigo-50 border border-indigo-100'
                          : 'text-slate-400 bg-slate-50 border border-slate-100'
                          }`}>
                          {values[v.name] || '...'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* ─── LAYOUT MẪU ─── */}
        <section className="flex flex-col gap-3 pb-20">
          <Text weight="bold" variant="base" className="text-slate-700">Layout mẫu (Trực quan)</Text>

          {/* Phone mockup */}
          <div className="relative mx-auto w-[240px] h-[440px] rounded-[32px] border-[6px] border-slate-800 bg-slate-100 overflow-hidden shadow-xl">
            {/* Notch */}
            <div className="absolute top-0 left-0 right-0 flex justify-center pt-1 z-10">
              <div className="w-16 h-4 bg-slate-900 rounded-full" />
            </div>

            {/* STATUS BAR zone */}
            <div
              className="absolute top-0 left-0 right-0 bg-emerald-500/80 flex items-end justify-center"
              style={{ height: `calc(${values['--ejsc-status-bar-height'] || '0px'} * 0.5 + 16px)` }}
            >
              <span className="text-white text-[8px] font-bold pb-0.5 opacity-90">
                {values['--ejsc-status-bar-height']}
              </span>
            </div>

            {/* TITLE BAR zone */}
            <div
              className="absolute left-0 right-0 bg-indigo-500/80 flex items-center justify-center"
              style={{
                top: `calc(${values['--ejsc-status-bar-height'] || '0px'} * 0.5 + 16px)`,
                height: `calc(${values['--ejsc-title-bar-height'] || '0px'} * 0.5 + 18px)`,
              }}
            >
              <span className="text-white text-[8px] font-bold opacity-90">
                {values['--ejsc-title-bar-height']}
              </span>
            </div>

            {/* CONTENT zone */}
            <div
              className="absolute left-0 right-0 bg-white flex items-center justify-center"
              style={{
                top: `calc(${values['--ejsc-status-bar-height'] || '0px'} * 0.5 + ${values['--ejsc-title-bar-height'] || '0px'} * 0.5 + 34px)`,
                bottom: `calc(${values['--ejsc-safe-bottom'] || '0px'} * 0.5 + 12px)`,
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
              style={{ height: `calc(${values['--ejsc-safe-bottom'] || '0px'} * 0.5 + 12px)` }}
            >
              <span className="text-white text-[8px] font-bold pt-0.5 opacity-90">
                {values['--ejsc-safe-bottom']}
              </span>
            </div>
          </div>

          {/* Chú thích màu */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { color: 'bg-emerald-500', label: 'Status bar', val: values['--ejsc-status-bar-height'] },
              { color: 'bg-indigo-500', label: 'Title bar', val: values['--ejsc-title-bar-height'] },
              { color: 'bg-white border border-slate-200', label: 'Nội dung', val: '' },
              { color: 'bg-amber-400', label: 'Safe bottom', val: values['--ejsc-safe-bottom'] },
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
              {values['--ejsc-safe-top']}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeaderTestScreen;
