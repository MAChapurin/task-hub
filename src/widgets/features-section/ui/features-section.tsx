import { BentoGrid, BentoGridItem } from '@/shared/ui/bento-grid';
import { BarChart3, ChartBar, MessageCircle, Palette } from 'lucide-react';

export function FeaturesSrction() {
  return (
    <div id="features">
      <BentoGrid className="w-full md:auto-rows-[20rem] py-4">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: 'Просмотр графиков',
    description: 'Анализируйте данные с помощью интерактивных графиков и диаграмм.',
    header: <Skeleton />,
    className: 'md:col-span-2',
    icon: <ChartBar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Общение и сообщения',
    description: 'Обменивайтесь сообщениями с командой в реальном времени для эффективной работы.',
    header: <Skeleton />,
    className: 'md:col-span-1',
    icon: <MessageCircle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Цветовые темы',
    description: 'Настраивайте интерфейс с помощью 10 различных цветовых тем.',
    header: <Skeleton />,
    className: 'md:col-span-1',
    icon: <Palette className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Статистика и отчёты',
    description: 'Отслеживайте прогресс и анализируйте показатели проекта.',
    header: <Skeleton />,
    className: 'md:col-span-2',
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
];
