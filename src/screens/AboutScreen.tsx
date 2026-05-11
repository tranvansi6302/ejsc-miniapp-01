/**
 * @file screens/AboutScreen.tsx
 * @description Thông tin ứng dụng — Mini App 01.
 */
import React from 'react';
import { StandardPage, Text, Card } from 'ejsc-ma-component';
import { Info, Cpu, Globe } from 'lucide-react';

const AboutScreen: React.FC = () => {
  return (
    <StandardPage title="Về ứng dụng">
      <div className="flex flex-col gap-4 p-4">
        {/* App Identity */}
        <Card className="rounded-3xl border-none shadow-xl bg-linear-to-br from-emerald-600 to-teal-700 ">
          <div className="flex flex-row items-start gap-5 p-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white font-black text-3xl shrink-0">
              01
            </div>

            <div className="flex flex-col gap-1">
              <Text variant="h2" weight="bold" color="white" className="block leading-tight">Mini App 01</Text>
              <Text variant="sub" color="white" className="opacity-75 block">Mini app 01 test trên môi trường dev</Text>
              <div className="mt-1 px-2 py-0.5 bg-white/20 rounded-md border border-white/20 inline-flex self-start">
                <Text variant="tiny" color="white" weight="bold">v1.0.p</Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Info */}
        <Card className="rounded-2xl border border-slate-100 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Info size={16} className="text-emerald-600 shrink-0" />
            <div>
              <Text variant="tiny" className="text-slate-400 block">Link product</Text>
              <Text variant="sub" className="text-slate-700">https://ejsc-miniapp-01.vercel.app/</Text>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Cpu size={16} className="text-emerald-600 shrink-0" />
            <div>
              <Text variant="tiny" className="text-slate-400 block">Port dev</Text>
              <Text variant="base" weight="bold" className="text-slate-800">6060</Text>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Globe size={16} className="text-emerald-600 shrink-0" />
            <div>
              <Text variant="tiny" className="text-slate-400 block">DeepLink ID</Text>
              <Text variant="base" weight="bold" className="text-slate-800 font-mono">mini-app-1</Text>
            </div>
          </div>
        </Card>
      </div>
    </StandardPage>
  );
};

export default AboutScreen;
