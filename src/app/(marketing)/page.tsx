import { HeaderMarketing } from '@/widgets';
import { AboutSection } from '@/widgets/about-section';
import { FAQAccordionSection } from '@/widgets/faq-section';
import { FeaturesSrction } from '@/widgets/features-section';
import { HeroSection } from '@/widgets/hero/ui/hero';

export default function MarketingPage() {
  return (
    <div>
      <HeaderMarketing />
      <main className="min-h-screen w-full max-w-400 flex flex-col items-center justify-center  p-2 md:p-4 mx-auto scroll-smooth">
        <HeroSection />
        <AboutSection />
        <FeaturesSrction />
        <FAQAccordionSection multiple />
      </main>
      <footer className="mt-16 text-center text-gray-500 text-sm max-w-xl mx-auto px-4">
        &copy; {new Date().getFullYear()} Taskhub. All rights reserved.
      </footer>
    </div>
  );
}
