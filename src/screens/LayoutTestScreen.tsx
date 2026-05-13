import React from 'react';
import { StandardPage, Text } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';

const LayoutTestScreen: React.FC = () => {
  const navigate = useNavigate();
  const [debugValues, setDebugValues] = React.useState<Record<string, string>>({});

  const variables = [
    { name: '--ejsc-device-width', desc: 'Chiều rộng thiết bị' },
    { name: '--ejsc-device-height', desc: 'Chiều cao thiết bị' },
    { name: '--ejsc-screen-width', desc: 'Chiều rộng màn hình' },
    { name: '--ejsc-screen-height', desc: 'Chiều cao màn hình' },
    { name: '--ejsc-window-width', desc: 'Chiều rộng vùng vẽ' },
    { name: '--ejsc-window-height', desc: 'Chiều cao vùng vẽ' },
    { name: '--ejsc-status-bar-height', desc: 'Chiều cao Status Bar' },
    { name: '--ejsc-title-bar-height', desc: 'Chiều cao Title Bar' },
    { name: '--ejsc-safe-top', desc: 'Safe Area Top' },
    { name: '--ejsc-safe-bottom', desc: 'Safe Area Bottom' },
    { name: '--ejsc-safe-left', desc: 'Safe Area Left' },
    { name: '--ejsc-safe-right', desc: 'Safe Area Right' },
    { name: '--ejsc-header-padding-left', desc: 'Header Padding Left' },
    { name: '--ejsc-header-padding-right', desc: 'Header Padding Right' },
    { name: '--safe-top', desc: 'Safe Top (Legacy)' },
    { name: '--safe-bottom', desc: 'Safe Bottom (Legacy)' },
    { name: '--is-real-device', desc: 'Is Real Device' },
  ];

  React.useEffect(() => {
    // Đợi 1 chút để Native tiêm xong biến
    const timer = setTimeout(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const values: Record<string, string> = {};
      variables.forEach(v => {
        values[v.name] = styles.getPropertyValue(v.name).trim() || 'N/A';
      });
      setDebugValues(values);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StandardPage title="Kiểm tra Layout EJSC" contentClassName="bg-slate-50">
      <div className="p-6 flex flex-col gap-8">
        
        {/* Environment Status */}
        <div className="flex items-center gap-2">
          <Text variant="caption" weight="medium" className="text-slate-500 uppercase tracking-wider">Môi trường:</Text>
          {debugValues['--is-real-device'] === '1' ? (
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
              MÁY THẬT (REAL DEVICE)
            </div>
          ) : (
            <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200">
              GIẢ LẬP (EMULATOR)
            </div>
          )}
        </div>
        {/* 0. Navigation Menu to Sub-tests */}
        <section className="flex flex-col gap-4">
          <Text weight="bold" className="text-slate-900">0. Các kịch bản test (Scenarios)</Text>
          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => navigate('/test-immersive')}
               className="p-4 bg-indigo-600 rounded-2xl text-white flex flex-col gap-1 active:scale-95 transition-transform"
             >
                <Text color="white" weight="bold">Tràn màn hình</Text>
                <Text variant="caption" color="white" className="opacity-70 text-[9px]">Test Safe Top (No AppBar)</Text>
             </button>
             <button 
               onClick={() => navigate('/test-bottom')}
               className="p-4 bg-emerald-600 rounded-2xl text-white flex flex-col gap-1 active:scale-95 transition-transform"
             >
                <Text color="white" weight="bold">Nút dưới đáy</Text>
                <Text variant="caption" color="white" className="opacity-70 text-[9px]">Test Safe Bottom</Text>
             </button>
          </div>
        </section>

        {/* 1. Visual Verification Blocks */}
        <section className="flex flex-col gap-4">
          <Text weight="bold" className="text-slate-900">1. Kiểm tra trực quan (Visual Test)</Text>
          
          {/* Top Test */}
          <div 
            className="bg-red-100 border-2 border-red-400 rounded-lg p-4 text-center"
            style={{ marginTop: 'var(--ejsc-safe-top)' }}
          >
            <Text weight="semibold" className="text-red-700">Khối này dính sát Safe Top</Text>
            <Text variant="caption" className="text-red-500">(Dùng margin-top: var(--ejsc-safe-top))</Text>
          </div>

          {/* Header Padding Test */}
          <div className="relative bg-blue-50 border border-blue-200 rounded-lg p-4 h-24 flex items-center justify-between overflow-hidden">
             <div 
               className="bg-blue-500 h-full absolute left-0 top-0 opacity-20"
               style={{ width: 'var(--ejsc-header-padding-left)' }}
             />
             <div 
               className="bg-blue-500 h-full absolute right-0 top-0 opacity-20"
               style={{ width: 'var(--ejsc-header-padding-right)' }}
             />
             <Text weight="medium" className="text-blue-800 mx-auto text-center z-10 text-[11px]">
               Vùng mờ xanh là khoảng chừa cho nút hệ thống<br/>
               (L: {debugValues['--ejsc-header-padding-left']} | R: {debugValues['--ejsc-header-padding-right']})
             </Text>
          </div>
        </section>

        {/* 2. Variable Value Table */}
        <section className="flex flex-col gap-4">
          <Text weight="bold" className="text-slate-900">2. Danh sách giá trị biến</Text>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-3"><Text variant="caption" weight="bold">Tên biến</Text></th>
                  <th className="px-3 py-3"><Text variant="caption" weight="bold">Giá trị</Text></th>
                </tr>
              </thead>
              <tbody>
                {variables.map((v) => (
                  <tr key={v.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-3">
                      <Text variant="caption" weight="bold" className="text-slate-700 block">{v.desc}</Text>
                      <code className="text-[9px] text-slate-400">{v.name}</code>
                    </td>
                    <td className="px-3 py-3">
                      <div className="bg-emerald-50 px-2 py-1 rounded text-[11px] font-bold text-emerald-700 inline-block">
                         {debugValues[v.name] || 'Đang lấy...'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Test */}
        <div 
          className="bg-emerald-100 border-2 border-emerald-400 rounded-lg p-6 text-center mt-10"
          style={{ marginBottom: 'var(--ejsc-safe-bottom)' }}
        >
          <Text weight="semibold" className="text-emerald-700">Khối này dính sát Safe Bottom</Text>
          <Text variant="caption" className="text-emerald-500">(Dùng margin-bottom: var(--ejsc-safe-bottom))</Text>
        </div>
      </div>
    </StandardPage>
  );
};

export default LayoutTestScreen;
