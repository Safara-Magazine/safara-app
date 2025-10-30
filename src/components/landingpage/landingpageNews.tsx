import { landingPageNews } from "@/lib/constants"
import Image from "next/image"
import DividerLine from "../molecules/DividerLine/page"



export const LandingPageNews = () => {
    return (
        <section>
            <DividerLine title="FEATURED"/>
            <div>
                {landingPageNews.map((page, i) => {
                    return(
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
                            <Image 
                                src={page.img} 
                                alt="news"
                                width={100}
                                height={100}
                                className="w-3/2"
                                />
                                <div>
                                    <p className="font-semibold text-3xl">{page.title}</p>
                                    <p className="text-xl my-2">{page.text}</p>
                                    <span className="text-[12px] text-[#EBB659] text-end self-end">{page.span}</span>
                                </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}