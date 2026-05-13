/**
 * @file HeaderTestScreen.tsx
 * @description Hiển thị toàn bộ biến CSS --ejsc-* được inject từ Native.
 */
import React, { useEffect, useState } from 'react';
import { StandardPage, Text } from 'ejsc-ma-component';
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
    // Đặt mặc định icon pin, sóng màu đen (dark) cho trang này
    apisAsync.setNavigationBar({ statusBarStyle: 'dark', frontColor: '#000000' });

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
    <StandardPage hideAppBar contentClassName="bg-[#F8FAFC]">
      <div className="relative min-h-screen flex flex-col">
        {/* Landscape Banner Background (Immersive Style) */}
        <div className="absolute top-0 left-0 right-0 h-[260px] z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Header Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#F8FAFC]" />
        </div>

        <Header title="Biến CSS safe area" subtitle="Toàn bộ 17 biến --ejsc-* từ Native" transparent />
        
        <div className="relative z-10 px-6 flex flex-col gap-6 pb-40">

        {/* Environment Badge */}
        <div className={`flex items-center gap-3 px-4 py-3.5 rounded-ejsc border ${isRealDevice ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
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
      </div>
    </div>
  </StandardPage>
  );
};

export default HeaderTestScreen;
