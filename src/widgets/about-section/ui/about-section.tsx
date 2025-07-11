import { Timeline } from '@/shared/ui/timeline';
import Image from 'next/image';

const imageClass =
  'h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60';

const data = [
  {
    title: 'Регистрация',
    content: (
      <div>
        <p className="font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Пройдите процедуру регистрации удобным для вас способом
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <Image
              key={index}
              src="/taskhub-dashboard.jpg"
              alt="startup template"
              width={500}
              height={500}
              className={imageClass}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Старт',
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          I usually run out of copy, but when I see content this big, I try to integrate lorem
          ipsum.
        </p>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some
          more examples of beautiful designs I built.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { src: '/taskhub-dashboard.jpg', alt: 'hero template' },
            { src: '/taskhub-dashboard.jpg', alt: 'feature template' },
            { src: '/taskhub-dashboard.jpg', alt: 'bento template' },
            { src: '/taskhub-dashboard.jpg', alt: 'cards template' },
          ].map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt={img.alt}
              width={500}
              height={500}
              className={imageClass}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Работа',
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { src: '/taskhub-dashboard.jpg', alt: 'hero template' },
            { src: '/taskhub-dashboard.jpg', alt: 'feature template' },
            { src: '/taskhub-dashboard.jpg', alt: 'bento template' },
            { src: '/taskhub-dashboard.jpg', alt: 'cards template' },
          ].map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt={img.alt}
              width={500}
              height={500}
              className={imageClass}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export function AboutSection() {
  return (
    <div id="about" className="relative w-full overflow-clip pt-16">
      <h2 className="text-4xl text-center font-bold mb-4 text-black dark:text-white">
        Как это работает ?
      </h2>
      <Timeline data={data} />
    </div>
  );
}
