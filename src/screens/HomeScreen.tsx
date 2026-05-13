/**
 * @file pages/HomeScreen.tsx
 * @description Trang chủ chuẩn hóa theo thiết kế của user.
 */
import React from 'react';
import {
  Gift,
  Home as HomeIcon,
  Search,
  ChevronDown,
  Sparkles,
  LayoutGrid,
  ChevronRight,
  Heart,
  BookOpen,
  Wrench,
  Baby,
  Smile,
  Scissors,
  Users,
  Award,
  ShieldCheck,
  Calendar,
  Coins
} from 'lucide-react';
import { Card, StandardPage, Text, Button } from 'ejsc-ma-component';

const gridServices = [
  { title: 'Vệ sinh & Tiện ích', icon: HomeIcon, color: 'text-teal-600', bg: 'bg-teal-50/60' },
  { title: 'Kỹ thuật & Điện nước', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50/60' },
  { title: 'Mẹ & Bé', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-50/60' },
  { title: 'Làm đẹp & Styling', icon: Scissors, color: 'text-rose-600', bg: 'bg-rose-50/60' },
  { title: 'Giáo dục & Training', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50/60' },
  { title: 'Y tế & Xét nghiệm', icon: Heart, color: 'text-red-600', bg: 'bg-red-50/60' },
  { title: 'Dịch vụ thú cưng', icon: Smile, color: 'text-orange-600', bg: 'bg-orange-50/60' },
  { title: 'Spa', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50/60' },
];


const HomeScreen: React.FC = () => {
  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <StandardPage
      onRefresh={handleRefresh}
      hideAppBar
      contentClassName="!px-0 !pt-0"
      className="!bg-[#f4f6fb] !px-0 !pt-0"
    >
      <div className="relative bg-white min-h-screen">
        {/* Landscape Banner Background (Immersive Style) */}
        <div className="absolute top-0 left-0 right-0 h-[260px] z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Header Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#f4f6fb]" />
        </div>

        {/* Floating Topbar (Immersive Style) */}
        <div
          className="relative z-20 px-4 flex items-center gap-3"
          style={{ paddingTop: 'calc(var(--ejsc-safe-top) + 12px)' }}
        >
          {/* Search Bar (No Shadow) */}
          <div className="flex-1 flex items-center justify-between gap-1 bg-white/80 backdrop-blur-md rounded-xl px-3 h-11 border border-white/20 min-w-0 transition-all">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Tìm dịch vụ..."
                className="flex-1 bg-transparent border-none outline-none text-[1.3rem] font-normal text-slate-700 placeholder:text-slate-400 min-w-0"
              />
            </div>
            <div className="flex items-center gap-0.5 shrink-0 px-1 border-l border-slate-100/80 pl-1.5 active:opacity-70 transition-opacity cursor-pointer">
              <span className="text-[1.2rem] text-slate-500 font-medium whitespace-nowrap">Khu vực</span>
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Top welcome & balance bar OVER the landscape bg */}
        <div className="relative z-10 px-4 flex flex-col pt-2 pb-[25px] select-none" style={{ marginTop: '55px' }}>
          {/* User welcome & Balance Bar */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 select-none">
              <Text variant="base" weight="bold" className="text-white drop-shadow-md">
                Chào Trần Văn An
              </Text>
              <Coins size={18} className="text-amber-400 shrink-0 drop-shadow select-none" />
            </div>
            <div className="flex items-center gap-1.5 bg-white/25 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full select-none hover:bg-white/30 transition-colors">
              <Text variant="base" weight="bold" className="text-white">
                1.200.000đ
              </Text>
              <Coins size={18} className="text-amber-400 shrink-0 select-none" />
            </div>
          </div>
        </div>

        {/* The main white curved content section */}
        <div className="relative z-20 bg-[#f4f6fb] px-4 pt-5 pb-8 flex flex-col gap-4 min-h-screen -mt-2 rounded-t-[8px]">

          {/* 3 mini items below User info */}
          <div className="p-3.5 border border-slate-100/80 bg-white select-none -mt-12 z-30 relative flex flex-row items-center justify-between rounded-[8px]">
            {/* Cộng đồng */}
            <div
              className="border-r border-slate-100 px-1"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={18} className="text-red-600 shrink-0 select-none" />
                <Text variant="sub" weight="bold" className="text-slate-800 leading-tight">Cộng đồng</Text>
              </div>
              <Text variant="tiny" className="text-slate-500 mt-1 whitespace-nowrap">Kết nối & chia sẻ</Text>
            </div>

            {/* Hội viên */}
            <div
              className="border-r border-slate-100 px-1"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={18} className="text-red-600 shrink-0 select-none" />
                <Text variant="sub" weight="bold" className="text-slate-800 leading-tight">Hội viên</Text>
              </div>
              <Text variant="tiny" className="text-slate-500 mt-1 whitespace-nowrap">Quyền lợi đặc biệt</Text>
            </div>

            {/* Chuyên gia */}
            <div
              className="px-1"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} className="text-red-600 shrink-0 select-none" />
                <Text variant="sub" weight="bold" className="text-slate-800 leading-tight">Chuyên gia</Text>
              </div>
              <Text variant="tiny" className="text-slate-500 mt-1 whitespace-nowrap">Tư vấn chuyên sâu</Text>
            </div>
          </div>

          {/* Quick Action banner card */}
          <div className="rounded-full p-[1px] bg-gradient-to-r from-red-200/70 to-white/10 select-none transition-shadow">
            <div className="rounded-full bg-gradient-to-r from-red-50/80 via-rose-50/40 to-white/95 flex items-center justify-between px-3.5 py-2.5 select-none gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 shrink-0 rounded-full bg-red-100/60 flex items-center justify-center">
                  <Calendar size={18} className="text-red-600 shrink-0 select-none" />
                </div>
                <div className="flex flex-col min-w-0">
                  <Text variant="sub" weight="bold" className="text-slate-800 leading-tight">Bạn cần dịch vụ ngay</Text>
                  <Text variant="tiny" className="text-slate-500 mt-1 whitespace-nowrap">Không cần đăng nhập</Text>
                </div>
              </div>
              <Button size="sm" className="shrink-0 rounded-full px-4 bg-red-500 hover:bg-red-600 border-none text-white h-[2.8rem] text-[1.2rem] font-bold active:scale-[0.97] transition-all whitespace-nowrap">
                Đặt ngay
              </Button>
            </div>
          </div>

          {/* Services Grid Section */}
          <div className="flex flex-col gap-3 mt-1">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <Text variant="base" weight="bold" className="text-slate-900 tracking-wide">Dịch vụ nổi bật</Text>
              <button className="flex items-center gap-0.5 text-red-600 active:opacity-70 transition-opacity">
                <Text variant="sub" weight="bold" className="text-red-600">Xem tất cả</Text>
                <ChevronRight size={14} className="text-red-600" />
              </button>
            </div>
            {/* Grid 4 cols with internal borders matching the image exactly */}
            <Card className="overflow-hidden rounded-[8px] bg-white border border-slate-100 select-none">
              <div className="grid grid-cols-4 w-full">
                {gridServices.map((item, index) => {
                  const Icon = item.icon;
                  const hasRightBorder = index % 4 !== 3;
                  const hasBottomBorder = index < 4;

                  return (
                    <div
                      key={item.title}
                      className={`flex flex-col items-center gap-2.5 p-4 text-center cursor-pointer active:bg-slate-50/60 transition-all ${hasRightBorder ? 'border-r border-slate-100' : ''
                        } ${hasBottomBorder ? 'border-b border-slate-100' : ''}`}
                    >
                      <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-0.5`}>
                        <Icon size={22} className={item.color} />
                      </div>
                      <Text variant="caption" weight="normal" className="text-slate-700 text-center break-words leading-tight">{item.title}</Text>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Coming Soon banner at the bottom */}
          <Card className="overflow-hidden rounded-[8px] bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 text-white p-5 flex flex-col gap-2 relative mt-2 hover:opacity-95 transition-all min-h-[140px] select-none">
            <div className="absolute top-0 right-0 p-3 opacity-15">
              <Sparkles size={100} />
            </div>
            <div className="z-10 flex flex-col">
              <span className="text-[2.2rem] font-extrabold tracking-wider leading-none select-none uppercase">HOMEBOOKING</span>
              <span className="text-[1.2rem] font-medium tracking-widest leading-normal text-teal-200 select-none uppercase mt-1">coming soon</span>
              <Text variant="sub" color="white" className="opacity-80 leading-relaxed mt-2.5 select-none max-w-[85%]">
                Homebooking là siêu app đa dịch vụ giúp bạn đặt mọi nhu cầu chỉ trong một ứng dụng duy nhất - từ quản ăn, cà phê, homestay, khách sạn, tour du lịch, dịch vụ địa phương đến thanh toán, quản lý đặt chỗ và ưu đãi thông minh.
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </StandardPage>
  );
};

export default HomeScreen;

