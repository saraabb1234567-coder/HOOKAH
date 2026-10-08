import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BookOpen, Droplets, Wrench, Sparkles, Flame, Cable, Smile, Lightbulb } from 'lucide-react';

interface ManualStepItem {
  number: string;
  title: string;
  summary: string;
  detail: string;
  tip: string;
}

const MONGOLIAN_MANUAL_STEPS: ManualStepItem[] = [
  {
    number: '01',
    title: 'УС ХИЙХ',
    summary: 'Их биед хүйтэн ус дүүргэх.',
    detail: 'W хэлбэрийн акрилик тасалгаанд 450-500мл хүйтэн цэвэр ус хийнэ. Пүршин диффузерийн үзүүр 15-20мм усанд дүрэгдсэн байхад тохиромжтой. Хүйтэн нягт утаа гаргахын тулд мөс нэмж болно.',
    tip: 'Усны түвшинг дээд портоос доош 2-3см зайтай байлгавал ус хоолой руу орохгүй.',
  },
  {
    number: '02',
    title: 'УГСРАХ',
    summary: 'Дотоод хоолой ба эд ангиудыг холбох.',
    detail: 'Төв металл хоолойг (stem) төв портод эргүүлэн суулгана. Хоёр талын пүршин диффузерийг зориулалтын байранд нь байрлуулж, O-ring резин жийргүүд бүрэн битүүмжилснийг шалгана.',
    tip: 'Хэт хүчлэх шаардлагагүй, силикон жийрэг нь гараар зөөлөн чангалахад л 100% агаар битүүмжилнэ.',
  },
  {
    number: '03',
    title: 'БЭЛТГЭХ',
    summary: 'Болор аяганд амтлагчийг жигд тараах.',
    detail: 'Өөрийн дуртай амтлагчийг сийрэгжүүлэн болор аяганд төв нүхийг таглахгүйгээр жигд тарааж хийнэ. Дээд ирмэгээс доош 2мм зайтэй байлгана.',
    tip: 'Хэт шахаж чигжихгүй, сийрэг байлгаснаар халуун агаар амтлагч бүрт жигд хүрдэг.',
  },
  {
    number: '04',
    title: 'ХАЛААХ',
    summary: 'Аяга ба халаагч нүүрсийг тавих.',
    detail: 'Шилэн тавгийг их бие дээр суурилуулаад, болор аяган дээрээ халаалтын калауд эсвэл фольга тавьж 2-3 ширхэг улайссан байгалийн кокосын нүүрс тавина.',
    tip: 'Болор шилний хана жигд халах хүртэл 3-5 минут хүлээвэл хамгийн зөөлөн амт гарна.',
  },
  {
    number: '05',
    title: 'ХОЛБОХ',
    summary: 'Силикон хоолойг их биед залгах.',
    detail: '90° тохойн металл холбогчийг баруун дээд портод суулгаж, цантай силикон хоолойг залгана. Нөгөө үзүүрт нь эргономик металл амны хошууг бэхэлнэ.',
    tip: 'Асаахаасаа өмнө нэг удаа сороод чимээгүй, хөнгөн агаарын урсгал орж байгааг шалгаарай.',
  },
  {
    number: '06',
    title: 'ТААЛАМЖ',
    summary: 'Гэрлээ асааж, тансаг мэдрэмж авах.',
    detail: 'Удирдлагаар их биеийн суурийн LED гэрлийг асааж, хүссэн өнгөө сонгоно. Өтгөн, хүйтэн, зөөлөн утааг ямар ч эсэргүүцэлгүйгээр таалан мэдрээрэй.',
    tip: 'Зүүн талын босоо хавхлагаар хуучин утааг хөнгөхөн үлээж цэвэрлэх боломжтой.',
  },
];

export const HowItWorksSection: React.FC = () => {
  const { websiteContent } = useData();
  const [activeStep, setActiveStep] = useState<number>(0);

  const current = MONGOLIAN_MANUAL_STEPS[activeStep];

  return (
    <section id="manual" className="relative py-28 px-6 bg-[#06080C] overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header in Mongolian */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{websiteContent.manualSubtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            {websiteContent.manualTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {websiteContent.manualDescription}
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MONGOLIAN_MANUAL_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`glass-panel p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? 'border-cyan-400/60 bg-[#0E1524] shadow-xl shadow-cyan-500/10 scale-[1.02]'
                    : 'border-white/5 hover:border-cyan-500/20 hover:bg-[#0B0F19]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-display text-cyan-400/80 group-hover:text-cyan-400 transition-colors">
                      {step.number}
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                      {idx === 0 && <Droplets className="w-5 h-5 text-cyan-400" />}
                      {idx === 1 && <Wrench className="w-5 h-5 text-cyan-400" />}
                      {idx === 2 && <Sparkles className="w-5 h-5 text-cyan-400" />}
                      {idx === 3 && <Flame className="w-5 h-5 text-amber-400" />}
                      {idx === 4 && <Cable className="w-5 h-5 text-cyan-400" />}
                      {idx === 5 && <Smile className="w-5 h-5 text-teal-400" />}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono mb-3">
                    {step.summary}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-start gap-2 text-[11px] text-slate-400 font-mono">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{step.tip}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Step Quick Inspector Box */}
        <div className="max-w-3xl mx-auto glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-display font-bold text-xl shrink-0">
              {current.number}
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                Идэвхтэй алхмын заавар
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Алхам {current.number} — {current.title}: {current.summary}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 5))}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            >
              ← Өмнөх
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < 5 ? prev + 1 : 0))}
              className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-xs font-mono font-bold text-slate-950 transition-colors cursor-pointer"
            >
              Дараах Алхам →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
