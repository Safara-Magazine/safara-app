import Footer from "@/components/component.footer";
import HomePage from "@/components/component.hero";
import { AdsComponent } from "@/components/components.ad";
import FeatureComponent from "@/components/components.feature";
import HighlightsComponent from "@/components/landingpage/highlights";
import { LandingPageNews } from "@/components/landingpage/landingpageNews";
import { landingPageHighLights } from "@/lib/constants";
import Image from "next/image";

const Page = () => {
  return (
    <>
      {/* <h2>Welcome to safara web app</h2> */}
      {/* <HeroSlider /> */}
      <HomePage />
      <HighlightsComponent  />
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <LandingPageNews />
        <FeatureComponent />
        <AdsComponent />
      </div>
      
      
    </>
  );
};

export default Page;
