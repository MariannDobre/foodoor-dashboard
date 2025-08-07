import HomeHero from '@/_components/_home/HomeHero';
import HeroCards from '@/_components/_home/HeroCards';
import WhyToChooseUs from '@/_components/_home/WhyToChooseUs';
import HowItWorks from '@/_components/_home/HowItWorks';
import Testimonials from '@/_components/_home/Testimonials';
import GetHelp from '@/_components/_home/GetHelp';

export default function Page() {
  return (
    <section className='flex flex-col gap-3 lg:gap-6 xl:gap-9'>
      <HomeHero />

      <HeroCards />

      <WhyToChooseUs />

      <HowItWorks />

      <Testimonials />

      <GetHelp />
    </section>
  );
}
