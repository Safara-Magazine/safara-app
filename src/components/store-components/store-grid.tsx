import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function DealsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto md:px-5">
        <div className="grid md:grid-cols-2 md:gap-5 gap-0">

          {/* new arrivals*/}
          <div className="relative bg-[url('/images/store-grid-1.png')] bg-center bg-cover md:rounded-xl overflow-hidden   h-80 md:h-[490px] group cursor-pointer p-[32px]">

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* small screen */}
            <div className='md:hidden block flex justify-end'>
                 <h3 className=" text-[20px] font-semibold text-white mb-1">New Arrivals</h3>
            </div>

            {/* large screen */}
            <div className="absolute hidden md:block bottom-6 left-6 text-white">
              <h3 className=" md:text-[32px] font-semibold text-3xl  mb-1">Shop New Arrivals</h3>

              {/* i dunno where this external link is going.... */}
              <a href="unknown for now?">

              <p className="text-[28px]  underline font-semibold opacity-90">Discover collection
                <ExternalLink className="inline-block w-4 h-4 ml-1 mb-0.5" />
              </p>
              </a>

            </div>
          </div>

          {/* two smaller cards here */}
          <div className="flex flex-col text-white md:gap-2 gap-0">
            {/* 1 */}

            <div className=" bg-[url('/images/store-grid-2.png')] bg-center bg-cover md:rounded-xl   md:p-8 p-4 flex-1 relative flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">

              {/* small screen */}
            <div className='md:hidden items-end justify-end flex block h-[189px]  z-20'>
                   <h3 className="text-[20px]  font-semibold  mb-2">Deal of the day</h3>
            </div>

               <div className="absolute inset-0 bg-black/40 z-10"></div>

              {/* large screens */}
            <div className='max-w-[308px] hidden md:block z-20'>

              <h3 className="text-xl md:text-[32px] font-bold  mb-2">Deal of the day</h3>

              <p className=" text-sm md:text-[18px] z-20  mb-6">
                Shop our best deals of the day and enjoy massive offers.
              </p>


              <button className="hidden md:block md:text-[14px] bg-white text-[#2F1C32] h-[26px] w-[118px] rounded-full font-medium text-sm hover:bg-[#2F1C32] hover:text-white transition-colors ">
                Shop Now
              </button>
            </div>
            </div>

            {/* 2 */}
            <div className="bg-[url('/images/store-grid-3.png')] md:rounded-xl md:p-8 p-4 flex-1 flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer bg-cover bg-center relative overflow-hidden">

              {/* small screen */}
            <div className='md:hidden block h-[189px] justify-end flex flex-col max-w-[152px] z-20'>
                   <h3 className="text-[20px]  font-semibold  mb-2">Travel services</h3>

                   {/* btn */}

              <button className="bg-white text-[#2F1C32] px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#2F1C32]  hover:text-white transition- colors ">
                Start Shopping
              </button>
            </div>

             <div className="absolute inset-0 text-white bg-black/40 z-10"></div>

              {/* large screens */}
              <div className='hidden md:block max-w-[308px] mx-auto text-left z-20'>

              <h3 className="text-xl md:text-[32px] font-semibold  mb-2">Travel services</h3>
              <p className=" text-sm md:text-[18px] mb-6">
                Explore the world with Safara’s exclusive packages.
              </p>
              <button className="bg-white text-[#2F1C32] px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#2F1C32]  hover:text-white transition-colors ">
                Explore Our Exclusive Packages
              </button>

            </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

