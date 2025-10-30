import HeroSlider, { HeroSlide } from "./component.heroslider";

const heroSlides: HeroSlide[] = [
   {
      image: '/images/hompagehero.png',
      title: 'Discover Amazing Destinations',
      subtitle: 'Explore the world with our curated travel experiences',
      alt: 'Ocean sunset view'
    },
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
      title: 'Adventure Awaits',
      subtitle: 'Create unforgettable memories in breathtaking locations',
      alt: 'Ocean sunset view'
    },
    {
      image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1920&q=80',
      title: 'Luxury Experiences',
      subtitle: 'Indulge in premium travel and accommodation',
      alt: 'Ocean sunset view'
    },
    {
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
      title: 'Natural Wonders',
      subtitle: 'Witness the beauty of untouched landscapes',
      alt: 'Ocean sunset view'
    }
];


export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
      {/* <FeatureComponent /> */}
    </main>
  );
}