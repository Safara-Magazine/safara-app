import HomePage from "@/components/component.hero";
import { AdsComponent } from "@/components/components.ad";
import HighlightsComponent from "@/components/landingpage/highlights";
import LandingPageFeatureComponent from "@/components/landingpage/landingpageFeature";
import {
  LandingPageNews,
  LandingPageNews2,
} from "@/components/landingpage/landingpageNews";
import { NewsCard } from "@/components/landingpage/newsCard";
import Navigation from "@/components/layout/Header/HomePageNavBar";
import ContentFeedDisplay from "@/components/templates/component.contentfeed";
import ArticlePage from "./article/page";

const Page = () => {
  return (
    <div className="overflow-x-hidden w-full">
      <ArticlePage />
      <Navigation />
      <HomePage />
      <HighlightsComponent />
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center px-4 md:px-6 lg:px-8 w-full">
        <LandingPageNews />
        <LandingPageFeatureComponent />
        <LandingPageNews2 />
        <NewsCard />
        <ContentFeedDisplay title={"explore"} titleAlignment="right" />
        <AdsComponent />
      </div>
    </div>
  );
};

export default Page;
