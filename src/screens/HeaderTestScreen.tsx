/**
 * @file HeaderTestScreen.tsx
 * @description Hiển thị toàn bộ biến CSS --ejsc-* được inject từ Native.
 */
import React, { useEffect, useState } from 'react';
import { StandardPage, Text } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';
import { ArrowLeft } from 'lucide-react';
import { apisAsync } from 'ejsc-ma-api';

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
      <div className="px-6 pt-6  flex flex-col gap-6 pb-40" style={{ paddingTop: 'calc(var(--ejsc-safe-top) + 16px)' }}>

        {/* Header Title with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center active:scale-90 transition-transform text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col gap-0.5">
            <Text variant="h3" weight="bold" className="text-slate-800">Biến CSS safe area</Text>
            <Text variant="sub" className="text-slate-500">Toàn bộ 17 biến --ejsc-* từ Native</Text>
          </div>
        </div>

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
    </StandardPage>
  );
};

export default HeaderTestScreen;
