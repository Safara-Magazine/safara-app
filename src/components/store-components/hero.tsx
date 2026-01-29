import Image from "../Image";

export default function Hero() {
  return (
    <section className="text-white ">
      <div className=" md:pl-[44px]   md:pt-20  md:bg-[#2F1C32] bg-[#68526B] h-full md:h-screen">
        <div className="grid md:max-w-7xl   mx-auto md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Hero Text */}


          <div className="md:h-[458px] p-10     flex flex-col  ">
            <h1 className="text-[44px] md:text-[64px] md:mb-7 mb-5 tracking-[1px] lg:text-6xl font-bold leading-[131%]">
              Look Different,
              <br />
              Feel Different,
              <br />
              Be Different
            </h1>

            <p
              className="md:text-base font-bold md:max-w-[476.4937744140625px] md:mb-7 mb-5 text-[20px] leading-[1.24]
tracking-[1%]"
            >
              Browse through our curated catalogue of premium apparel and
              lifestyle essentials designed for the modern explorer.
            </p>

            {/* cta */}
            <button className="bg-white text-[#2F1C32]  text-[16px] h-[43px] w-[160px] rounded-lg font-semibold text-base hover:bg-[#B59157] border-[2px] border-[#3C2340] hover:text-white transition-all hover:-translate-y-0.5 shadow-lg">
              Start shopping
            </button>
          </div>

          {/* Hero Images */}
          <div className="flex md:mt-3 h-[100%]  md:items-end ">
            <Image
              src="/images/store-hero.png"
              alt="Safara Merch Users"
              height={760}
              width={1116}
              className="hidden md:block"
            />

            {/* sm screens */}
            <Image
              src="/images/store-hero-sm.png"
              alt="Safara Merch Users Mobile"
              height={300}
              width={452}
              className="block md:hidden mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
