import React from 'react';
import { StandardPage, Text } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';
import { ArrowLeft } from 'lucide-react';

const ImmersiveTestScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    // StandardPage với hideAppBar=true để test chế độ tràn màn hình
    <StandardPage hideAppBar contentClassName="!p-0">
      <div className="min-h-screen bg-indigo-900 text-white relative">
        
        {/* Header giả lập dùng Safe Area Top */}
        <div 
          className="px-6 pb-4 bg-indigo-800/50 backdrop-blur-md flex items-center gap-4 sticky top-0 z-50 border-b border-indigo-700/50"
          style={{ paddingTop: 'calc(var(--ejsc-safe-top) + 12px)' }}
        >
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft size={20} />
          </button>
          <Text weight="bold" color="white">Chế độ Tràn màn hình (Immersive)</Text>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
             <Text color="white" weight="medium">
                Đây là chế độ không có AppBar của Native. 
                Nội dung của bạn đang "chui" xuống dưới cột sóng/pin.
             </Text>
             <div className="mt-4 p-3 bg-indigo-500/30 rounded-lg">
                <Text variant="caption" color="white" className="font-mono">
                   padding-top: calc(var(--ejsc-safe-top) + 12px)
                </Text>
             </div>
          </div>

          <div className="h-[150vh] bg-linear-to-b from-indigo-800/20 to-transparent border-l-2 border-dashed border-white/20 p-4">
             <Text color="white" className="opacity-50">Cuộn xuống để test độ dài...</Text>
          </div>
        </div>
      </div>
    </StandardPage>
  );
};

export default ImmersiveTestScreen;
