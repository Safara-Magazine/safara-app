import HomePage from "@/components/component.hero";
import { AdsComponent } from "@/components/components.ad";
import HighlightsComponent from "@/components/landingpage/highlights";
import LandingPageFeatureComponent from "@/components/landingpage/landingpageFeature";
import { LandingPageNews, LandingPageNews2 } from "@/components/landingpage/landingpageNews";
import { NewsCard } from "@/components/landingpage/newsCard";
import ThreeCardDisplay from "@/components/templates/ThreeCardDisplay/page";

const Page = () => {
  return (
    <>
      <HomePage />
      <HighlightsComponent  />
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <LandingPageNews />
        <LandingPageFeatureComponent />
        <LandingPageNews2 />
        <NewsCard />
        <ThreeCardDisplay title={""} />
        <AdsComponent />
      </div>
      
      
    </>
  );
};

export default Page;
