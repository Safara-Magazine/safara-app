import HeroSlider, { HeroSlide } from "./component.heroslider";

const heroSlides: HeroSlide[] = [
   {
      image: '/images/hero-img-1.png',
      title: 'Connecting Destinations, Creating Memories',
      subtitle: 'Interactive guides and integrated booking system to make exploring Nigeria an effortless and unforgettable experience',
      alt: 'Connecting Destinations, Creating Memories'
    },
    {
      image: '/images/hero-img-2.png',
      title: 'Your Journey Through Naija Taste Starts Here',
      subtitle: 'We explore authentic flavours of Nigeria, curated restaurant reviews, chef profiles, and traditional recipes that turn every meal into a cultural discovery.',
      alt: 'Your Journey Through Naija Taste Starts Here'
    },
    {
      image: '/images/hero-img-3.png',
      title: 'Rediscover Your Roots: A Heritage Exploration.',
      subtitle: 'Beyond the itinerary, we provide the cultural context, etiquette guides, and access needed to connect deeply with your heritage.',
      alt: 'Rediscover Your Roots: A Heritage Exploration.'
    },
    {
      image: "/images/hero-img-4.png",
      title: 'From Iconic Resorts to Authentic Heritage',
      subtitle: 'Experience the pinnacle of Nigerian hospitality in spaces that blend world-class luxury with deep-rooted tradition.',
      alt: 'From Iconic Resorts to Authentic Heritage'
    },
    {
      image: "/images/hero-img-5.png",
      title: 'Style in Motion: Where Tradition Meets the Runway',
      subtitle: 'Go behind Nigeria’s fashion scenes with designer interviews, style guides, and exclusive looks at the trends shaping the continent’s most influential fashion hub.',
      alt: 'Style in Motion: Where Tradition Meets the Runway'
    }
];


export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
    </main>
  );
}