import { ThemeSwitcherShort } from '@/features/theme-switcher';
import { FAQAccordionSection } from '@/widgets/faq-section';
import { FeaturesSrction } from '@/widgets/features-section';
import { HeroSection } from '@/widgets/hero/ui/hero';
import { HowItWorkSection } from '@/widgets/how-it-work-section';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <header className="w-screen fixed z-100 top-0 left-0 flex items-center justify-center">
        <div className="w-full max-w-400 flex items-center justify-between p-4">
          <div>LOGO</div>
          <nav className="flex gap-2">
            <Link href={'#main'}>Main</Link>
            <Link href={'#about'}>About</Link>
            <Link href={'#features'}>Features</Link>
            <Link href={'#faq'}>FAQ</Link>
          </nav>
          <ThemeSwitcherShort />
        </div>
      </header>
      <main className="min-h-screen w-full max-w-400 flex flex-col items-center justify-center p-4 mx-auto scroll-smooth">
        <HeroSection />
        <HowItWorkSection />
        <FeaturesSrction />
        <FAQAccordionSection multiple />
      </main>
      <footer className="mt-16 text-center text-gray-500 text-sm max-w-xl mx-auto px-4">
        &copy; {new Date().getFullYear()} Taskhub. All rights reserved.
      </footer>
    </>
  );
}
