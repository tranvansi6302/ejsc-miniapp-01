import React, { useState, useEffect } from 'react';
import { StandardPage, Text, toast, Card } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';
import { ArrowLeft, MessageSquare, Sparkles, Layout, Info, ChevronRight } from 'lucide-react';
import { PullToRefresh } from '../components/PullToRefresh';
import { Header } from '../components/Header';

const SkeletonItem = () => (
  <div className="p-5 bg-slate-50 rounded-ejsc border border-slate-100 flex flex-col gap-3 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-slate-200 rounded-full" />
      <div className="h-4 bg-slate-200 rounded-md w-1/3" />
    </div>
    <div className="h-3 bg-slate-100 rounded-md w-full" />
    <div className="h-3 bg-slate-100 rounded-md w-2/3" />
  </div>
);

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ImmersiveTestScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Todo[]>([]);
  const [debugValues, setDebugValues] = useState<Record<string, string>>({});

  const variables = [
    { name: '--ejsc-safe-top', desc: 'Safe Top' },
    { name: '--ejsc-safe-bottom', desc: 'Safe Bottom' },
    { name: '--ejsc-status-bar-height', desc: 'StatusBar Height' },
    { name: '--ejsc-title-bar-height', desc: 'TitleBar Height' },
    { name: '--ejsc-window-height', desc: 'Window Height' },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await response.json();
      // Giả lập delay 1 chút để thấy Skeleton mượt mà
      await new Promise(resolve => setTimeout(resolve, 800));
      setItems(data);
    } catch (error) {
      toast.error("Không thể tải dữ liệu từ API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Lấy thông số layout
    const timer = setTimeout(() => {
      const styles = getComputedStyle(document.documentElement);
      const values: Record<string, string> = {};
      variables.forEach(v => {
        values[v.name] = styles.getPropertyValue(v.name).trim() || 'N/A';
      });
      setDebugValues(values);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    await loadData();
    toast.success("Dữ liệu đã được làm mới");
  };

  return (
    <StandardPage hideAppBar contentClassName="!p-0">
      <div className="min-h-screen bg-white text-slate-900 relative flex flex-col">

        {/* BACKGROUND IMAGE FOR HEADER */}
        <div className="absolute top-0 left-0 right-0 h-[260px] z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Header Background"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-white" />
        </div>

        {/* Header (Immersive Sticky) */}
        <Header 
          title="BG Tràn viền" 
          subtitle="Pull to Refresh & Skeleton Loading" 
          transparent 
          showBack 
        />

        {/* Vùng nội dung */}
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="relative z-10 p-6 flex flex-col gap-6 min-h-[101vh] pt-10">

            {/* Banner giới thiệu - bo góc ejsc */}
            <div className="p-6 bg-white/80 backdrop-blur-md rounded-ejsc border border-slate-100">
              <div className="flex items-center gap-2 mb-2 text-indigo-600">
                <Layout size={18} />
                <Text weight="bold" variant="h3">Layout Immersive</Text>
              </div>
              <Text variant="base" className="text-slate-600 leading-relaxed">
                Trang này kết hợp ảnh nền tràn viền và Pull to Refresh chế độ Light.

              </Text>
            </div>

            <div className="flex items-center justify-between">
              <Text weight="bold" variant="base">Dữ liệu hiển thị</Text>
              {loading && <div className="text-[10px] text-indigo-500 animate-pulse font-bold">LOADING...</div>}
            </div>

            {/* Danh sách Items hoặc Skeleton */}
            <div className="flex flex-col gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonItem key={i} />)
              ) : (
                items.map((item) => (
                  <div key={item.id} className="p-5 bg-white rounded-ejsc border border-slate-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.completed ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                          <MessageSquare size={16} />
                        </div>
                        <Text weight="bold" variant="base">ID #{item.id}</Text>
                      </div>

                      {/* Trạng thái Hoàn thành */}
                      <div className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${item.completed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {item.completed ? 'Done' : 'Pending'}
                      </div>
                    </div>

                    <Text variant="sub" className="text-slate-600 leading-relaxed capitalize">
                      {item.title}
                    </Text>
                  </div>
                ))
              )}
            </div>

            <div className="pb-12" />
          </div>
        </PullToRefresh>
      </div>
    </StandardPage>
  );
};

export default ImmersiveTestScreen;

