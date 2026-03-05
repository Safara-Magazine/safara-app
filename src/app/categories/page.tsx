import ApparelCategories from "@/components/categories-component/apparel";
import StationaryCategories from "@/components/categories-component/stationaries";
import StoreNavigation from "@/components/layout/Header/StoreNavBar";
import HomeAndLivingCategories from "@/components/categories-component/home-living";
import TravelPackagesCategory from "@/components/categories-component/travel-packages";
import ConsultationCategory from "@/components/categories-component/consultation";
export default function CategoriesPage() {
  return (
    <>
      <StoreNavigation />
      <ApparelCategories />
      <StationaryCategories />
      <HomeAndLivingCategories />
      <TravelPackagesCategory />
      <ConsultationCategory />
    </>
  );
}