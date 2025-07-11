'use client';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div id="main" className="relative flex w-full flex-col items-center justify-center">
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {'Организуйте свои задачи легко и быстро'.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Создавайте доски, управлять проектами и сотрудничайте с командой — всё в одном месте.
          Сделайте работу проще с нашим удобным инструментом для управления задачами, вдохновлённым
          Trello.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={'/login'}>
            <Button size={'lg'}>Начать</Button>
          </Link>
          <Link href={'/#about'}>
            <Button size={'lg'} variant={'outline'}>
              {' '}
              Узнать больше
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <Card>
            <Image
              src="/taskhub-dashboard.jpg"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
