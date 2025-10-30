import Footer from "@/components/component.footer";
import HomePage from "@/components/component.hero";
import { AdsComponent } from "@/components/components.ad";
import FeatureComponent from "@/components/components.feature";

const Page = () => {
  return (
    <>
      {/* <h2>Welcome to safara web app</h2> */}
      {/* <HeroSlider /> */}
      <HomePage />
      <FeatureComponent />
      <AdsComponent />
      
    </>
  );
};

export default Page;
